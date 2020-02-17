<template>
    <div class="card todo-item">
        <div class="card-block">
            <h5 class="card-title" @click="removeToDo(todo)">
              {{todo.text}}
            </h5>
        </div>

    </div>
</template>

<script>
export default {
  name: 'ToDoCard',
  props: ['todo'],
  methods: {
    removeToDo(selectedToDo) {
      this.$store.commit('removeToDo', selectedToDo);
    },
  },
};
</script>

<style scoped>
.card.todo-item {
    background: #627180;
}
</style>
