<template>
  <div class="container">
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
  </div>
</template>

<script>
import { BASE_URL } from '@/config';
import axios from 'axios';

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
        // Handle case where token is not available
        return;
      }
      try {
        const response = await axios.post(`${BASE_URL}/posts`, {
          title: this.title,
          body: this.body
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
       });
        alert("Post Created Successfully!");
        console.log('Post created:', response.data);
        // Optionally, you can navigate to a different page or show a success message here
        // Redirect to the posts section
        this.$router.push({ name: 'home' });
      } catch (error) {
        const errorMessage = error.response.data.message;
        // Display the error message to the user (you can use any alert or notification library)
        alert(errorMessage);
        // Handle errors here, such as showing an error message to the user
      }
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 20px;
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
  background-color: #007bff;
  color: #fff;
  border: none;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
