<template>
  <div class="container py-4">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <div class="card shadow-sm">
          <div class="card-header bg-white py-3">
            <h2 class="h5 mb-0">{{ isEditMode ? 'Edit Post' : 'Create New Post' }}</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <!-- Title -->
              <div class="mb-3">
                <label for="title" class="form-label">Post Title</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="title" 
                  v-model="form.title" 
                  required
                >
              </div>

              <!-- Slug -->
              <div class="mb-3">
                <label for="slug" class="form-label">URL Slug</label>
                <div class="input-group">
                  <span class="input-group-text">/blog/</span>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="slug" 
                    v-model="form.slug" 
                    required
                  >
                </div>
                <div class="form-text">URL-friendly version of the title (lowercase, hyphens instead of spaces)</div>
              </div>

              <!-- Excerpt -->
              <div class="mb-3">
                <label for="excerpt" class="form-label">Excerpt</label>
                <textarea 
                  class="form-control" 
                  id="excerpt" 
                  v-model="form.excerpt" 
                  rows="2"
                  maxlength="200"
                ></textarea>
                <div class="form-text">{{ form.excerpt ? form.excerpt.length : 0 }}/200 characters</div>
              </div>

              <!-- Content -->
              <div class="mb-3">
                <label for="content" class="form-label">Content</label>
                <textarea 
                  class="form-control" 
                  id="content" 
                  v-model="form.content" 
                  rows="10"
                  required
                ></textarea>
              </div>

              <!-- Featured Image -->
              <div class="mb-3">
                <label for="featured_image" class="form-label">Featured Image URL</label>
                <input 
                  type="url" 
                  class="form-control" 
                  id="featured_image" 
                  v-model="form.featured_image"
                  placeholder="https://example.com/image.jpg"
                >
                <div v-if="form.featured_image" class="mt-2">
                  <img :src="form.featured_image" alt="Featured preview" class="img-thumbnail" style="max-height: 200px;">
                </div>
              </div>

              <!-- Categories -->
              <div class="mb-3">
                <label class="form-label">Categories</label>
                <div class="d-flex flex-wrap gap-2">
                  <div v-for="category in availableCategories" :key="category.id" class="form-check">
                    <input 
                      class="form-check-input" 
                      type="checkbox" 
                      :value="category.id" 
                      :id="`category-${category.id}`"
                      v-model="form.categories"
                    >
                    <label class="form-check-label" :for="`category-${category.id}`">
                      {{ category.name }}
                    </label>
                  </div>
                </div>
              </div>

              <!-- Tags -->
              <div class="mb-4">
                <label for="tags" class="form-label">Tags (comma-separated)</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="tags" 
                  v-model="tagInput"
                  placeholder="technology, web development, programming"
                >
                <div class="mt-2 d-flex flex-wrap gap-1">
                  <span v-for="(tag, index) in form.tags" :key="index" class="badge bg-secondary me-1">
                    {{ tag }}
                    <button type="button" class="btn-close btn-close-white btn-sm ms-1" @click="removeTag(index)"></button>
                  </span>
                </div>
              </div>

              <!-- Status -->
              <div class="mb-4">
                <label class="form-label">Status</label>
                <div class="form-check">
                  <input 
                    class="form-check-input" 
                    type="radio" 
                    id="draft" 
                    value="draft" 
                    v-model="form.status"
                  >
                  <label class="form-check-label" for="draft">
                    Draft
                  </label>
                </div>
                <div class="form-check">
                  <input 
                    class="form-check-input" 
                    type="radio" 
                    id="published" 
                    value="published" 
                    v-model="form.status"
                  >
                  <label class="form-check-label" for="published">
                    Published
                  </label>
                </div>
              </div>

              <!-- Actions -->
              <div class="d-flex justify-content-between align-items-center">
                <router-link :to="{ name: 'admin.posts' }" class="btn btn-outline-secondary">
                  Cancel
                </router-link>
                <div>
                  <button 
                    type="submit" 
                    class="btn btn-primary"
                    :disabled="loading"
                  >
                    <span v-if="loading" class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                    {{ isEditMode ? 'Update Post' : 'Create Post' }}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

export default {
  name: 'PostFormView',
  props: {
    id: {
      type: [String, Number],
      default: null
    }
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
    const loading = ref(false);
    
    const isEditMode = computed(() => !!props.id);
    
    // Form data
    const form = ref({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featured_image: '',
      categories: [],
      tags: [],
      status: 'draft'
    });
    
    // Available categories (would normally come from an API)
    const availableCategories = ref([
      { id: 1, name: 'Technology' },
      { id: 2, name: 'Web Development' },
      { id: 3, name: 'Programming' },
      { id: 4, name: 'Design' },
      { id: 5, name: 'Business' },
    ]);
    
    // Tags input
    const tagInput = ref('');
    
    // Watch for changes in the title to auto-generate slug
    const generateSlug = (title) => {
      return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')      // Replace spaces with -
        .replace(/-+/g, '-')       // Replace multiple - with single -
        .trim();
    };
    
    // Handle form submission
    const handleSubmit = async () => {
      try {
        loading.value = true;
        
        // Process tags from comma-separated input
        if (tagInput.value) {
          form.value.tags = [
            ...new Set([
              ...form.value.tags,
              ...tagInput.value
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0)
            ])
          ];
          tagInput.value = '';
        }
        
        // Here you would typically make an API call to save the post
        console.log('Submitting post:', form.value);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success message
        toast.success(`Post ${isEditMode.value ? 'updated' : 'created'} successfully!`);
        
        // Redirect to posts list
        router.push({ name: 'admin.posts' });
        
      } catch (error) {
        console.error('Error saving post:', error);
        toast.error(`Failed to ${isEditMode.value ? 'update' : 'create'} post. Please try again.`);
      } finally {
        loading.value = false;
      }
    };
    
    // Remove a tag
    const removeTag = (index) => {
      form.value.tags.splice(index, 1);
    };
    
    // Load post data if in edit mode
    const loadPost = async () => {
      if (!isEditMode.value) return;
      
      try {
        loading.value = true;
        
        // Here you would typically fetch the post data from an API
        console.log('Loading post with ID:', props.id);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data - replace with actual API call
        const mockPost = {
          id: props.id,
          title: 'Sample Blog Post',
          slug: 'sample-blog-post',
          excerpt: 'This is a sample blog post excerpt.',
          content: 'This is the full content of the blog post...',
          featured_image: 'https://via.placeholder.com/1200x630',
          categories: [1, 2],
          tags: ['sample', 'blog', 'post'],
          status: 'draft'
        };
        
        // Update form with post data
        form.value = { ...mockPost };
        
      } catch (error) {
        console.error('Error loading post:', error);
        toast.error('Failed to load post data');
      } finally {
        loading.value = false;
      }
    };
    
    // Watch for changes in the title to auto-generate slug
    watch(() => form.value.title, (newTitle) => {
      if (newTitle && !form.value.slug) {
        form.value.slug = generateSlug(newTitle);
      }
    });
    
    // Load post data when component mounts
    onMounted(() => {
      if (isEditMode.value) {
        loadPost();
      }
    });
    
    return {
      form,
      loading,
      isEditMode,
      availableCategories,
      tagInput,
      handleSubmit,
      removeTag
    };
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
