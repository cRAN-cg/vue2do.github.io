<template>
  <div class="dashboard-container">
    <input-bar />
    <menu-bar />
    <div>
      <div class="card" v-for="todo in hashTaggedToDos" :key="todo.id">
        <todo-card :todo="todo"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import InputBar from './InputBar';
import ToDoCard from './ToDoCard';
import MenuBar from './MenuBar';

export default {
  name: 'Dashboard',
  components: {
    'input-bar': InputBar,
    'todo-card': ToDoCard,
    'menu-bar': MenuBar,
  },
  computed: mapState({
    todos: state => state.items.todo,
    hashFilters: s => s.filters,
    getRecentToDos: function getRecentToDo() {
      return [...this.todos.reverse()];
    },
    hashTaggedToDos: function filterTags() {
      if (!(this.hashFilters.length > 0)) {
        return this.todos;
      }
      const newValues = [...[...this.todos].filter(todo =>
        todo.text &&
        [...this.hashFilters].reduce((prev, curr) => todo.text.includes(curr) && prev, true),
      )];
      return newValues;
    },
  }),
};
</script>

<style scoped>

.card {
  margin-bottom: 10px;
}
.card:last-child {
  margin-bottom: 25px;
}
.card-block {
  padding: 15px;
}
</style>
