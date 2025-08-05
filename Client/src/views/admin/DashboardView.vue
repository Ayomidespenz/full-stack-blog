<template>
  <AdminLayout pageTitle="Dashboard">
    <div class="row">
      <!-- Stats Cards -->
      <div class="col-12 col-sm-6 col-xl-3 mb-4">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="bg-primary bg-opacity-10 p-3 rounded-3 me-3">
                <i class="bi bi-file-earmark-post fs-3 text-primary"></i>
              </div>
              <div>
                <h6 class="mb-0 text-muted">Total Posts</h6>
                <h3 class="mb-0 mt-1">1,234</h3>
              </div>
            </div>
          </div>
          <div class="card-footer bg-transparent border-0 pt-0">
            <a href="#" class="text-decoration-none small">
              View all posts <i class="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3 mb-4">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="bg-success bg-opacity-10 p-3 rounded-3 me-3">
                <i class="bi bi-people fs-3 text-success"></i>
              </div>
              <div>
                <h6 class="mb-0 text-muted">Total Users</h6>
                <h3 class="mb-0 mt-1">542</h3>
              </div>
            </div>
          </div>
          <div class="card-footer bg-transparent border-0 pt-0">
            <a href="#" class="text-decoration-none small">
              View all users <i class="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3 mb-4">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="bg-warning bg-opacity-10 p-3 rounded-3 me-3">
                <i class="bi bi-chat-square-text fs-3 text-warning"></i>
              </div>
              <div>
                <h6 class="mb-0 text-muted">Comments</h6>
                <h3 class="mb-0 mt-1">3,456</h3>
              </div>
            </div>
          </div>
          <div class="card-footer bg-transparent border-0 pt-0">
            <a href="#" class="text-decoration-none small">
              View all comments <i class="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3 mb-4">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="bg-info bg-opacity-10 p-3 rounded-3 me-3">
                <i class="bi bi-eye fs-3 text-info"></i>
              </div>
              <div>
                <h6 class="mb-0 text-muted">Page Views</h6>
                <h3 class="mb-0 mt-1">24,567</h3>
              </div>
            </div>
          </div>
          <div class="card-footer bg-transparent border-0 pt-0">
            <a href="#" class="text-decoration-none small">
              View analytics <i class="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <!-- Recent Posts -->
      <div class="col-12 col-xl-8 mb-4">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-header bg-white border-0 pt-4 pb-3">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Recent Posts</h5>
              <router-link to="/admin/posts" class="btn btn-sm btn-outline-primary">
                View All
              </router-link>
            </div>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead class="table-light">
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Categories</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th class="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="post in recentPosts" :key="post.id">
                    <td>
                      <div class="d-flex align-items-center">
                        <img 
                          :src="post.thumbnail || 'https://via.placeholder.com/40x40'" 
                          alt="Post thumbnail" 
                          class="rounded me-2"
                          width="40"
                          height="40"
                        >
                        <div>
                          <div class="fw-semibold">{{ post.title }}</div>
                          <small class="text-muted">{{ post.excerpt }}</small>
                        </div>
                      </div>
                    </td>
                    <td>{{ post.author }}</td>
                    <td>
                      <span 
                        v-for="(category, index) in post.categories" 
                        :key="index"
                        class="badge bg-light text-dark me-1 mb-1"
                      >
                        {{ category }}
                      </span>
                    </td>
                    <td>{{ post.date }}</td>
                    <td>
                      <span :class="`badge bg-${post.status === 'published' ? 'success' : 'secondary'}`">
                        {{ post.status }}
                      </span>
                    </td>
                    <td class="text-end">
                      <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-primary" title="Edit">
                          <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-outline-danger" title="Delete">
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
      </div>

      <!-- Quick Stats & Activity -->
      <div class="col-12 col-xl-4">
        <!-- Quick Stats -->
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-header bg-white border-0 pt-4 pb-3">
            <h5 class="mb-0">Quick Stats</h5>
          </div>
          <div class="card-body">
            <div class="list-group list-group-flush">
              <div class="list-group-item d-flex justify-content-between align-items-center px-0">
                <div>
                  <i class="bi bi-file-earmark-text me-2 text-primary"></i>
                  Drafts
                </div>
                <span class="badge bg-primary rounded-pill">12</span>
              </div>
              <div class="list-group-item d-flex justify-content-between align-items-center px-0">
                <div>
                  <i class="bi bi-chat-square-text me-2 text-warning"></i>
                  Pending Comments
                </div>
                <span class="badge bg-warning rounded-pill">8</span>
              </div>
              <div class="list-group-item d-flex justify-content-between align-items-center px-0">
                <div>
                  <i class="bi bi-people me-2 text-info"></i>
                  New Users (7 days)
                </div>
                <span class="badge bg-info rounded-pill">24</span>
              </div>
              <div class="list-group-item d-flex justify-content-between align-items-center px-0">
                <div>
                  <i class="bi bi-bar-chart me-2 text-success"></i>
                  Monthly Visitors
                </div>
                <span class="badge bg-success rounded-pill">12.5k</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white border-0 pt-4 pb-3">
            <h5 class="mb-0">Recent Activity</h5>
          </div>
          <div class="card-body p-0">
            <div class="list-group list-group-flush">
              <div 
                v-for="(activity, index) in recentActivities" 
                :key="index"
                class="list-group-item border-0 py-3"
              >
                <div class="d-flex">
                  <div class="flex-shrink-0 me-3">
                    <img 
                      :src="activity.user.avatar || 'https://ui-avatars.com/api/?name=' + activity.user.name" 
                      alt="User" 
                      class="rounded-circle" 
                      width="40" 
                      height="40"
                    >
                  </div>
                  <div class="flex-grow-1">
                    <div class="d-flex justify-content-between">
                      <h6 class="mb-1">{{ activity.user.name }}</h6>
                      <small class="text-muted">{{ activity.time }}</small>
                    </div>
                    <p class="mb-1 small">{{ activity.action }}</p>
                    <small class="text-muted">
                      <i class="bi bi-clock me-1"></i> {{ activity.date }}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer bg-white border-0 pt-0 pb-4">
            <a href="#" class="btn btn-sm btn-outline-primary w-100">View All Activity</a>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from '@/layouts/AdminLayout.vue';

