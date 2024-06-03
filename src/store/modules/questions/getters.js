export default {
  isChapterLoaded(state) {
    return state.isChapterLoaded;
  },
  chapterDescription(state) {
    return state.currentChapterDescription;
  },
  chapterTimeOut(state) {
    return state.currentChapterTimeout;
  },
  chapterIndex(state) {
    return state.currentChapterIndex;
  },
  questionIndex(state) {
    return state.currentQuestionIndex;
  },
  questions(state) {
    return state.questions;
  },
  chapters(state) {
    return state.chapters;
  },
  results(state) {
    return state.results;
  },
  currentQuestion(_, getters) {
    return getters.questions[getters.questionIndex];
  },
  questionByIndex(_, getters) {
    return (index) => {
      return getters.questions[index];
    };
  },
  chaptersCount(_, getters) {
    return getters.chapters.length;
  },
  questionsCount(_, getters) {
    return getters.questions.length;
  },
  chapterResults(_, getters) {
    return getters.results[getters.chapterIndex] || {};
  },
  chapterResultsCount(_, getters) {
    return Object.keys(getters.chapterResults).length;
  },
  answerResultId(_, getters) {
    return (chapterIndex = false, questionIndex = false) => {
      if (!chapterIndex) {
        chapterIndex = getters.chapterIndex;
      }
      if (!questionIndex) {
        questionIndex = getters.questionIndex;
      }
      const questionId = getters.questions[questionIndex].id;
      const chapterResults = getters.results[chapterIndex];
      if (chapterResults && chapterResults[questionId]) {
        return chapterResults[questionId];
      }
      return false;
    };
  },
  isFirstQuestion(_, getters) {
    return getters.questionIndex === 0;
  },
  isLastQuestion(_, getters) {
    return getters.questionIndex === getters.questions.length - 1;
  },
  selectedResult(_, getters) {
    const question = getters.currentQuestion;
    const chapterResults = getters.chapterResults;
    if (chapterResults && chapterResults[question.id]) {
      const resultId = chapterResults[question.id];
      if (resultId) {
        return question.answers[resultId].text;
      }
    }
    return null;
  }
};