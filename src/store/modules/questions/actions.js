export default {
  async loadQuestions(context) {
    context.commit('setChapterLoaded', false);
    const chapterNumber = context.getters.chapterIndex + 1;
    let response;
    try {
      response = await fetch(`https://wp.yevhenlysenko.pro/quiz/chapter${chapterNumber}.json`);
    } catch (error) {
      throw new Error(error.message);
    }

    if (!response.ok) {
      throw new Error('Could not fetch chapter data');
    }

    const questionsData = await response.json();

    context.commit('setCurrentChapterDescription', questionsData['instBody']);
    context.commit('setCurrentChapterTimeout', questionsData['time']);

    const questions = [];

    let questionType = null;
    switch (questionsData['chapterTypeId']) {
      case 13:
        questionType = 'sentence_completion';
        break;
      case 14:
        questionType = 'text_questions';
        break;
      case 12:
        questionType = 'restatement';
        break;
    }

    const questionText = questionType === 'text_questions' ? questionsData.items[0].details.textList[0] : null;

    let questionNumber = 0;
    for (let itemIndex in questionsData.items) {
      const item = questionsData.items[itemIndex];
      const itemId = item.id;

      let question = {
        id: itemId,
        type: questionType,
        textList: item.details.textList,
        answers: {}
      };

      if (questionText) {
        if (+itemIndex === 0) {
          continue;
        }
        question.text = questionText;
      }

      questionNumber++;
      question.number = questionNumber;

      if (item.details.answers) {
        for (const answer of item.details.answers) {
          question['answers'][answer.index] = {
            id: answer.index,
            text: answer.text
          };
        }
      }

      questions.push(question);
    }

    context.commit('setQuestions', questions);
    context.commit('setChapterLoaded', true);
  },
  nextQuestion(context) {
    const questionIndex = context.getters.questionIndex + 1;
    context.commit('setQuestion', questionIndex);
  },
  prevQuestion(context) {
    const questionIndex = context.getters.questionIndex - 1;
    context.commit('setQuestion', questionIndex);
  },
  gotoQuestion(context, payload) {
    context.commit('setQuestion', payload);
  },
  nextChapter(context) {
    const chapterIndex = context.getters.chapterIndex + 1;
    context.commit('setChapter', chapterIndex);
    context.commit('setQuestion', 0);
    this.dispatch('loadQuestions');
  },
  setResult(context, payload) {
    const currentChapterIndex = context.getters.chapterIndex;
    const results = context.getters.results;
    const question = context.getters.currentQuestion;

    if (!results[currentChapterIndex]) {
      results[currentChapterIndex] = {};
    }
    results[currentChapterIndex][question.id] = payload;

    context.commit('setResult', {
      results: results
    });
  }
};