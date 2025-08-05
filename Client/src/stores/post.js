import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from './auth';

export const usePostStore = defineStore('post', () => {
  const authStore = useAuthStore();
  const loading = ref(false);
  const error = ref(null);
  const posts = ref([]);
  const currentPost = ref(null);
  const categories = ref([]);
  const tags = ref([]);

  // API base URL
  const apiUrl = 'http://localhost:8000/api';

  // Axios instance with auth header
  const api = axios.create({
    baseURL: apiUrl,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  });

  // Add request interceptor to include auth token
  api.interceptors.request.use(config => {
    if (authStore.isAuthenticated) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

  // Fetch all posts
  const fetchPosts = async (params = {}) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get('/posts', { params });
      posts.value = response.data.data;
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch posts';
      throw error.value;
    } finally {
      loading.value = false;
    }
  };

  // Fetch a single post
  const fetchPost = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get(`/posts/${id}`);
      currentPost.value = response.data.data;
      return response.data.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch post';
      throw error.value;
    } finally {
      loading.value = false;
    }
  };

  // Create a new post
  const createPost = async (postData) => {
    loading.value = true;
    error.value = null;
    try {
      const formData = new FormData();
      
      // Append all post data to formData
      Object.keys(postData).forEach(key => {
        if (key === 'featured_image' && postData[key] instanceof File) {
          formData.append('featured_image', postData[key]);
        } else if (key === 'categories' || key === 'tags') {
          // Handle arrays (categories and tags)
          if (Array.isArray(postData[key])) {
            postData[key].forEach(item => formData.append(`${key}[]`, item));
          }
        } else if (postData[key] !== null && postData[key] !== undefined) {
          formData.append(key, postData[key]);
        }
      });

      const response = await api.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Add the new post to the posts array
      posts.value.unshift(response.data.data);
      return response.data.data;
    } catch (err) {
      error.value = err.response?.data?.errors || err.response?.data?.message || 'Failed to create post';
      throw error.value;
    } finally {
      loading.value = false;
    }
  };

  // Update an existing post
  const updatePost = async (id, postData) => {
    loading.value = true;
    error.value = null;
    try {
      const formData = new FormData();
      
      // Append all post data to formData
      Object.keys(postData).forEach(key => {
        if (key === 'featured_image' && postData[key] instanceof File) {
          formData.append('featured_image', postData[key]);
        } else if (key === 'categories' || key === 'tags') {
          // Handle arrays (categories and tags)
          if (Array.isArray(postData[key])) {
            postData[key].forEach(item => formData.append(`${key}[]`, item));
          }
        } else if (postData[key] !== null && postData[key] !== undefined) {
          formData.append(`_method`, 'PUT');
          formData.append(key, postData[key]);
        }
      });

      const response = await api.post(`/posts/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Update the post in the posts array
      const index = posts.value.findIndex(p => p.id === id);
      if (index !== -1) {
        posts.value[index] = response.data.data;
      }
      
      // Update current post if it's the one being edited
      if (currentPost.value && currentPost.value.id === id) {
        currentPost.value = response.data.data;
      }
      
      return response.data.data;
    } catch (err) {
      error.value = err.response?.data?.errors || err.response?.data?.message || 'Failed to update post';
      throw error.value;
    } finally {
      loading.value = false;
    }
  };

  // Delete a post
  const deletePost = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      await api.delete(`/posts/${id}`);
      
      // Remove the post from the posts array
      posts.value = posts.value.filter(post => post.id !== id);
      
      // Clear current post if it's the one being deleted
      if (currentPost.value && currentPost.value.id === id) {
        currentPost.value = null;
      }
      
      return true;
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to delete post';
      throw error.value;
    } finally {
      loading.value = false;
    }
  };

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      categories.value = response.data.data;
      return categories.value;
    } catch (err) {
      error.value = 'Failed to fetch categories';
      throw error.value;
    }
  };

  // Fetch all tags
  const fetchTags = async () => {
    try {
      const response = await api.get('/tags');
      tags.value = response.data.data;
      return tags.value;
    } catch (err) {
      error.value = 'Failed to fetch tags';
      throw error.value;
    }
  };

  // Reset store state
  const reset = () => {
    posts.value = [];
    currentPost.value = null;
    categories.value = [];
    tags.value = [];
    error.value = null;
    loading.value = false;
  };

  return {
    // State
    loading,
    error,
    posts,
    currentPost,
    categories,
    tags,
    
    // Actions
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
    fetchCategories,
    fetchTags,
    reset,
  };
});
