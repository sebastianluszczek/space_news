<template>
  <div class="comment-input">
    <div class="row">
      <div class="col s8">
        <div class="input-wrapper">
          <input type="text" placeholder="write comment here" v-model="comment">
          <i class="material-icons yellow-text text-accent-2" @click="submit">send</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/firebaseInit";
import firebase from "firebase";

export default {
  name: "comment-input",
  props: ["newsid"],
  data() {
    return {
      comment: ""
    };
  },
  methods: {
    submit() {
      if (this.comment) {
        db.collection("news")
          .doc(this.newsid)
          .update({
            comments: firebase.firestore.FieldValue.arrayUnion({
              author: firebase.auth().currentUser.email,
              time: Date.now(),
              comment: this.comment
            })
          })
          .then(() => {
            this.comment = "";
          });
      } else {
        console.log("You can't post empty comment!");
      }
    }
  }
};
</script>

<style lang="scss">
.comment-input {
  .input-wrapper {
    padding: 20px !important;
    input {
      color: #444 !important;
      display: inline-block;
      width: 80%;
    }
    i {
      display: inline;
      padding: 10px;
      position: relative;
      top: 10px;
    }
  }
  #comment-submit {
    margin: 20px;
  }
}
</style>


