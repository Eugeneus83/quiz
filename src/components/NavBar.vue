<template>
  <div class="chapter-display">
    <base-dialog v-if="message" @cancel="dialogCancel" @next="dialogNext">{{ this.message }}
    </base-dialog>
    <div class="navbar">
      <div class="navbar-wrapper">
        <div class="logo">
          <img height="40px" src="/assets/icons/amirnet-logo.svg" alt="amirnet logo">
        </div>
        <button class="nav-button instructions-button" :class="{show: isInstructionVisible}"
                @click="switchInstructionsVisibility">
          {{ !isInstructionVisible ? 'Show Instructions' : 'Hide Instructions' }}
        </button>
        <div class="button-groups">
          <div></div>
          <div>
                <span v-for="questionNumber in questionsCount" :key="questionNumber">
                  <button @click="gotoQuestion(questionNumber)"
                          :class="[{active: isQuestionActive(questionNumber)}, {answered: isQuestionAnswered(questionNumber)}, {flagged: isQuestionFlagged(questionNumber)}]"> {{ questionNumber
                    }}</button>
                </span>
          </div>
        </div>
        <div class="flag">
          <button class="flag-button" @click="switchQuestionFlag">
            <strong>Flag Question</strong>
          </button>
        </div>
        <div class="timer">
          <div>
            <div class="timer">
              <button class="mat-focus-indicator timer-button mat-icon-button mat-button-base">
                      <span class="mat-button-wrapper">
                        <span role="img" class="mat-icon notranslate clock-icon material-icons mat-icon-no-color"
                              aria-hidden="true" data-mat-icon-type="font">alarm</span>
                      </span>
                <span matripple="" class="mat-ripple mat-button-ripple mat-button-ripple-round"></span>
                <span class="mat-button-focus-overlay"></span>
              </button>
              <strong :class="{'last-minute': isUrgent}">{{ timeLeft }}</strong>
            </div>
          </div>
        </div>
        <button class="nav-button next-section-button" @click="nextChapter">
          {{ isLastChapter ? 'Exit Test' : 'Next Section' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseDialog from './layout/BaseDialog.vue';

let int;
export default {
  components: {
    BaseDialog
  },
  data() {
    return {
      message: null,
      secondsLeft: 0,
      flaggedQuestions: []
    };
  },
  computed: {
    questionsCount() {
      return this.$store.getters.questionsCount;
    },
    questionIndex() {
      return this.$store.getters.questionIndex;
    },
    isChapterFinished() {
      return this.$store.getters.chapterResultsCount === this.$store.getters.questionsCount;
    },
    isInstructionVisible() {
      return this.$store.getters.isInstructionVisible;
    },
    isChapterLoaded() {
      return this.$store.getters.isChapterLoaded;
    },
    timeLeft() {
      const secondsLeft = this.secondsLeft;
      let seconds = secondsLeft % 60;
      let minutes = (secondsLeft - seconds) / 60;
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      return `${minutes}:${seconds}`;
    },
    isUrgent() {
      return this.secondsLeft < 60;
    },
    isLastChapter() {
      return this.$store.getters.chapterIndex >= this.$store.getters.chaptersCount - 1;
    }
  },
  methods: {
    switchInstructionsVisibility() {
      this.$store.dispatch('switchInstructionsVisibility');
    },
    isQuestionActive(questionNumber) {
      return questionNumber === this.questionIndex + 1;
    },
    isQuestionAnswered(questionNumber) {
      const question = this.$store.getters.questionByIndex(questionNumber - 1);
      if (question) {
        const chapterResults = this.$store.getters.chapterResults;
        return Object.keys(chapterResults).includes(question.id.toString());
      }
      return false;
    },
    isQuestionFlagged(questionNumber) {
      return this.flaggedQuestions.includes(questionNumber - 1);
    },
    switchQuestionFlag() {
      const ind = this.flaggedQuestions.findIndex((questionIndex) => questionIndex === this.questionIndex);
      if (ind >= 0) {
        delete this.flaggedQuestions[ind];
      } else {
        this.flaggedQuestions.push(this.questionIndex);
      }
    },
    gotoQuestion(questionNumber) {
      this.$store.dispatch('gotoQuestion', questionNumber - 1);
    },
    nextChapter() {
      if (!this.isChapterFinished) {
        this.message = 'You cannot start the next section until you answer ALL the questions in this section.';
      } else {
        if (this.isLastChapter) {
          this.exitTest();
        } else {
          this.message = 'Are you sure you want to move to the next section? You won’t be able to return to this one later.';
        }
      }
    },
    dialogCancel() {
      this.message = null;
    },
    dialogNext() {
      this.dialogCancel();
      if (this.isChapterFinished && !this.isLastChapter) {
        this.$store.dispatch('nextChapter');
      }
    },
    exitTest() {
      this.$router.replace({ name: 'exit' });
    }
  },
  watch: {
    isChapterLoaded(val) {
      if (val === true) {
        this.flaggedQuestions = [];
        this.secondsLeft = this.$store.getters.chapterTimeOut;
        if (int) {
          clearInterval(int);
        }
        int = setInterval(() => {

          this.secondsLeft--;

          if (this.secondsLeft === 0) {
            clearInterval(int);
            if (this.isLastChapter) {
              this.exitTest();
            } else {
              this.$store.dispatch('nextChapter');
            }
          }

        }, 1000);

      }
    }
  }
};
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

.navbar {
  position: fixed;
  top: 46px;
  width: 1920px;
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, .09803921568627451);
  z-index: 6;
}

.navbar-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 60px;
}

