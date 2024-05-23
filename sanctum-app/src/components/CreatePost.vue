<template>
   <nav class="nav-bar">
      <div class="nav-container">
        <router-link class="nav-brand" to="/home">NewsFeed</router-link>
        <ul class="nav-links">
        <li class="nav-item">
            <router-link class="nav-link" to="/my-posts">My Posts</router-link>
        </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/logout">Logout</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <br>
    <br>
  <div class="container mr-5 ml-5">
    <h1>Create New Post</h1>
    <form @submit.prevent="submitForm" class="post-form">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" v-model="title" id="title" name="title" placeholder="Enter title here">
      </div>
      <div class="form-group">
        <label for="body">Content</label>
        <textarea class="form-control" v-model="body" id="body" name="body" rows="5" placeholder="Enter body here"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <div class="post-footer">
      <router-link class="nav-brand" to="/home">← Go Back to NewsFeed</router-link>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from '@/config';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      title: '',
      body: ''
    };
  },
  methods: {
    async submitForm() {
      const token = localStorage.getItem('token');
      if (!token) {
        // Checks if login token exists or if user has logged in.
        Swal.fire({
          icon: 'error',
          title: 'Authentication Error',
          text: 'You are not authenticated. Please log in and try again.'
        });
        return;
      }
      try {
        // collects the title and body data
        const response = await axios.post(`${BASE_URL}/posts`, {
          title: this.title,
          body: this.body
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Success message
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: 'Post Created Successfully!',
          text: 'Your post has been created.',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      
        // Redirect to the posts section after posting
        setTimeout(() => {
          this.$router.push({ name: 'home' });
        }, 2000);
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while creating the post.';
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage
        });
      }
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 20px;
  background-color: #bfc0c0; /* Light gray background color */
  padding: 2em;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.post-form {
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

.btn-primary {
  background-color: #128a0e;
  color: #fff;
  border: none;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.post-footer {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.nav-brand {
  font-size: 1.2em;
  color: #007bff;
  text-decoration: none;
}

.nav-brand:hover {
  text-decoration: underline;
}
.nav-bar {
  background-color: #4c4d4e; /* Changed to a blue color */
  padding: 1em 2em;
  border-bottom: 2px solid #141414;
  border-top: 2px solid #141414;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  font-size: 1.5em;
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
}

.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 1em;
}

.nav-item {
}

.nav-link {
  text-decoration: none;
  color: #ffffff;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>
