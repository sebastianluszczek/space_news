<template>
  <div class="row news-card">
    <div class="col s12">
      <div class="card horizontal grey darken-4">
        <div class="card-image">
          <img :src="data.img">
        </div>
        <div class="card-stacked">
          <div class="card-content white-text">
            <router-link :to="{ name: 'news-item', params: {news_id: data.id}}">
              <span class="card-title yellow-text text-accent-2">{{ data.title }}</span>
            </router-link>
            <small>{{data.time}}</small>
            <p v-if="data.img">{{ data.body | slice(100) }}</p>
            <p v-else>{{ data.body | slice(300) }}</p>
            <small class="right">{{data.user}}</small>
          </div>
          <div class="card-action" v-if="isLoggedIn">
            <router-link :to="{ name: 'news-item', params: {news_id: data.id}}">
              <i class="material-icons right white-text">remove_red_eye</i>
            </router-link>
            <router-link
              :to="{ name: 'edit-item', params: {news_id: data.id}}"
              v-if="data.user == currentUser"
            >
              <i class="material-icons right white-text">edit</i>
            </router-link>
            <a v-if="data.user == currentUser">
              <i class="material-icons right white-text" @click="deleteItem">delete</i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/firebaseInit";
import firebase from "firebase";

export default {
  props: ["data"],
  data() {
    return {
      isLoggedIn: false,
      currentUser: ""
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    deleteItem() {
      db.collection("news")
        .doc(this.data.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        });
    }
  },
  filters: {
    slice(value, cont) {
      return value.slice(0, cont) + "...";
    }
  }
};
</script>

<style lang="scss">
small {
  font-style: italic;
}

.card-image {
  width: auto;

  img {
    max-height: 300px;
    text-align: center;
    padding: 10px;
  }
}
</style>


