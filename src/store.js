import Vue from 'vue';
import Vuex from 'vuex';
import { uuid } from 'vue-uuid';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: {
      todo: [],
      completed: [],
      active: [],
    },
    nextId: uuid.v4(),
  },
  mutations: {
    addTodo(state, item) {
      state.items.active.push({ ...item, id: state.nextId });
      state.nextId = uuid.v4();
      state.items.todo = [...[...state.items.active].reverse(),
        ...[...state.items.completed].reverse()];
    },
    removeToDo(state, selectedToDo) {
      let completedTodo;
      const indexInArray = [...state.items.active].findIndex(
        item => item.id === selectedToDo.id,
      );
      if (indexInArray > -1) {
        [completedTodo] = state.items.active.splice(indexInArray, 1);
        state.items.completed.push({
          ...completedTodo,
          completedTimeStamp: new Date(),
          completed: true });

        state.items.todo = [...[...state.items.active].reverse(),
          ...[...state.items.completed].reverse()];
      }
    },
  },
});
