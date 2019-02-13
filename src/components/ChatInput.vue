<template>
  <div class="chat-input">
    <form @submit.prevent="sendMessage">
      <input type="text" v-model="message" placeholder="Message here...">
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
import { EventBus } from "@/main.js";

export default {
  name: "chat-input",
  data() {
    return {
      message: "",
      user: "",
      listener: ""
    };
  },
  methods: {
    sendMessage() {
      const doc_name =
        this.listener < this.user
          ? `${this.listener}|${this.user}`
          : `${this.user}|${this.listener}`;
      firebase
        .firestore()
        .collection("chat")
        .doc(doc_name)
        .collection("messages")
        .add({
          message: this.message,
          time: Date.now(),
          author: firebase.auth().currentUser.email
        })
        .then(() => {
          this.message = "";
        });
    }
  },
  created() {
    this.user = firebase.auth().currentUser.email;

    EventBus.$on("selected-user", user => {
      this.listener = user;
    });
  }
};
</script>