export default {
  name: 'DashboardView',
  components: {
    AdminLayout
  },
  data() {
    return {
      recentPosts: [
        {
          id: 1,
          title: 'Getting Started with Vue 3',
          excerpt: 'Learn the basics of Vue 3 and how to build your first application',
          author: 'John Doe',
          categories: ['Vue', 'JavaScript'],
          date: 'May 15, 2023',
          status: 'published',
          thumbnail: 'https://via.placeholder.com/40x40'
        },
        {
          id: 2,
          title: 'Advanced Laravel Techniques',
          excerpt: 'Master advanced Laravel concepts and improve your backend skills',
          author: 'Jane Smith',
          categories: ['Laravel', 'PHP'],
          date: 'May 14, 2023',
          status: 'draft',
          thumbnail: 'https://via.placeholder.com/40x40'
        },
        {
          id: 3,
          title: 'Responsive Design with Bootstrap 5',
          excerpt: 'Create beautiful, responsive websites with the latest Bootstrap',
          author: 'Mike Johnson',
          categories: ['CSS', 'Bootstrap', 'Design'],
          date: 'May 12, 2023',
          status: 'published',
          thumbnail: 'https://via.placeholder.com/40x40'
        },
        {
          id: 4,
          title: 'Introduction to RESTful APIs',
          excerpt: 'Learn how to design and build RESTful APIs with best practices',
          author: 'Sarah Williams',
          categories: ['API', 'Backend', 'Development'],
          date: 'May 10, 2023',
          status: 'published',
          thumbnail: 'https://via.placeholder.com/40x40'
        }
      ],
      recentActivities: [
        {
          user: {
            name: 'John Doe',
            avatar: 'https://ui-avatars.com/api/?name=John+Doe'
          },
          action: 'Published a new post: Getting Started with Vue 3',
          time: '5 min ago',
          date: 'Today, 10:30 AM'
        },
        {
          user: {
            name: 'Jane Smith',
            avatar: 'https://ui-avatars.com/api/?name=Jane+Smith'
          },
          action: 'Updated the category: Web Development',
          time: '2 hours ago',
          date: 'Today, 8:45 AM'
        },
        {
          user: {
            name: 'Mike Johnson',
            avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson'
          },
          action: 'Commented on: Responsive Design with Bootstrap 5',
          time: '1 day ago',
          date: 'Yesterday, 3:20 PM'
        },
        {
          user: {
            name: 'Sarah Williams',
            avatar: 'https://ui-avatars.com/api/?name=Sarah+Williams'
          },
          action: 'Created a new draft: Introduction to RESTful APIs',
          time: '2 days ago',
          date: 'May 13, 2023, 9:15 AM'
        }
      ]
    };
  },
  methods: {
    // Methods will be added here
  }
};
</script>

<style scoped>
.card {
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1) !important;
}

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

.list-group-item {
  border-left: 0;
  border-right: 0;
  padding: 0.75rem 0;
}

.list-group-item:first-child {
  border-top: 0;
  padding-top: 0;
}

.list-group-item:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.badge {
  font-weight: 500;
  padding: 0.35em 0.65em;
}

.bg-light {
  background-color: #f8f9fa !important;
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
}
</style>
