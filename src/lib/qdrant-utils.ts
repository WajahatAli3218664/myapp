import { QdrantClient } from '@qdrant/js-client-rest';

// Initialize Qdrant client with error handling
let qdrantClient: QdrantClient | null = null;

if (process.env.QDRANT_URL && process.env.QDRANT_API_KEY) {
  qdrantClient = new QdrantClient({
    url: process.env.QDRANT_URL,
    apiKey: process.env.QDRANT_API_KEY,
  });
}

interface Document {
  id: number;
  content: string;
  metadata?: Record<string, any>;
}

async function addDocumentToQdrant(doc: Document) {
  try {
    if (!qdrantClient) {
      console.warn('Qdrant client not available, skipping document addition');
      return;
    }

    // Create a simple embedding based on the content (in real app, use proper embedding model)
    const embedding = Array(1536).fill(0).map(() => Math.random() * 2 - 1);

    const point = {
      id: doc.id,
      vector: embedding,
      payload: {
        content: doc.content,
        ...doc.metadata,
        createdAt: new Date().toISOString(),
      },
    };

    await qdrantClient.upsert('barber_documents', {
      points: [point],
    });

    console.log(`Added document ${doc.id} to barber_documents collection`);
  } catch (error) {
    console.error('Error adding document to Qdrant:', error);
    throw error;
  }
}

async function addMultipleDocumentsToQdrant(docs: Document[]) {
  try {
    if (!qdrantClient) {
      console.warn('Qdrant client not available, skipping document addition');
      return;
    }

    const points = docs.map((doc) => {
      // Create a simple embedding based on the content (in real app, use proper embedding model)
      const embedding = Array(1536).fill(0).map(() => Math.random() * 2 - 1);

      return {
        id: doc.id,
        vector: embedding,
        payload: {
          content: doc.content,
          ...doc.metadata,
          createdAt: new Date().toISOString(),
        },
      };
    });

    await qdrantClient.upsert('barber_documents', {
      points: points,
    });

    console.log(`Added ${docs.length} documents to barber_documents collection`);
  } catch (error) {
    console.error('Error adding documents to Qdrant:', error);
    throw error;
  }
}

async function searchInQdrant(query: string, limit: number = 3) {
  try {
    if (!qdrantClient) {
      console.warn('Qdrant client not available, returning empty results');
      return [];
    }

    // Create a simple embedding for the query (in real app, use proper embedding model)
    const queryEmbedding = Array(1536).fill(0).map(() => Math.random() * 2 - 1);

    const results = await qdrantClient.search('barber_documents', {
      vector: queryEmbedding,
      limit: limit,
      with_payload: true,
    });

    return results;
  } catch (error) {
    console.error('Error searching in Qdrant:', error);
    throw error;
  }
}

export type { Document };
export { addDocumentToQdrant, addMultipleDocumentsToQdrant, searchInQdrant };
