<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <router-link class="navbar-brand" to="/">BlogSite</router-link>
      
      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/blog">Blog</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact">Contact</router-link>
          </li>
          
          <!-- Admin Dropdown -->
          <li v-if="isAuthenticated && isAdmin" class="nav-item dropdown">
            <a 
              class="nav-link dropdown-toggle" 
              href="#" 
              id="adminDropdown" 
              role="button" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              Admin
            </a>
            <ul class="dropdown-menu" aria-labelledby="adminDropdown">
              <li>
                <router-link class="dropdown-item" to="/admin/dashboard">Dashboard</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/admin/posts">Manage Posts</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/admin/users">Manage Users</router-link>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <router-link class="dropdown-item" to="/admin/settings">Settings</router-link>
              </li>
            </ul>
          </li>
        </ul>
        
        <!-- Right-aligned navigation items -->
        <ul v-if="!isAuthenticated" class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/register">Register</router-link>
          </li>
        </ul>
        
        <!-- User Dropdown -->
        <div v-else class="dropdown">
          <a 
            href="#" 
            class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" 
            id="userDropdown" 
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img 
              v-if="user.avatar_url" 
              :src="user.avatar_url" 
              alt="User Avatar" 
              width="32" 
              height="32" 
              class="rounded-circle me-2"
            >
            <span v-else class="user-avatar me-2">
              {{ userInitials }}
            </span>
            {{ user.name }}
          </a>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
            <li>
              <router-link class="dropdown-item" to="/profile">
                <i class="bi bi-person me-2"></i>Profile
              </router-link>
            </li>
            <li v-if="isAuthor">
              <router-link class="dropdown-item" to="/my-posts">
                <i class="bi bi-file-earmark-post me-2"></i>My Posts
              </router-link>
            </li>
            <li><hr class="dropdown-divider"></li>
            <li>
              <a href="#" class="dropdown-item" @click="handleLogout">
                <i class="bi bi-box-arrow-right me-2"></i>Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

export default {
  name: 'NavBar',
  
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    
    const user = computed(() => authStore.user);
    const isAuthenticated = computed(() => authStore.isAuthenticated);
    const isAdmin = computed(() => authStore.isAdmin);
    const isAuthor = computed(() => authStore.isAuthor);
    
    const userInitials = computed(() => {
      if (!authStore.user?.name) return 'U';
      return authStore.user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    });
    
    const handleLogout = async () => {
      try {
        await authStore.logout();
        router.push('/');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };
    
    return {
      user,
      isAuthenticated,
      isAdmin,
      isAuthor,
      userInitials,
      handleLogout
    };
  }
};
</script>

<style scoped>
.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0.8rem 0;
}

.navbar-brand {
  font-weight: 700;
  font-size: 1.5rem;
}

.nav-link {
  font-weight: 500;
  padding: 0.5rem 1rem !important;
  transition: color 0.2s;
}

.nav-link:hover, .nav-link:focus {
  color: rgba(255, 255, 255, 0.9) !important;
}

.dropdown-menu {
  border: none;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  padding: 0.5rem 0;
  margin-top: 0.5rem;
}

.dropdown-item {
  padding: 0.5rem 1.5rem;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.dropdown-item:hover, .dropdown-item:focus {
  background-color: #f8f9fa;
  color: #0d6efd;
}

.dropdown-divider {
  margin: 0.5rem 0;
}

.user-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: #6c757d;
  color: white;
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: 600;
}

/* Active link styles */
.router-link-active,
.router-link-exact-active {
  color: rgba(255, 255, 255, 0.9) !important;
  font-weight: 600;
  position: relative;
}

.router-link-active::after,
.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 1rem;
  right: 1rem;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 3px;
}

/* Responsive adjustments */
@media (max-width: 991.98px) {
  .navbar-collapse {
    padding: 1rem 0;
  }
  
  .dropdown-menu {
    box-shadow: none;
    border: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  .dropdown-item {
    padding: 0.5rem 1rem;
  }
  
  .router-link-active::after,
  .router-link-exact-active::after {
    display: none;
  }
}
</style>
