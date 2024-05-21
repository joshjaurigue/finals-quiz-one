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
    <router-link to="/posts/create" class="btn btn-primary">Create New Post</router-link>
    <br>
    <br>
    <table class="table-striped">
      <thead>
        <tr>
          <th width="25%">Title</th>
          <th width="30%">Author</th>
          <th width="20%">Created At</th>
          <th width="25%">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.title }}</td>
          <td>{{ post.user.name }}</td>
          <td>{{ formatDate(post.created_at) }}</td>
          <td>
            <router-link :to="{ name: 'show', params: { id: post.id } }" class="btn btn-primary mr-2 btn-sm">View</router-link>
          </td>
        </tr>
      </tbody>
    </table>

</template>

<script>
import { BASE_URL } from '@/config';
import axios from 'axios';

export default {
  name: 'PostIndex',
  data() {
    return {
      posts: [],
    };
  },
  created() {
    this.fetchPosts();
  },
  
  methods: {
    fetchPosts() {
      const token = localStorage.getItem('token');
      if (!token) {
        // Handle case where token is not available
        return;
      }

      axios.get(`${BASE_URL}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log('API Response:', response.data.posts);
        this.posts = response.data.posts;
        console.log('Assigned Posts:', this.posts);
      })
      .catch(error => {
        console.error("There was an error fetching the posts:", error);
      });
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      return new Date(date).toLocaleDateString('en-US', options);
    },
    // deletePost(postId) {
    //   if (confirm('Are you sure you want to delete this post?')) {
    //     const token = localStorage.getItem('token');
    //     axios.delete(`${BASE_URL}/posts/${postId}`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`
    //       }
    //     })
    //     .then(response => {
    //       this.posts = this.posts.filter(post => post.id !== postId);
    //     })
    //     .catch(error => {
    //       console.error("There was an error deleting the post:", error);
    //     });
    //   }
    // },
  },
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
  background-color: #00aca0;
  color: white;
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
  color: #fff;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>
