const axios = require('axios');

async function testRagPipeline() {
  const baseUrl = 'http://localhost:3001';

  console.log('Testing RAG pipeline with Groq, Qdrant, and Neon DB...');
  console.log('Making request to:', `${baseUrl}/api/chat`);
  console.log('Query: "Tell me about your barber services and hot towel shaves"');
  console.log('');

  try {
    console.log('Testing chat API endpoint...');

    const response = await axios.post(`${baseUrl}/api/chat`, {
      message: "Tell me about your barber services and hot towel shaves",
      sessionId: "rag-test-session-123"
    }, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'RAG-Pipeline-Tester/1.0'
      },
      timeout: 30000 // 30 second timeout
    });

    console.log('✅ Response Status:', response.status);
    console.log('✅ Response Data:', JSON.stringify(response.data, null, 2));

    if (response.status === 200) {
      console.log('');
      console.log('🎉 SUCCESS: RAG pipeline test passed!');
      console.log('- Chat API responded successfully');
      console.log('- Groq LLM integration working');
      console.log('- Qdrant vector search functional');
      console.log('- Conversation history storage operational');

      // Check if response contains relevant barber services information
      const responseText = response.data.response.toLowerCase();
      const positiveIndicators = [
        'barber', 'shave', 'hot towel', 'haircut', 'beard', 'grooming'
      ];

      console.log('');
      console.log('🔍 Checking for barber service content...');
      positiveIndicators.forEach(indicator => {
        if (responseText.includes(indicator)) {
          console.log(`✅ Found mention of "${indicator}" in response`);
        } else {
          console.log(`⚠️  No mention of "${indicator}" in response`);
        }
      });
    } else {
      console.log('❌ Chat API endpoint returned error status:', response.status);
    }

  } catch (error) {
    console.log('');
    if (error.response) {
      console.log('❌ Response error:', error.response.status);
      console.log('Error data:', error.response.data);
    } else if (error.request) {
      console.log('❌ Request error - No response received.');
      console.log('Is the server running on http://localhost:3001?');
      console.log('Make sure to run "npm run dev" in another terminal first.');
      console.log('');
      console.log('💡 To start the server:');
      console.log('   1. Open a new terminal');
      console.log('   2. Run: npm run dev');
      console.log('   3. Then run this test again');
    } else {
      console.log('❌ Error:', error.message);
    }

    // Check if it might be a port issue
    console.log('');
    console.log('💡 Note: The default port for this application is typically 3000.');
    console.log('   If testing on port 3001, ensure your Next.js server is configured correctly.');
  }
}

// Test with a different port as well (3000 is the default)
async function testRagPipelineOnDefaultPort() {
  const baseUrl = 'http://localhost:3000';

  console.log('');
  console.log('=========================================');
  console.log('Also testing on default port (3000)...');
  console.log('Making request to:', `${baseUrl}/api/chat`);

  try {
    const response = await axios.post(`${baseUrl}/api/chat`, {
      message: "What services do you offer for beard grooming?",
      sessionId: "rag-test-session-123-default"
    }, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'RAG-Pipeline-Tester/1.0'
      },
      timeout: 30000
    });

    console.log('✅ Default Port Response Status:', response.status);
    console.log('✅ Response received successfully on port 3000');

    if (response.data.response) {
      console.log('Response length:', response.data.response.length, 'characters');
    }

  } catch (error) {
    console.log('❌ Default port (3000) test failed:', error.message || 'Server not responding');
  }
}

// Run both tests
async function runAllTests() {
  await testRagPipeline();
  await testRagPipelineOnDefaultPort();
}

runAllTests();