<template>
  <td class="ans-input">
    <input type="radio" name="answer" ref="answerInput" :value="id" @change="setAnswerResult(id)"></td>
  <td>
    <div class="ans-content">
      <p class="testing ans-option">{{ text }}</p>
    </div>
  </td>
</template>
<script>
export default {
  props: ['id', 'text', 'checked'],
  emits: ['set-result'],
  methods: {
    setAnswerResult(id) {
        this.$emit('set-result', id);
    }
  },
  updated() {
    this.$refs.answerInput.checked = this.checked;
  }
};
</script>

<style scoped>
.ans .ans-input {
  width: 80px;
  text-align: center;
}

.ans .ans-input input[type=radio] {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  cursor: pointer;
}

.ans .ans-content {
  padding: 0 1rem;
}
</style>