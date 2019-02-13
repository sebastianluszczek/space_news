<template>
  <div id="app">
    <header>
      <Navbar/>
    </header>

    <main>
      <div class="container">
        <router-view/>
      </div>
    </main>

    <app-footer/>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import AppFooter from "@/components/AppFooter";

export default {
  components: {
    Navbar,
    AppFooter
  }
};
</script>


<style lang="scss">
body {
  margin: 0;
  padding: 0;
  display: flex;
  min-height: 100vh;
  flex-direction: column;

  main {
    flex: 1 0 auto;

    .container {
      padding-top: 10px;
      padding-bottom: 10px;
      min-height: 80vh;
    }
  }
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #333;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  width: 100%;

  .row {
    margin-bottom: 10px !important;
  }

  input,
  textarea {
    color: #ddd !important;
  }

  textarea {
    min-height: 200px;
    max-height: 200px;

    overflow-y: scroll;
  }

  input:focus,
  textarea:focus,
  input.valid,
  textarea.valid {
    border-bottom-color: #ffd600;
    box-shadow: none;
  }

  i.material-icons.white-text {
    transition: 0.3s;
  }

  i.material-icons.white-text:hover {
    color: #ffd600 !important;
  }

  .input-field {
    margin-top: 0;
    margin-bottom: 0;
  }
}
</style>
