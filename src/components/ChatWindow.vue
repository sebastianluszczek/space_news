<template>
  <div class="chat-window z-depth-4 grey darken-4">
    <a class="btn-floating waves-effect waves-light yellow accent-2" @click="closeModal">
      <i class="material-icons black-text">close</i>
    </a>
    <h3 class="yellow-text text-accent-2 messager-title">Space Messager</h3>
    <user-list/>
    <div class="chat">
      <chat-input/>
      <br>
      <div class="messages grey darken-3">
        <div
          class="message"
          v-for="(message, index) in messages"
          :key="index"
          :class="{own: user == message.author}"
        >
          <p class="content">{{ message.message }}</p>
          <div class="info">
            <span class="time">{{new Date(message.time).toUTCString() }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { EventBus } from "@/main.js";

import ChatInput from "@/components/ChatInput";
import UserList from "@/components/UserList";

export default {
  name: "chat-window",
  components: {
    ChatInput,
    UserList
  },
  data() {
    return {
      user: "",
      listener: "",
      messages: []
    };
  },
  created() {
    this.user = firebase.auth().currentUser.email;
  },
  methods: {
    closeModal() {
      EventBus.$emit("close-chat-modal");
    }
  },
  mounted() {
    EventBus.$on("selected-user", user => {
      this.listener = user;

      const doc_name =
        this.listener < this.user
          ? `${this.listener}|${this.user}`
          : `${this.user}|${this.listener}`;

      firebase
        .firestore()
        .collection("chat")
        .doc(doc_name)
        .collection("messages")
        .orderBy("time", "desc")
        .onSnapshot(
          items => {
            this.messages = [];

            items.forEach(item => {
              this.messages.push(item.data());
            });
          },
          err => {
            console.log(err);
          }
        );
    });
  }
};
</script>

<style lang="scss">
.chat-window {
  position: fixed;
  top: 54%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  border: 1px solid #555;
  border-radius: 10px;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 10px;
  height: 80vh;
  z-index: 2;
  background-color: #fff;
  padding-top: 40px;

  .messager-title {
    position: absolute;
    top: -24px;
    left: 10px;
    font-size: 32px;
  }

  .chat {
    .messages {
      overflow-y: scroll;
      border: 1px solid #999;
      display: grid;
      grid-template-columns: auto;
      align-content: flex-start;
      grid-row-gap: 10px;
      padding: 10px;
      height: 340px;
    }
  }

  .btn-floating {
    position: absolute;
    top: -20px;
    right: -20px;
    z-index: 10;
  }

  .message {
    justify-self: flex-start;
    align-self: flex-start;
    text-align: left;
    color: #fff;
    border: 1px solid;
    padding: 5px 15px;
    width: 340px;
    border-radius: 8px;
    background-color: #212121;

    .content {
      margin: 0;
    }

    .info {
      border-top: #888 1px solid;
      height: 14px;
    }

    span {
      font-size: 9px;
      font-style: italic;
      width: 100%;
    }
  }

  .message.own {
    justify-self: flex-end;
    text-align: right;
    background-color: #ffd600;
    color: #000;
  }
}
</style>


