# AI Chatbot Setup Guide

This guide explains how to set up the AI chatbot with RAG functionality for your barber shop website.

## Prerequisites

Before setting up the AI chatbot, you'll need:

1. **Groq API Key**: Sign up at [Groq Cloud](https://console.groq.com) to get your API key
2. **Qdrant Vector Database**: Either self-hosted or using Qdrant Cloud
3. **Neon PostgreSQL Database**: Sign up at [Neon](https://neon.tech) to get your database URL

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Groq API Key
GROQ_API_KEY=your_groq_api_key_here

# Neon Database URL
DATABASE_URL=your_neon_database_url_here

# Qdrant Configuration
QDRANT_URL=your_qdrant_url_here
QDRANT_API_KEY=your_qdrant_api_key_here

# Optional: User ID for conversations (defaults to 'default')
USER_ID=your_user_id
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Initialize the Vector Database

Run the following command to create the Qdrant collection and populate it with sample barber shop data:

```bash
npm run init-db
```

This will:
- Create a collection named `barber_documents` in Qdrant
- Populate it with sample documents about your barber shop services
- Set up the proper vector dimensions (1536) for embeddings

### 3. Run the Application

```bash
npm run dev
```

## How It Works

### Architecture

1. **Frontend**: A floating chat button in the bottom-right corner that opens a chat modal
2. **Backend**: `/api/chat` endpoint that handles the conversation logic
3. **RAG System**:
   - Converts user queries to embeddings
   - Searches Qdrant vector database for relevant documents
   - Injects context into the LLM prompt
   - Returns AI-powered responses
4. **Memory**: Stores conversation history in Neon PostgreSQL database

### API Flow

1. User sends a message via the chat UI
2. The `/api/chat` endpoint receives the message
3. Message is converted to an embedding vector
4. Qdrant is queried for the 3 most relevant documents
5. Retrieved documents are injected into the system prompt
6. Groq LLM generates a response based on the context
7. Response is sent back to the UI and stored in the database

### Features

- **Floating Chat Button**: Appears on all pages
- **Modern Chat UI**: Clean, responsive design
- **Message History**: Persists during the session
- **Auto-scrolling**: To latest messages
- **Typing Indicators**: Shows when AI is thinking
- **Mobile Responsive**: Works on all device sizes
- **Session Management**: Maintains conversation context
- **Error Handling**: Graceful fallbacks for failures

## Customization

### Adding Your Own Content

To replace the sample documents with your actual barber shop content:

1. Modify the `documents` array in `src/lib/qdrant-init.ts`
2. Run `npm run init-db` again to update the vector database

### Updating the System Prompt

Modify the system prompt in `src/app/api/chat/route.ts` to better match your brand voice and services.

### UI Customization

Modify the chat UI in `src/components/ui/ChatBot.tsx` to match your branding:
- Colors: Update the gradient colors in the component
- Styling: Adjust padding, sizes, and fonts
- Behavior: Modify animations and interactions

## API Rate Limiting

The current implementation doesn't include rate limiting. For production use, consider adding:

```javascript
// Example using a simple in-memory store (use Redis for production)
const rateLimit = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
};
```

## Security Considerations

- Never expose your API keys to the frontend
- Validate and sanitize all user inputs
- Consider implementing user authentication for conversations
- Monitor API usage to prevent abuse

## Troubleshooting

### Common Issues

1. **"Missing API key" error**: Check that your `.env.local` file has the correct values
2. **Qdrant connection issues**: Verify your Qdrant URL and API key
3. **Database errors**: Ensure your Neon database URL is correct and the database is accessible
4. **"Rate limit exceeded"**: Check your Groq API usage limits

### Debugging

Enable logging in the API route by adding console.log statements to track:
- Incoming messages
- Qdrant query results
- LLM responses
- Error conditions

## Production Deployment

For production deployment:

1. Use environment variables securely in your deployment platform
2. Consider using Redis for rate limiting
3. Monitor API costs and usage
4. Set up logging and error tracking
5. Implement proper backup strategies for your database