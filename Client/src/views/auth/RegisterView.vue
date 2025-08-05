<template>
  <div class="auth-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card">
            <div class="card-body p-4">
              <h2 class="text-center mb-4">Create an Account</h2>
              
              <form @submit.prevent="handleRegister">
                <div v-if="error" class="alert alert-danger">
                  {{ error }}
                </div>
                
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="name" class="form-label">Full Name</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="name" 
                      v-model="form.name"
                      required
                      autofocus
                    >
                  </div>
                  
                  <div class="col-md-6 mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="username" 
                      v-model="form.username"
                      required
                    >
                  </div>
                </div>
                
                <div class="mb-3">
                  <label for="email" class="form-label">Email Address</label>
                  <input 
                    type="email" 
                    class="form-control" 
                    id="email" 
                    v-model="form.email"
                    required
                  >
                </div>
                
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input 
                      type="password" 
                      class="form-control" 
                      id="password" 
                      v-model="form.password"
                      required
                    >
                    <div class="form-text">At least 8 characters</div>
                  </div>
                  
                  <div class="col-md-6 mb-3">
                    <label for="password_confirmation" class="form-label">Confirm Password</label>
                    <input 
                      type="password" 
                      class="form-control" 
                      id="password_confirmation" 
                      v-model="form.password_confirmation"
                      required
                    >
                  </div>
                </div>
                
                <div class="form-check mb-4">
                  <input 
                    type="checkbox" 
                    class="form-check-input" 
                    id="terms"
                    v-model="form.terms"
                    required
                  >
                  <label class="form-check-label" for="terms">
                    I agree to the <a href="#" class="text-decoration-none">Terms of Service</a> and 
                    <a href="#" class="text-decoration-none">Privacy Policy</a>
                  </label>
                </div>
                
                <button 
                  type="submit" 
                  class="btn btn-primary w-100 py-2 mb-3"
                  :disabled="loading"
                >
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {{ loading ? 'Creating Account...' : 'Create Account' }}
                </button>
                
                <div class="text-center">
                  <span class="text-muted">Already have an account? </span>
                  <router-link to="/login" class="text-decoration-none">
                    Sign In
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
  name: 'RegisterView',
  
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    
    const form = ref({
      name: '',
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      terms: false
    });
    
    const loading = ref(false);
    const error = ref(null);
    
    const handleRegister = async () => {
      try {
        loading.value = true;
        error.value = null;
        
        // Prepare the registration data
        const registrationData = {
          name: form.value.name,
          username: form.value.username,
          email: form.value.email,
          password: form.value.password,
          password_confirmation: form.value.password_confirmation,
          terms: form.value.terms
        };
        
        // Log the registration data for debugging
        console.log('Registration data:', registrationData);
        
        // Call the auth store's register method
        await authStore.register(registrationData);
        
        // Redirect to home after successful registration
        router.push('/');
        
      } catch (err) {
        console.error('Registration error:', err);
        error.value = err.response?.data?.message || err.message || 'Registration failed. Please try again.';
      } finally {
        loading.value = false;
      }
    };
    
    return {
      form,
      loading,
      error,
      handleRegister
    };
  }
};
</script>

<style scoped>
.auth-page {
  padding: 80px 0;
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

.form-text {
  font-size: 0.8rem;
  color: #6c757d;
}
</style>
