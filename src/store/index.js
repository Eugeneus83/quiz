import {createStore} from 'vuex';
import questionsModule from './modules/questions';

const store = createStore({
  modules: {
    questions: questionsModule
  },
  state() {
    return {
      isInstructionVisible: false
    }
  },
  getters: {
    isInstructionVisible(state) {
      return state.isInstructionVisible;
    }
  },
  actions: {
    switchInstructionsVisibility(context) {
      context.commit('setInstructionsVisibility', !context.state.isInstructionVisible);
    }
  },
  mutations: {
    setInstructionsVisibility(state, payload) {
      state.isInstructionVisible = payload;
    }
  }
});

export default store;