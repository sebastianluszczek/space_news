import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/views/Dashboard'
import About from '@/views/About'
import NewsItem from '@/views/NewsItem'
// import AddNews from '@/views/AddNews'
import EditNews from '@/views/EditNews'
import Login from '@/views/Login'
import Register from '@/views/Register'

import firebase from "firebase";

Vue.use(Router)

let router = new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/news/:news_id',
      name: 'news-item',
      component: NewsItem,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:news_id',
      name: 'edit-item',
      component: EditNews,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '*',
      redirect: '/'
    },
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({
        path: '/login',
        // query: {
        //   redirect: to.fullPath
        // }
      })
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (firebase.auth().currentUser) {
      next({
        path: '/',
        // query: {
        //   redirect: to.fullPath
        // }
      })
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;