<template>
  <div class="card-panel grey darken-3 white-text single-comment">
    <p style="margin-top: 0px">{{ commentInfo.comment }}</p>
    <span class="right">{{ commentInfo.author }}</span>
    <span class="right time">{{ new Date(commentInfo.time).toLocaleString() }}</span>
  </div>
</template>

<script>
export default {
  props: ["commentInfo"]
};
</script>

<style lang="scss">
.single-comment {
  padding: 10px 20px 20px;
  span {
    font-size: 10px;
  }

  span.time {
    font-style: italic;
    padding-right: 10px;
  }
}
</style>


