const axios = require('axios');

async function comprehensiveTest() {
  const baseUrl = 'http://localhost:3000';

  console.log('=== Comprehensive Chat API Test ===\n');

  // Test 1: Basic functionality
  console.log('Test 1: Basic functionality');
  try {
    const response = await axios.post(`${baseUrl}/api/chat`, {
      message: "Hello, what services do you offer?",
      sessionId: "test-session-1"
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Status:', response.status);
    console.log('✅ Response received:', response.data.response.length, 'characters');
    console.log('✅ Session ID present:', !!response.data.sessionId);
  } catch (error) {
    console.log('❌ Error in test 1:', error.message);
  }

  console.log('\n---\n');

  // Test 2: Different query
  console.log('Test 2: Another query about appointments');
  try {
    const response = await axios.post(`${baseUrl}/api/chat`, {
      message: "How can I book an appointment?",
      sessionId: "test-session-2"
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Status:', response.status);
    console.log('✅ Response received:', response.data.response.length, 'characters');
  } catch (error) {
    console.log('❌ Error in test 2:', error.message);
  }

  console.log('\n---\n');

  // Test 3: Query without session ID (should generate one)
  console.log('Test 3: Query without session ID (auto-generation)');
  try {
    const response = await axios.post(`${baseUrl}/api/chat`, {
      message: "Tell me about your hot towel shaves",
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Status:', response.status);
    console.log('✅ Response received:', response.data.response.length, 'characters');
    console.log('✅ Session ID generated:', !!response.data.sessionId);
  } catch (error) {
    console.log('❌ Error in test 3:', error.message);
  }

  console.log('\n---\n');

  // Test 4: Error case - missing message
  console.log('Test 4: Error handling - missing message');
  try {
    const response = await axios.post(`${baseUrl}/api/chat`, {
      sessionId: "test-session-4"
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('⚠️ Unexpected success with status:', response.status);
  } catch (error) {
    if (error.response) {
      console.log('✅ Correctly handled missing message, status:', error.response.status);
      console.log('✅ Error response received as expected');
    } else {
      console.log('❌ Network error:', error.message);
    }
  }

  console.log('\n---\n');

  // Test 5: Error case - empty message
  console.log('Test 5: Error handling - empty message');
  try {
    const response = await axios.post(`${baseUrl}/api/chat`, {
      message: "",
      sessionId: "test-session-5"
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('⚠️ Unexpected success with status:', response.status);
  } catch (error) {
    if (error.response) {
      console.log('✅ Correctly handled empty message, status:', error.response.status);
      console.log('✅ Error response received as expected');
    } else {
      console.log('❌ Network error:', error.message);
    }
  }

  console.log('\n=== All tests completed ===');
}

comprehensiveTest();