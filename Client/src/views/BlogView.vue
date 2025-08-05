<template>
  <div class="blog-view">
    <!-- Page Header -->
    <header class="page-header py-5 bg-light mb-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <h1 class="fw-bold">Blog</h1>
            <p class="lead text-muted">Discover the latest articles, tutorials, and insights</p>
            
            <!-- Search Form -->
            <form class="mt-4" @submit.prevent="searchPosts">
              <div class="input-group">
                <input 
                  type="text" 
                  v-model="searchQuery" 
                  class="form-control form-control-lg" 
                  placeholder="Search posts..."
                >
                <button class="btn btn-primary px-4" type="submit">
                  <i class="bi bi-search"></i>
                </button>
              </div>
            </form>
            
            <!-- Category Filter -->
            <div class="mt-3">
              <div class="d-flex flex-wrap gap-2">
                <button 
                  v-for="category in categories" 
                  :key="category.id"
                  @click="filterByCategory(category.id)"
                  class="btn btn-sm"
                  :class="{ 'btn-primary': activeCategory === category.id, 'btn-outline-secondary': activeCategory !== category.id }"
                >
                  {{ category.name }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="container">
      <div class="row">
        <!-- Blog Posts -->
        <div class="col-lg-8">
          <!-- Featured Post (First Post) -->
          <div v-if="posts.length > 0" class="card mb-5 border-0 shadow-sm">
            <div class="row g-0">
              <div class="col-md-5">
                <img :src="posts[0].image" class="img-fluid rounded-start h-100" :alt="posts[0].title" style="object-fit: cover;">
              </div>
              <div class="col-md-7">
                <div class="card-body">
                  <div class="d-flex gap-2 mb-2">
                    <span class="badge bg-primary">{{ posts[0].category }}</span>
                    <small class="text-muted">{{ formatDate(posts[0].created_at) }}</small>
                  </div>
                  <h2 class="card-title h4">
                    <router-link :to="`/blog/${posts[0].slug}`" class="text-dark text-decoration-none">
                      {{ posts[0].title }}
                    </router-link>
                  </h2>
                  <p class="card-text">{{ posts[0].excerpt }}</p>
                  <div class="d-flex align-items-center">
                    <img :src="posts[0].author.avatar" class="rounded-circle me-2" width="32" height="32" :alt="posts[0].author.name">
                    <small class="text-muted">By {{ posts[0].author.name }}</small>
                    <div class="ms-auto">
                      <small class="text-muted me-3">
                        <i class="bi bi-heart me-1"></i> {{ posts[0].likes }}
                      </small>
                      <small class="text-muted">
                        <i class="bi bi-chat me-1"></i> {{ posts[0].comments }}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Other Posts -->
          <div class="row g-4">
            <div v-for="post in posts.slice(1)" :key="post.id" class="col-md-6">
              <div class="card h-100 border-0 shadow-sm">
                <img :src="post.image" class="card-img-top" :alt="post.title">
                <div class="card-body">
                  <div class="d-flex gap-2 mb-2">
                    <span class="badge bg-primary">{{ post.category }}</span>
                    <small class="text-muted">{{ formatDate(post.created_at) }}</small>
                  </div>
                  <h3 class="h5 card-title">
                    <router-link :to="`/blog/${post.slug}`" class="text-dark text-decoration-none">
                      {{ post.title }}
                    </router-link>
                  </h3>
                  <p class="card-text text-muted">{{ post.excerpt }}</p>
                  <div class="d-flex align-items-center">
                    <img :src="post.author.avatar" class="rounded-circle me-2" width="24" height="24" :alt="post.author.name">
                    <small class="text-muted">{{ post.author.name }}</small>
                    <div class="ms-auto">
                      <small class="text-muted me-2">
                        <i class="bi bi-heart me-1"></i> {{ post.likes }}
                      </small>
                      <small class="text-muted">
                        <i class="bi bi-chat me-1"></i> {{ post.comments }}
                      </small>
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
          <div class="card mb-4 border-0 shadow-sm">
            <div class="card-body text-center">
              <img src="https://via.placeholder.com/150" class="rounded-circle mb-3" width="100" height="100" alt="Author">
              <h5 class="card-title mb-1">About Me</h5>
              <p class="text-muted mb-3">Web Developer & Content Creator</p>
              <p class="card-text text-muted small">
                Welcome to my blog where I share my journey in web development, design, and technology.
              </p>
              <div class="d-flex justify-content-center gap-3">
                <a href="#" class="text-dark"><i class="bi bi-twitter"></i></a>
                <a href="#" class="text-dark"><i class="bi bi-github"></i></a>
                <a href="#" class="text-dark"><i class="bi bi-linkedin"></i></a>
              </div>
            </div>
          </div>

          <!-- Popular Posts -->
          <div class="card mb-4 border-0 shadow-sm">
            <div class="card-header bg-transparent border-0">
              <h5 class="mb-0">Popular Posts</h5>
            </div>
            <div class="list-group list-group-flush">
              <a v-for="post in popularPosts" :key="post.id" href="#" class="list-group-item list-group-item-action border-0">
                <div class="d-flex w-100 justify-content-between">
                  <h6 class="mb-1">{{ post.title }}</h6>
                  <small class="text-muted">{{ formatDateShort(post.created_at) }}</small>
                </div>
                <small class="text-muted">{{ post.views }} views</small>
              </a>
            </div>
          </div>

          <!-- Categories -->
          <div class="card mb-4 border-0 shadow-sm">
            <div class="card-header bg-transparent border-0">
              <h5 class="mb-0">Categories</h5>
            </div>
            <div class="list-group list-group-flush">
              <a 
                v-for="category in categories" 
                :key="category.id" 
                href="#" 
                class="list-group-item list-group-item-action d-flex justify-content-between align-items-center border-0"
                @click.prevent="filterByCategory(category.id)"
              >
                {{ category.name }}
                <span class="badge bg-primary rounded-pill">{{ category.count }}</span>
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
      // TODO: Implement tag filtering
      console.log('Filtering by tag:', tagId);
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
    }
  }
};
</script>

<style scoped>
.page-header {
  padding: 4rem 0;
  margin-bottom: 3rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin-bottom: 1.5rem;
  border: none !important;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1) !important;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}

.badge {
  font-weight: 500;
  padding: 0.35em 0.65em;
}

.list-group-item {
  padding: 0.75rem 1.25rem;
  border-left: none;
  border-right: none;
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

.page-link {
  color: #4e73df;
  border: 1px solid #e3e6f0;
  margin: 0 0.25rem;
  border-radius: 0.35rem !important;
}

.page-item.active .page-link {
  background-color: #4e73df;
  border-color: #4e73df;
}

.page-link:focus {
  box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.25);
}
</style>
