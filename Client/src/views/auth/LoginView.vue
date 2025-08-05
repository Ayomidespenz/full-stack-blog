<template>
  <div class="auth-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <div class="card">
            <div class="card-body p-4">
              <h2 class="text-center mb-4">Sign In</h2>
              
              <form @submit.prevent="handleLogin">
                <div v-if="error" class="alert alert-danger">
                  {{ error }}
                </div>
                
                <div class="mb-3">
                  <label for="email" class="form-label">Email Address</label>
                  <input 
                    type="email" 
                    class="form-control" 
                    id="email" 
                    v-model="form.email"
                    required
                    autofocus
                  >
                </div>
                
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="password" 
                    v-model="form.password"
                    required
                  >
                </div>
                
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <div class="form-check">
                    <input 
                      type="checkbox" 
                      class="form-check-input" 
                      id="remember"
                      v-model="form.remember"
                    >
                    <label class="form-check-label" for="remember">Remember Me</label>
                  </div>
                  <router-link to="/forgot-password" class="text-decoration-none">
                    Forgot Password?
                  </router-link>
                </div>
                
                <button 
                  type="submit" 
                  class="btn btn-primary w-100 py-2 mb-3"
                  :disabled="loading"
                >
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {{ loading ? 'Signing In...' : 'Sign In' }}
                </button>
                
                <div class="text-center">
                  <span class="text-muted">Don't have an account? </span>
                  <router-link to="/register" class="text-decoration-none">
                    Sign Up
                  </router-link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

export default {
  name: 'LoginView',
  
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    
    const form = ref({
      email: '',
      password: '',
      remember: false
    });
    
    const loading = ref(false);
    const error = ref(null);
    
    const handleLogin = async () => {
      try {
        loading.value = true;
        error.value = null;
        
        await authStore.login({
          email: form.value.email,
          password: form.value.password,
          remember: form.value.remember
        });
        
        // Redirect to intended route or home
        const redirectTo = router.currentRoute.value.query.redirect || '/';
        router.push(redirectTo);
        
      } catch (err) {
        error.value = err.response?.data?.message || 'Invalid login credentials';
      } finally {
        loading.value = false;
      }
    };
    
    return {
      form,
      loading,
      error,
      handleLogin
    };
  }
};
</script>

<style scoped>
.auth-page {
  padding: 100px 0;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.card {
  border: none;
  border-radius: 10px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
}

.form-control:focus {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.15);
}

.btn-primary {
  background-color: #0d6efd;
  border: none;
  font-weight: 500;
}

.btn-primary:hover {
  background-color: #0b5ed7;
}

a {
  color: #0d6efd;
}

a:hover {
  color: #0a58ca;
}
</style>
