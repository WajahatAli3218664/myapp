import { QdrantClient } from '@qdrant/js-client-rest';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

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

    // Load actual business data from site.json
    const siteDataPath = path.resolve(__dirname, '../../data/site.json');
    let siteData;

    try {
      const siteDataRaw = fs.readFileSync(siteDataPath, 'utf8');
      siteData = JSON.parse(siteDataRaw);
    } catch (error) {
      console.error('Error reading site.json:', error);
      throw new Error('Could not read site.json file. Please ensure it exists and is valid JSON.');
    }

    // Create documents from the actual business data
    const documents = [
      {
        id: 1,
        content: `Business Name: ${siteData.brand.name}. ${siteData.hero.headline}. ${siteData.hero.subheadline}`
      },
      // Services
      ...siteData.services.map((service, index) => ({
        id: index + 2,
        content: `Service: ${service.title}. ${service.description}. Price: $${service.price}.`
      })),
      // Team members
      ...siteData.team.map((member, index) => ({
        id: siteData.services.length + 2 + index,
        content: `Barber: ${member.name}, Role: ${member.role}. ${member.bio}`
      })),
      // Features
      ...siteData.features.map((feature, index) => ({
        id: siteData.services.length + siteData.team.length + 2 + index,
        content: `Feature: ${feature.title}. ${feature.text}`
      })),
      // Testimonials
      ...siteData.testimonials.map((testimonial, index) => ({
        id: siteData.services.length + siteData.team.length + siteData.features.length + 2 + index,
        content: `Customer: ${testimonial.name}. Feedback: ${testimonial.feedback}`
      })),
      // FAQ
      ...siteData.faq.map((faq, index) => ({
        id: siteData.services.length + siteData.team.length + siteData.features.length + siteData.testimonials.length + 2 + index,
        content: `Q: ${faq.q} A: ${faq.a}`
      })),
      // Contact information
      {
        id: siteData.services.length + siteData.team.length + siteData.features.length + siteData.testimonials.length + siteData.faq.length + 2,
        content: `Contact Info: Address: ${siteData.contact.address}. Phone: ${siteData.contact.phone}. Email: ${siteData.contact.email}.`
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
