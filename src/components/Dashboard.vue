<template>
  <div class="dashboard-container">
    <input-bar />
    <div>
      <div class="card" v-for="todo in todos" :key="todo.id">
        <todo-card :todo="todo"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import InputBar from './InputBar';
import ToDoCard from './ToDoCard';

export default {
  name: 'Dashboard',
  components: {
    'input-bar': InputBar,
    'todo-card': ToDoCard,
  },
  computed: mapState({
    todos: state => state.items.todo,
    getRecentToDos: function getRecentToDo() {
      return [...this.todos.reverse()];
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
