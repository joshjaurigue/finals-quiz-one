<template>
    <nav class="nav-bar">
      <div class="nav-container">
        <span class="nav-brand">News Feed</span>
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
    <router-link to="/posts/create" class="btn btn-primary">Create New Post</router-link>
    
    <div class="container">
      <h1>My Posts</h1>
      <table class="table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in myPosts" :key="post.id">
            <td>{{ post.title }}</td>
            <td>{{ formatDate(post.created_at) }}</td>
            <td>
              <router-link :to="{ name: 'show', params: { id: post.id } }" class="btn btn-primary mr-2">View</router-link>
              <router-link :to="{ name: 'edit', params: { id: post.id } }" class="btn btn-secondary mr-2">Edit</router-link>
              <button @click="deletePost(post.id)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { BASE_URL } from '@/config';
  import axios from 'axios';
  
  export default {
    
    name: 'MyPosts',
    data() {
      return {
        myPosts: []
      };
    },
    created() {
      this.fetchMyPosts();
    },
    methods: {
      fetchMyPosts() {
        const token = localStorage.getItem('token');
        if (!token) {
          // Handle case where token is not available
          return;
        }
        axios.get(`${BASE_URL}/my-posts`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          this.myPosts = response.data.posts;
        })
        .catch(error => {
          console.error("Error fetching user-specific posts:", error);
        });
      },
      formatDate(date) {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      return new Date(date).toLocaleDateString('en-US', options);
    },
    //  deletePost {

    //  },
    //  editPost() {

    //  }
    }
  };
  </script>
  
  <style scoped>
.container {
  padding: 20px;
}
.table-striped {
  width: 100%;
  border-collapse: collapse;
}
.table-striped th, .table-striped td {
  border: 1px solid #ddd;
  padding: 8px;
}
.table-striped tr:nth-child(even) {
  background-color: #f2f2f2;
}
.table-striped th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4CAF50;
  color: white;
}

.nav-bar {
  background-color: #f8f9fa;
  padding: 1em;
  border-bottom: 1px solid #dee2e6;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  font-size: 1.5em;
  font-weight: bold;
  color: #131313;
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
  color: #007bff;
}

.nav-link:hover {
  text-decoration: underline;
}
  </style>
  