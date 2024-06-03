<template>
  <the-header></the-header>
  <question-area></question-area>
</template>
<script>
import TheHeader from './layout/TheHeader.vue';
import QuestionArea from './QuestionArea.vue';

export default {
  components: {
    TheHeader,
    QuestionArea
  }
}
</script>