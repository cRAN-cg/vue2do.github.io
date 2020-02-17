<template>
  <div class="dashboard-container">
    <input-bar />
    <div>
      <div class="card" v-for="todo in getRecentToDo" :key="todo.id">
        <h5 class="card-title">{{todo.text}}</h5>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import InputBar from './InputBar';

export default {
  name: 'Dashboard',
  components: {
    'input-bar': InputBar,
  },
  computed: mapState({
    todos: state => state.items.todo,
    getRecentToDo: function getRecentToDo() {
      return [...this.todos.reverse()];
    },
  }),
  methods: {
  },
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
