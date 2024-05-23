<template>
  <div>
    <!-- Navigation Bar -->
    <nav class="nav-bar">
      <div class="nav-container">
        <router-link class="nav-brand" to="/">ForumApp</router-link>
        <ul class="nav-links">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/register">Register</router-link>
          </li>
        </ul>
      </div>
    </nav>
    
    <!-- Login Form -->
    <div class="container mt-5 col-3">
      <div class="row">
        <h4>Enter your email and password</h4>
        <form @submit.prevent="loginUser" class="col-12">
          <div class="form-group mt-3">
            <input type="email" class="form-control" id="email" v-model="email" placeholder="Enter email" @input="clearErrors">
            <small class="text-danger" v-if="errors?.email">{{ errors.email[0] }}</small>
          </div>
          <div class="form-group mt-3">
            <input type="password" class="form-control" id="password" v-model="password" placeholder="Password" @input="clearErrors">
            <small class="text-danger" v-if="errors?.password">{{ errors.password[0] }}</small>
          </div>
          <button type="submit" class="btn btn-primary mt-3 w-100">Login</button>
        </form>
      </div>
      <div class="row">
        <div class="col-12">
            <p class="mt-3 text-left">Don't have an account? <router-link to="/register">Register here!</router-link></p>
        </div>
      </div>
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
      email: '',
      password: '',
      errors: null
    };
  },
  methods: {
    async loginUser() {
      try {
        // Call the login API endpoint using Axios
        const response = await axios.post(`${BASE_URL}/login`, {
          email: this.email,
          password: this.password
        });
        if (response.status === 201) {
          // Successful login, handle token storage and redirection
          localStorage.setItem('token', response.data.token);
          Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'You will be redirected shortly.',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
          });
          setTimeout(() => {
            this.$router.push('/home');
          }, 2000);
        }
      } catch (error) {
        // Handle login error, show error message to the user
        this.errors = error.response.data.errors;
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Please check your credentials and try again.',
        });
      }
    },
    clearErrors() {
      // Clear error message for the specified field
      this.errors = {};
    }
  }
};
</script>

<style scoped>
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
  font-size: 1.75em;
  font-weight: bold;
  color: #fff;
   
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

.container {
  background-color: #bfc0c0; /* Light gray background color */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  box-shadow: inset ;
}

.form-control {
  border: 1px solid #007bff; /* Blue border color */
}

.form-control:focus {
  border-color: #ffc107; /* Yellow border color on focus */
  box-shadow: 0 0 5px rgba(255, 193, 7, 0.5); /* Yellow box shadow on focus */
}

.btn-primary {
  background-color: #128a0e; /* Green color for buttons */
  color: #000000; /* White text color */
}

.btn-primary:hover {
  background-color: #1128f7; /* Darker green color on hover */
}
</style>
