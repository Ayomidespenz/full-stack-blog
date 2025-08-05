<template>
  <div class="not-found-container">
    <div class="error-content text-center">
      <h1 class="display-1 text-primary">404</h1>
      <h2 class="mb-4">Oops! Page Not Found</h2>
      <p class="lead mb-4">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <router-link to="/" class="btn btn-primary btn-lg">
        <i class="bi bi-house-door me-2"></i>Back to Home
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView',
  metaInfo: {
    title: 'Page Not Found - Blog',
    meta: [
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  },
  mounted() {
    // Set status code for server-side rendering if needed
    if (typeof this.$ssrContext !== 'undefined') {
      this.$ssrContext.status = 404;
    }
  }
};
</script>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  padding: 2rem;
}

.error-content {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 0.5rem;
  background-color: var(--bs-light, #f8f9fa);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
}

.display-1 {
  font-size: 6rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: var(--bs-primary, #0d6efd);
}

h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--bs-dark, #212529);
}

.lead {
  font-size: 1.25rem;
  font-weight: 300;
  margin-bottom: 2rem;
  color: var(--bs-gray-700, #495057);
}

.btn-lg {
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  background-color: var(--bs-primary, #0d6efd);
  border-color: var(--bs-primary, #0d6efd);
}

.btn-primary:hover {
  background-color: var(--bs-primary-dark, #0b5ed7);
  border-color: var(--bs-primary-dark, #0a58ca);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(13, 110, 253, 0.25);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(13, 110, 253, 0.25);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .display-1 {
    font-size: 4.5rem;
  }
  
  h2 {
    font-size: 1.75rem;
  }
  
  .lead {
    font-size: 1.1rem;
  }
  
  .btn-lg {
    font-size: 1rem;
    padding: 0.65rem 1.25rem;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .error-content {
    background-color: var(--bs-dark, #212529);
    color: var(--bs-light, #f8f9fa);
  }
  
  h2 {
    color: var(--bs-light, #f8f9fa);
  }
  
  .lead {
    color: var(--bs-gray-300, #dee2e6);
  }
}
</style>
