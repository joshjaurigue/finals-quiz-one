<template>
    <!--Nav bar-->
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

    <!--My Posts Table-->
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
                        <!-- Links for viewing or editing my posts -->
                        <router-link :to="{ name: 'show', params: { id: post.id } }"
                            class="btn btn-primary mr-2">View</router-link>
                        <router-link :to="{ name: 'edit', params: { id: post.id } }"
                            class="btn btn-secondary mr-2">Edit</router-link>
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
import Swal from 'sweetalert2';

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
             // Checks if user has logged in, otherwise, it will be returned to login page
                return;
            }
            axios.get(`${BASE_URL}/my-posts`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    // getting my posts from API response
                    this.myPosts = response.data.posts;
                })
                .catch(error => {
                    console.error("Error fetching user-specific posts:", error);
                });
        },
        
        // function for formatting dates
        formatDate(date) {
            const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
            return new Date(date).toLocaleDateString('en-US', options);
        },
        
        // function for deleting posts
        deletePost(postId) {
            const token = localStorage.getItem('token');
            if (!token) {
                // Handle case where token is not available
                return;
            }
            axios.delete(`${BASE_URL}/delete/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log(response.data);
                    this.fetchMyPosts();
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'The post has been deleted successfully.',
                    });
                })
                .catch(error => {
                    console.error('There was an error deleting the post:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'There was an error deleting the post. Please try again.',
                    });
                });
        },
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

.table-striped th,
.table-striped td {
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
  background-color: #00aca3;
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

.nav-item {}

.nav-link {
  text-decoration: none;
  color: #ffffff;
}

.nav-link:hover {
    text-decoration: underline;
}
</style>
