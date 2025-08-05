<template>
  <div class="container-fluid">
    <!-- Page Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 mb-0">Settings</h1>
      <button 
        class="btn btn-primary" 
        @click="saveSettings"
        :disabled="saving"
      >
        <span v-if="saving" class="spinner-border spinner-border-sm me-1"></span>
        Save Changes
      </button>
    </div>

    <div class="row">
      <div class="col-lg-8">
        <div class="card mb-4">
          <div class="card-header">
            <h5 class="mb-0">General Settings</h5>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label for="siteTitle" class="form-label">Site Title</label>
              <input 
                type="text" 
                class="form-control" 
                id="siteTitle"
                v-model="settings.site_title"
              >
            </div>
            <div class="mb-3">
              <label for="siteDescription" class="form-label">Site Description</label>
              <textarea 
                class="form-control" 
                id="siteDescription"
                v-model="settings.site_description"
                rows="3"
              ></textarea>
            </div>
            <div class="mb-3">
              <label for="siteUrl" class="form-label">Site URL</label>
              <input 
                type="url" 
                class="form-control" 
                id="siteUrl"
                v-model="settings.site_url"
              >
            </div>
            <div class="mb-3">
              <label for="adminEmail" class="form-label">Admin Email</label>
              <input 
                type="email" 
                class="form-control" 
                id="adminEmail"
                v-model="settings.admin_email"
              >
            </div>
          </div>
        </div>

        <div class="card mb-4">
          <div class="card-header">
            <h5 class="mb-0">Reading Settings</h5>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label for="postsPerPage" class="form-label">Posts Per Page</label>
              <input 
                type="number" 
                class="form-control" 
                id="postsPerPage"
                v-model.number="settings.posts_per_page"
                min="1"
                max="100"
              >
            </div>
            <div class="form-check form-switch mb-3">
              <input 
                class="form-check-input" 
                type="checkbox" 
                id="showFeaturedPosts"
                v-model="settings.show_featured_posts"
              >
              <label class="form-check-label" for="showFeaturedPosts">
                Show Featured Posts on Homepage
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="card mb-4">
          <div class="card-header">
            <h5 class="mb-0">Media Settings</h5>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label for="maxUploadSize" class="form-label">Max Upload Size (MB)</label>
              <input 
                type="number" 
                class="form-control" 
                id="maxUploadSize"
                v-model.number="settings.max_upload_size"
                min="1"
                max="100"
              >
            </div>
            <div class="mb-3">
              <label for="imageSizes" class="form-label">Image Sizes</label>
              <div class="form-text mb-2">
                Thumbnail size: {{ settings.thumbnail_width }} &times; {{ settings.thumbnail_height }}px
              </div>
              <div class="form-text">
                Medium size: {{ settings.medium_width }} &times; {{ settings.medium_height }}px
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">Discussion Settings</h5>
          </div>
          <div class="card-body">
            <div class="form-check form-switch mb-3">
              <input 
                class="form-check-input" 
                type="checkbox" 
                id="allowComments"
                v-model="settings.allow_comments"
              >
              <label class="form-check-label" for="allowComments">
                Allow Comments
              </label>
            </div>
            <div class="form-check form-switch mb-3">
              <input 
                class="form-check-input" 
                type="checkbox" 
                id="commentApproval"
                v-model="settings.comment_approval"
                :disabled="!settings.allow_comments"
              >
              <label class="form-check-label" for="commentApproval">
                Comments Need Approval
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';

export default {
  name: 'SettingsView',
  setup() {
    const toast = useToast();
    const saving = ref(false);
    
    // Default settings
    const settings = ref({
      // General
      site_title: 'My Blog',
      site_description: 'A modern blog platform',
      site_url: window.location.origin,
      admin_email: '',
      
      // Reading
      posts_per_page: 10,
      show_featured_posts: true,
      
      // Media
      max_upload_size: 10, // MB
      thumbnail_width: 150,
      thumbnail_height: 150,
      medium_width: 300,
      medium_height: 200,
      
      // Discussion
      allow_comments: true,
      comment_approval: true
    });

    // Load settings from API
    const loadSettings = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await axios.get('/api/settings');
        // settings.value = { ...settings.value, ...response.data };
        
        // For now, load from localStorage or use defaults
        const savedSettings = localStorage.getItem('blog_settings');
        if (savedSettings) {
          settings.value = { ...settings.value, ...JSON.parse(savedSettings) };
        }
      } catch (error) {
        console.error('Error loading settings:', error);
        toast.error('Failed to load settings');
      }
    };

    // Save settings to API
    const saveSettings = async () => {
      try {
        saving.value = true;
        
        // TODO: Replace with actual API call
        // await axios.post('/api/settings', settings.value);
        
        // For now, save to localStorage
        localStorage.setItem('blog_settings', JSON.stringify(settings.value));
        
        toast.success('Settings saved successfully');
      } catch (error) {
        console.error('Error saving settings:', error);
        toast.error('Failed to save settings');
      } finally {
        saving.value = false;
      }
    };

    // Load settings when component mounts
    onMounted(() => {
      loadSettings();
    });

    return {
      settings,
      saving,
      saveSettings
    };
  }
};
</script>

