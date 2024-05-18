<template>
  <div v-if="post" class="container">
    <h1>{{ post.title }}</h1>
    <p><strong>Author:</strong> {{ post.user ? post.user.name : 'Unknown' }}</p>
    <p><strong>Created At:</strong> {{ formatDate(post.created_at) }}</p>
    <p>{{ post.body }}</p>
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
        // Handle case where token is not available
        return;
      }

      const postId = this.$route.params.id;
      axios.get(`${BASE_URL}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          this.post = response.data.post; // Access the correct key in the response
          console.log(response.data.post);
        })
        .catch(error => {
          console.error("There was an error fetching the post:", error);
        });
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      return new Date(date).toLocaleDateString('en-US', options);
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
