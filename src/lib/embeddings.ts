import OpenAI from 'openai';

// For production use, you'd typically use a proper embedding service like OpenAI
// This is a temporary solution for demonstration purposes
// In production, you would use OpenAI, Cohere, or a local embedding model

class EmbeddingService {
  private openai: OpenAI | null = null;

  constructor() {
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }
  }

  async getEmbedding(text: string): Promise<number[]> {
    // If OpenAI API key is available, use it to get real embeddings
    if (this.openai) {
      try {
        const response = await this.openai.embeddings.create({
          model: 'text-embedding-ada-002',
          input: text,
        });

        return response.data[0].embedding;
      } catch (error) {
        console.error('Error getting embedding from OpenAI:', error);
        // Fall back to basic embedding if OpenAI fails
        return this.getBasicEmbedding(text);
      }
    } else {
      // Use basic embedding approach if no OpenAI key is available
      return this.getBasicEmbedding(text);
    }
  }

  private getBasicEmbedding(text: string): number[] {
    // This is a basic approach for demonstration purposes
    // In production, always use proper embedding models
    const encoder = new TextEncoder();
    const encoded = encoder.encode(text.toLowerCase());
    const embedding: number[] = [];

    // Simple hash-based approach to create a vector representation
    for (let i = 0; i < 1536; i++) {
      const charIndex = i % encoded.length;
      embedding.push(Math.sin(encoded[charIndex] * (i + 1)));
    }

    return embedding;
  }
}

export const embeddingService = new EmbeddingService();