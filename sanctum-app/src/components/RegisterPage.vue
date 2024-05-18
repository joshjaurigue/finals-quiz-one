<template>
  <div class="container mt-5 w-25">
    <h4>Registration Form</h4>
    <form @submit.prevent="registerUser">
      <div class="form-group mb-3">
        <input type="text" class="form-control" id="name" v-model="name" @input="clearErrors('name')" placeholder="Enter name" >
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
        <input type="password" class="form-control" id="confirm" v-model="confirm" placeholder="Confirm Password" >
        <small class="text-danger" v-if="errors.password_confirmation">{{ errors.password_confirmation[0] }}</small>
      </div>
      <button type="submit" class="btn btn-primary mt-3 w-100">Register</button>
    </form>
  </div>
</template>

<script>
import { BASE_URL } from '@/config';
import axios from 'axios';
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
        // the /register is an API route that define in the backend using Laravel
        const response = await axios.post(`${BASE_URL}/register`, {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.confirm
        });
        if (response.status === 201) {
          // After successful registration, handle redirection or other actions
          // Clear the form fields after successful registration
          this.name = '';
          this.email = '';
          this.password = '';
          this.confirm = '';
          alert('Registration successful');
          // Redirect to the login page
          this.$router.push({ name: 'login' });

        }
      } catch (error) {
        // Handle registration error, show error message to the user
        this.errors = error.response.data.errors;
        console.log(this.errors);
      }
    },
    //the field param is the name of the input field that triggered the error
    clearErrors(field) {
      // Clear error message for the specified field
      // this method is called when the user types in the input field triggering the event handler 
      this.errors[field] = null;
    }
  }
};
</script>
