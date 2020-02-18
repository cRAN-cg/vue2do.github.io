<template>
  <div class="dashboard-container">
    <div>
      <utility-container />
      <div class="card-contianer" >
        <todo-card v-for="todo in hashTaggedToDos" :key="todo.id" :todo="todo"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ToDoCard from './ToDoCard';
import UtilityContainer from './UtilityContainer';

export default {
  name: 'Dashboard',
  components: {
    'todo-card': ToDoCard,
    'utility-container': UtilityContainer,
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
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 10px;
  border-radius: 12px;
}
.card-block {
  padding: 15px;
}
</style>
