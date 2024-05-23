<template>
  <div class="container">
    <div v-if="post" class="post-container">
      <div class="post-header">
        <h1 class="post-title">{{ post.title }}</h1>
        <div class="post-meta">
          <p class="post-author"><strong>Author:</strong> {{ post.user ? post.user.name : 'Unknown' }}</p>
          <p class="post-date"><strong>Created At:</strong> {{ formatDate(post.created_at) }}</p>
        </div>
      </div>
      <div class="post-body">
        <p>{{ post.body }}</p>
      </div>
      <div class="post-footer">
        <router-link class="nav-brand" to="/home">← Go Back to NewsFeed</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from '@/config';
import axios from 'axios';

export default {
  name: 'ShowPost',
  data() {
    return {
      post: {},
    };
  },
  created() {
    this.fetchPost();
  },
  methods: {
    fetchPost() {
      const token = localStorage.getItem('token');
      if (!token) {
        // Checks if user has logged in, otherwise, it will be returned to login page
        return;
      }

      const postId = this.$route.params.id;
      axios.get(`${BASE_URL}/showPost/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
           // getting post details from API response
          this.post = response.data.post; 
        })
        .catch(error => {
          console.error("There was an error fetching the post:", error);
        });
    },
    // function for formatting dates
    formatDate(date) {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      return new Date(date).toLocaleDateString('en-US', options);
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 5em;
  padding: 1em;
  display: flex;
  justify-content: center;
}

.post-container {
  max-width: 800px;
  width: 100%;
  padding: 2em;
  background-color: #cacaca;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.post-header {
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 1em;
  margin-bottom: 1em;
}

.post-title {
  font-size: 2.5em;
  color: #007bff;
  margin-bottom: 0.5em;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  color: #6c757d;
  font-size: 0.9em;
}

.post-author,
.post-date {
  margin: 0;
}

.post-body {
  font-size: 1.2em;
  line-height: 1.6;
  color: #343a40;
  padding: 1em 0;
}

.post-footer {
  display: flex;
  justify-content: center;
  margin-top: 2em;
}

.nav-brand {
  font-size: 1.2em;
  color: #007bff;
  text-decoration: none;
}

.nav-brand:hover {
  text-decoration: underline;
}
</style>
