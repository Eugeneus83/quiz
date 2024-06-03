export default {
  setChapterLoaded(state, payload) {
    state.isChapterLoaded = !!payload;
  },
  setQuestions(state, payload) {
    state.questions = payload;
  },
  setChapter(state, payload) {
    state.currentChapterIndex = payload;
  },
  setCurrentChapterDescription(state, payload) {
    state.currentChapterDescription = payload;
  },
  setCurrentChapterTimeout(state, payload) {
    state.currentChapterTimeout = payload;
  },
  setQuestion(state, payload) {
    state.currentQuestionIndex = payload;
  },
  setResult(state, payload) {
    state.results = payload.results;
  }
}