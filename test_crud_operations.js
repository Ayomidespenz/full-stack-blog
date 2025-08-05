const axios = require('axios');

// Configure axios to log requests and responses
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
const ADMIN_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'password123',
  name: 'Admin User',
  username: 'admin',
  password_confirmation: 'password123'
};

let authToken = '';
let testPostId = null;
let testCategoryId = null;
let testTagId = null;

async function testAuth() {
  try {
    // Register admin user if not exists
    console.log('\n1. Registering admin user...');
    try {
      await axios.post(`${API_URL}/auth/register`, ADMIN_CREDENTIALS);
      console.log('✅ Admin user registered successfully');
    } catch (error) {
      if (error.response?.status === 422) {
        console.log('ℹ️ Admin user already exists');
      } else {
        throw error;
      }
    }

    // Login
    console.log('\n2. Logging in...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: ADMIN_CREDENTIALS.email,
      password: ADMIN_CREDENTIALS.password
    });
    
    authToken = loginResponse.data.access_token;
    console.log('✅ Login successful. Token:', authToken);
    
    // Set default authorization header
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    
    return true;
  } catch (error) {
    console.error('❌ Authentication failed:', error.message);
    return false;
  }
}

async function testPosts() {
  try {
    console.log('\n=== Testing Posts CRUD ===');
    
    // Create a test category first
    const categoryResponse = await axios.post(`${API_URL}/categories`, {
      name: 'Test Category',
      slug: 'test-category',
      description: 'A test category'
    });
    testCategoryId = categoryResponse.data.id;
    console.log('✅ Created test category:', categoryResponse.data);
    
    // Create a test tag
    const tagResponse = await axios.post(`${API_URL}/tags`, {
      name: 'test-tag',
      slug: 'test-tag',
      description: 'A test tag'
    });
    testTagId = tagResponse.data.id;
    console.log('✅ Created test tag:', tagResponse.data);
    
    // Create a post
    console.log('\nCreating a new post...');
    const createResponse = await axios.post(`${API_URL}/posts`, {
      title: 'Test Post',
      slug: 'test-post',
      excerpt: 'This is a test post',
      content: 'This is the content of the test post',
      published_at: new Date().toISOString(),
      category_id: testCategoryId,
      tags: [testTagId],
      is_published: true
    });
    
    testPostId = createResponse.data.id;
    console.log('✅ Created post:', createResponse.data);
    
    // Get all posts
    console.log('\nFetching all posts...');
    const allPosts = await axios.get(`${API_URL}/posts`);
    console.log('✅ Fetched posts:', allPosts.data);
    
    // Get single post
    console.log('\nFetching single post...');
    const singlePost = await axios.get(`${API_URL}/posts/test-post`);
    console.log('✅ Fetched single post:', singlePost.data);
    
    // Update post
    console.log('\nUpdating post...');
    const updatedPost = await axios.put(`${API_URL}/posts/test-post`, {
      title: 'Updated Test Post',
      excerpt: 'This is an updated test post',
      content: 'This is the updated content of the test post',
      is_published: true
    });
    console.log('✅ Updated post:', updatedPost.data);
    
    // Delete post
    console.log('\nDeleting post...');
    await axios.delete(`${API_URL}/posts/test-post`);
    console.log('✅ Post deleted successfully');
    
    return true;
  } catch (error) {
    console.error('❌ Posts test failed:', error.message);
    if (error.response?.data) {
      console.error('Error details:', error.response.data);
    }
    return false;
  }
}

