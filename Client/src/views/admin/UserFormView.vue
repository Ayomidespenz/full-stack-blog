<template>
  <AdminLayout :pageTitle="isEditMode ? 'Edit User' : 'Add New User'">
    <form @submit.prevent="handleSubmit">
      <div class="row">
        <div class="col-lg-8">
          <div class="card border-0 shadow-sm mb-4">
            <div class="card-body">
              <div class="mb-3">
                <label for="name" class="form-label">Full Name <span class="text-danger">*</span></label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="name" 
                  v-model="form.name"
                  required
                >
                <div class="invalid-feedback" v-if="errors.name">
                  {{ errors.name }}
                </div>
              </div>
              
              <div class="mb-3">
                <label for="username" class="form-label">Username <span class="text-danger">*</span></label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="username" 
                  v-model="form.username"
                  :disabled="isEditMode"
                  required
                >
                <div class="form-text">Usernames cannot be changed.</div>
                <div class="invalid-feedback" v-if="errors.username">
                  {{ errors.username }}
                </div>
              </div>
              
              <div class="mb-3">
                <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
                <input 
                  type="email" 
                  class="form-control" 
                  id="email" 
                  v-model="form.email"
                  required
                >
                <div class="invalid-feedback" v-if="errors.email">
                  {{ errors.email }}
                </div>
              </div>
              
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="password" class="form-label">
                      {{ isEditMode ? 'New ' : '' }}Password
                      <span v-if="!isEditMode" class="text-danger">*</span>
                    </label>
                    <input 
                      :type="showPassword ? 'text' : 'password'" 
                      class="form-control" 
                      id="password" 
                      v-model="form.password"
                      :required="!isEditMode"
                    >
                    <div class="form-text">
                      <a href="#" @click.prevent="generatePassword" class="small">
                        <i class="bi bi-shuffle me-1"></i>Generate password
                      </a>
                    </div>
                    <div class="invalid-feedback" v-if="errors.password">
                      {{ errors.password }}
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="password_confirmation" class="form-label">
                      {{ isEditMode ? 'Confirm New ' : '' }}Password
                      <span v-if="!isEditMode" class="text-danger">*</span>
                    </label>
                    <div class="input-group">
                      <input 
                        :type="showPassword ? 'text' : 'password'" 
                        class="form-control" 
                        id="password_confirmation" 
                        v-model="form.password_confirmation"
                        :required="!isEditMode"
                      >
                      <button 
                        class="btn btn-outline-secondary" 
                        type="button"
                        @click="showPassword = !showPassword"
                        :title="showPassword ? 'Hide password' : 'Show password'"
                      >
                        <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="mb-3">
                <label for="bio" class="form-label">Biographical Info</label>
                <textarea 
                  class="form-control" 
                  id="bio" 
                  rows="4" 
                  v-model="form.bio"
                ></textarea>
                <div class="form-text">Share a little biographical information to fill out your profile.</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-lg-4">
          <!-- Profile Picture -->
          <div class="card border-0 shadow-sm mb-4">
            <div class="card-header bg-white py-3">
              <h6 class="mb-0">Profile Picture</h6>
            </div>
            <div class="card-body text-center">
              <div class="mb-3">
                <img 
                  :src="form.avatar || 'https://ui-avatars.com/api/?name=' + form.name" 
                  class="rounded-circle" 
                  width="128" 
                  height="128"
                  alt="Profile"
                >
              </div>
              <div class="d-grid gap-2">
                <button type="button" class="btn btn-outline-primary btn-sm">
                  <i class="bi bi-upload me-1"></i> Upload New
                </button>
                <button 
                  type="button" 
                  class="btn btn-outline-danger btn-sm"
                  :disabled="!form.avatar"
                >
                  <i class="bi bi-trash me-1"></i> Remove
                </button>
              </div>
            </div>
          </div>
          
          <!-- User Role -->
          <div class="card border-0 shadow-sm mb-4">
            <div class="card-header bg-white py-3">
              <h6 class="mb-0">Role</h6>
            </div>
            <div class="card-body">
              <select class="form-select" v-model="form.role">
                <option v-for="role in roles" :key="role.id" :value="role.id">
                  {{ role.name }}
                </option>
              </select>
              <div class="form-text">
                {{ getRoleDescription(form.role) }}
              </div>
            </div>
          </div>
          
          <!-- Account Status -->
          <div class="card border-0 shadow-sm mb-4">
            <div class="card-header bg-white py-3">
              <h6 class="mb-0">Account Status</h6>
            </div>
            <div class="card-body">
              <div class="form-check mb-2">
                <input 
                  class="form-check-input" 
                  type="radio" 
                  id="active" 
                  value="active" 
                  v-model="form.status"
                >
                <label class="form-check-label" for="active">
                  Active
                </label>
              </div>
              <div class="form-check mb-2">
                <input 
                  class="form-check-input" 
                  type="radio" 
                  id="inactive" 
                  value="inactive" 
                  v-model="form.status"
                >
                <label class="form-check-label" for="inactive">
                  Inactive
                </label>
              </div>
              <div class="form-check">
                <input 
                  class="form-check-input" 
                  type="radio" 
                  id="suspended" 
                  value="suspended" 
                  v-model="form.status"
                >
                <label class="form-check-label" for="suspended">
                  Suspended
                </label>
              </div>
            </div>
          </div>
          
          <!-- Form Actions -->
          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary" :disabled="saving">
              <span v-if="saving" class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
              {{ isEditMode ? 'Update User' : 'Add New User' }}
            </button>
            <router-link to="/admin/users" class="btn btn-outline-secondary">
              Cancel
            </router-link>
          </div>
        </div>
      </div>
    </form>
  </AdminLayout>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AdminLayout from '@/layouts/AdminLayout.vue';

