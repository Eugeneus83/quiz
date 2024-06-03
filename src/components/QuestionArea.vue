<template>
  <div>
    <base-dialog v-if="error" :is-actions-visible="false">{{ this.error }}
    </base-dialog>
    <div class="wrapper">
      <div class="booklet">
        <div :class="`rect1-${colsClass}`"></div>
        <div :class="`rect2-${colsClass}`"></div>
        <div :class="`rect3-${colsClass}`">

          <template v-if="isInstructionVisible">
            <div class="item-content-one-col">
              <div v-html="chapterDescription"></div>
            </div>
            <div class="page-flip-one-col">
              <img alt="page flip icon" src="/assets/icons/page_flip_icon.png">
            </div>
          </template>

          <template v-else>

            <div v-if="isTwoCols" class="separator">
              <img src="/assets/icons/separator.svg" />
            </div>
            <div :class="`item-content${!isTwoCols ? `-${colsClass}` : ''}`" v-if="question">

              <div v-if="isTwoCols">
                <div class="left-page">
                  <div class="wrapper"></div>
                  <br>
                  <div class="content">
                    <div v-html="question.text"></div>
                  </div>
                </div>
              </div>

              <div v-if="isTwoCols" class="right-page">
                <button @click="switchQuestionsVisibility" class="hide-question-button" :class="{show: isQuestionsVisible}"> {{isQuestionsVisible ? 'Hide Questions' : 'Show Questions'}}</button>

                <div v-if="isQuestionsVisible" class="wrapper">
                  <question-item :question="question" :hasText="hasText" :isRestatement="isRestatement"></question-item>
                </div>
              </div>

              <div v-else>
                <question-item :question="question" :hasText="hasText" :isRestatement="isRestatement"></question-item>
              </div>

            </div>
            <div :class="`page-flip-${colsClass}`">
              <img alt="page flip icon" src="/assets/icons/page_flip_icon.png">
            </div>
            <button v-if="!isFirstQuestion" :class="`nav-button prev-question-${colsClass}`" @click="prevQuestion">
              <img alt="prev-question-button" src="/assets/icons/prev_question.svg">
            </button>
            <button v-if="!isLastQuestion" :class="`nav-button next-question-${colsClass}`" @click="nextQuestion">
              <img alt="next-question-button" src="/assets/icons/next_question.svg" />
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionItem from './QuestionItem.vue';
import BaseDialog from './layout/BaseDialog.vue';

export default {
  components: {
    BaseDialog,
    QuestionItem
  },
  data() {
    return {
      error: null,
      isQuestionsVisible: true
    };
  },
  methods: {
    async loadQuestions() {
      try {
        await this.$store.dispatch('loadQuestions');
      } catch (error) {
        this.error = error || 'Something went wrong';
      }
    },
    switchQuestionsVisibility() {
        this.isQuestionsVisible = !this.isQuestionsVisible;
    },
    setAnswerResult(resultId) {
      this.$store.dispatch('setResult', resultId);
    },
    nextQuestion() {
      this.$store.dispatch('nextQuestion');
    },
    prevQuestion() {
      this.$store.dispatch('prevQuestion');
    }
  },
  created() {
    this.loadQuestions();
  },
  computed: {
    question() {
      let question = this.$store.getters.currentQuestion;
      return question ? JSON.parse(JSON.stringify(question)) : null;
    },
    chapterDescription() {
      return this.$store.getters.chapterDescription;
    },
    isFirstQuestion() {
      return this.$store.getters.isFirstQuestion;
    },
    isLastQuestion() {
      return this.$store.getters.isLastQuestion;
    },
    hasText() {
      return !!(this.question && this.question.text);
    },
    isTwoCols() {
      return this.hasText && !this.isInstructionVisible;
    },
    isInstructionVisible() {
      return this.$store.getters.isInstructionVisible;
    },
    isRestatement() {
      return !!(this.question && this.question.type === 'restatement');
    },
    colsClass() {
      return !this.isTwoCols ? 'one-col' : 'two-col';
    }
  }
};
</script>

<style scoped>

