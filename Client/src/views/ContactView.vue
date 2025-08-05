<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <section class="hero-section py-5 bg-light">
      <div class="container py-5">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="display-4 fw-bold mb-4">Get in Touch</h1>
            <p class="lead mb-4">Have questions or feedback? We'd love to hear from you. Fill out the form or reach out through our social media channels.</p>
            <div class="d-flex gap-3">
              <a href="mailto:contact@blogsite.com" class="btn btn-primary btn-lg px-4">
                <i class="bi bi-envelope me-2"></i> Email Us
              </a>
              <a href="#contact-form" class="btn btn-outline-secondary btn-lg px-4">
                <i class="bi bi-chat-square-text me-2"></i> Send a Message
              </a>
            </div>
          </div>
          <div class="col-lg-6 d-none d-lg-block">
            <img src="@/assets/contact-hero.svg" alt="Contact us illustration" class="img-fluid">
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Info -->
    <section class="py-5">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center p-4">
                <div class="icon-lg bg-primary bg-opacity-10 text-primary rounded-circle mb-4 mx-auto">
                  <i class="bi bi-geo-alt"></i>
                </div>
                <h3 class="h5 mb-3">Our Location</h3>
                <p class="text-muted mb-0">123 Tech Street<br>San Francisco, CA 94107<br>United States</p>
              </div>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center p-4">
                <div class="icon-lg bg-primary bg-opacity-10 text-primary rounded-circle mb-4 mx-auto">
                  <i class="bi bi-envelope"></i>
                </div>
                <h3 class="h5 mb-3">Email Us</h3>
                <p class="text-muted mb-1">General Inquiries</p>
                <a href="mailto:info@blogsite.com" class="text-decoration-none">info@blogsite.com</a>
                <p class="text-muted mb-1 mt-3">Support</p>
                <a href="mailto:support@blogsite.com" class="text-decoration-none">support@blogsite.com</a>
              </div>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center p-4">
                <div class="icon-lg bg-primary bg-opacity-10 text-primary rounded-circle mb-4 mx-auto">
                  <i class="bi bi-telephone"></i>
                </div>
                <h3 class="h5 mb-3">Call Us</h3>
                <p class="text-muted mb-1">Monday - Friday</p>
                <p class="mb-3">9:00 AM - 6:00 PM PST</p>
                <a href="tel:+14155550123" class="btn btn-outline-primary">
                  <i class="bi bi-telephone me-2"></i> +1 (415) 555-0123
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Form -->
    <section class="py-5 bg-light" id="contact-form">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="card border-0 shadow-sm">
              <div class="card-body p-4 p-md-5">
                <h2 class="text-center mb-4">Send Us a Message</h2>
                <form @submit.prevent="submitForm">
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="name" class="form-label">Full Name <span class="text-danger">*</span></label>
                      <input 
                        type="text" 
                        class="form-control" 
                        id="name" 
                        v-model="form.name"
                        required
                      >
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="email" class="form-label">Email Address <span class="text-danger">*</span></label>
                      <input 
                        type="email" 
                        class="form-control" 
                        id="email" 
                        v-model="form.email"
                        required
                      >
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="subject" class="form-label">Subject <span class="text-danger">*</span></label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="subject" 
                      v-model="form.subject"
                      required
                    >
                  </div>
                  <div class="mb-4">
                    <label for="message" class="form-label">Your Message <span class="text-danger">*</span></label>
                    <textarea 
                      class="form-control" 
                      id="message" 
                      rows="5" 
                      v-model="form.message"
                      required
                    ></textarea>
                  </div>
                  <div class="d-grid">
                    <button type="submit" class="btn btn-primary btn-lg" :disabled="isSubmitting">
                      <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map -->
    <section class="py-5">
      <div class="container">
        <div class="ratio ratio-21x9 rounded-3 overflow-hidden shadow-sm">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.035075009416!2d-122.4016636846823!3d37.78400807975789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807f8f5af857%3A0x6a07ee2a2e5b9f1f!2s123%20Tech%20St%2C%20San%20Francisco%2C%20CA%2094107%2C%20USA!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-5 bg-primary text-white">
      <div class="container text-center py-5">
        <h2 class="fw-bold mb-4">Join Our Community</h2>
        <p class="lead mb-4">Connect with us on social media for the latest updates and discussions.</p>
        <div class="d-flex justify-content-center gap-3">
          <a href="#" class="btn btn-light btn-lg px-4"><i class="bi bi-twitter me-2"></i> Twitter</a>
          <a href="#" class="btn btn-light btn-lg px-4"><i class="bi bi-facebook me-2"></i> Facebook</a>
          <a href="#" class="btn btn-light btn-lg px-4"><i class="bi bi-linkedin me-2"></i> LinkedIn</a>
          <a href="#" class="btn btn-light btn-lg px-4"><i class="bi bi-github me-2"></i> GitHub</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ContactView',
  data() {
    return {
      isSubmitting: false,
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    };
  },
  methods: {
    async submitForm() {
      if (this.isSubmitting) return;
      
      try {
        this.isSubmitting = true;
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        this.$toast.success('Your message has been sent successfully! We\'ll get back to you soon.', {
          position: 'top-center',
          duration: 5000
        });
        
        // Reset form
        this.form = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };
        
      } catch (error) {
        this.$toast.error('An error occurred while sending your message. Please try again later.', {
          position: 'top-center',
          duration: 5000
        });
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>

<style scoped>
.hero-section {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.icon-lg {
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin: 0 auto 1.5rem;
}

.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: none !important;
  height: 100%;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1) !important;
}

.bg-primary {
  background-color: #4e73df !important;
}

.form-control {
  padding: 0.75rem 1rem;
  border: 1px solid #e3e6f0;
}

.form-control:focus {
  border-color: #bac8f3;
  box-shadow: 0 0 0 0.25rem rgba(78, 115, 223, 0.25);
}

.btn-outline-primary {
  color: #4e73df;
  border-color: #4e73df;
}

.btn-outline-primary:hover {
  color: #fff;
  background-color: #4e73df;
  border-color: #4e73df;
}

.btn-primary {
  background-color: #4e73df;
  border-color: #4e73df;
}

.btn-primary:hover {
  background-color: #2e59d9;
  border-color: #2653d4;
}

.btn-lg {
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
}

.ratio-21x9 {
  --bs-aspect-ratio: calc(9 / 21 * 100%);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-section {
    text-align: center;
    padding: 3rem 0;
  }
  
  .btn-lg {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}
</style>
