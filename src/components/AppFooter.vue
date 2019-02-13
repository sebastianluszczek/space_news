<template>
  <footer class="page-footer grey darken-4" v-if="user">
    <div class="container">
      <div class="row">
        <div class="col l6 s12">
          <h5 class="white-text">Footer Content</h5>
          <p
            class="grey-text text-lighten-4"
          >You can use rows and columns here to organize your footer content.</p>
        </div>
        <div class="col l4 offset-l2 s12"></div>
      </div>
    </div>
    <div class="footer-copyright black">
      <div class="container">
        © 2019 Copyright Text
        <a
          class="grey-text text-lighten-4 right"
          href="https://github.com/sebastianluszczek"
          target="_blank"
        >
          <i class="fab fa-2x fa-github"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
import firebase from "firebase";

export default {
  name: "app-footer",
  data() {
    return {
      user: null
    };
  },
  created() {
    this.user = firebase.auth().currentUser;
  }
};
</script>

<style lang="scss">
// footer {
//   position: absolute;
//   bottom: 0;
//   width: 100%;
// }
</style>


