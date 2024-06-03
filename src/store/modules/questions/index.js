import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  state() {
    return {
      questions: [],
      chapters: [
        'Sentence Completion',
        'Sentence Completion',
        'Text and Questions',
        'Restatement',
        'Restatement',
        'Sentence Completion'
      ],
      isChapterLoaded: false,
      currentChapterDescription: '',
      currentChapterTimeout: 0,
      currentChapterIndex: 0,
      currentQuestionIndex: 0,
      results: {},
    }
  },
  getters,
  actions,
  mutations
};