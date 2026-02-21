const axios = require('axios');

async function testChatAPI() {
  const baseUrl = 'http://localhost:3000';

  try {
    console.log('Testing chat API endpoint...');

    const response = await axios.post(`${baseUrl}/api/chat`, {
      message: "Hello, what services do you offer?",
      sessionId: "test-session-123"
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Response Status:', response.status);
    console.log('Response Data:', JSON.stringify(response.data, null, 2));

    if (response.status === 200) {
      console.log('✅ Chat API endpoint is working properly!');
    } else {
      console.log('❌ Chat API endpoint returned error status:', response.status);
    }

  } catch (error) {
    if (error.response) {
      console.log('Response error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.log('Request error - No response received. Is the server running on http://localhost:3000?');
      console.log('Make sure to run "npm run dev" in another terminal first');
    } else {
      console.log('Error:', error.message);
    }
  }
}

testChatAPI();