async function testCategories() {
  try {
    console.log('\n=== Testing Categories CRUD ===');
    
    // Create a category
    console.log('\nCreating a new category...');
    const createResponse = await axios.post(`${API_URL}/categories`, {
      name: 'Test Category CRUD',
      slug: 'test-category-crud',
      description: 'A test category for CRUD operations'
    });
    
    const categoryId = createResponse.data.id;
    console.log('✅ Created category:', createResponse.data);
    
    // Get all categories
    console.log('\nFetching all categories...');
    const allCategories = await axios.get(`${API_URL}/categories`);
    console.log('✅ Fetched categories:', allCategories.data);
    
    // Get single category
    console.log('\nFetching single category...');
    const singleCategory = await axios.get(`${API_URL}/categories/test-category-crud`);
    console.log('✅ Fetched single category:', singleCategory.data);
    
    // Update category
    console.log('\nUpdating category...');
    const updatedCategory = await axios.put(`${API_URL}/categories/test-category-crud`, {
      name: 'Updated Test Category',
      description: 'This is an updated test category'
    });
    console.log('✅ Updated category:', updatedCategory.data);
    
    // Delete category
    console.log('\nDeleting category...');
    await axios.delete(`${API_URL}/categories/test-category-crud`);
    console.log('✅ Category deleted successfully');
    
    return true;
  } catch (error) {
    console.error('❌ Categories test failed:', error.message);
    if (error.response?.data) {
      console.error('Error details:', error.response.data);
    }
    return false;
  }
}

async function testTags() {
  try {
    console.log('\n=== Testing Tags CRUD ===');
    
    // Create a tag
    console.log('\nCreating a new tag...');
    const createResponse = await axios.post(`${API_URL}/tags`, {
      name: 'test-tag-crud',
      slug: 'test-tag-crud',
      description: 'A test tag for CRUD operations'
    });
    
    const tagId = createResponse.data.id;
    console.log('✅ Created tag:', createResponse.data);
    
    // Get all tags
    console.log('\nFetching all tags...');
    const allTags = await axios.get(`${API_URL}/tags`);
    console.log('✅ Fetched tags:', allTags.data);
    
    // Get single tag
    console.log('\nFetching single tag...');
    const singleTag = await axios.get(`${API_URL}/tags/test-tag-crud`);
    console.log('✅ Fetched single tag:', singleTag.data);
    
    // Update tag
    console.log('\nUpdating tag...');
    const updatedTag = await axios.put(`${API_URL}/tags/test-tag-crud`, {
      name: 'updated-test-tag',
      description: 'This is an updated test tag'
    });
    console.log('✅ Updated tag:', updatedTag.data);
    
    // Delete tag
    console.log('\nDeleting tag...');
    await axios.delete(`${API_URL}/tags/updated-test-tag`);
    console.log('✅ Tag deleted successfully');
    
    return true;
  } catch (error) {
    console.error('❌ Tags test failed:', error.message);
    if (error.response?.data) {
      console.error('Error details:', error.response.data);
    }
    return false;
  }
}

async function cleanup() {
  try {
    // Clean up test data
    console.log('\n=== Cleaning up test data ===');
    
    if (testPostId) {
      try {
        await axios.delete(`${API_URL}/posts/test-post`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        });
        console.log('✅ Cleaned up test post');
      } catch (e) { /* Ignore if already deleted */ }
    }
    
    if (testCategoryId) {
      try {
        await axios.delete(`${API_URL}/categories/test-category`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        });
        console.log('✅ Cleaned up test category');
      } catch (e) { /* Ignore if already deleted */ }
    }
    
    if (testTagId) {
      try {
        await axios.delete(`${API_URL}/tags/test-tag`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        });
        console.log('✅ Cleaned up test tag');
      } catch (e) { /* Ignore if already deleted */ }
    }
    
    // Logout
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      console.log('✅ Logged out successfully');
    } catch (e) {
      console.warn('⚠️ Logout failed:', e.message);
    }
  } catch (error) {
    console.error('❌ Cleanup failed:', error.message);
  }
}

async function runTests() {
  try {
    // Authenticate first
    const authSuccess = await testAuth();
    if (!authSuccess) {
      console.error('❌ Authentication failed. Aborting tests.');
      return;
    }
    
    // Run CRUD tests
    await testCategories();
    await testTags();
    await testPosts();
    
    console.log('\n✅ All tests completed successfully!');
  } catch (error) {
    console.error('❌ Test execution failed:', error.message);
  } finally {
    // Clean up test data
    await cleanup();
  }
}

// Run the tests
runTests();
