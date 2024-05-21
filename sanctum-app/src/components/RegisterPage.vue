<template>
  <div>
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
  </div>
  <div class="container mt-5 w-25">
    <h4>Registration Form</h4>
    <form @submit.prevent="registerUser">
      <div class="form-group mb-3">
        <input type="text" class="form-control" id="name" v-model="name" @input="clearErrors('name')" placeholder="Enter name">
        <small class="text-danger" v-if="errors.name">{{ errors.name[0] }}</small>
      </div>
      <div class="form-group mb-3">
        <input type="email" class="form-control" id="email" v-model="email" @input="clearErrors('email')" placeholder="Enter email">
        <small class="text-danger" v-if="errors.email">{{ errors.email[0] }}</small>
      </div>
      <div class="form-group mb-3">
        <input type="password" class="form-control" id="password" v-model="password" @input="clearErrors('password')" placeholder="Password">
        <small class="text-danger" v-if="errors.password">{{ errors.password[0] }}</small>
      </div>
      <div class="form-group mb-3">
        <input type="password" class="form-control" id="confirm" v-model="confirm" placeholder="Confirm Password">
        <small class="text-danger" v-if="errors.password_confirmation">{{ errors.password_confirmation[0] }}</small>
      </div>
      <button type="submit" class="btn btn-primary mt-3 w-100">Register</button>
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
      name: '',
      email: '',
      password: '',
      confirm: '',
      errors: {}
    };
  },
  methods: {
    async registerUser() {
      try {
        // Call the registration API endpoint using Axios
        const response = await axios.post(`${BASE_URL}/register`, {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.confirm
        });
        if (response.status === 201) {
          // After successful registration, clear form fields
          this.name = '';
          this.email = '';
          this.password = '';
          this.confirm = '';
          // Show success message using SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful!',
            text: 'You will be redirected to the login page shortly.',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
          });
          // Redirect to the login page after a short delay
          setTimeout(() => {
            this.$router.push({ name: 'login' });
          }, 2000);
        }
      } catch (error) {
        // Handle registration error, show error message to the user
        this.errors = error.response.data.errors;
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'Please check the form for errors and try again.',
        });
      }
    },
    clearErrors(field) {
      // Clear error message for the specified field
      this.errors[field] = null;
    }
  }
};
</script>

<style scoped>
/* Navigation Bar Styles */
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
  border: 2px solid #007bff; /* Blue border color */
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
