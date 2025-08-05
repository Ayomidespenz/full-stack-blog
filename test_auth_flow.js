// Test script to verify the authentication flow
const axios = require('axios');

// Configure axios to show detailed request/response info
axios.interceptors.request.use(request => {
  console.log('Request:', {
    method: request.method,
    url: request.url,
    headers: request.headers,
    data: request.data
  });
  return request;
});

axios.interceptors.response.use(
  response => {
    console.log('Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    });
    return response;
  },
  error => {
    if (error.response) {
      console.error('Response Error:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
    } else if (error.request) {
      console.error('Request Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

const API_URL = 'http://localhost:8000/api';
const TEST_USER = {
  name: 'Test User',
  email: `testuser_${Date.now()}@example.com`,
  username: `testuser_${Date.now()}`,
  password: 'password123',
  password_confirmation: 'password123'
};

async function testAuthFlow() {
  try {
    console.log('Starting authentication flow test...');
    
    // 1. Test registration
    console.log('\n1. Testing registration...');
    const registerResponse = await axios.post(`${API_URL}/auth/register`, TEST_USER);
    console.log('✅ Registration successful!', {
      status: registerResponse.status,
      data: {
        user: registerResponse.data.user,
        token: registerResponse.data.token ? 'Token received' : 'No token'
      }
    });

    const authToken = registerResponse.data.token;
    
    // 2. Test the test-auth endpoint with the token
    console.log('\n2. Testing authentication with test-auth endpoint...');
    console.log('Using token:', authToken);
    
    try {
      // Test the test-auth endpoint with the token
      console.log('Sending request to test-auth endpoint...');
      const testResponse = await axios.get(`${API_URL}/test-auth`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      
      console.log('Test auth response:', {
        status: testResponse.status,
        data: testResponse.data,
        headers: testResponse.headers
      });
      
      if (testResponse.data.authenticated) {
        console.log('✅ Authentication successful! User:', testResponse.data.user);
      } else {
        console.warn('⚠️ Authentication failed:', testResponse.data.message);
        console.log('Headers sent:', testResponse.data.all_headers);
      }
    } catch (error) {
      console.error('Failed to get current user:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }

    // 3. Test login with registered user
    console.log('\n3. Testing login...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: TEST_USER.email,
      password: TEST_USER.password
    });
    console.log('✅ Login successful!', {
      status: loginResponse.status,
      token: loginResponse.data.token ? 'Token received' : 'No token'
    });

    // 4. Test logout
    console.log('\n4. Testing logout...');
    try {
      const logoutResponse = await axios.post(`${API_URL}/auth/logout`, {}, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Accept': 'application/json'
        }
      });
      console.log('✅ Logout successful!', { status: logoutResponse.status });
    } catch (error) {
      console.error('❌ Logout failed:', error.response?.data || error.message);
    }

    console.log('\n🎉 Authentication flow test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    process.exit(1);
  }
}

testAuthFlow();
