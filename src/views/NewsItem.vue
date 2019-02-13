<template>
  <div class="news-item">
    <div class="card grey darken-3">
      <div class="card-content white-text">
        <span class="card-title yellow-text text-accent-2">{{ information.title }}</span>
        <small>{{ new Date(information.time).toLocaleString() }}</small>
        <div>
          <div class="news-image">
            <img :src="information.img">
          </div>
          <p>{{ information.body }}</p>
        </div>
        <small class="right">{{information.user}}</small>
      </div>
      <div class="card-action" v-if="information.user == author">
        <router-link :to="{ name: 'edit-item', params: {news_id: information.id}}">
          <i class="material-icons right white-text">edit</i>
        </router-link>
        <a>
          <i class="material-icons right white-text" @click="deleteItem">delete</i>
        </a>
      </div>
      <comment-input :newsid="information.id"></comment-input>
      <div class="comment-container">
        <div class="row">
          <div class="col s12">
            <comment-section
              v-for="(comment, index) in information.comments"
              :key="index"
              :commentInfo="comment"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/firebaseInit";
import firebase from "firebase";

import CommentInput from "@/components/CommentInput";
import CommentSection from "@/components/CommentSection";

export default {
  components: {
    CommentInput,
    CommentSection
  },
  data() {
    return {
      information: {},
      author: firebase.auth().currentUser.email
    };
  },
  created() {
    db.collection("news")
      .doc(this.$route.params.news_id)
      .onSnapshot(snapshot => {
        this.information = snapshot.data();
        this.information.id = snapshot.id;
      });
  },
  methods: {
    deleteItem() {
      db.collection("news")
        .doc(this.information.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        });
    }
  }
};
</script>

<style lang="scss">
.comment-container {
  padding: 0 10px 10px;
  margin: 0 10px 10px;
}

.card-content {
  p {
    text-align: justify;
  }
}

.news-image {
  width: auto;
  float: left;
  padding: 0 20px 20px 0;

  img {
    max-height: 300px;
    text-align: center;
  }
}
</style>


