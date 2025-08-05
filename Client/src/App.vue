<template>
  <div class="app-container d-flex flex-column min-vh-100">
    <!-- Navigation Bar -->
    <NavBar />
    
    <!-- Main Content -->
    <main class="flex-grow-1 py-4">
      <div class="container">
        <!-- Flash Messages -->
        <div v-if="flashMessage.message" 
             :class="['alert', 'alert-dismissible', 'fade', 'show', `alert-${flashMessage.type}`]" 
             role="alert">
          {{ flashMessage.message }}
          <button type="button" class="btn-close" @click="clearFlashMessage" aria-label="Close"></button>
        </div>
        
        <!-- Router View -->
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" :key="$route.fullPath" />
          </transition>
        </router-view>
      </div>
    </main>
    
    <!-- Footer -->
    <footer class="bg-dark text-white py-4 mt-auto">
      <div class="container">
        <div class="row">
          <div class="col-md-6 text-center text-md-start">
            <h5>BlogSite</h5>
            <p class="mb-0">Sharing knowledge and stories that matter.</p>
          </div>
          <div class="col-md-6 mt-3 mt-md-0 text-center text-md-end">
            <div class="social-links mb-3">
              <a href="#" class="text-white me-3"><i class="bi bi-facebook"></i></a>
              <a href="#" class="text-white me-3"><i class="bi bi-twitter"></i></a>
              <a href="#" class="text-white me-3"><i class="bi bi-instagram"></i></a>
              <a href="#" class="text-white"><i class="bi bi-github"></i></a>
            </div>
            <p class="mb-0">&copy; {{ new Date().getFullYear() }} BlogSite. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import NavBar from '@/components/layout/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar
  },
  setup() {
    const route = useRoute();
    const authStore = useAuthStore();
    const flashMessage = ref({ message: '', type: 'info' });
    
    // Check authentication status on app load
    onMounted(async () => {
      try {
        await authStore.checkAuth();
      } catch (error) {
        console.error('Authentication check failed:', error);
      }
    });
    
    // Watch for route changes to handle flash messages
    watch(() => route.query, (newQuery) => {
      if (newQuery.message) {
        flashMessage.value = {
          message: newQuery.message,
          type: newQuery.type || 'info'
        };
        
        // Clear the flash message after 5 seconds
        setTimeout(() => {
          clearFlashMessage();
        }, 5000);
      }
    }, { immediate: true });
    
    const clearFlashMessage = () => {
      flashMessage.value = { message: '', type: 'info' };
      // Remove query params without refreshing the page
      if (route.query.message || route.query.type) {
        const query = { ...route.query };
        delete query.message;
        delete query.type;
        window.history.replaceState({}, '', { ...route, query });
      }
    };
    
    return {
      flashMessage,
      clearFlashMessage
    };
  }
};
</script>

<style>
/* Base Styles */
:root {
  --primary-color: #0d6efd;
  --secondary-color: #6c757d;
  --success-color: #198754;
  --danger-color: #dc3545;
  --warning-color: #ffc107;
  --light-color: #f8f9fa;
  --dark-color: #212529;
}

/* Global Styles */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #212529;
  line-height: 1.6;
  background-color: #f8f9fa;
}

/* Layout */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Flash Messages */
.alert {
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.alert-success {
  background-color: #d1e7dd;
  color: #0f5132;
}

.alert-danger {
  background-color: #f8d7da;
  color: #842029;
}

.alert-warning {
  background-color: #fff3cd;
  color: #664d03;
}

.alert-info {
  background-color: #cff4fc;
  color: #055160;
}

/* Buttons */
.btn {
  font-weight: 500;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  transition: all 0.2s ease-in-out;
}

/* Links */
a {
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}

a:hover {
  text-decoration: none;
}

/* Container */
.container {
  max-width: 1200px;
  padding: 0 1.5rem;
}

/* Footer */
footer {
  background-color: var(--dark-color);
  color: rgba(255, 255, 255, 0.8);
  padding: 2rem 0;
  margin-top: 3rem;
}

footer a {
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.2s ease;
}

footer a:hover {
  color: white;
  text-decoration: none;
}

.social-links a {
  display: inline-block;
  width: 36px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  margin-right: 0.5rem;
  transition: all 0.3s ease;
}

.social-links a:hover {
  background-color: var(--primary-color);
  transform: translateY(-3px);
}

/* Responsive Adjustments */
@media (max-width: 767.98px) {
  .container {
    padding: 0 1rem;
  }
  
  footer {
    text-align: center;
  }
  
  .social-links {
    justify-content: center;
    margin-bottom: 1rem;
  }
}

/* Custom button styles */
.btn-primary {
  background-color: #4e73df;
  border-color: #4e73df;
}

.btn-primary:hover {
  background-color: #2e59d9;
  border-color: #2653d4;
}
</style>
