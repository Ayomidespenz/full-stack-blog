import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';
import router from '@/router';

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(JSON.parse(localStorage.getItem('user')));
  const token = ref(localStorage.getItem('token'));
  const isAuthenticated = ref(!!token.value);
  const loading = ref(false);
  const error = ref(null);

  // Getters
  const currentUser = computed(() => user.value);
  const isAdmin = computed(() => user.value?.role === 'admin');
  const isAuthor = computed(() => user.value?.role === 'author' || isAdmin.value);

  // Actions
  const setAuth = (userData, authToken) => {
    user.value = userData;
    token.value = authToken;
    isAuthenticated.value = true;
    
    // Store user and token in localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
    
    // Set default axios authorization header
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
  };

  const clearAuth = () => {
    user.value = null;
    token.value = null;
    isAuthenticated.value = false;
    
    // Remove from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Remove axios authorization header
    delete axios.defaults.headers.common['Authorization'];
  };

  const login = async (credentials) => {
    try {
      loading.value = true;
      error.value = null;
      
      const response = await axios.post('/auth/login', {
        email: credentials.email,
        password: credentials.password,
        remember: credentials.remember || false
      });
      
      const { user, access_token } = response.data;
      setAuth(user, access_token);
      
      return { success: true };
      
    } catch (err) {
      error.value = err.response?.data?.message || 'Login failed';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const register = async (userData) => {
    try {
      loading.value = true;
      error.value = null;
      
      // Log the request data for debugging
      console.log('Sending registration request with data:', userData);
      
      const response = await axios.post('http://localhost:8000/api/auth/register', userData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Registration response:', response.data);
      
      if (response.data.user && response.data.access_token) {
        const { user, access_token } = response.data;
        setAuth(user, access_token);
        return { success: true };
      } else {
        throw new Error('Invalid response format from server');
      }
      
    } catch (err) {
      console.error('Registration error:', err);
      
      // Extract error message from response or use default
      let errorMessage = 'Registration failed. Please try again.';
      
      if (err.response) {
        // Server responded with an error status code
        if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.data?.errors) {
          // Handle Laravel validation errors
          const errors = Object.values(err.response.data.errors).flat();
          errorMessage = errors.join(' ');
        }
      } else if (err.request) {
        // The request was made but no response was received
        errorMessage = 'No response from server. Please check your connection.';
      }
      
      error.value = errorMessage;
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:8000/api/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      clearAuth();
      router.push('/login');
    }
  };

  const checkAuth = async () => {
    if (!token.value) return false;
    
    try {
      const response = await axios.get('http://localhost:8000/api/auth/me');
      user.value = response.data;
      localStorage.setItem('user', JSON.stringify(response.data));
      return true;
    } catch (err) {
      clearAuth();
      return false;
    }
  };

  const updateProfile = async (profileData) => {
    try {
      loading.value = true;
      const formData = new FormData();
      
      // Append all profile data to formData
      Object.keys(profileData).forEach(key => {
        if (profileData[key] !== undefined) {
          formData.append(key, profileData[key]);
        }
      });
      
      const response = await axios.post(
        'http://localhost:8000/api/auth/profile', 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      user.value = response.data;
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
      
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to update profile';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Initialize axios defaults if token exists
  if (token.value) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
  }

  // Set axios base URL
  axios.defaults.baseURL = 'http://localhost:8000/api';
  axios.defaults.withCredentials = true;

  return {
    // State
    user,
    token,
    isAuthenticated,
    loading,
    error,
    
    // Getters
    currentUser,
    isAdmin,
    isAuthor,
    
    // Actions
    login,
    register,
    logout,
    checkAuth,
    updateProfile,
    clearAuth
  };
});

export default useAuthStore;
