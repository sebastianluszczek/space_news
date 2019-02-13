<template>
  <div class="row center-align mt-2 login">
    <div class="login card-panel grey darken-4 col s8 offset-s2">
      <h2 class="white-text">Login</h2>
      <form class="col s12">
        <div class="row">
          <div class="input-field col s9 offset-s1">
            <i class="material-icons prefix white-text">mail</i>
            <input
              id="icon_prefix"
              type="text"
              class="validate"
              placeholder="login"
              v-model="email"
            >
          </div>
          <div class="input-field col s9 offset-s1">
            <i class="material-icons prefix white-text">lock</i>
            <input
              id="icon_telephone"
              type="password"
              class="validate"
              placeholder="password"
              v-model="password"
            >
          </div>
        </div>
        <button class="btn btn-large grey lighten-3 black-text mb-2" @click.prevent="login">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  name: "login",
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            console.log(user.user.email);
            this.$router.go({ name: "login" });
          },
          err => {
            alert(err.message);
          }
        );
    }
  }
};
</script>

<style lang="scss">
.mt-3 {
  margin-top: 3rem;
}
.mb-3 {
  margin-bottom: 3rem;
}
.mt-2 {
  margin-top: 2rem;
}
.mb-2 {
  margin-bottom: 2rem;
}
</style>

<style lang="scss">
.login {
  input {
    color: #eee !important;
  }
}
</style>

