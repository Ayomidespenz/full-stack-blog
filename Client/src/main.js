// CSS Imports
import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

// JS Imports
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Import Bootstrap JS (required for components that use JS)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Create the Vue app
const app = createApp(App)

// Use plugins
app.use(createPinia())
app.use(router)

// Mount the app
app.mount('#app')

// Log app initialization
console.log('App initialized with Bootstrap 5.3.0')
