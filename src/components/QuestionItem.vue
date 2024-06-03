<template>
  <h1 class="title">Question {{ question.number }}</h1>
  <div class="wrapper">
    <template v-if="hasText">
      <span class="one-line">{{ question.textList[0] }}</span>
    </template>
    <template v-else-if="isRestatement">
      <div>{{ question.textList[0] }}</div>
    </template>
    <template v-else>
      <span>{{ question.textList[0] }}</span>
      <span :class="{blank: displayedResult}">{{ displayedResult || '__________' }}</span>

      <span>{{ question.textList[1] }}</span>

    </template>

    <div id="wrapper" class="wrapper">
      <table class="answers-table">
        <tbody>
        <tr v-for="answer in question.answers" :key="answer.id" class="ans">
          <answer-item :id="answer.id" :text="answer.text" :checked="isAnswerChecked(answer.id)"
                       @set-result="setAnswerResult" />
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import AnswerItem from './AnswerItem.vue';

export default {
  props: ['question', 'hasText', 'isRestatement'],
  components: {
    AnswerItem
  },
  methods: {
    setAnswerResult(resultId) {
      this.$store.dispatch('setResult', resultId);
    },
    isAnswerChecked(answerId) {
      const answerResultId = this.$store.getters.answerResultId();
      return answerResultId === answerId;
    }
  },
  computed: {
    displayedResult() {
      return this.$store.getters.selectedResult;
    }
  }
};
</script>

<style scoped>

.title {
  font-size: 28px;
  color: #3a74b7;
}

.one-line {
  white-space: nowrap;
}

.answers-table {
  width: 100%;
}

table {
  margin-top: 35px;
  margin-bottom: 80px;
}

table tr:nth-child(odd) {
  background-color: #e9eef0;
}

table tr:nth-child(2n) {
  background-color: rgba(233, 238, 240, .3215686274509804);
}

table td {
  height: 80px;
  width: 684px;
  border-radius: 6px;
}

.blank {
  display: inline-block;
  min-width: 100px;
  border-bottom: 2px solid #000;
  line-height: 80%;
  padding: 0 2px;
  vertical-align: baseline;
  text-align: center;
}

</style>