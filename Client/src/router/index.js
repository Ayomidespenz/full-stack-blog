import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth';
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Home' }
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogView.vue'),
      meta: { title: 'Blog' }
    },
    {
      path: '/blog/:slug',
      name: 'post',
      component: () => import('../views/PostView.vue'),
      meta: { title: 'Post' },
      props: true
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { title: 'About Us' }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: { title: 'Contact Us' }
    },
    // Authentication routes
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
      meta: { title: 'Login', guestOnly: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/RegisterView.vue'),
      meta: { title: 'Register', guestOnly: true }
    },
    // Admin routes
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/DashboardView.vue'),
      meta: { title: 'Admin Dashboard', requiresAuth: true, requiresAdmin: true },
      children: [
        {
          path: 'posts',
          name: 'admin.posts',
          component: () => import('../views/admin/PostsView.vue'),
          meta: { title: 'Manage Posts' }
        },
        {
          path: 'posts/create',
          name: 'admin.posts.create',
          component: () => import('../views/admin/PostFormView.vue'),
          meta: { title: 'Create Post' }
        },
        {
          path: 'posts/:id/edit',
          name: 'admin.posts.edit',
          component: () => import('../views/admin/PostFormView.vue'),
          meta: { title: 'Edit Post' },
          props: true
        },
        {
          path: 'categories',
          name: 'admin.categories',
          component: () => import('../views/admin/CategoriesView.vue'),
          meta: { title: 'Categories' }
        },
        {
          path: 'users',
          name: 'admin.users',
          component: () => import('../views/admin/UsersView.vue'),
          meta: { title: 'Users' }
        },
        {
          path: 'users/create',
          name: 'admin.users.create',
          component: () => import('../views/admin/UserFormView.vue'),
          meta: { title: 'Add New User' }
        },
        {
          path: 'users/:id/edit',
          name: 'admin.users.edit',
          component: () => import('../views/admin/UserFormView.vue'),
          meta: { title: 'Edit User' },
          props: true
        },
        {
          path: 'settings',
          name: 'admin.settings',
          component: () => import('../views/admin/SettingsView.vue'),
          meta: { title: 'Settings' }
        }
      ]
    },
    // 404 Not Found
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/errors/NotFoundView.vue'),
      meta: { title: 'Page Not Found' }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top when navigating to a new route
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// Navigation guard for authentication and authorization
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  
  // Set document title
  document.title = to.meta.title ? `${to.meta.title} | BlogSite` : 'BlogSite';
  
  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if user is authenticated
    const isAuthenticated = await authStore.checkAuth();
    
    if (!isAuthenticated) {
      // Redirect to login with the attempted URL as a query parameter
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
      return;
    }
    
    // Check for admin role if required
    if (to.matched.some(record => record.meta.requiresAdmin) && !authStore.isAdmin) {
      next({ name: 'home' }); // Or to a 'not authorized' page
      return;
    }
  }
  
  // Redirect to home if user is authenticated and tries to access guest-only routes
  if (to.matched.some(record => record.meta.guestOnly) && authStore.isAuthenticated) {
    next({ name: 'home' });
    return;
  }
  
  next();
});

// Handle 404 errors
router.onError((error) => {
  if (error.message.includes('Failed to fetch dynamically imported module')) {
    window.location.reload();
  }
});

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = false // TODO: Replace with actual auth check
  const isAdmin = false // TODO: Replace with actual admin check
  
  // Redirect to login if route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } 
  // Redirect to home if user is authenticated and tries to access guest-only routes
  else if (to.matched.some(record => record.meta.guestOnly) && isAuthenticated) {
    next({ name: 'home' })
  }
  // Redirect to home if user is not admin and tries to access admin routes
  else if (to.matched.some(record => record.meta.requiresAdmin) && !isAdmin) {
    next({ name: 'home' })
  } 
  else {
    next()
  }
})

export default router