.nav-button {
  height: 40px;
  border-radius: 24px;
  opacity: 1;
  outline: none;
  cursor: pointer;
  font-size: 16px;
}

.instructions-button {
  color: #3a74b7;
  background: #f8f8f8;
  border: 1px solid #3a74b7;
  width: 145px;
}

.button-groups {
  display: flex;
  flex-flow: row;
  transform: scale(1.1);
  font-size: 16px;
}

.button-groups button.active {
  background: transparent url(/assets/icons/button_active.svg) 0 0 no-repeat;
}

.button-groups button.answered {
  background: transparent url(/assets/icons/button_answered.svg) 0 0 no-repeat;
  color: #000;
}

.button-groups button.active.answered {
  background: transparent url(/assets/icons/button_active_answered.svg) 0 0 no-repeat;
  color: #000;
}

.button-groups button.active.flagged {
  background: transparent url(/assets/icons/button_active_flagged.svg) 0 0 no-repeat;
}

.button-groups button.flagged {
  background-image: url(/assets/icons/button_flagged.svg);
}

.button-groups button.answered.active.flagged {
  background: transparent url(/assets/icons/button_active_answered_flagged.svg) 0 0 no-repeat;
  color: #000;
}

.button-groups button.answered.flagged {
  background: transparent url(/assets/icons/button_answered_flagged.svg) 0 0 no-repeat;
  color: #000;
}

.button-groups button {
  width: 48px;
  height: 49px;
  margin: 0 10px;
  background: transparent url(/assets/icons/button.svg) 0 0 no-repeat;
  border: none;
  outline: none;
  cursor: pointer;
}

.flag-button {
  color: #3a74b7;
  background: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.mat-icon-button {
  background: rgba(0, 0, 0, .05);
  margin-right: 3px;
  padding: 0;
  min-width: 0;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  line-height: 40px;
  border-radius: 50%;
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

.next-section-button {
  border: none;
  width: 130px;
}

.instructions-button.show, .next-section-button {
  color: #fff;
  background: #3a74b7 0 0 no-repeat padding-box;
}

.clock-icon {
  color: #3a74b7;
}

.last-minute {
  color: red;
  border: 1px solid #000;
}

button {
  padding: 0;
}
</style>