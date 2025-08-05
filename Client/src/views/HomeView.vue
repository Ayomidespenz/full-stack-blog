<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero-section py-5 bg-light">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="display-4 fw-bold mb-4">Welcome to BlogSite</h1>
            <p class="lead mb-4">Discover amazing content, share your thoughts, and connect with a community of readers and writers.</p>
            <div class="d-flex gap-3">
              <router-link to="/register" class="btn btn-primary btn-lg px-4">Get Started</router-link>
              <router-link to="/blog" class="btn btn-outline-secondary btn-lg px-4">Read Blog</router-link>
            </div>
          </div>
          <div class="col-lg-6 d-none d-lg-block">
            <img src="@/assets/blog-hero.svg" alt="Blog illustration" class="img-fluid">
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Posts -->
    <section class="featured-posts py-5">
      <div class="container">
        <h2 class="text-center mb-5">Featured Posts</h2>
        <div class="row g-4">
          <div v-for="post in featuredPosts" :key="post.id" class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <img :src="post.image" class="card-img-top" :alt="post.title">
              <div class="card-body">
                <div class="d-flex gap-2 mb-2">
                  <span class="badge bg-primary">{{ post.category }}</span>
                  <small class="text-muted">{{ formatDate(post.created_at) }}</small>
                </div>
                <h5 class="card-title">{{ post.title }}</h5>
                <p class="card-text text-muted">{{ post.excerpt }}</p>
                <router-link :to="`/blog/${post.slug}`" class="btn btn-link px-0">Read More →</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-5">
          <router-link to="/blog" class="btn btn-outline-primary">View All Posts</router-link>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter py-5 bg-light">
      <div class="container text-center">
        <h2 class="mb-4">Subscribe to Our Newsletter</h2>
        <p class="text-muted mb-4">Get the latest posts delivered right to your inbox.</p>
        <div class="row justify-content-center">
          <div class="col-md-6">
            <form @submit.prevent="subscribeNewsletter" class="d-flex gap-2">
              <input 
                type="email" 
                v-model="email" 
                class="form-control form-control-lg" 
                placeholder="Enter your email"
                required
              >
              <button type="submit" class="btn btn-primary btn-lg">Subscribe</button>
            </form>
            <small class="text-muted d-block mt-2">We'll never share your email with anyone else.</small>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="categories py-5">
      <div class="container">
        <h2 class="text-center mb-5">Browse by Category</h2>
        <div class="row g-4">
          <div v-for="category in categories" :key="category.id" class="col-6 col-md-3">
            <div class="card h-100 border-0 shadow-sm hover-lift">
              <div class="card-body text-center">
                <div class="icon-lg bg-primary bg-opacity-10 text-primary rounded-circle mb-3 mx-auto">
                  <i :class="category.icon"></i>
                </div>
                <h5 class="h6 mb-0">{{ category.name }}</h5>
                <small class="text-muted">{{ category.count }} posts</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      email: '',
      featuredPosts: [
        {
          id: 1,
          title: 'Getting Started with Vue 3',
          excerpt: 'Learn the basics of Vue 3 and how to build your first application.',
          category: 'Vue.js',
          created_at: '2023-06-15',
          slug: 'getting-started-with-vue-3',
          image: 'https://via.placeholder.com/400x225/4e73df/ffffff?text=Vue+3'
        },
        {
          id: 2,
          title: 'Laravel 10 New Features',
          excerpt: 'Explore the latest features and improvements in Laravel 10.',
          category: 'Laravel',
          created_at: '2023-06-10',
          slug: 'laravel-10-new-features',
          image: 'https://via.placeholder.com/400x225/ff2d20/ffffff?text=Laravel+10'
        },
        {
          id: 3,
          title: 'Responsive Design Best Practices',
          excerpt: 'Tips and tricks for creating beautiful responsive websites.',
          category: 'Web Design',
          created_at: '2023-06-05',
          slug: 'responsive-design-best-practices',
          image: 'https://via.placeholder.com/400x225/6f42c1/ffffff?text=Responsive+Design'
        }
      ],
      categories: [
        { id: 1, name: 'Technology', count: 24, icon: 'bi bi-laptop' },
        { id: 2, name: 'Web Development', count: 18, icon: 'bi bi-code-square' },
        { id: 3, name: 'Design', count: 15, icon: 'bi bi-brush' },
        { id: 4, name: 'Lifestyle', count: 12, icon: 'bi bi-heart' }
      ]
    };
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    subscribeNewsletter() {
      // TODO: Implement newsletter subscription
      alert(`Thank you for subscribing with ${this.email}!`);
      this.email = '';
    }
  }
};
</script>

<style scoped>
.hero-section {
  padding: 5rem 0;
}

.hover-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1) !important;
}

.icon-lg {
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1) !important;
}
</style>
