<template>
  <div class="add-news grey darken-4">
    <a class="btn-floating waves-effect waves-light yellow accent-2" @click="closeModal">
      <i class="material-icons black-text">close</i>
    </a>
    <h3 class="yellow-text text-accent-2">Add news</h3>

    <div class="row">
      <preloader v-if="!isLoaded"/>
      <form v-else class="col s12">
        <div class="row">
          <div class="input-field col s8">
            <input placeholder="Title..." type="text" v-model="information.title">
          </div>
          <div class="input-field col s8">
            <textarea
              id="textarea1"
              class="materialize-textarea"
              placeholder="Content..."
              v-model="information.body"
            ></textarea>
          </div>
        </div>
        <div class="file-field input-field col s8">
          <div class="btn yellow accent-2 black-text">
            <span>
              <i class="large material-icons">image</i>
            </span>
            <input type="file" @change="addFile($event)">
          </div>
          <div class="file-path-wrapper">
            <input class="file-path validate" type="text">
          </div>
        </div>
        <div class="row">
          <button class="btn btn-large yellow accent-2 black-text" @click.prevent="addNews">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/firebaseInit";
import firebase from "firebase";

import { EventBus } from "@/main.js";

import Preloader from "@/components/Preloader";

export default {
  data() {
    return {
      information: {
        title: "",
        body: "",
        file: null,
        imgURL: ""
      },
      isLoaded: true
    };
  },
  components: {
    Preloader
  },
  methods: {
    addNews() {
      if (this.information.title && this.information.body) {
        this.isLoaded = false;
        if (this.file) {
          let storageRef = firebase.storage().ref("images/" + this.file.name);

          storageRef.put(this.file).then(snapshot => {
            firebase
              .storage()
              .ref("images/" + this.file.name)
              .getDownloadURL()
              .then(url => {
                db.collection("news")
                  .add({
                    title: this.information.title,
                    body: this.information.body,
                    time: Date.now(),
                    user: firebase.auth().currentUser.email,
                    img: url
                  })
                  .then(() => {
                    this.information.title = "";
                    this.information.body = "";

                    this.closeModal();
                  });
              });
          });
        } else {
          db.collection("news")
            .add({
              title: this.information.title,
              body: this.information.body,
              time: Date.now(),
              user: firebase.auth().currentUser.email,
              img: ""
            })
            .then(() => {
              this.information.title = "";
              this.information.body = "";

              this.closeModal();
            });
        }
      } else {
        console.log("You have to provide at least title and content!");
      }
    },
    closeModal() {
      EventBus.$emit("close-add-modal");
    },
    addFile(event) {
      this.file = event.target.files[0];

      console.log(this.file);
    }
  }
};
</script>

<style lang="scss">
.add-news {
  position: fixed;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  min-height: 500px;
  border: 1px solid #555;
  border-radius: 10px;
  padding: 20px;

  .btn-floating {
    position: absolute;
    top: -20px;
    right: -20px;
    z-index: 10;
  }
}
</style>


