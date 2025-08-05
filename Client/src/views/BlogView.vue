<template>
  <div class="blog-view">
    <!-- Page Header -->
    <header class="page-header">
      <div class="container position-relative">
        <div class="row justify-content-center">
          <div class="col-lg-10 col-xl-8 text-center" data-aos="fade-up">
            <h1 class="display-5 fw-bold mb-3">Blog & Articles</h1>
            <p class="lead text-muted mb-4">Discover the latest articles, tutorials, and insights from our community of writers and experts.</p>
            
            <!-- Search Form -->
            <form class="search-form position-relative mb-4" @submit.prevent="searchPosts" data-aos="fade-up" data-aos-delay="100">
              <input 
                type="text" 
                v-model="searchQuery" 
                class="form-control form-control-lg shadow-sm" 
                placeholder="Search articles, tutorials, and more..."
              >
              <button class="btn btn-primary" type="submit">
                <i class="bi bi-search"></i>
              </button>
            </form>
            
            <!-- Category Filter -->
            <div class="d-flex flex-wrap justify-content-center gap-2" data-aos="fade-up" data-aos-delay="150">
              <button 
                v-for="category in categories" 
                :key="category.id"
                @click="filterByCategory(category.id)"
                class="btn btn-category"
                :class="{ 'btn-primary': activeCategory === category.id, 'btn-outline-primary': activeCategory !== category.id }"
              >
                {{ category.name }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="container py-5">
      <div class="row g-5">
        <!-- Blog Posts -->
        <div class="col-lg-8">
          <!-- Featured Post (First Post) -->
          <div v-if="posts.length > 0" class="card featured-post hover-lift overflow-hidden mb-5" data-aos="fade-up">
            <div class="row g-0">
              <div class="col-md-5 position-relative">
                <img :src="posts[0].image" class="img-fluid h-100 w-100" :alt="posts[0].title" style="object-fit: cover; min-height: 300px;">
                <div class="position-absolute top-0 start-0 w-100 h-100 bg-gradient-overlay d-flex align-items-end">
                  <div class="p-4 text-white">
                    <div class="d-flex align-items-center mb-2">
                      <span class="badge bg-white text-primary me-2">{{ posts[0].category }}</span>
                      <small class="text-white-50">{{ formatDate(posts[0].created_at) }}</small>
                    </div>
                    <h2 class="h3 mb-3">
                      <router-link :to="`/blog/${posts[0].slug}`" class="text-white text-decoration-none hover-text-primary">
                        {{ posts[0].title }}
                      </router-link>
                    </h2>
                    <p class="mb-3 text-white-75">{{ posts[0].excerpt }}</p>
                    <div class="d-flex align-items-center">
                      <div class="avatar-group me-3">
                        <img :src="posts[0].author.avatar" class="avatar" :alt="posts[0].author.name">
                      </div>
                      <div class="d-flex flex-column">
                        <small class="text-white fw-medium">{{ posts[0].author.name }}</small>
                        <div class="d-flex align-items-center text-white-50 small">
                          <span class="me-3">
                            <i class="bi bi-heart-fill text-danger me-1"></i> {{ posts[0].likes }}
                          </span>
                          <span>
                            <i class="bi bi-chat-left-text me-1"></i> {{ posts[0].comments }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-7 d-flex flex-column">
                <div class="card-body p-4 p-lg-5">
                  <div class="d-flex align-items-center mb-3">
                    <span class="badge bg-primary-soft text-primary me-2">Featured</span>
                    <small class="text-muted">{{ formatDate(posts[0].created_at) }}</small>
                  </div>
                  <h2 class="h3 mb-3">
                    <router-link :to="`/blog/${posts[0].slug}`" class="text-dark text-decoration-none hover-text-primary">
                      {{ posts[0].title }}
                    </router-link>
                  </h2>
                  <p class="text-muted mb-4">{{ posts[0].excerpt }}</p>
                  <div class="d-flex align-items-center mt-auto">
                    <img :src="posts[0].author.avatar" class="rounded-circle me-2" width="40" height="40" :alt="posts[0].author.name">
                    <div class="flex-grow-1">
                      <h6 class="mb-0">{{ posts[0].author.name }}</h6>
                      <small class="text-muted">{{ posts[0].author.role || 'Author' }}</small>
                    </div>
                    <div class="d-flex align-items-center ms-3">
                      <button class="btn btn-sm btn-outline-secondary me-2">
                        <i class="bi bi-bookmark"></i>
                      </button>
                      <button class="btn btn-sm btn-outline-secondary">
                        <i class="bi bi-share"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Blog Post Grid -->
          <div class="row g-4">
            <div 
              v-for="(post, index) in posts.slice(1)" 
              :key="post.id" 
              class="col-md-6"
              :data-aos="'fade-up'"
              :data-aos-delay="(index % 3) * 100"
            >
              <div class="card h-100 border-0 shadow-sm hover-lift transition-all">
                <div class="position-relative overflow-hidden" style="height: 200px;">
                  <img :src="post.image" class="card-img-top h-100 w-100" :alt="post.title" style="object-fit: cover; transition: transform 0.5s ease;">
                  <div class="position-absolute top-0 end-0 m-3">
                    <button class="btn btn-sm btn-light rounded-circle" title="Save for later">
                      <i class="bi bi-bookmark"></i>
                    </button>
                  </div>
                </div>
                <div class="card-body p-4">
                  <div class="d-flex align-items-center mb-3">
                    <span class="badge bg-primary-soft text-primary me-2">{{ post.category }}</span>
                    <small class="text-muted">{{ formatDate(post.created_at) }}</small>
                  </div>
                  <h3 class="h5 mb-3">
                    <router-link :to="`/blog/${post.slug}`" class="text-dark text-decoration-none hover-text-primary">
                      {{ post.title }}
                    </router-link>
                  </h3>
                  <p class="text-muted mb-4">{{ post.excerpt.length > 100 ? post.excerpt.substring(0, 100) + '...' : post.excerpt }}</p>
                  <div class="d-flex align-items-center">
                    <img :src="post.author.avatar" class="rounded-circle me-2" width="36" height="36" :alt="post.author.name">
                    <div class="flex-grow-1">
                      <h6 class="mb-0">{{ post.author.name }}</h6>
                      <small class="text-muted">{{ post.read_time || '5 min read' }}</small>
                    </div>
                    <div class="d-flex align-items-center text-muted">
                      <span class="me-3 small">
                        <i class="bi bi-heart-fill text-danger me-1"></i> {{ post.likes || 0 }}
                      </span>
                      <span class="small">
                        <i class="bi bi-chat-left-text me-1"></i> {{ post.comments || 0 }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <nav aria-label="Page navigation" class="mt-5">
            <ul class="pagination justify-content-center">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button class="page-link" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
                  Previous
                </button>
              </li>
              <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
                <button class="page-link" @click="changePage(page)">{{ page }}</button>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <button class="page-link" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Sidebar -->
        <div class="col-lg-4">
          <!-- About Card -->
          <div class="card border-0 shadow-sm mb-5" data-aos="fade-up" data-aos-delay="100">
            <div class="card-body p-4 text-center">
              <div class="position-relative d-inline-block mb-3">
                <img src="https://via.placeholder.com/150" class="rounded-circle border border-4 border-white shadow" width="120" height="120" alt="Author">
                <div class="position-absolute bottom-0 end-0 bg-primary rounded-circle p-2 border border-3 border-white">
                  <i class="bi bi-patch-check-fill text-white"></i>
                </div>
              </div>
              <h5 class="h5 mb-1">John Doe</h5>
              <p class="text-primary mb-3">Web Developer & Content Creator</p>
              <p class="text-muted mb-4">Sharing my journey in web development, design, and technology. Passionate about creating beautiful and functional web experiences.</p>
              <div class="d-flex justify-content-center gap-3 mb-3">
                <a href="#" class="btn btn-sm btn-outline-primary rounded-circle p-2" title="Twitter">
                  <i class="bi bi-twitter"></i>
                </a>
                <a href="#" class="btn btn-sm btn-outline-primary rounded-circle p-2" title="GitHub">
                  <i class="bi bi-github"></i>
                </a>
                <a href="#" class="btn btn-sm btn-outline-primary rounded-circle p-2" title="LinkedIn">
                  <i class="bi bi-linkedin"></i>
                </a>
                <a href="#" class="btn btn-sm btn-outline-primary rounded-circle p-2" title="Instagram">
                  <i class="bi bi-instagram"></i>
                </a>
              </div>
              <button class="btn btn-primary-soft w-100">
                <i class="bi bi-envelope me-2"></i>Contact Me
              </button>
            </div>
          </div>

          <!-- Popular Posts -->
          <div class="card border-0 shadow-sm mb-5" data-aos="fade-up" data-aos-delay="150">
            <div class="card-header bg-transparent border-bottom border-light p-4">
              <h5 class="mb-0 d-flex align-items-center">
                <i class="bi bi-fire text-primary me-2"></i>
                <span>Trending Now</span>
              </h5>
            </div>
            <div class="list-group list-group-flush">
              <a 
                v-for="(post, index) in popularPosts" 
                :key="post.id" 
                href="#" 
                class="list-group-item list-group-item-action border-0 p-4 hover-lift"
                :data-aos="'fade-up'"
                :data-aos-delay="150 + (index * 50)"
              >
                <div class="d-flex align-items-start">
                  <div class="flex-shrink-0 me-3">
                    <span class="d-flex align-items-center justify-content-center bg-primary-soft text-primary rounded-circle" style="width: 36px; height: 36px;">
                      {{ index + 1 }}
                    </span>
                  </div>
                  <div class="flex-grow-1">
                    <h6 class="mb-1 text-dark">{{ post.title }}</h6>
                    <div class="d-flex align-items-center text-muted small">
                      <span class="me-3">{{ formatDateShort(post.created_at) }}</span>
                      <span>
                        <i class="bi bi-eye me-1"></i> {{ post.views }}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div class="card-footer bg-transparent border-top-0 text-center pt-0">
              <a href="#" class="btn btn-link text-primary p-0">
                View all popular posts <i class="bi bi-arrow-right ms-1"></i>
              </a>
            </div>
          </div>

          <!-- Categories -->
          <div class="card border-0 shadow-sm mb-5" data-aos="fade-up" data-aos-delay="200">
            <div class="card-header bg-transparent border-bottom border-light p-4">
              <h5 class="mb-0 d-flex align-items-center">
                <i class="bi bi-folder2-open text-primary me-2"></i>
                <span>Categories</span>
              </h5>
            </div>
            <div class="list-group list-group-flush">
              <a 
                v-for="(category, index) in categories" 
                :key="category.id" 
                href="#" 
                class="list-group-item list-group-item-action d-flex justify-content-between align-items-center border-0 p-4 hover-lift"
                :class="{ 'active-category': activeCategory === category.id }"
                @click.prevent="filterByCategory(category.id)"
                :data-aos="'fade-up'"
                :data-aos-delay="200 + (index * 30)"
              >
                <div class="d-flex align-items-center">
                  <div class="category-icon me-3 d-flex align-items-center justify-content-center" :class="'bg-' + getCategoryColor(index) + '-soft text-' + getCategoryColor(index)">
                    <i :class="getCategoryIcon(category.name)"></i>
                  </div>
                  <span class="fw-medium">{{ category.name }}</span>
                </div>
                <span class="badge rounded-pill" :class="'bg-' + getCategoryColor(index) + '-soft text-' + getCategoryColor(index)">
                  {{ category.count }}
                </span>
              </a>
            </div>
            <div class="card-footer bg-transparent border-top-0 text-center pt-0">
              <a href="#" class="btn btn-link text-primary p-0" @click.prevent="resetCategoryFilter">
                <i class="bi bi-arrow-counterclockwise me-1"></i> Reset Filter
              </a>
            </div>
          </div>

          <!-- Tags -->
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-transparent border-0">
              <h5 class="mb-0">Tags</h5>
            </div>
            <div class="card-body">
              <div class="d-flex flex-wrap gap-2">
                <a 
                  v-for="tag in tags" 
                  :key="tag.id" 
                  href="#" 
                  class="btn btn-sm btn-outline-secondary"
                  @click.prevent="filterByTag(tag.id)"
                >
                  {{ tag.name }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'BlogView',
  data() {
    return {
      searchQuery: '',
      activeCategory: null,
      currentPage: 1,
      totalPages: 5,
      tagSearch: '',
      filteredTags: [],
      posts: [
        {
          id: 1,
          title: 'Getting Started with Vue 3',
          excerpt: 'Learn the basics of Vue 3 and how to build your first application with the Composition API and other new features.',
          category: 'Vue.js',
          created_at: '2023-06-15',
          slug: 'getting-started-with-vue-3',
          image: 'https://via.placeholder.com/800x450/4e73df/ffffff?text=Vue+3',
          author: {
            name: 'John Doe',
            avatar: 'https://via.placeholder.com/150/4e73df/ffffff?text=JD'
          },
          likes: 24,
          comments: 8,
          views: 156
        },
        {
          id: 2,
          title: 'Laravel 10 New Features',
          excerpt: 'Explore the latest features and improvements in Laravel 10, including the new process layer and more.',
          category: 'Laravel',
          created_at: '2023-06-10',
          slug: 'laravel-10-new-features',
          image: 'https://via.placeholder.com/800x450/ff2d20/ffffff?text=Laravel+10',
          author: {
            name: 'Jane Smith',
            avatar: 'https://via.placeholder.com/150/ff2d20/ffffff?text=JS'
          },
          likes: 18,
          comments: 5,
          views: 203
        },
        {
          id: 3,
          title: 'Responsive Design Best Practices',
          excerpt: 'Learn the best practices for creating beautiful and accessible responsive websites that work on all devices.',
          category: 'Web Design',
          created_at: '2023-06-05',
          slug: 'responsive-design-best-practices',
          image: 'https://via.placeholder.com/800x450/6f42c1/ffffff?text=Responsive+Design',
          author: {
            name: 'Alex Johnson',
            avatar: 'https://via.placeholder.com/150/6f42c1/ffffff?text=AJ'
          },
          likes: 32,
          comments: 12,
          views: 278
        },
        {
          id: 4,
          title: 'JavaScript ES2023 Features',
          excerpt: 'Discover the new JavaScript features coming in ES2023 and how to use them in your projects today.',
          category: 'JavaScript',
          created_at: '2023-05-28',
          slug: 'javascript-es2023-features',
          image: 'https://via.placeholder.com/800x450/f7df1e/000000?text=ES2023',
          author: {
            name: 'Mike Chen',
            avatar: 'https://via.placeholder.com/150/f7df1e/000000?text=MC'
          },
          likes: 27,
          comments: 9,
          views: 189
        },
        {
          id: 5,
          title: 'Building RESTful APIs with Node.js',
          excerpt: 'A comprehensive guide to building scalable and maintainable RESTful APIs using Node.js and Express.',
          category: 'Node.js',
          created_at: '2023-05-20',
          slug: 'building-restful-apis-nodejs',
          image: 'https://via.placeholder.com/800x450/339933/ffffff?text=Node.js',
          author: {
            name: 'Sarah Williams',
            avatar: 'https://via.placeholder.com/150/339933/ffffff?text=SW'
          },
          likes: 35,
          comments: 14,
          views: 312
        },
        {
          id: 6,
          title: 'CSS Grid vs Flexbox',
          excerpt: 'When to use CSS Grid and when to use Flexbox for your layouts, with practical examples and use cases.',
          category: 'CSS',
          created_at: '2023-05-15',
          slug: 'css-grid-vs-flexbox',
          image: 'https://via.placeholder.com/800x450/1572b6/ffffff?text=CSS',
          author: {
            name: 'David Kim',
            avatar: 'https://via.placeholder.com/150/1572b6/ffffff?text=DK'
          },
          likes: 29,
          comments: 11,
          views: 245
        }
      ],
      categories: [
        { id: 1, name: 'Technology', count: 24 },
        { id: 2, name: 'Web Development', count: 18 },
        { id: 3, name: 'Design', count: 15 },
        { id: 4, name: 'Lifestyle', count: 12 },
        { id: 5, name: 'Programming', count: 32 }
      ],
      popularPosts: [
        {
          id: 1,
          title: 'Getting Started with Vue 3',
          created_at: '2023-06-15',
          views: 156
        },
        {
          id: 2,
          title: 'Laravel 10 New Features',
          created_at: '2023-06-10',
          views: 203
        },
        {
          id: 3,
          title: 'Responsive Design Best Practices',
          created_at: '2023-06-05',
          views: 278
        },
        {
          id: 4,
          title: 'JavaScript ES2023 Features',
          created_at: '2023-05-28',
          views: 189
        },
        {
          id: 5,
          title: 'Building RESTful APIs with Node.js',
          created_at: '2023-05-20',
          views: 312
        }
      ],
      tags: [
        { id: 1, name: 'Vue.js' },
        { id: 2, name: 'Laravel' },
        { id: 3, name: 'JavaScript' },
        { id: 4, name: 'CSS' },
        { id: 5, name: 'Responsive' },
        { id: 6, name: 'Web Design' },
        { id: 7, name: 'Node.js' },
        { id: 8, name: 'API' }
      ]
    };
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    formatDateShort(dateString) {
      const options = { month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    searchPosts() {
      // TODO: Implement search functionality
      console.log('Searching for:', this.searchQuery);
      this.currentPage = 1;
      // Fetch posts based on search query
    },
    filterByCategory(categoryId) {
      this.activeCategory = this.activeCategory === categoryId ? null : categoryId;
      this.currentPage = 1;
      // Filter posts by category
    },
    filterByTag(tagId) {
      this.activeTag = this.activeTag === tagId ? null : tagId;
      this.currentPage = 1;
      // Filter posts by tag
      console.log('Filtering by tag:', tagId);
    },
    filterTags() {
      // Filter tags based on search input
      if (!this.tagSearch) {
        this.filteredTags = [...this.tags];
        return;
      }
      this.filteredTags = this.tags.filter(tag => 
        tag.name.toLowerCase().includes(this.tagSearch.toLowerCase())
      );
    },
    getCategoryColor(index) {
      const colors = ['primary', 'success', 'info', 'warning', 'danger'];
      return colors[index % colors.length];
    },
    getTagColor(index) {
      const colors = ['primary', 'success', 'info', 'warning', 'danger', 'secondary'];
      return colors[index % colors.length];
    },
    getCategoryIcon(categoryName) {
      const icons = {
        'Technology': 'bi-laptop',
        'Web Development': 'bi-code-slash',
        'Design': 'bi-brush',
        'Lifestyle': 'bi-cup-hot',
        'Programming': 'bi-terminal'
      };
      return icons[categoryName] || 'bi-folder';
    },
    resetCategoryFilter() {
      this.activeCategory = null;
      this.currentPage = 1;
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        // Fetch posts for the selected page
      }
    }
  },
  computed: {
    filteredPosts() {
      // This would be replaced with actual API filtering
      return this.posts;
    },
    displayedTags() {
      return this.tagSearch 
        ? this.tags.filter(tag => 
            tag.name.toLowerCase().includes(this.tagSearch.toLowerCase())
          )
        : this.tags;
    }
  },
  created() {
    console.log('BlogView component created');
    console.log('Initial posts:', this.posts);
    console.log('Initial categories:', this.categories);
    console.log('Initial tags:', this.tags);
    
    // Initialize filtered tags with all tags
    this.filteredTags = [...this.tags];
    
    // Log any potential data issues
    if (!this.posts || !Array.isArray(this.posts)) {
      console.error('Posts data is not properly initialized');
    }
    
    if (!this.categories || !Array.isArray(this.categories)) {
      console.error('Categories data is not properly initialized');
    }
  },
  
  mounted() {
    console.log('BlogView component mounted');
    console.log('DOM elements:', {
      posts: document.querySelectorAll('.post-item'),
      categories: document.querySelectorAll('.category-item')
    });
  }
};
</script>

<style scoped>
/* Utility Classes */
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.1) !important;
}

/* Category Icons */
.category-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

/* Active Category */
.active-category {
  background-color: rgba(13, 110, 253, 0.05) !important;
  border-left: 3px solid #0d6efd !important;
}

/* Tag Badges */
.tag-badge {
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.tag-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

/* Featured Post */
.featured-post .card-img-top {
  transition: transform 0.5s ease;
}

.featured-post:hover .card-img-top {
  transform: scale(1.05);
}

/* Search Form */
.search-form {
  max-width: 600px;
  margin: 0 auto;
}

.search-form .form-control {
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  border: 1px solid #e9ecef;
}

.search-form .btn {
  position: absolute;
  right: 5px;
  top: 5px;
  bottom: 5px;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Responsive Adjustments */
@media (max-width: 767.98px) {
  .page-header {
    padding: 4rem 0 3rem;
  }
  
  .search-form .form-control {
    padding: 0.6rem 1.25rem;
  }
  
  .search-form .btn {
    width: 40px;
    height: 40px;
  }
}
/* Page Header */
.page-header {
  padding: 6rem 0 5rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;
  overflow: hidden;
  margin-bottom: 4rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.page-header::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 60%;
  height: 100%;
  background: url('@/assets/blog-hero.svg') no-repeat center right/contain;
  opacity: 0.03;
  z-index: 0;
}

/* Cards */
.card {
  transition: all 0.3s ease;
  margin-bottom: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.05) !important;
  border-radius: 0.75rem !important;
  overflow: hidden;
  position: relative;
  background: #fff;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.075) !important;
  border-color: transparent !important;
}

/* Featured Post */
.featured-post {
  border: none !important;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.05) !important;
}

.featured-post:hover {
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.1) !important;
}

/* Card Images */
.card-img-top {
  height: 200px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.card:hover .card-img-top {
  transform: scale(1.03);
}

/* Badges */
.badge {
  font-weight: 500;
  padding: 0.4em 0.8em;
  font-size: 0.8em;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border-radius: 50px;
  background-color: var(--primary-color);
}

/* Category Buttons */
.btn-category {
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
  margin: 0.2rem;
}

.btn-category:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Sidebar */
.sidebar-card {
  border: 1px solid rgba(0, 0, 0, 0.05) !important;
  border-radius: 0.75rem !important;
  overflow: hidden;
  margin-bottom: 2rem;
  background: #fff;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.03);
}

.sidebar-card .card-header {
  background: transparent;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding: 1.25rem 1.5rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.9rem;
  color: var(--dark);
}

/* List Group Items */
.list-group-item {
  padding: 1rem 1.5rem;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
  background: transparent;
}

.list-group-item:first-child {
  border-top: none;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.list-group-item:last-child {
  border-bottom: none;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.list-group-item:hover {
  background-color: rgba(0, 0, 0, 0.01);
  padding-left: 1.75rem;
}

/* Pagination */
.pagination {
  margin-top: 3rem;
  justify-content: center;
}

.page-link {
  color: var(--dark);
  border: 1px solid rgba(0, 0, 0, 0.05);
  margin: 0 0.25rem;
  border-radius: 0.5rem !important;
  min-width: 2.5rem;
  height: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-weight: 500;
  background: #fff;
}

.page-link:hover {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.page-item.active .page-link {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
  box-shadow: 0 4px 12px rgba(78, 115, 223, 0.3);
}

.page-link:focus {
  box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.25);
}

/* Search Form */
.search-form .form-control {
  height: 3.2rem;
  border-radius: 50px;
  padding-left: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.search-form .form-control:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.15);
}

.search-form .btn {
  position: absolute;
  right: 5px;
  top: 5px;
  height: calc(100% - 10px);
  width: 3.2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  z-index: 5;
}

/* Responsive Adjustments */
@media (max-width: 991.98px) {
  .page-header {
    padding: 5rem 0 4rem;
    text-align: center;
  }
  
  .page-header::before {
    width: 100%;
    opacity: 0.03;
  }
  
  .search-form {
    max-width: 500px;
    margin: 0 auto;
  }
}

@media (max-width: 767.98px) {
  .page-header {
    padding: 4rem 0 3rem;
  }
  
  .card-img-top {
    height: 250px;
  }
  
  .featured-post .row > div:first-child {
    margin-bottom: 1.5rem;
  }
  
  .featured-post .card-body {
    padding: 1.5rem !important;
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
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.1) !important;
}
</style>
