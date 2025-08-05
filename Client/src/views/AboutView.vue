<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="hero-section py-5 bg-light">
      <div class="container py-5">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="display-4 fw-bold mb-4">About Our Blog</h1>
            <p class="lead mb-4">Sharing knowledge, inspiring creativity, and building a community of passionate learners and creators.</p>
            <router-link to="/blog" class="btn btn-primary btn-lg px-4">Read Our Blog</router-link>
          </div>
          <div class="col-lg-6 d-none d-lg-block">
            <img src="@/assets/about-hero.svg" alt="About us illustration" class="img-fluid">
          </div>
        </div>
      </div>
    </section>

    <!-- Our Story -->
    <section class="py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h2 class="fw-bold mb-4">Our Story</h2>
            <p class="lead text-muted mb-5">
              Founded in 2023, our blog started as a small project to share knowledge about web development and technology. 
              Today, we've grown into a vibrant community of developers, designers, and tech enthusiasts from around the world.
            </p>
          </div>
        </div>
        
        <div class="row g-4">
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center p-4">
                <div class="icon-lg bg-primary bg-opacity-10 text-primary rounded-circle mb-4 mx-auto">
                  <i class="bi bi-lightbulb"></i>
                </div>
                <h3 class="h5">Our Mission</h3>
                <p class="text-muted">To provide high-quality, practical content that helps developers at all levels improve their skills and stay updated with the latest technologies.</p>
              </div>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center p-4">
                <div class="icon-lg bg-primary bg-opacity-10 text-primary rounded-circle mb-4 mx-auto">
                  <i class="bi bi-people"></i>
                </div>
                <h3 class="h5">Our Community</h3>
                <p class="text-muted">We believe in the power of community. Join thousands of developers who share knowledge and help each other grow.</p>
              </div>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center p-4">
                <div class="icon-lg bg-primary bg-opacity-10 text-primary rounded-circle mb-4 mx-auto">
                  <i class="bi bi-rocket"></i>
                </div>
                <h3 class="h5">Our Vision</h3>
                <p class="text-muted">To be the go-to resource for developers seeking to learn, share, and connect in the ever-evolving world of technology.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="fw-bold mb-3">Meet Our Team</h2>
          <p class="lead text-muted">The passionate people behind the scenes</p>
        </div>
        
        <div class="row g-4">
          <div v-for="member in teamMembers" :key="member.id" class="col-md-4">
            <div class="card h-100 border-0 shadow-sm text-center">
              <img :src="member.avatar" class="card-img-top rounded-circle mx-auto mt-4" style="width: 150px; height: 150px; object-fit: cover;" :alt="member.name">
              <div class="card-body">
                <h3 class="h5 mb-1">{{ member.name }}</h3>
                <p class="text-primary mb-3">{{ member.role }}</p>
                <p class="text-muted">{{ member.bio }}</p>
                <div class="d-flex justify-content-center gap-3">
                  <a v-if="member.twitter" :href="member.twitter" target="_blank" class="text-muted"><i class="bi bi-twitter"></i></a>
                  <a v-if="member.github" :href="member.github" target="_blank" class="text-muted"><i class="bi bi-github"></i></a>
                  <a v-if="member.linkedin" :href="member.linkedin" target="_blank" class="text-muted"><i class="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-5 bg-primary text-white">
      <div class="container text-center py-5">
        <h2 class="fw-bold mb-4">Ready to join our community?</h2>
        <p class="lead mb-4">Start reading our latest articles or contribute your own content.</p>
        <div class="d-flex justify-content-center gap-3">
          <router-link to="/blog" class="btn btn-light btn-lg px-4">Read Blog</router-link>
          <router-link to="/contact" class="btn btn-outline-light btn-lg px-4">Contact Us</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
  data() {
    return {
      teamMembers: [
        {
          id: 1,
          name: 'John Doe',
          role: 'Founder & Lead Developer',
          bio: 'Passionate about Vue.js and open source. Loves to share knowledge with the community.',
          avatar: 'https://via.placeholder.com/150/4e73df/ffffff?text=JD',
          twitter: '#',
          github: '#',
          linkedin: '#'
        },
        {
          id: 2,
          name: 'Jane Smith',
          role: 'Editor in Chief',
          bio: 'Tech writer and content strategist with a love for clean code and great documentation.',
          avatar: 'https://via.placeholder.com/150/ff2d20/ffffff?text=JS',
          twitter: '#',
          linkedin: '#'
        },
        {
          id: 3,
          name: 'Alex Johnson',
          role: 'UI/UX Designer',
          bio: 'Designing beautiful and intuitive user experiences that make technology accessible to everyone.',
          avatar: 'https://via.placeholder.com/150/6f42c1/ffffff?text=AJ',
          twitter: '#',
          github: '#',
          dribbble: '#'
        }
      ]
    };
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
  margin: 0 auto;
}

.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: none !important;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1) !important;
}

.team-member img {
  border: 5px solid #fff;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

.bg-primary {
  background-color: #4e73df !important;
}

.btn-outline-light:hover {
  color: #4e73df;
}
</style>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
