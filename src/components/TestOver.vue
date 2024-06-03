<template>
  <div ref="body" style="border: 15px solid red;">
    &#xFEFF;
    <h2 id="exam_ended">
      The test is over
    </h2>
    <br>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$refs.body.style.height = (window.innerHeight / 100 * 90) + 'px';
  }
};
</script>

<style scoped>
h2#exam_ended {
  margin: 0 auto;
  width: 200px;
}
</style>