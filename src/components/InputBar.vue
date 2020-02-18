<template>
  <div class="input-bar">
    <form action="#" method="post" v-on:submit.prevent="submitForm">
      <input type="text" v-model="inputText" placeholder="Add something to do">
    </form>
  </div>
</template>

<script>
export default {
  name: 'InputBar',
  data() {
    return {
      inputText: '',
    };
  },
  methods: {
    submitForm: function submitForm() {
      if (this.inputText) {
        this.$store.commit('addTodo', {
          text: this.inputText,
          createdTimeStamp: new Date(),
          completed: false,
        });
      }
      this.inputText = '';
    },
  },
};
</script>

<style scoped>
.input-bar {
  margin: 0 10px 10px 10px;
}
.input-bar input {
  outline: none;
  border: 0;
  border-bottom: 2px solid rgba(255,255,255, 0.25);
  width: 100%;
  transition: all 0.25s;
  background: inherit;
  color: white
}

.input-bar input:focus {
  border-bottom-color: rgba(red, green, blue, 1)
}
</style>
