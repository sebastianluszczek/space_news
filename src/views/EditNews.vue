<template>
  <div class="add-news">
    <h1>Edit News</h1>
    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s8">
            <input placeholder="title" type="text" v-model="information.title">
          </div>
          <div class="input-field col s8">
            <textarea
              id="textarea1"
              class="materialize-textarea"
              placeholder="body"
              v-model="information.body"
            ></textarea>
          </div>
        </div>
        <button class="btn btn-large purple darken-4" @click.prevent="editNews">Edit</button>
      </form>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/firebaseInit";

export default {
  data() {
    return {
      information: {
        title: "",
        body: ""
      }
    };
  },
  methods: {
    editNews() {
      db.collection("news")
        .doc(this.$route.params.news_id)
        .update({
          title: this.information.title,
          body: this.information.body
        })
        .then(data => {
          this.$router.push({ name: "dashboard" });
        });
    }
  },
  created() {
    db.collection("news")
      .doc(this.$route.params.news_id)
      .get()
      .then(data => {
        this.information = data.data();
      });
  }
};
</script>

<style lang="scss">
.input-field {
  input {
    color: #444 !important;
  }
  textarea {
    color: #444 !important;
  }
}
</style>


