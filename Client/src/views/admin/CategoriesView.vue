<template>
  <div class="container-fluid">
    <!-- Page Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 mb-0">Categories</h1>
      <button class="btn btn-primary" @click="showCategoryModal()">
        <i class="bi bi-plus-lg me-1"></i> Add New
      </button>
    </div>

    <!-- Categories Table -->
    <div class="card">
      <div class="card-body">
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-4">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-2 mb-0">Loading categories...</p>
        </div>
        
        <!-- Empty State -->
        <div v-else-if="categories.length === 0" class="text-center py-5">
          <i class="bi bi-folder-x display-5 text-muted mb-3"></i>
          <p class="mb-4">No categories found. Create your first category to get started.</p>
          <button class="btn btn-primary" @click="showCategoryModal()">
            <i class="bi bi-plus-lg me-1"></i> Add Category
          </button>
        </div>
        
        <!-- Categories Table -->
        <div v-else class="table-responsive">
          <table class="table table-hover align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Slug</th>
                <th>Description</th>
                <th>Posts</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="category in categories" :key="category.id">
                <td>{{ category.name }}</td>
                <td><code>{{ category.slug }}</code></td>
                <td class="text-muted">
                  {{ category.description || 'No description' }}
                </td>
                <td>
                  <span class="badge bg-primary">
                    {{ category.posts_count || 0 }}
                  </span>
                </td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <button 
                      class="btn btn-outline-primary"
                      @click="showCategoryModal(category)"
                      title="Edit"
                    >
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button 
                      class="btn btn-outline-danger"
                      @click="confirmDelete(category)"
                      title="Delete"
                      :disabled="category.posts_count > 0"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Category Form Modal -->
    <div class="modal fade" :class="{ 'show d-block': showModal }" tabindex="-1" v-if="showModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ editingCategory ? 'Edit Category' : 'Add New Category' }}
            </h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <form @submit.prevent="saveCategory">
            <div class="modal-body">
              <div class="mb-3">
                <label for="categoryName" class="form-label">Name <span class="text-danger">*</span></label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="categoryName"
                  v-model="categoryForm.name"
                  required
                >
              </div>
              <div class="mb-3">
                <label for="categorySlug" class="form-label">Slug</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="categorySlug"
                  v-model="categoryForm.slug"
                >
                <div class="form-text">
                  The "slug" is the URL-friendly version of the name.
                </div>
              </div>
              <div class="mb-3">
                <label for="categoryDescription" class="form-label">Description</label>
                <textarea 
                  class="form-control" 
                  id="categoryDescription"
                  v-model="categoryForm.description"
                  rows="3"
                ></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal">
                Cancel
              </button>
              <button type="submit" class="btn btn-primary" :disabled="saving">
                <span v-if="saving" class="spinner-border spinner-border-sm me-1"></span>
                {{ editingCategory ? 'Update' : 'Save' }} Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" v-if="showModal"></div>

    <!-- Delete Confirmation Modal -->
    <div class="modal fade" :class="{ 'show d-block': showDeleteModal }" tabindex="-1" v-if="showDeleteModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete Category</h5>
            <button type="button" class="btn-close" @click="cancelDelete"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete the category <strong>{{ categoryToDelete?.name }}</strong>?</p>
            <p class="text-danger" v-if="categoryToDelete?.posts_count > 0">
              <i class="bi bi-exclamation-triangle-fill me-1"></i>
              This category contains {{ categoryToDelete?.posts_count }} posts.
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="cancelDelete">
              Cancel
            </button>
            <button 
              type="button" 
              class="btn btn-danger" 
              @click="deleteCategory"
              :disabled="deleting"
            >
              <span v-if="deleting" class="spinner-border spinner-border-sm me-1"></span>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" v-if="showDeleteModal"></div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';
import categoryService from '@/services/categoryService';