export default {
  name: 'UserFormView',
  components: {
    AdminLayout
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    
    const isEditMode = computed(() => route.name === 'admin.users.edit');
    const userId = computed(() => route.params.id);
    
    const roles = ref([
      { 
        id: 'administrator', 
        name: 'Administrator',
        description: 'Full access to the site administration features.'
      },
      { 
        id: 'editor', 
        name: 'Editor',
        description: 'Can publish and manage posts including the posts of other users.'
      },
      { 
        id: 'author', 
        name: 'Author',
        description: 'Can publish and manage their own posts.'
      },
      { 
        id: 'contributor', 
        name: 'Contributor',
        description: 'Can write and manage their own posts but cannot publish them.'
      },
      { 
        id: 'subscriber', 
        name: 'Subscriber',
        description: 'Can only manage their profile.'
      }
    ]);
    
    const form = ref({
      name: '',
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      bio: '',
      avatar: '',
      role: 'subscriber',
      status: 'active'
    });
    
    const errors = ref({});
    const saving = ref(false);
    const showPassword = ref(false);
    
    // Load user data if in edit mode
    const loadUserData = () => {
      if (!isEditMode.value) return;
      
      // In a real app, fetch user data from API
      // This is just a mock implementation
      const mockUser = {
        id: userId.value,
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        bio: 'Web developer and blogger',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        role: 'administrator',
        status: 'active',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z'
      };
      
      // Update form with user data
      Object.keys(form.value).forEach(key => {
        if (key in mockUser) {
          form.value[key] = mockUser[key];
        }
      });
      
      // Clear password fields
      form.value.password = '';
      form.value.password_confirmation = '';
    };
    
    // Generate a random password
    const generatePassword = () => {
      const length = 12;
      const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
      let password = '';
      
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
      }
      
      form.value.password = password;
      form.value.password_confirmation = password;
      showPassword.value = true;
    };
    
    // Get role description
    const getRoleDescription = (roleId) => {
      const role = roles.value.find(r => r.id === roleId);
      return role ? role.description : '';
    };
    
    // Handle form submission
    const handleSubmit = async () => {
      // Reset errors
      errors.value = {};
      saving.value = true;
      
      try {
        // In a real app, make API call to save user
        console.log('Saving user:', form.value);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success message
        // In a real app, you would show a toast notification
        console.log('User saved successfully');
        
        // Redirect to users list
        router.push('/admin/users');
        
      } catch (error) {
        console.error('Error saving user:', error);
        
        // In a real app, handle API errors and update errors object
        // This is just a mock implementation
        if (error.response && error.response.data.errors) {
          errors.value = error.response.data.errors;
        } else {
          // Show generic error message
          // In a real app, you would show a toast notification
          console.error('An error occurred while saving the user.');
        }
      } finally {
        saving.value = false;
      }
    };
    
    // Load user data when component is mounted
    onMounted(() => {
      if (isEditMode.value) {
        loadUserData();
      }
    });
    
    return {
      // State
      form,
      errors,
      saving,
      roles,
      showPassword,
      
      // Computed
      isEditMode,
      
      // Methods
      generatePassword,
      getRoleDescription,
      handleSubmit
    };
  }
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