.separator {
  position: absolute;
  top: 0;
  left: 825px;
  width: 28px;
  height: 1080px;
  opacity: 1;
}

.wrapper {
  font-size: 20px;
  line-height: 1.5;
}

.wrapper[_ngcontent-krc-c52] {
  font-size: 80%;
  color: #3a74b7;
}

.content {
  padding-bottom: 100px;
  -webkit-tap-highlight-color: #0100ff;
  text-indent: 20px;
}

.rect1-one-col, .rect2-one-col {
  position: fixed;
  top: 1px;
  height: 1080px;
  box-shadow: 0 3px 4px rgba(90, 92, 93, .23529411764705882);
  border: 1px solid hsla(0, 0%, 43.9%, 0);
}

.rect1-one-col {
  left: 467px;
  width: 1017px;
  background-color: #fff;
  z-index: 1;
}

.rect3-one-col {
  position: fixed;
  top: 1px;
  left: 455px;
  width: 1012px;
  height: 1080px;
  background-color: #fff;
  box-shadow: 0 3px 4px rgba(90, 92, 93, .23529411764705882);
  border: 1px solid hsla(0, 0%, 43.9%, 0);
  z-index: 3;
  overflow-y: auto;
}

.rect1-two-col, .rect2-two-col {
  position: fixed;
  top: 1px;
  height: 1080px;
  box-shadow: 0 3px 4px rgba(90, 92, 93, .23529411764705882);
  border: 1px solid hsla(0, 0%, 43.9%, 0);
}

.rect1-two-col {
  left: 109px;
  width: 1702px;
  background-color: #fff;
  z-index: 1;
}

.rect2-two-col {
  left: 117px;
  width: 1687px;
  z-index: 2;
}

.rect1-two-col, .rect2-two-col {
  position: fixed;
  top: 1px;
  height: 1080px;
  box-shadow: 0 3px 4px rgba(90, 92, 93, .23529411764705882);
  border: 1px solid hsla(0, 0%, 43.9%, 0);
}

.rect3-two-col {
  position: fixed;
  top: 1px;
  left: 125px;
  width: 1671px;
  height: 1080px;
  box-shadow: 0 3px 4px rgba(90, 92, 93, .23529411764705882);
  border: 1px solid hsla(0, 0%, 43.9%, 0);
  z-index: 3;
}

.separator[_ngcontent-pku-c59] {
  position: absolute;
  top: 0;
  left: 825px;
  width: 28px;
  height: 1080px;
  opacity: 1;
}

.item-content {
  height: 100%;
  width: 100%;
}

.item-content-one-col {
  position: fixed;
  top: 194px;
  left: 603px;
  width: 728px;
  height: 820px;
  z-index: 10;
  overflow-y: auto;
}

.nav-button {
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
}

.next-question-one-col {
  left: 1577px;
}

.next-question-one-col, .prev-question-one-col {
  position: fixed;
  top: 575px;
  z-index: 3;
  transform: scale(1.5);
}

.next-question-two-col {
  position: fixed;
  top: 575px;
  left: 1743px;
  z-index: 3;
}

.prev-question-one-col {
  left: 329px;
}

.prev-question-two-col {
  position: fixed;
  top: 575px;
  left: 985px;
  z-index: 3;
}

button {
  padding: 0;
}

.left-page {
  position: fixed;
  top: 150px;
  height: 890px;
}

.left-page {
  left: 160px;
  width: 760px;
  overflow-y: auto;
  padding-right: 20px;
}

.right-page {
  left: 1045px;
  width: 675px;
}

.right-page, .left-page {
  position: fixed;
  top: 150px;
  height: 890px;
}

.hide-question-button.show {
  color: #3a74b7;
  background: #f8f8f8;
  border: 1px solid #3a74b7;
}

.hide-question-button {
  height: 32px;
  color: #fff;
  background: #3a74b7 0 0 no-repeat padding-box;
  border-radius: 24px;
  opacity: 1;
  border: none;
  outline: none;
  cursor: pointer;
  width: 140px;
  margin-bottom: 50px;
  margin-left: 250px;
  font-size: 16px;
}

</style>
