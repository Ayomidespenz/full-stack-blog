<template>
  <div class="post-view">
    <!-- Post Header -->
    <header class="post-header py-5 bg-light mb-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-10 mx-auto">
            <h1 class="display-4 fw-bold">{{ post.title }}</h1>
            <div class="d-flex align-items-center mt-4">
              <img :src="post.author.avatar" class="rounded-circle me-3" width="48" height="48" :alt="post.author.name">
              <div>
                <h6 class="mb-0">{{ post.author.name }}</h6>
                <div class="text-muted small">
                  <span class="me-3">{{ formatDate(post.created_at) }}</span>
                  <span>{{ post.reading_time }} min read</span>
                </div>
              </div>
              <div class="ms-auto">
                <button class="btn btn-outline-secondary btn-sm me-2" @click="sharePost">
                  <i class="bi bi-share"></i> Share
                </button>
                <button class="btn btn-outline-danger btn-sm" @click="toggleBookmark">
                  <i :class="isBookmarked ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Post Content -->
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <!-- Featured Image -->
          <div class="post-featured-image mb-5">
            <img :src="post.image" class="img-fluid rounded-3 shadow" :alt="post.title">
          </div>

          <!-- Post Content -->
          <article class="blog-content mb-5" v-html="post.content">
          </article>

          <!-- Tags -->
          <div class="d-flex flex-wrap gap-2 mb-5">
            <span v-for="tag in post.tags" :key="tag.id" class="badge bg-light text-dark">
              #{{ tag.name }}
            </span>
          </div>

          <!-- Like and Share -->
          <div class="d-flex align-items-center justify-content-between mb-5 py-3 border-top border-bottom">
            <button class="btn btn-link text-decoration-none" @click="toggleLike">
              <i :class="isLiked ? 'bi bi-heart-fill text-danger' : 'bi bi-heart'"></i>
              <span class="ms-1">{{ post.likes_count }} {{ post.likes_count === 1 ? 'Like' : 'Likes' }}</span>
            </button>
            <div>
              <a href="#" class="text-muted me-3"><i class="bi bi-twitter"></i></a>
              <a href="#" class="text-muted me-3"><i class="bi bi-facebook"></i></a>
              <a href="#" class="text-muted"><i class="bi bi-linkedin"></i></a>
            </div>
          </div>

          <!-- Comments -->
          <div class="card border-0 shadow-sm mb-5">
            <div class="card-header bg-transparent border-0">
              <h5 class="mb-0">Comments ({{ post.comments_count }})</h5>
            </div>
            <div class="card-body">
              <!-- Comment Form -->
              <div class="mb-4">
                <form @submit.prevent="submitComment">
                  <div class="mb-3">
                    <textarea 
                      v-model="commentForm.content" 
                      class="form-control" 
                      rows="3" 
                      placeholder="Write a comment..."
                      required
                    ></textarea>
                  </div>
                  <div class="d-flex justify-content-end">
                    <button type="submit" class="btn btn-primary">Post Comment</button>
                  </div>
                </form>
              </div>

              <!-- Comments List -->
              <div v-if="comments.length > 0" class="comments-list">
                <div v-for="comment in comments" :key="comment.id" class="comment-item mb-4">
                  <div class="d-flex">
                    <img :src="comment.user.avatar" class="rounded-circle me-3" width="40" height="40" :alt="comment.user.name">
                    <div class="flex-grow-1">
                      <div class="d-flex justify-content-between align-items-center mb-1">
                        <h6 class="mb-0">{{ comment.user.name }}</h6>
                        <small class="text-muted">{{ formatTimeAgo(comment.created_at) }}</small>
                      </div>
                      <p class="mb-2">{{ comment.content }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="text-center py-4">
                <p class="text-muted">No comments yet. Be the first to comment!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostView',
  data() {
    return {
      post: {
        title: 'Getting Started with Vue 3',
        content: `
          <p>Vue 3 is the latest version of the popular JavaScript framework that makes building user interfaces a breeze. In this guide, we'll explore the new features and improvements in Vue 3.</p>
          <h2>Why Vue 3?</h2>
          <p>Vue 3 comes with significant performance improvements, better TypeScript support, and a more maintainable codebase.</p>
        `,
        created_at: '2023-06-15T10:30:00Z',
        reading_time: 5,
        likes_count: 24,
        comments_count: 3,
        image: 'https://via.placeholder.com/1200x675/4e73df/ffffff?text=Vue+3',
        author: {
          name: 'John Doe',
          avatar: 'https://via.placeholder.com/150/4e73df/ffffff?text=JD'
        },
        tags: [
          { id: 1, name: 'Vue.js' },
          { id: 2, name: 'JavaScript' },
          { id: 3, name: 'Frontend' }
        ]
      },
      comments: [
        {
          id: 1,
          content: 'Great article! The Composition API looks really promising.',
          created_at: '2023-06-15T11:30:00Z',
          user: {
            name: 'Jane Smith',
            avatar: 'https://via.placeholder.com/150/ff2d20/ffffff?text=JS'
          }
        }
      ],
      isLiked: false,
      isBookmarked: false,
      commentForm: {
        content: ''
      }
    };
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    formatTimeAgo(dateString) {
      const now = new Date();
      const date = new Date(dateString);
      const seconds = Math.floor((now - date) / 1000);
      
      let interval = Math.floor(seconds / 31536000);
      if (interval > 1) return `${interval} years ago`;
      if (interval === 1) return '1 year ago';
      
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) return `${interval} months ago`;
      if (interval === 1) return '1 month ago';
      
      interval = Math.floor(seconds / 86400);
      if (interval > 1) return `${interval} days ago`;
      if (interval === 1) return '1 day ago';
      
      interval = Math.floor(seconds / 3600);
      if (interval > 1) return `${interval} hours ago`;
      if (interval === 1) return '1 hour ago';
      
      interval = Math.floor(seconds / 60);
      if (interval > 1) return `${interval} minutes ago`;
      if (interval === 1) return '1 minute ago';
      
      return 'Just now';
    },
    toggleLike() {
      this.isLiked = !this.isLiked;
      if (this.isLiked) {
        this.post.likes_count++;
      } else {
        this.post.likes_count--;
      }
    },
    toggleBookmark() {
      this.isBookmarked = !this.isBookmarked;
    },
    sharePost() {
      if (navigator.share) {
        navigator.share({
          title: this.post.title,
          text: 'Check out this article: ' + this.post.title,
          url: window.location.href
        }).catch(console.error);
      } else {
        // Fallback for browsers that don't support Web Share API
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(this.post.title)}&url=${encodeURIComponent(window.location.href)}`;
        window.open(url, '_blank');
      }
    },
    submitComment() {
      if (!this.commentForm.content.trim()) return;
      
      const newComment = {
        id: Date.now(),
        content: this.commentForm.content,
        created_at: new Date().toISOString(),
        user: {
          name: 'Current User',
          avatar: 'https://via.placeholder.com/150/6c757d/ffffff?text=ME'
        }
      };
      
      this.comments.unshift(newComment);
      this.post.comments_count++;
      this.commentForm.content = '';
      
      // TODO: Call API to save comment
    }
  }
};
</script>

<style scoped>
.post-header {
  padding: 4rem 0;
  margin-bottom: 3rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.post-featured-image {
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
}

.blog-content {
  font-size: 1.1rem;
  line-height: 1.8;
}

.blog-content :deep(h2) {
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.blog-content :deep(p) {
  margin-bottom: 1.5rem;
}

.comment-item {
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
}

.badge {
  font-weight: 500;
  padding: 0.35em 0.65em;
}
</style>
