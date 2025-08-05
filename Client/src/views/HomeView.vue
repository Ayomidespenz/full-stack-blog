<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero-section position-relative overflow-hidden">
      <div class="container py-7 py-lg-8 position-relative">
        <div class="row align-items-center min-vh-75 py-5">
          <div class="col-lg-6 pe-lg-5" data-aos="fade-right" data-aos-duration="1000">
            <span class="badge bg-primary bg-opacity-10 text-primary mb-3 px-3 py-2 fw-medium">Welcome to BlogSite</span>
            <h1 class="display-4 fw-bold mb-4">
              Share Your <span class="text-primary">Thoughts</span> With The World
            </h1>
            <p class="lead text-muted mb-4">
              Discover amazing content, share your thoughts, and connect with a community of passionate readers and writers. 
              Join thousands of others in exploring new ideas and perspectives.
            </p>
            <div class="d-flex flex-wrap gap-3 mb-4">
              <router-link to="/register" class="btn btn-primary btn-lg px-4 py-3 fw-medium">
                Get Started <i class="bi bi-arrow-right ms-2"></i>
              </router-link>
              <router-link to="/blog" class="btn btn-outline-primary btn-lg px-4 py-3 fw-medium">
                Read Blog
              </router-link>
            </div>
            <div class="d-flex align-items-center flex-wrap gap-4 mt-4">
              <div class="d-flex">
                <div class="avatar-group">
                  <img src="https://randomuser.me/api/portraits/women/43.jpg" class="avatar" alt="User">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" class="avatar" alt="User">
                  <img src="https://randomuser.me/api/portraits/women/28.jpg" class="avatar" alt="User">
                </div>
                <div class="ms-3">
                  <p class="mb-0 fw-medium">Join 10,000+ readers</p>
                  <div class="d-flex align-items-center">
                    <div class="text-warning small">
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                    </div>
                    <span class="ms-2 small text-muted">4.9/5 from 1.2k+ reviews</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 mt-5 mt-lg-0" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
            <div class="position-relative">
              <div class="hero-image-wrapper">
                <img src="@/assets/blog-hero.svg" alt="Blog illustration" class="img-fluid rounded-4 shadow-lg">
                <div class="floating-shape shape-1">
                  <img src="@/assets/blog-hero.svg" alt="Decoration" class="img-fluid">
                </div>
                <div class="floating-shape shape-2">
                  <img src="@/assets/blog-hero.svg" alt="Decoration" class="img-fluid">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-wave">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 0H1440V120C1440 120 1170 0 720 0C270 0 0 120 0 120V0Z" fill="#fff"/>
        </svg>
      </div>
    </section>

    <!-- Featured Posts -->
    <section class="featured-posts py-7 py-lg-8 bg-light">
      <div class="container position-relative">
        <div class="text-center mb-5" data-aos="fade-up">
          <span class="badge bg-primary bg-opacity-10 text-primary px-3 py-2 mb-3 fw-medium">Featured Content</span>
          <h2 class="fw-bold mb-3">Latest From Our Blog</h2>
          <p class="text-muted mx-auto" style="max-width: 600px;">
            Discover the most popular and trending articles from our community of expert writers.
          </p>
        </div>
        
        <div class="row g-4">
          <div v-for="(post, index) in featuredPosts" 
               :key="post.id" 
               class="col-xl-4 col-md-6"
               :data-aos="'fade-up'" 
               :data-aos-delay="(index * 100) + ''">
            <article class="card h-100 border-0 shadow-sm hover-lift overflow-hidden">
              <div class="position-relative overflow-hidden" style="height: 200px;">
                <img :src="post.image" class="card-img-top h-100 w-100" :alt="post.title" style="object-fit: cover;">
                <div class="position-absolute top-0 end-0 m-3">
                  <span class="badge bg-white text-primary">{{ post.category }}</span>
                </div>
                <div class="card-img-overlay d-flex align-items-end bg-gradient-overlay">
                  <div class="d-flex align-items-center text-white small">
                    <img :src="post.author?.avatar || 'https://ui-avatars.com/api/?name=' + (post.author?.name || 'User')" 
                         class="rounded-circle me-2" 
                         width="32" 
                         height="32" 
                         :alt="post.author?.name || 'Author'">
                    <span>{{ post.author?.name || 'Anonymous' }}</span>
                  </div>
                </div>
              </div>
              <div class="card-body p-4">
                <div class="d-flex align-items-center mb-3">
                  <span class="text-muted small">{{ formatDate(post.created_at) }}</span>
                  <span class="text-muted mx-2">•</span>
                  <span class="text-muted small">{{ post.reading_time || '5 min' }} read</span>
                </div>
                <h3 class="h5 card-title mb-3">
                  <router-link :to="`/blog/${post.slug}`" class="text-dark text-decoration-none hover-text-primary">
                    {{ post.title }}
                  </router-link>
                </h3>
                <p class="card-text text-muted mb-4">{{ post.excerpt || 'Read more about this interesting topic...' }}</p>
                <div class="d-flex align-items-center justify-content-between">
                  <router-link :to="`/blog/${post.slug}`" class="btn btn-link text-decoration-none p-0">
                    Read More <i class="bi bi-arrow-right ms-1"></i>
                  </router-link>
                  <div class="d-flex align-items-center">
                    <span class="text-muted me-2 small">{{ post.likes || 0 }}</span>
                    <i class="bi bi-heart text-muted"></i>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
        
        <div class="text-center mt-5 pt-3" data-aos="fade-up" data-aos-delay="200">
          <router-link to="/blog" class="btn btn-outline-primary px-4 py-3">
            View All Articles <i class="bi bi-arrow-right ms-2"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter py-7 py-lg-8 position-relative overflow-hidden bg-primary text-white">
      <div class="container position-relative">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center" data-aos="fade-up">
            <span class="badge bg-white text-primary px-3 py-2 mb-3 fw-medium">Stay Updated</span>
            <h2 class="fw-bold mb-3">Subscribe to Our Newsletter</h2>
            <p class="lead mb-5 mx-auto" style="max-width: 600px;">
              Get the latest articles, news and updates delivered straight to your inbox. No spam, we promise!
            </p>
            
            <form @submit.prevent="subscribeNewsletter" class="newsletter-form mx-auto" style="max-width: 600px;" data-aos="fade-up" data-aos-delay="100">
              <div class="input-group input-group-lg mb-3">
                <input 
                  type="email" 
                  v-model="email" 
                  class="form-control form-control-lg border-0 py-3 px-4" 
                  placeholder="Enter your email address"
                  required
                  aria-label="Your email address"
                >
                <button type="submit" class="btn btn-light text-primary fw-medium px-4">
                  Subscribe <i class="bi bi-arrow-right ms-2"></i>
                </button>
              </div>
              <small class="text-white-50 d-block mt-2">
                <i class="bi bi-lock-fill me-1"></i> We respect your privacy. Unsubscribe at any time.
              </small>
            </form>
            
            <div class="d-flex flex-wrap justify-content-center gap-3 mt-5 pt-3" data-aos="fade-up" data-aos-delay="200">
              <div class="d-flex align-items-center">
                <div class="bg-white bg-opacity-10 p-2 rounded-circle me-3">
                  <i class="bi bi-envelope-check-fill text-white"></i>
                </div>
                <div class="text-start">
                  <h6 class="mb-0 fw-medium">Weekly Digest</h6>
                  <small class="text-white-50">Get the best content weekly</small>
                </div>
              </div>
              <div class="d-flex align-items-center">
                <div class="bg-white bg-opacity-10 p-2 rounded-circle me-3">
                  <i class="bi bi-shield-check text-white"></i>
                </div>
                <div class="text-start">
                  <h6 class="mb-0 fw-medium">No Spam</h6>
                  <small class="text-white-50">Quality content only</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="position-absolute bottom-0 start-0 w-100">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 0H1440V120C1440 120 1170 0 720 0C270 0 0 120 0 120V0Z" fill="#fff"/>
        </svg>
      </div>
    </section>

    <!-- Categories -->
    <section class="categories py-7 py-lg-8">
      <div class="container">
        <div class="text-center mb-5" data-aos="fade-up">
          <span class="badge bg-primary bg-opacity-10 text-primary px-3 py-2 mb-3 fw-medium">Categories</span>
          <h2 class="fw-bold mb-3">Explore by Topic</h2>
          <p class="text-muted mx-auto" style="max-width: 600px;">
            Discover content organized by categories that matter to you. Dive deeper into your interests.
          </p>
        </div>
        
        <div class="row g-4">
          <div v-for="(category, index) in categories" 
               :key="category.id" 
               class="col-xl-3 col-md-6"
               :data-aos="'fade-up'" 
               :data-aos-delay="(index * 100) + ''">
            <div class="card h-100 border-0 shadow-sm hover-lift overflow-hidden transition-all">
              <div class="card-body p-5 text-center">
                <div class="icon-xl bg-primary bg-opacity-10 text-primary rounded-4 d-inline-flex align-items-center justify-content-center mb-4" 
                     style="width: 80px; height: 80px;">
                  <i :class="[category.icon, 'fs-3']"></i>
                </div>
                <h3 class="h5 mb-2">{{ category.name }}</h3>
                <p class="text-muted mb-3">{{ category.description || 'Explore related content' }}</p>
                <div class="d-flex align-items-center justify-content-center text-primary fw-medium">
                  <span class="small">{{ category.count || 0 }} Articles</span>
                  <i class="bi bi-arrow-right ms-2 transition-transform"></i>
                </div>
              </div>
              <router-link :to="'/blog?category=' + (category.slug || category.id)" class="stretched-link"></router-link>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-5 pt-3" data-aos="fade-up" data-aos-delay="100">
          <router-link to="/blog" class="btn btn-outline-primary px-4 py-3">
            View All Categories <i class="bi bi-arrow-right ms-2"></i>
          </router-link>
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
/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;
  overflow: hidden;
  padding: 6rem 0;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 60%;
  height: 100%;
  background: url('@/assets/blog-hero.svg') no-repeat center right/contain;
  opacity: 0.05;
  z-index: 0;
}

