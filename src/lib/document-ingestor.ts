import { addMultipleDocumentsToQdrant, Document } from '@/lib/qdrant-utils';
import { embeddingService } from '@/lib/embeddings';

interface IngestOptions {
  chunkSize?: number;
  overlap?: number;
}

class DocumentIngestor {
  async ingestText(text: string, docId: string, metadata?: Record<string, any>, options: IngestOptions = {}) {
    const { chunkSize = 1000, overlap = 100 } = options;

    // Simple text chunking
    const chunks = this.chunkText(text, chunkSize, overlap);

    const documents: Document[] = chunks.map((chunk, index) => ({
      id: parseInt(`${docId}${index + 1}`),
      content: chunk,
      metadata: {
        ...metadata,
        chunkIndex: index,
        totalChunks: chunks.length
      }
    }));

    await addMultipleDocumentsToQdrant(documents);
    return documents.length;
  }

  async ingestFile(filePath: string, docId: string, metadata?: Record<string, any>) {
    // This would be implemented to read files (PDF, DOCX, etc.)
    // For now, we'll simulate it
    throw new Error('File ingestion not implemented in this example');
  }

  private chunkText(text: string, chunkSize: number, overlap: number): string[] {
    const chunks: string[] = [];
    let start = 0;

    while (start < text.length) {
      let end = start + chunkSize;

      // Try to break at sentence boundaries
      if (end < text.length) {
        // Look for the last sentence ending before chunkSize
        const chunk = text.substring(start, end);
        const lastSentenceEnd = Math.max(
          chunk.lastIndexOf('. '),
          chunk.lastIndexOf('?'),
          chunk.lastIndexOf('!'),
          chunk.lastIndexOf('\n')
        );

        if (lastSentenceEnd > chunkSize / 2) { // Only break if we're not cutting too early
          end = start + lastSentenceEnd + 1;
        }
      }

      chunks.push(text.substring(start, end));
      start = end - overlap;

      // Handle edge case where we're near the end
      if (start >= text.length) break;
    }

    return chunks;
  }
}

export const documentIngestor = new DocumentIngestor();