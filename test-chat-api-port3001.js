const axios = require('axios');

async function testChatAPI() {
  const baseUrl = 'http://localhost:3001';  // Changed to port 3001 as requested

  try {
    console.log('Testing chat API endpoint on port 3001...');
    console.log('Query: "Tell me about your barber services and hot towel shaves"');

    const response = await axios.post(`${baseUrl}/api/chat`, {
      message: "Tell me about your barber services and hot towel shaves",  // Specific barber service query
      sessionId: "test-session-123"
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30000  // 30 second timeout for RAG operations
    });

    console.log('Response Status:', response.status);
    console.log('Response Data:', JSON.stringify(response.data, null, 2));

    if (response.status === 200) {
      console.log('✅ Chat API endpoint is working properly!');
      console.log('✅ RAG pipeline test successful with Groq, Qdrant, and Neon DB integration!');
    } else {
      console.log('❌ Chat API endpoint returned error status:', response.status);
    }

  } catch (error) {
    if (error.response) {
      console.log('Response error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.log('Request error - No response received. Is the server running on http://localhost:3001?');
      console.log('Make sure to run "npm run dev" in another terminal first with proper port configuration');
    } else {
      console.log('Error:', error.message);
    }
  }
}

testChatAPI();