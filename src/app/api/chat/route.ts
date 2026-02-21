import { NextRequest } from 'next/server';
import Groq from 'groq-sdk';
import { neon } from '@neondatabase/serverless';
import { QdrantClient } from '@qdrant/js-client-rest';
import { v4 as uuidv4 } from 'uuid';
import { ENV } from '@/lib/env';
import { embeddingService } from '@/lib/embeddings';

const groq = new Groq({
  apiKey: ENV.GROQ_API_KEY,
});

const qdrantClient = new QdrantClient({
  url: ENV.QDRANT_URL,
  apiKey: ENV.QDRANT_API_KEY,
});

const neonClient = neon(ENV.DATABASE_URL);

// Initialize Neon DB table for conversation history
async function initializeDb() {
  try {
    await neonClient.sql`
      CREATE TABLE IF NOT EXISTS conversations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT,
        message TEXT NOT NULL,
        response TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        session_id TEXT NOT NULL
      );
    `;
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Import the embedding service
async function getEmbedding(text: string): Promise<number[]> {
  return await embeddingService.getEmbedding(text);
}

export async function POST(request: NextRequest) {
  try {
    await initializeDb();

    const { message, sessionId = uuidv4() } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate input
    if (typeof message !== 'string' || message.trim().length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid message' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Convert message to embedding and query Qdrant
    const queryEmbedding = await getEmbedding(message);
    const contextDocs = await queryQdrant(queryEmbedding);

    // Format context for the LLM
    const contextText = contextDocs.map(doc => doc.payload?.content).join('\n\n');

    // Construct the final prompt with context
    const systemPrompt = `You are a helpful AI assistant for Slick Style — Premium Barber, a premium barber shop. Use the following context to answer the user's question. If you don't know the answer, say "I don't have enough information to answer that. Please contact us directly for more information." Be friendly and professional.

    Context:
    ${contextText}`;

    // Get response from Groq
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      model: 'llama-3.1-8b-instant', // Using Llama 3.1 model from Groq
      temperature: 0.7,
      max_tokens: 1024,
      stream: false,
    });

    const responseText = chatCompletion.choices[0]?.message?.content || 'I had an issue generating a response. Please try again.';

    // Store the conversation in Neon
    await storeConversation(message, responseText, sessionId);

    return new Response(JSON.stringify({
      response: responseText,
      sessionId,
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response(JSON.stringify({
      error: 'An error occurred while processing your request',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Query Qdrant for relevant documents
async function queryQdrant(queryEmbedding: number[], topK: number = 3) {
  try {
    const response = await qdrantClient.search('barber_documents', {
      vector: queryEmbedding,
      limit: topK,
    });
    return response;
  } catch (error) {
    console.error('Error querying Qdrant:', error);
    return []; // Return empty array if Qdrant is unavailable
  }
}

// Store conversation in Neon database
async function storeConversation(userMessage: string, aiResponse: string, sessionId: string) {
  try {
    await neonClient.sql`
      INSERT INTO conversations (user_id, message, response, session_id)
      VALUES (${ENV.USER_ID}, ${userMessage}, ${aiResponse}, ${sessionId})
    `;
  } catch (error) {
    console.error('Error storing conversation:', error);
    // Don't throw error here as it's not critical to the response
  }
}