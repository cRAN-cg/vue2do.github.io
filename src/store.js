import Vue from 'vue';
import Vuex from 'vuex';
import { uuid } from 'vue-uuid';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: {
      todo: [],
    },
    nextId: uuid.v4(),
  },
  mutations: {
    addTodo(state, item) {
      state.items.todo.push({ ...item, id: state.nextId });
      state.nextId = uuid.v4();
    },
    removeToDo(state, selectedToDo) {
      const indexInArray = [...state.items.todo].findIndex(
        item => item.id === selectedToDo.id,
      );
      if (indexInArray > -1) {
        state.items.todo.splice(indexInArray, 1);
      }
    },
  },
});
