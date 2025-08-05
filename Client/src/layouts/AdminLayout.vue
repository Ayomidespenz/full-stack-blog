<template>
  <div class="admin-layout">
    <!-- Top Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/admin">
          <i class="bi bi-speedometer2 me-2"></i>
          Admin Panel
        </router-link>
        <button 
          class="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#adminNavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="adminNavbar">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/admin">
                <i class="bi bi-speedometer2 me-1"></i> Dashboard
              </router-link>
            </li>
            <li class="nav-item dropdown">
              <a 
                class="nav-link dropdown-toggle" 
                href="#" 
                id="postsDropdown" 
                role="button" 
                data-bs-toggle="dropdown"
              >
                <i class="bi bi-file-earmark-post me-1"></i> Posts
              </a>
              <ul class="dropdown-menu">
                <li>
                  <router-link class="dropdown-item" to="/admin/posts">
                    <i class="bi bi-list-ul me-2"></i>All Posts
                  </router-link>
                </li>
                <li>
                  <router-link class="dropdown-item" to="/admin/posts/create">
                    <i class="bi bi-plus-circle me-2"></i>Add New
                  </router-link>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <router-link class="dropdown-item" to="/admin/categories">
                    <i class="bi bi-tags me-2"></i>Categories
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/users">
                <i class="bi bi-people me-1"></i> Users
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/settings">
                <i class="bi bi-gear me-1"></i> Settings
              </router-link>
            </li>
          </ul>
          <div class="d-flex align-items-center">
            <div class="dropdown">
              <a 
                href="#" 
                class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" 
                id="userDropdown" 
                data-bs-toggle="dropdown"
              >
                <img 
                  src="https://ui-avatars.com/api/?name=Admin+User&background=0D6EFD&color=fff" 
                  alt="Admin" 
                  width="32" 
                  height="32" 
                  class="rounded-circle me-2"
                >
                <span class="d-none d-md-inline">Admin User</span>
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <router-link class="dropdown-item" to="/">
                    <i class="bi bi-house-door me-2"></i>View Site
                  </router-link>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <a class="dropdown-item" href="#" @click="logout">
                    <i class="bi bi-box-arrow-right me-2"></i>Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="container-fluid">
      <div class="row">
        <!-- Sidebar -->
        <aside class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
          <div class="position-sticky pt-3">
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Dashboard</span>
            </h6>
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link class="nav-link" to="/admin">
                  <i class="bi bi-speedometer2 me-2"></i> Overview
                </router-link>
              </li>
            </ul>

            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Content</span>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/posts">
                  <i class="bi bi-file-earmark-post me-2"></i> Posts
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/categories">
                  <i class="bi bi-tags me-2"></i> Categories
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/media">
                  <i class="bi bi-images me-2"></i> Media Library
                </router-link>
              </li>
            </ul>

            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Users & Settings</span>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/users">
                  <i class="bi bi-people me-2"></i> Users
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/settings">
                  <i class="bi bi-gear me-2"></i> Settings
                </router-link>
              </li>
            </ul>
          </div>
        </aside>

        <!-- Main Content Area -->
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
          <!-- Page Header -->
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">{{ pageTitle }}</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
              <slot name="header-actions">
                <!-- Default header actions can go here -->
              </slot>
            </div>
          </div>
          
          <!-- Page Content -->
          <div class="container-fluid p-0">
            <slot></slot>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminLayout',
  props: {
    pageTitle: {
      type: String,
      default: 'Dashboard'
    }
  },
  methods: {
    logout() {
      // TODO: Implement logout logic
      console.log('Logout clicked');
      // Example: this.$store.dispatch('auth/logout');
      // this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.sidebar {
  position: fixed;
  top: 56px; /* Height of navbar */
  bottom: 0;
  left: 0;
  z-index: 100;
  padding: 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
  overflow-y: auto;
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
  padding: 0.75rem 1rem;
  border-left: 3px solid transparent;
}

.sidebar .nav-link.router-link-exact-active {
  color: #0d6efd;
  background-color: #e7f1ff;
  border-left: 3px solid #0d6efd;
}

.sidebar .nav-link:hover {
  color: #0a58ca;
  background-color: #f8f9fa;
}

.sidebar .nav-link i {
  width: 20px;
  text-align: center;
}

.sidebar-heading {
  font-size: .75rem;
  text-transform: uppercase;
  letter-spacing: .1em;
}

main {
  margin-top: 56px; /* Height of navbar */
  padding-top: 1rem;
}

.navbar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
}

/* Responsive adjustments */
@media (max-width: 767.98px) {
  .sidebar {
    top: 56px;
    padding: 0;
  }
  
  main {
    padding: 1rem;
  }
}
</style>
