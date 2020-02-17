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
  },
});
