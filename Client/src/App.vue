<template>
  <div class="app-container d-flex flex-column min-vh-100">
    <!-- Navigation Bar -->
    <NavBar />
    
    <!-- Main Content -->
    <main class="flex-grow-1 py-4 py-md-5">
      <div class="container">
        <!-- Flash Messages -->
        <transition name="slide-down">
          <div v-if="flashMessage.message" 
              :class="['alert', 'alert-dismissible', 'fade', 'show', `alert-${flashMessage.type}`, 'shadow-sm', 'mb-4']" 
              role="alert">
            <div class="d-flex align-items-center">
              <i v-if="flashMessage.type === 'success'" class="bi bi-check-circle-fill me-2"></i>
              <i v-else-if="flashMessage.type === 'danger'" class="bi bi-exclamation-triangle-fill me-2"></i>
              <i v-else class="bi bi-info-circle-fill me-2"></i>
              <span>{{ flashMessage.message }}</span>
              <button type="button" class="btn-close ms-auto" @click="clearFlashMessage" aria-label="Close"></button>
            </div>
          </div>
        </transition>
        
        <!-- Router View -->
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" :key="$route.fullPath" />
          </transition>
        </router-view>
      </div>
    </main>
    
    <!-- Footer -->
    <footer class="footer bg-dark text-white py-5 mt-auto">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-4">
            <h5 class="text-white mb-4">BlogSite</h5>
            <p class="text-muted">Sharing knowledge, stories, and insights that inspire and inform our community of readers and writers.</p>
            <div class="social-links mt-4">
              <a href="#" class="text-white me-3" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
              <a href="#" class="text-white me-3" aria-label="Twitter"><i class="bi bi-twitter"></i></a>
              <a href="#" class="text-white me-3" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
              <a href="#" class="text-white me-3" aria-label="GitHub"><i class="bi bi-github"></i></a>
              <a href="#" class="text-white" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
            </div>
          </div>
          <div class="col-md-4 col-lg-2">
            <h6 class="text-uppercase text-white mb-4">Quick Links</h6>
            <ul class="list-unstyled">
              <li class="mb-2"><router-link to="/" class="text-muted text-decoration-none hover-text-white">Home</router-link></li>
              <li class="mb-2"><router-link to="/blog" class="text-muted text-decoration-none hover-text-white">Blog</router-link></li>
              <li class="mb-2"><router-link to="/about" class="text-muted text-decoration-none hover-text-white">About</router-link></li>
              <li class="mb-2"><router-link to="/contact" class="text-muted text-decoration-none hover-text-white">Contact</router-link></li>
            </ul>
          </div>
          <div class="col-md-4 col-lg-3">
            <h6 class="text-uppercase text-white mb-4">Categories</h6>
            <ul class="list-unstyled">
              <li class="mb-2"><a href="#" class="text-muted text-decoration-none hover-text-white">Technology</a></li>
              <li class="mb-2"><a href="#" class="text-muted text-decoration-none hover-text-white">Programming</a></li>
              <li class="mb-2"><a href="#" class="text-muted text-decoration-none hover-text-white">Design</a></li>
              <li class="mb-2"><a href="#" class="text-muted text-decoration-none hover-text-white">Productivity</a></li>
            </ul>
          </div>
          <div class="col-md-4 col-lg-3">
            <h6 class="text-uppercase text-white mb-4">Newsletter</h6>
            <p class="text-muted">Subscribe to our newsletter for the latest updates.</p>
            <div class="input-group mb-3">
              <input type="email" class="form-control form-control-sm bg-dark border-secondary text-white" placeholder="Your email" aria-label="Your email">
              <button class="btn btn-primary btn-sm" type="button">Subscribe</button>
            </div>
          </div>
        </div>
        <hr class="my-4 border-secondary">
        <div class="row align-items-center">
          <div class="col-md-6 text-center text-md-start">
            <p class="mb-0 text-muted small">&copy; {{ new Date().getFullYear() }} BlogSite. All rights reserved.</p>
          </div>
          <div class="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <p class="mb-0 text-muted small">
              <a href="#" class="text-muted text-decoration-none me-3">Privacy Policy</a>
              <a href="#" class="text-muted text-decoration-none me-3">Terms of Service</a>
              <a href="#" class="text-muted text-decoration-none">Sitemap</a>
            </p>
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
  --gray-color: #6c757d;
  --light-gray: #e9ecef;
  --border-radius: 0.5rem;
  --box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
  --transition: all 0.3s ease;
}

/* Custom Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease-out;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Flash Messages */
.alert {
  border: none;
  border-left: 4px solid transparent;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.05);
  padding: 1rem 1.25rem;
}

.alert-success {
  background-color: #f0fdf4;
  color: #166534;
  border-left-color: #22c55e;
}

.alert-danger {
  background-color: #fef2f2;
  color: #991b1b;
  border-left-color: #ef4444;
}

.alert-info {
  background-color: #eff6ff;
  color: #1e40af;
  border-left-color: #3b82f6;
}

.alert-warning {
  background-color: #fffbeb;
  color: #92400e;
  border-left-color: #f59e0b;
}

/* Footer Styles */
.footer {
  background-color: #111827;
  position: relative;
  overflow: hidden;
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
