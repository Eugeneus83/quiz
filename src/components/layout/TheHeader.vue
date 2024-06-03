<template>
  <div class="wrapper">
    <progress-bar></progress-bar>
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import ProgressBar from "@/components/ProgressBar.vue";
import NavBar from "@/components/NavBar.vue";

export default {
  components: {
    ProgressBar,
    NavBar
  }
}

</script>

<style scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  font-size: 20px;
  line-height: 1.5;
  background-color: #ebeaea;
  z-index: -1;
}
</style>