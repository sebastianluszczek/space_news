<template>
  <div class="custom-nav">
    <div class="navbar-fixed">
      <nav class="grey darken-4">
        <div class="container">
          <div class="nav-wrapper">
            <router-link :to="{name: 'dashboard'}" class="brand-logo">
              <i class="fas fa-user-astronaut"></i> Space News
            </router-link>
            <a data-target="mobile-demo" class="sidenav-trigger right">
              <i class="material-icons">menu</i>
            </a>
            <ul class="right hide-on-med-and-down">
              <li v-if="isLoggedIn">
                <span style="padding-right: 12px">{{currentUser.displayName}}</span>
              </li>
              <li v-if="!isLoggedIn">
                <router-link :to="{name: 'login'}">Login</router-link>
              </li>
              <li v-if="!isLoggedIn">
                <router-link :to="{name: 'register'}">Register</router-link>
              </li>
              <li v-if="isLoggedIn">
                <router-link :to="{name: 'dashboard'}">Dashboard</router-link>
              </li>
              <li>
                <router-link :to="{name: 'about'}">About</router-link>
              </li>
              <li v-if="isLoggedIn">
                <button class="btn black" @click="logOut">logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>

    <ul class="sidenav" id="mobile-demo">
      <li v-show="isLoggedIn">
        <span style="padding-right: 12px">{{currentUser.displayName}}</span>
      </li>
      <li v-show="!isLoggedIn">
        <router-link :to="{name: 'login'}">Login</router-link>
      </li>
      <li v-show="!isLoggedIn">
        <router-link :to="{name: 'register'}">Register</router-link>
      </li>
      <li v-show="isLoggedIn">
        <router-link :to="{name: 'dashboard'}">Dashboard</router-link>
      </li>
      <li>
        <router-link :to="{name: 'about'}">About</router-link>
      </li>
      <li v-show="isLoggedIn">
        <button class="btn black" @click="logOut">logout</button>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "navbar",
  data() {
    return {
      isLoggedIn: false,
      currentUser: ""
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser;
    }
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ name: "dashboard" });
        });
    }
  },
  mounted() {
    const sidenavinstances = M.Sidenav.init(
      document.querySelectorAll(".sidenav", {})
    );
  }
};
</script>

<style lang="scss">
</style>


