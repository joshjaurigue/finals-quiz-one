// src/services/axios.js

import axios from 'axios';

// Add a response interceptor
axios.interceptors.response.use(
  response => {
    // Return a successful response directly
    return response;
  },
  error => {
    // Handle error responses
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        // Unauthorized: Redirect to a login page or display an error message
        // For example:
        // router.push({ name: 'login' });
        alert('Unauthorized access. Please log in.');
      } else if (status === 403) {
        // Forbidden: Display an error message or redirect to an error page
        // For example:
        // router.push({ name: 'error', params: { code: 403 } });
        alert('Access forbidden.');
      } else if (status === 404) {
        // Not Found: Display an error message or redirect to an error page
        // For example:
        // router.push({ name: 'error', params: { code: 404 } });
        alert('Resource not found.');
      } else {
        // Other error: Display a generic error message or handle it accordingly
        console.error('Error:', error.response.data.message);
        alert('An error occurred. Please try again later.');
      }
    } else {
      // Network error: Display an error message or handle it accordingly
      console.error('Network Error:', error.message);
      alert('Network error. Please check your internet connection.');
    }
    // Return a rejected promise to propagate the error further
    return Promise.reject(error);
  }
);

export default axios;
