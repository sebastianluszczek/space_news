<template>
  <div class="row center-align mt-2 register">
    <div class="login card-panel grey darken-4 col s8 offset-s2">
      <h2 class="white-text">Register</h2>
      <form class="col s12">
        <div class="row">
          <div class="input-field col s9 offset-s1">
            <i class="material-icons prefix white-text">account_circle</i>
            <input type="text" class="validate" placeholder="name" v-model="name">
          </div>
          <div class="input-field col s9 offset-s1">
            <i class="material-icons prefix white-text">mail</i>
            <input type="text" class="validate" placeholder="email" v-model="email">
          </div>
          <div class="input-field col s9 offset-s1">
            <i class="material-icons prefix white-text">lock</i>
            <input type="password" class="validate" placeholder="password" v-model="password">
          </div>
          <div class="input-field col s9 offset-s1">
            <i class="material-icons prefix white-text">lock</i>
            <input
              type="password"
              class="validate"
              placeholder="confirm password"
              v-model="password2"
            >
          </div>
        </div>
        <button
          class="btn btn-large grey lighten-3 black-text mb-2"
          @click.prevent="register"
        >Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password2: ""
    };
  },
  name: "register",
  methods: {
    register() {
      if (this.name && this.email && this.password === this.password2) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(
            user => {
              firebase.auth().currentUser.updateProfile({
                displayName: this.name
              });

              firebase
                .firestore()
                .collection("users")
                .add({
                  user: user.user.email
                })
                .then(() => {
                  this.$router.go({ name: "dashboard" });
                })
                .catch(err => console.log(err));
            },
            err => {
              alert(err.message);
            }
          );
      } else {
        console.log(
          "All inputs have to be completed and passwords have to match!"
        );
      }
    }
  }
};
</script>

<style lang="scss">
.register {
  input {
    color: #eee !important;
  }
}
</style>


