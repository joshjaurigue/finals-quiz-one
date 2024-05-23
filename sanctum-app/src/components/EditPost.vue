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
    <div class="container">
        <h1>Edit Post</h1>
        <form @submit.prevent="updatePost" class="post-form">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" v-model="title" id="title" name="title">
            </div>
            <div class="form-group">
                <label for="content">Content</label>
                <textarea class="form-control" v-model="body" id="body" name="body" rows="5"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
        </form>
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
    created() {
        this.fetchPostData();
    },
    methods: {
        async fetchPostData() {
            try {
                const postId = this.$route.params.id; // Assuming you're using Vue Router
                const response = await axios.get(`${BASE_URL}/showPost/${postId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const post = response.data.post;
                this.title = post.title;
                this.body = post.body;
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        },
        async updatePost() {
            try {
                const postId = this.$route.params.id; // Assuming you're using Vue Router
                const response = await axios.put(`${BASE_URL}/edit/${postId}`, {
                    title: this.title,
                    body: this.body
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                // Show success message
                console.log(response.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'The post has been updated successfully.',
                }).then(() => {
                    // Automatically pushes to another route
                    this.$router.push('/my-posts');
                });
            } catch (error) {
                // Error message for updating a post
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'There was an error updating the post. Please try again.',
                });
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

.nav-brand {
    font-size: 1.2em;
    color: #007bff;
    text-decoration: none;
}

.nav-brand:hover {
    text-decoration: underline;
}

.nav-bar {
    background-color: #4c4d4e;
    /* Changed to a blue color */
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
