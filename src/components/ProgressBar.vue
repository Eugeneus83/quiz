<template>
  <div class="progressbar">
    <div class="wrapper">
      <div v-for="(chapter, index) in chapters" :key="index" class="progress" :id="`progress${index}`"
           style="width: 345px; color: black;" :style="chapterStyle(index)">
        <div class="title-icon">
          <span class="zoom-font">{{ chapter }} &nbsp;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    chapters() {
      return this.$store.getters.chapters;
    },
    currentChapterIndex() {
      return this.$store.getters.chapterIndex;
    }
  },
  methods: {
    chapterStyle(index) {
      const currentChapterIndex = this.currentChapterIndex;
      const style = { left: `${index * 315}px`, zIndex: 20 - index };
      if (currentChapterIndex < index) {
        style.background = 'url(/assets/icons/progress_unreached.svg) 0% 0% no-repeat padding-box padding-box transparent';
        style.fontSize = '20px';
      } else if (currentChapterIndex === index) {
        style.background = 'url(/assets/icons/progress_active.svg) 0% 0% no-repeat padding-box padding-box transparent';
        style.fontSize = '16px';
      } else {
        style.background = 'url(/assets/icons/progress_finished.svg) 0% 0% no-repeat padding-box padding-box transparent';
      }
      return style;
    }
  }
};
</script>

<style scoped>
.progressbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 47px;
  background-color: #e3e3e2;
  z-index: 6;
  overflow: hidden;
}

.wrapper {
  width: 100vw;
  height: 100vh;
  font-size: 20px;
  line-height: 1.5;
  background-color: #ebeaea;
  z-index: -1;
}

.progress {
  position: absolute;
  top: -1px;
  height: 50px;
  font-size: 16px;
  background: transparent url(/assets/icons/progress_unreached.svg) no-repeat;
  background-size: 100% 100%;
  line-height: 50px;
  text-align: center;
}

.title-icon {
  display: flex;
  justify-content: center;
}
</style>