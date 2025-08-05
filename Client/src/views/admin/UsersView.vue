<template>
  <AdminLayout pageTitle="Manage Users">
    <!-- Header with actions -->
    <template #header-actions>
      <router-link to="/admin/users/create" class="btn btn-primary">
        <i class="bi bi-plus-lg me-1"></i> Add User
      </router-link>
    </template>

    <!-- Users Table -->
    <div class="card border-0 shadow-sm">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>
                  <div class="d-flex align-items-center">
                    <img 
                      :src="user.avatar || `https://ui-avatars.com/api/?name=${user.name}`"
                      class="rounded-circle me-2"
                      width="40"
                      height="40"
                    >
                    <div>
                      <div class="fw-semibold">{{ user.name }}</div>
                      <small class="text-muted">@{{ user.username }}</small>
                    </div>
                  </div>
                </td>
                <td>{{ user.email }}</td>
                <td>
                  <span class="badge" :class="getRoleBadgeClass(user.role)">
                    {{ user.role }}
                  </span>
                </td>
                <td>
                  <span class="badge" :class="getStatusBadgeClass(user.status)">
                    {{ user.status }}
                  </span>
                </td>
                <td class="text-end">
                  <div class="btn-group btn-group-sm">
                    <router-link 
                      :to="`/admin/users/${user.id}/edit`" 
                      class="btn btn-outline-primary"
                      title="Edit"
                    >
                      <i class="bi bi-pencil"></i>
                    </router-link>
                    <button 
                      class="btn btn-outline-danger"
                      @click="confirmDelete(user)"
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
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import { ref } from 'vue';
import AdminLayout from '@/layouts/AdminLayout.vue';

export default {
  name: 'UsersView',
  components: {
    AdminLayout
  },
  setup() {
    // Sample data - replace with API calls
    const users = ref([
      {
        id: 1,
        name: 'Admin User',
        username: 'admin',
        email: 'admin@example.com',
        role: 'admin',
        status: 'active',
        avatar: 'https://ui-avatars.com/api/?name=Admin+User'
      },
      {
        id: 2,
        name: 'Editor User',
        username: 'editor',
        email: 'editor@example.com',
        role: 'editor',
        status: 'active'
      },
      {
        id: 3,
        name: 'Author User',
        username: 'author',
        email: 'author@example.com',
        role: 'author',
        status: 'inactive'
      }
    ]);

    const getRoleBadgeClass = (role) => {
      const classes = {
        admin: 'bg-danger bg-opacity-10 text-danger',
        editor: 'bg-primary bg-opacity-10 text-primary',
        author: 'bg-success bg-opacity-10 text-success',
        subscriber: 'bg-secondary bg-opacity-10 text-secondary'
      };
      return classes[role] || 'bg-light text-dark';
    };

    const getStatusBadgeClass = (status) => {
      return status === 'active' 
        ? 'bg-success bg-opacity-10 text-success' 
        : 'bg-secondary bg-opacity-10 text-secondary';
    };

    const confirmDelete = (user) => {
      if (confirm(`Are you sure you want to delete ${user.name}?`)) {
        // In a real app, make API call to delete user
        users.value = users.value.filter(u => u.id !== user.id);
      }
    };

    return {
      users,
      getRoleBadgeClass,
      getStatusBadgeClass,
      confirmDelete
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
</style>
