import { QdrantClient } from '@qdrant/js-client-rest';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory and load environment variables from .env.local file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

// Initialize Qdrant client for cloud instance
const qdrantUrl = process.env.QDRANT_URL;
const qdrantApiKey = process.env.QDRANT_API_KEY;

if (!qdrantUrl || !qdrantApiKey) {
  console.error('Missing required QDRANT_URL or QDRANT_API_KEY environment variables');
  process.exit(1);
}

// Qdrant client accepts the full URL directly
const qdrantClient = new QdrantClient({
  url: qdrantUrl,
  apiKey: qdrantApiKey,
});

async function initializeQdrant() {
  try {
    // Check if the collection already exists
    const collections = await qdrantClient.getCollections();
    const collectionExists = collections.collections.some(
      (collection) => collection.name === 'barber_documents'
    );

    if (!collectionExists) {
      // Create the collection with 1536 dimensions (for embedding vectors)
      await qdrantClient.createCollection('barber_documents', {
        vectors: {
          size: 1536, // Standard embedding size (e.g., OpenAI ada-002)
          distance: 'Cosine',
        },
      });

      console.log('Created Qdrant collection: barber_documents');
    } else {
      console.log('Qdrant collection already exists: barber_documents');
    }

    // Sample documents to add to the vector database (these would come from your real data)
    const documents = [
      {
        id: 1,
        content: `Slick Style — Premium Barber offers a range of services including haircuts, styling, beard grooming, hot towel shaves, and premium hair products. Our experienced barbers provide top-notch grooming services in a modern, comfortable environment.`
      },
      {
        id: 2,
        content: `Our premium haircut service includes a consultation, professional cut, style, and finishing touches. We use high-quality products and tools to ensure your hair looks its best. Our barbers are trained in the latest trends and classic techniques.`
      },
      {
        id: 3,
        content: `We offer beard grooming services including trimming, shaping, hot towel treatment, and styling. Our beard grooming service helps maintain a clean, professional look while keeping your facial hair healthy.`
      },
      {
        id: 4,
        content: `Our hot towel shave service is a premium grooming experience that includes a pre-shave oil, hot towels, straight razor shave, cooling treatment, and post-shave balm. This traditional service provides a close, smooth shave with maximum comfort.`
      },
      {
        id: 5,
        content: `We offer various packages such as the Classic Barber Package, Premium Grooming Experience, and Monthly Membership options. Packages include multiple services at a discounted rate.`
      },
      {
        id: 6,
        content: `To book an appointment, visit our website, call us directly, or use our online booking system. We recommend booking at least 24-48 hours in advance for peak times. Walk-ins are welcome but may have longer wait times.`
      },
      {
        id: 7,
        content: `We are located at the heart of the city with easy parking available. Our barbershop features a modern, sleek design with comfortable seating, premium amenities, and a relaxing atmosphere.`
      },
      {
        id: 8,
        content: `We use only premium hair and grooming products from trusted brands. Our product selection includes shampoos, conditioners, styling products, beard oils, and after-shave treatments. All products are available for purchase.`
      },
      {
        id: 9,
        content: `We offer special services for special occasions including wedding packages, grooming for events, and group appointments. Please contact us in advance to discuss your specific needs and requirements.`
      },
      {
        id: 10,
        content: `Our barbers are professionally trained and certified with years of experience. They stay updated with the latest trends and techniques through ongoing training and education. Each barber has their own specialties and style.`
      }
    ];

    // Prepare points for insertion
    const points = documents.map((doc) => {
      // Create a simple embedding based on the content (in real app, use proper embedding model)
      const embedding = Array(1536).fill(0).map(() => Math.random() * 2 - 1);

      return {
        id: doc.id,
        vector: embedding,
        payload: {
          content: doc.content,
          createdAt: new Date().toISOString(),
        },
      };
    });

    // Upsert the documents into the collection
    await qdrantClient.upsert('barber_documents', {
      points: points,
    });

    console.log(`Upserted ${documents.length} documents to barber_documents collection`);
    console.log('Qdrant initialization completed successfully');
  } catch (error) {
    console.error('Error initializing Qdrant:', error);
    throw error;
  }
}

// Run the initialization
if (require.main === module) {
  initializeQdrant()
    .then(() => {
      console.log('Qdrant initialization script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Qdrant initialization failed:', error);
      process.exit(1);
    });
}

export default initializeQdrant;
