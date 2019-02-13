<template>
  <div class="preloader-wrapper big active">
    <div class="spinner-layer spinner-yellow-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div>
      <div class="gap-patch">
        <div class="circle"></div>
      </div>
      <div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "preloader"
};
</script>
<style lang="scss">
.preloader-wrapper {
  position: absolute;
  top: 45%;
  left: 45%;
}
</style>


