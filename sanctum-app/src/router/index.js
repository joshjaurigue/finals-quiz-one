// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import CreatePost from '../components/CreatePost.vue'
import EditPost from '../components/EditPost.vue'
import ShowPost from '../components/ShowPost.vue'
import IndexPost from '../components/IndexPost.vue'
import MyPosts from '../components/MyPosts.vue'
const routes = [
  { path: '/', component: LoginPage, name: 'login' },
  { path: '/register', component: RegisterPage, name: 'register' },
  {
    path: '/home',
    component: IndexPost,
    name: 'home',
    beforeEnter: (to, from, next) => {
      // Check if user is logged in and redirect to login page if not
      
     // Check if the query parameter indicates unauthorized access
     if (to.query.error === 'unauthorized') {
      // Redirect to the login page with the unauthorized error message
      next({ path: '/', query: { error: 'unauthorized' } });
      }
      else {
          // Continue to the route if no unauthorized access
          if (localStorage.getItem('token')) {
            next()
          } else {
            next('/')
          }
      }
    }
  },
  {
    path: '/posts/create',
    component: CreatePost,
    name: 'create',
    beforeEnter: (to, from, next) => {
      // Check if user is logged in and redirect to login page if not
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/posts/:id/edit',
    component: EditPost,
    name: 'edit',
    beforeEnter: (to, from, next) => {
      // Check if user is logged in and redirect to login page if not
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/posts/:id',
    component: ShowPost,
    name: 'show',
    beforeEnter: (to, from, next) => {
      // Check if user is logged in and redirect to login page if not
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/my-posts',
    component: MyPosts,
    name: 'myposts',
    beforeEnter: (to, from, next) => {
      // Check if user is logged in and redirect to login page if not
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: LoginPage,
    beforeEnter: (to, from, next) => {
      console.log('logout');
      localStorage.removeItem('token');
      next('/');
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
