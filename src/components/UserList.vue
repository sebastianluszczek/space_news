<template>
  <div class="user-list">
    <h6 class="white-text">User list</h6>
    <hr>
    <ul>
      <li
        class="user white-text"
        v-for="(user, index) in users"
        :key="index"
        v-show="user.user != currentUser"
        @click="selected(user.user)"
        :class="{active: user.user == selectedUser}"
      >{{user.user}}</li>
    </ul>
  </div>
</template>

<script>
import firebase from "firebase";
import { EventBus } from "@/main.js";

export default {
  name: "user-list",
  data() {
    return {
      users: [],
      currentUser: firebase.auth().currentUser.email,
      selectedUser: ""
    };
  },
  methods: {
    selected(user) {
      EventBus.$emit("selected-user", user);
      this.selectedUser = user;
    }
  },
  created() {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then(db_users => {
        db_users.forEach(user => {
          this.users.push(user.data());
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss">
.user-list {
  padding: 20px;

  ul {
    list-style: none;
    text-align: left;
    padding: 0;

    li {
      padding: 5px 10px;
    }

    li.active {
      font-weight: bold;
    }
  }
}
</style>