export default {
  name: 'CategoriesView',
  setup() {
    const toast = useToast();
    
    // State
    const loading = ref(false);
    const saving = ref(false);
    const deleting = ref(false);
    const showModal = ref(false);
    const showDeleteModal = ref(false);
    const editingCategory = ref(null);
    const categoryToDelete = ref(null);
    
    // Categories data
    const categories = ref([]);
    
    // Form data
    const categoryForm = ref({
      name: '',
      slug: '',
      description: ''
    });

    // Fetch categories
    const fetchCategories = async () => {
      try {
        loading.value = true;
        const response = await categoryService.getAll();
        categories.value = response.data || [];
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load categories');
      } finally {
        loading.value = false;
      }
    };

    // Show category modal
    const showCategoryModal = (category = null) => {
      editingCategory.value = category;
      
      if (category) {
        // Edit mode
        categoryForm.value = {
          name: category.name,
          slug: category.slug,
          description: category.description || ''
        };
      } else {
        // Add new mode
        categoryForm.value = {
          name: '',
          slug: '',
          description: ''
        };
      }
      
      showModal.value = true;
    };

    // Close modal
    const closeModal = () => {
      showModal.value = false;
      editingCategory.value = null;
    };

    // Save category
    const saveCategory = async () => {
      try {
        saving.value = true;
        
        const categoryData = {
          name: categoryForm.value.name,
          slug: categoryForm.value.slug || categoryForm.value.name.toLowerCase().replace(/\s+/g, '-'),
          description: categoryForm.value.description
        };
        
        if (editingCategory.value) {
          // Update existing category
          const updatedCategory = await categoryService.update(editingCategory.value.slug, categoryData);
          const index = categories.value.findIndex(c => c.id === updatedCategory.data.id);
          if (index !== -1) {
            categories.value[index] = updatedCategory.data;
          }
          toast.success('Category updated successfully');
        } else {
          // Add new category
          const newCategory = await categoryService.create(categoryData);
          categories.value.unshift(newCategory.data);
          toast.success('Category created successfully');
        }
        
        closeModal();
      } catch (error) {
        console.error('Error saving category:', error);
        
        if (error.validation) {
          // Show validation errors
          Object.values(error.validation).forEach(message => {
            toast.error(message);
          });
        } else {
          toast.error(error.response?.data?.message || 'Failed to save category');
        }
      } finally {
        saving.value = false;
      }
    };

    // Confirm delete
    const confirmDelete = (category) => {
      categoryToDelete.value = category;
      showDeleteModal.value = true;
    };

    // Cancel delete
    const cancelDelete = () => {
      showDeleteModal.value = false;
      categoryToDelete.value = null;
    };

    // Delete category
    const deleteCategory = async () => {
      if (!categoryToDelete.value) return;
      
      try {
        deleting.value = true;
        
        await categoryService.delete(categoryToDelete.value.slug);
        
        // Remove from local state
        categories.value = categories.value.filter(c => c.id !== categoryToDelete.value.id);
        
        toast.success('Category deleted successfully');
        showDeleteModal.value = false;
        categoryToDelete.value = null;
      } catch (error) {
        console.error('Error deleting category:', error);
        toast.error(error.response?.data?.message || 'Failed to delete category');
      } finally {
        deleting.value = false;
      }
    };

    // Initial data loading
    onMounted(() => {
      fetchCategories();
    });

    return {
      // State
      loading,
      saving,
      deleting,
      showModal,
      showDeleteModal,
      categories,
      categoryForm,
      editingCategory,
      categoryToDelete,
      
      // Methods
      showCategoryModal,
      closeModal,
      saveCategory,
      confirmDelete,
      cancelDelete,
      deleteCategory
    };
  }
};
</script>

<style scoped>
.table th, .table td {
  vertical-align: middle;
}

.modal {
  background-color: rgba(0, 0, 0, 0.5);
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

.badge {
  min-width: 2em;
  padding: 0.35em 0.5em;
}
</style>
