<template>
  <AdminLayout pageTitle="Manage Posts">
    <template #header-actions>
      <router-link to="/admin/posts/create" class="btn btn-primary">
        <i class="bi bi-plus-lg me-1"></i> Add New Post
      </router-link>
    </template>

    <!-- Filters -->
    <div class="card border-0 shadow-sm mb-4">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-4">
            <label class="form-label">Search</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-search"></i></span>
              <input 
                type="text" 
                class="form-control" 
                placeholder="Search posts..."
                v-model="filters.search"
                @keyup.enter="applyFilters"
              >
            </div>
          </div>
          <div class="col-md-3">
            <label class="form-label">Category</label>
            <select class="form-select" v-model="filters.category">
              <option value="">All Categories</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Status</label>
            <select class="form-select" v-model="filters.status">
              <option value="">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div class="col-md-2 d-flex align-items-end">
            <button class="btn btn-outline-secondary w-100" @click="resetFilters">
              <i class="bi bi-arrow-counterclockwise me-1"></i> Reset
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Posts Table -->
    <div class="card border-0 shadow-sm">
      <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <select class="form-select form-select-sm me-2" style="width: auto;" v-model="bulkAction" :disabled="selectedPosts.length === 0">
            <option value="">Bulk Actions</option>
            <option value="publish">Publish</option>
            <option value="draft">Move to Draft</option>
            <option value="trash">Move to Trash</option>
            <option value="delete">Delete Permanently</option>
          </select>
          <button 
            class="btn btn-sm btn-outline-secondary" 
            :disabled="!bulkAction || selectedPosts.length === 0"
            @click="applyBulkAction"
          >
            Apply
          </button>
        </div>
        <div class="text-muted small">
          {{ filteredPosts.length }} {{ filteredPosts.length === 1 ? 'item' : 'items' }}
        </div>
      </div>
      
      <div class="table-responsive">
        <table class="table table-hover mb-0">
          <thead class="table-light">
            <tr>
              <th width="40">
                <div class="form-check">
                  <input 
                    class="form-check-input" 
                    type="checkbox" 
                    :checked="selectedPosts.length === filteredPosts.length"
                    @change="toggleSelectAll"
                  >
                </div>
              </th>
              <th>Title</th>
              <th>Author</th>
              <th>Categories</th>
              <th>Tags</th>
              <th>Date</th>
              <th class="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="7" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </td>
            </tr>
            <tr v-else-if="filteredPosts.length === 0">
              <td colspan="7" class="text-center py-5 text-muted">
                No posts found. <router-link to="/admin/posts/create">Create your first post</router-link>.
              </td>
            </tr>
            <tr v-for="post in paginatedPosts" :key="post.id">
              <td>
                <div class="form-check">
                  <input 
                    class="form-check-input" 
                    type="checkbox" 
                    :value="post.id"
                    v-model="selectedPosts"
                  >
                </div>
              </td>
              <td>
                <div class="d-flex align-items-center">
                  <img 
                    :src="post.thumbnail || 'https://via.placeholder.com/60x60'" 
                    alt="Thumbnail" 
                    class="rounded me-2"
                    width="40"
                    height="40"
                  >
                  <div>
                    <div class="fw-semibold">
                      <router-link :to="`/admin/posts/${post.id}/edit`" class="text-decoration-none">
                        {{ post.title }}
                      </router-link>
                    </div>
                    <small class="text-muted">
                      {{ post.excerpt || 'No excerpt' }}
                    </small>
                    <div class="mt-1">
                      <span :class="`badge bg-${post.status === 'published' ? 'success' : 'secondary'}`">
                        {{ post.status }}
                      </span>
                      <span v-if="post.featured" class="badge bg-warning ms-1">
                        Featured
                      </span>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex align-items-center">
                  <img 
                    :src="post.author.avatar || `https://ui-avatars.com/api/?name=${post.author.name}`" 
                    :alt="post.author.name" 
                    class="rounded-circle me-2"
                    width="32"
                    height="32"
                  >
                  <span>{{ post.author.name }}</span>
                </div>
              </td>
              <td>
                <div class="d-flex flex-wrap gap-1">
                  <span 
                    v-for="category in post.categories" 
                    :key="category.id"
                    class="badge bg-light text-dark"
                  >
                    {{ category.name }}
                  </span>
                </div>
              </td>
              <td>
                <div class="d-flex flex-wrap gap-1">
                  <span 
                    v-for="tag in post.tags.slice(0, 2)" 
                    :key="tag"
                    class="badge bg-light text-dark"
                  >
                    {{ tag }}
                  </span>
                  <span 
                    v-if="post.tags.length > 2" 
                    class="badge bg-light text-dark"
                  >
                    +{{ post.tags.length - 2 }} more
                  </span>
                </div>
              </td>
              <td>
                <div>{{ formatDate(post.published_at) }}</div>
                <small class="text-muted">
                  {{ post.status === 'published' ? 'Published' : 'Last modified' }}
                </small>
              </td>
              <td class="text-end">
                <div class="btn-group btn-group-sm">
                  <router-link 
                    :to="`/blog/${post.slug}`" 
                    class="btn btn-outline-secondary" 
                    target="_blank"
                    title="View"
                  >
                    <i class="bi bi-eye"></i>
                  </router-link>
                  <router-link 
                    :to="`/admin/posts/${post.id}/edit`" 
                    class="btn btn-outline-primary" 
                    title="Edit"
                  >
                    <i class="bi bi-pencil"></i>
                  </router-link>
                  <button 
                    class="btn btn-outline-danger" 
                    @click="confirmDelete(post)"
                    title="Delete"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="card-footer bg-white d-flex justify-content-between align-items-center">
        <div class="text-muted small">
          Showing {{ (currentPage - 1) * perPage + 1 }} to 
          {{ Math.min(currentPage * perPage, filteredPosts.length) }} of 
          {{ filteredPosts.length }} entries
        </div>
        <nav>
          <ul class="pagination pagination-sm mb-0">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="currentPage--" :disabled="currentPage === 1">
                Previous
              </button>
            </li>
            
            <li 
              v-for="page in totalPages" 
              :key="page"
              class="page-item"
              :class="{ active: page === currentPage }"
            >
              <button class="page-link" @click="currentPage = page">
                {{ page }}
              </button>
            </li>
            
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button 
                class="page-link" 
                @click="currentPage++" 
                :disabled="currentPage === totalPages"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div class="modal fade" id="deletePostModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm Deletion</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete the post "{{ postToDelete?.title }}"? This action cannot be undone.</p>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="forceDelete" v-model="forceDelete">
              <label class="form-check-label" for="forceDelete">
                Delete permanently (bypass trash)
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
            <button 
              type="button" 
              class="btn btn-danger" 
              @click="deletePost"
              :disabled="deleting"
            >
              <span v-if="deleting" class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
              {{ deleting ? 'Deleting...' : 'Delete Post' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Modal } from 'bootstrap';
import AdminLayout from '@/layouts/AdminLayout.vue';

export default {
  name: 'PostsView',
  components: {
    AdminLayout
  },
  setup() {
    const router = useRouter();
    
    // Sample data - replace with API calls
    const posts = ref([
      {
        id: 1,
        title: 'Getting Started with Vue 3',
        excerpt: 'Learn the basics of Vue 3 and how to build your first application',
        slug: 'getting-started-with-vue-3',
        status: 'published',
        featured: true,
        thumbnail: 'https://via.placeholder.com/60x60',
        published_at: '2023-05-15T10:30:00Z',
        updated_at: '2023-05-15T10:30:00Z',
        author: {
          id: 1,
          name: 'John Doe',
          avatar: 'https://ui-avatars.com/api/?name=John+Doe'
        },
        categories: [
          { id: 1, name: 'Vue' },
          { id: 2, name: 'JavaScript' }
        ],
        tags: ['vue3', 'frontend', 'javascript']
      },
      // Add more sample posts...
    ]);

    const categories = ref([
      { id: 1, name: 'Vue' },
      { id: 2, name: 'JavaScript' },
      { id: 3, name: 'Laravel' },
      { id: 4, name: 'CSS' },
      { id: 5, name: 'Design' }
    ]);

    // State
    const loading = ref(false);
    const selectedPosts = ref([]);
    const bulkAction = ref('');
    const postToDelete = ref(null);
    const forceDelete = ref(false);
    const deleting = ref(false);
    const currentPage = ref(1);
    const perPage = 10;
    
    // Filters
    const filters = ref({
      search: '',
      category: '',
      status: '',
      author: '',
      date: ''
    });

    // Computed
    const filteredPosts = computed(() => {
      return posts.value.filter(post => {
        const matchesSearch = !filters.value.search || 
          post.title.toLowerCase().includes(filters.value.search.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(filters.value.search.toLowerCase());
        
        const matchesCategory = !filters.value.category || 
          post.categories.some(cat => cat.id.toString() === filters.value.category);
        
        const matchesStatus = !filters.value.status || 
          post.status === filters.value.status;
        
        return matchesSearch && matchesCategory && matchesStatus;
      });
    });

    const paginatedPosts = computed(() => {
      const start = (currentPage.value - 1) * perPage;
      const end = start + perPage;
      return filteredPosts.value.slice(start, end);
    });

    const totalPages = computed(() => {
      return Math.ceil(filteredPosts.value.length / perPage);
    });

    // Methods
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const toggleSelectAll = (event) => {
      if (event.target.checked) {
        selectedPosts.value = paginatedPosts.value.map(post => post.id);
      } else {
        selectedPosts.value = [];
      }
    };

    const applyFilters = () => {
      currentPage.value = 1; // Reset to first page when filters change
    };

    const resetFilters = () => {
      filters.value = {
        search: '',
        category: '',
        status: '',
        author: '',
        date: ''
      };
      currentPage.value = 1;
    };

    const applyBulkAction = () => {
      if (!bulkAction.value || selectedPosts.value.length === 0) return;
      
      // Implement bulk actions
      switch (bulkAction.value) {
        case 'publish':
          // Update status to published
          posts.value = posts.value.map(post => 
            selectedPosts.value.includes(post.id) 
              ? { ...post, status: 'published' } 
              : post
          );
          break;
          
        case 'draft':
          // Update status to draft
          posts.value = posts.value.map(post => 
            selectedPosts.value.includes(post.id) 
              ? { ...post, status: 'draft' } 
              : post
          );
          break;
          
        case 'trash':
          // Move to trash (or archive)
          posts.value = posts.value.filter(post => !selectedPosts.value.includes(post.id));
          break;
          
        case 'delete':
          // Delete permanently
          posts.value = posts.value.filter(post => !selectedPosts.value.includes(post.id));
          break;
      }
      
      // Reset selection and bulk action
      selectedPosts.value = [];
      bulkAction.value = '';
      
      // Show success message
      // In a real app, you would show a toast notification
      console.log('Bulk action applied successfully');
    };

    const confirmDelete = (post) => {
      postToDelete.value = post;
      forceDelete.value = false;
      const modal = new Modal(document.getElementById('deletePostModal'));
      modal.show();
    };

    const deletePost = () => {
      if (!postToDelete.value) return;
      
      deleting.value = true;
      
      // Simulate API call
      setTimeout(() => {
        // In a real app, you would make an API call to delete the post
        posts.value = posts.value.filter(post => post.id !== postToDelete.value.id);
        
        // Close modal
        const modal = Modal.getInstance(document.getElementById('deletePostModal'));
        modal.hide();
        
        // Reset state
        postToDelete.value = null;
        deleting.value = false;
        
        // Show success message
        // In a real app, you would show a toast notification
        console.log('Post deleted successfully');
      }, 1000);
    };

    // Lifecycle hooks
    onMounted(() => {
      // In a real app, you would fetch posts from an API
      loading.value = true;
      
      // Simulate API call
      setTimeout(() => {
        loading.value = false;
      }, 500);
    });

    return {
      // State
      loading,
      posts,
      categories,
      selectedPosts,
      bulkAction,
      postToDelete,
      forceDelete,
      deleting,
      currentPage,
      perPage,
      totalPages,
      filters,
      
      // Computed
      filteredPosts,
      paginatedPosts,
      
      // Methods
      formatDate,
      toggleSelectAll,
      applyFilters,
      resetFilters,
      applyBulkAction,
      confirmDelete,
      deletePost
    };
  }
};
</script>

<style scoped>
.table th {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  color: #6c757d;
  border-top: none;
  padding-top: 1rem;
  padding-bottom: 1rem;
  white-space: nowrap;
}

.table td {
  vertical-align: middle;
  padding: 1rem 0.75rem;
}

.badge {
  font-weight: 500;
  padding: 0.35em 0.65em;
  font-size: 0.75em;
}

/* Responsive adjustments */
@media (max-width: 767.98px) {
  .table-responsive {
    border: 0;
  }
  
  .table thead {
    display: none;
  }
  
  .table, .table tbody, .table tr, .table td {
    display: block;
    width: 100%;
  }
  
  .table tr {
    margin-bottom: 1rem;
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
  }
  
  .table td {
    text-align: right;
    padding-left: 50%;
    position: relative;
    border-bottom: 1px solid #dee2e6;
  }
  
  .table td::before {
    content: attr(data-label);
    position: absolute;
    left: 1rem;
    width: 45%;
    padding-right: 1rem;
    font-weight: 600;
    text-align: left;
    color: #6c757d;
  }
  
  .table td:last-child {
    text-align: right;
  }
  
  .table td:last-child::before {
    display: none;
  }
  
  .pagination {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
