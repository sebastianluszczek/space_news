<template>
  <div class="dashboard">
    <preloader v-if="!isLoaded"/>
    <div v-else class="wrapper">
      <div class="cards-panel">
        <news-card v-for="(item, index) in news" :key="index" :data="item"></news-card>
      </div>
      <div class="fixed-action-btn">
        <button class="btn-floating btn-large yellow accent-2" @click="showAdd = !showAdd">
          <i class="large material-icons black-text">note_add</i>
        </button>
      </div>
      <div class="fixed-action-btn" style="bottom: 100px">
        <button class="btn-floating btn-large yellow accent-2" @click="showChat = true">
          <i class="large material-icons black-text">mail</i>
        </button>
      </div>
      <chat-window v-if="showChat"/>
      <add-news v-if="showAdd"/>
    </div>
  </div>
</template>

<script>
// import AddNewsBtn from "@/components/AddNewsBtn";
import NewsCard from "@/components/NewsCard";
import ChatWindow from "@/components/ChatWindow";
import AddNews from "@/components/AddNews";
import Preloader from "@/components/Preloader";

import db from "@/firebase/firebaseInit";
import firebase from "firebase";

import { EventBus } from "@/main.js";

export default {
  name: "dashboard",
  components: {
    // AddNewsBtn,
    NewsCard,
    ChatWindow,
    AddNews,
    Preloader
  },
  data() {
    return {
      news: [],
      isLoggedIn: false,
      showChat: false,
      showAdd: false,
      isLoaded: false
    };
  },
  created() {
    this.isLoaded = false;
  },
  mounted() {
    db.collection("news")
      .orderBy("time", "desc")
      .onSnapshot(
        snapshot => {
          this.news = [];
          snapshot.forEach(item => {
            let one_news = item.data();

            one_news.id = item.id;
            one_news.time = new Date(item.data().time).toLocaleString();
            this.news.push(one_news);
          });
          setTimeout(() => {
            this.isLoaded = true;
          }, 200);
        },
        err => {
          console.log(err);
        }
      );

    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
    }

    EventBus.$on("close-chat-modal", () => {
      this.showChat = false;
    });

    EventBus.$on("close-add-modal", () => {
      this.showAdd = false;
    });
  }
};
</script>

<style lang="scss">
.dashboard {
  background-color: #444;
}
</style>

