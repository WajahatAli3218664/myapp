import { NextRequest } from 'next/server';
import { addMultipleDocumentsToQdrant, Document } from '@/lib/qdrant-utils';
import { ENV } from '@/lib/env';

// Only allow POST requests for adding documents
export async function POST(request: NextRequest) {
  try {
    // Check if the request is coming from an authorized source (in production, add proper auth)
    // For now, we'll just check for a specific header as a simple security measure
    const authHeader = request.headers.get('authorization');

    if (authHeader !== `Bearer ${ENV.QDRANT_API_KEY}`) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized: Invalid authorization header' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { documents } = await request.json();

    if (!documents || !Array.isArray(documents)) {
      return new Response(
        JSON.stringify({ error: 'Documents array is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate each document
    for (const doc of documents) {
      if (!doc.id || !doc.content) {
        return new Response(
          JSON.stringify({ error: 'Each document must have an id and content' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Add documents to Qdrant
    await addMultipleDocumentsToQdrant(documents as Document[]);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully added ${documents.length} documents to the database`
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in documents API:', error);
    return new Response(
      JSON.stringify({
        error: 'An error occurred while processing your request',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// GET endpoint to check if the collection exists
export async function GET() {
  try {
    // In a real implementation, you'd check if the Qdrant collection exists
    // For now, we'll just return a simple status
    return new Response(
      JSON.stringify({
        status: 'ok',
        message: 'Documents API is running',
        collection: 'barber_documents'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in documents API GET:', error);
    return new Response(
      JSON.stringify({
        error: 'An error occurred while processing your request',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}