<style scoped>
.form-check-input:checked {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.form-switch .form-check-input {
  width: 2.5em;
  margin-left: -2.7em;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%280, 0, 0, 0.25%29'/%3e%3c/svg%3e");
  background-position: left center;
  border-radius: 2em;
  transition: background-position 0.15s ease-in-out;
}

.form-switch .form-check-input:checked {
  background-position: right center;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
}

.card {
  margin-bottom: 1.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  border: none;
}

.card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding: 1rem 1.25rem;
}

.card-header h5 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}

.card-body {
  padding: 1.25rem;
}

.form-label {
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.form-control, .form-select {
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid #dee2e6;
}

.form-control:focus, .form-select:focus {
  border-color: #86b7fe;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.btn-primary {
  background-color: #0d6efd;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
}

.btn-primary:hover {
  background-color: #0b5ed7;
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-primary:disabled {
  background-color: #86b7fe;
  transform: none;
  cursor: not-allowed;
}

.spinner-border {
  width: 1rem;
  height: 1rem;
  border-width: 0.2em;
}

.text-success {
  color: #198754;
}

.text-danger {
  color: #dc3545;
}

.mb-3 {
  margin-bottom: 1rem !important;
}

.mb-4 {
  margin-bottom: 1.5rem !important;
}

.mt-2 {
  margin-top: 0.5rem !important;
}

.mt-3 {
  margin-top: 1rem !important;
}

.mt-4 {
  margin-top: 1.5rem !important;
}

.mb-2 {
  margin-bottom: 0.5rem !important;
}

.mr-2 {
  margin-right: 0.5rem !important;
}

.ml-2 {
  margin-left: 0.5rem !important;
}

.p-3 {
  padding: 1rem !important;
}

.pt-2 {
  padding-top: 0.5rem !important;
}

.pb-2 {
  padding-bottom: 0.5rem !important;
}

.pl-2 {
  padding-left: 0.5rem !important;
}

.pr-2 {
  padding-right: 0.5rem !important;
}

.w-100 {
  width: 100% !important;
}

.h-100 {
  height: 100% !important;
}

.d-flex {
  display: flex !important;
}

.justify-content-between {
  justify-content: space-between !important;
}

.align-items-center {
  align-items: center !important;
}

.flex-column {
  flex-direction: column !important;
}

.text-center {
  text-align: center !important;
}

.text-right {
  text-align: right !important;
}

.text-left {
  text-align: left !important;
}

.form-text {
  font-size: 0.875em;
  color: #6c757d;
}

.invalid-feedback {
  display: none;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #dc3545;
}

.was-validated .form-control:invalid ~ .invalid-feedback,
.form-control.is-invalid ~ .invalid-feedback,
.was-validated .form-select:invalid ~ .invalid-feedback,
.form-select.is-invalid ~ .invalid-feedback {
  display: block;
}

.was-validated .form-control:invalid,
.form-control.is-invalid,
.was-validated .form-select:invalid,
.form-select.is-invalid {
  border-color: #dc3545;
  padding-right: calc(1.5em + 0.75rem);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right calc(0.375em + 0.1875rem) center;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}

.alert {
  position: relative;
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.375rem;
}

.alert-success {
  color: #0f5132;
  background-color: #d1e7dd;
  border-color: #badbcc;
}

.alert-danger {
  color: #842029;
  background-color: #f8d7da;
  border-color: #f5c2c7;
}

.alert-dismissible {
  padding-right: 3rem;
}

.alert-dismissible .btn-close {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  padding: 1.25rem 1rem;
}

.badge {
  display: inline-block;
  padding: 0.35em 0.65em;
  font-size: 0.75em;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.375rem;
}

.badge.bg-primary {
  background-color: #0d6efd !important;
}

.badge.bg-secondary {
  background-color: #6c757d !important;
}

.badge.bg-success {
  background-color: #198754 !important;
}

.badge.bg-danger {
  background-color: #dc3545 !important;
}

.badge.bg-warning {
  background-color: #ffc107 !important;
  color: #000;
}

.badge.bg-info {
  background-color: #0dcaf0 !important;
  color: #000;
}

.badge.bg-light {
  background-color: #f8f9fa !important;
  color: #000;
}

.badge.bg-dark {
  background-color: #212529 !important;
}

.badge.rounded-pill {
  padding-right: 0.6em;
  padding-left: 0.6em;
  border-radius: 10rem;
}

.badge-sm {
  font-size: 0.65em;
  padding: 0.2em 0.4em;
}

.badge-lg {
  font-size: 0.9em;
  padding: 0.5em 0.8em;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .card-body {
    padding: 1rem;
  }
  
  .container-fluid {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  body {
    background-color: #1a1a1a;
    color: #f8f9fa;
  }
  
  .card {
    background-color: #2d2d2d;
    color: #f8f9fa;
  }
  
  .card-header {
    background-color: #333;
    border-bottom-color: #444;
  }
  
  .form-control, .form-select {
    background-color: #333;
    border-color: #444;
    color: #f8f9fa;
  }
  
  .form-control:focus, .form-select:focus {
    background-color: #333;
    border-color: #86b7fe;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  }
  
  .form-control::placeholder {
    color: #6c757d;
  }
  
  .form-text {
    color: #adb5bd;
  }
  
  .text-muted {
    color: #adb5bd !important;
  }
}
</style>