.hero-image-wrapper {
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
}

.hero-image-wrapper:hover {
  transform: translateY(-5px);
}

/* Floating Shapes Animation */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

/* Card Hover Effects */
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.075) !important;
}

/* Icons */
.icon-lg, .icon-xl {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.icon-lg {
  width: 4rem;
  height: 4rem;
  font-size: 1.5rem;
}

.icon-xl {
  width: 5rem;
  height: 5rem;
  font-size: 2rem;
}

/* Cards */
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.075) !important;
}

/* Avatar Group */
.avatar-group {
  display: flex;
  margin-right: 0.75rem;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #fff;
  margin-left: -12px;
  transition: transform 0.2s ease;
}

.avatar:first-child {
  margin-left: 0;
}

.avatar:hover {
  transform: translateY(-3px);
  z-index: 1;
}

/* Newsletter Section */
.newsletter {
  position: relative;
  background: linear-gradient(135deg, #4361ee 0%, #3f37c9 100%);
  overflow: hidden;
}

.newsletter::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('@/assets/blog-hero.svg') repeat;
  opacity: 0.1;
  z-index: 0;
}

.newsletter .form-control {
  border: none;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.newsletter .form-control:focus {
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

/* Category Card Hover */
.card:hover .icon-xl {
  transform: scale(1.1);
  background-color: var(--primary-color) !important;
  color: white !important;
}

.card:hover .transition-transform {
  transform: translateX(5px);
}

/* Responsive Adjustments */
@media (max-width: 991.98px) {
  .hero-section {
    text-align: center;
    padding: 5rem 0;
  }
  
  .hero-section::before {
    width: 100%;
    opacity: 0.03;
  }
  
  .hero-section .btn {
    display: block;
    width: 100%;
    margin-bottom: 0.5rem;
  }
  
  .hero-section .d-flex {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (max-width: 767.98px) {
  .hero-section {
    padding: 4rem 0;
  }
  
  h1.display-4 {
    font-size: 2.5rem;
  }
  
  .newsletter .input-group {
    flex-direction: column;
  }
  
  .newsletter .btn {
    width: 100%;
    margin-top: 1rem;
  }
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Hover Effects */
.hover-text-primary:hover {
  color: var(--primary-color) !important;
}

.transition-all {
  transition: all 0.3s ease;
}
</style>
