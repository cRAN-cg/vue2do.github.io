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
        ...[...state.items.completed].reverse(),
      ];
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
          completed: true,
        });

        state.items.todo = [...[...state.items.active].reverse(),
          ...[...state.items.completed].reverse(),
        ];
      }
    },
    undoState(state) {
      state.items.todo.forEach((completedToDo) => {
        if (completedToDo.completed) {
          // eslint-disable-next-line no-param-reassign
          completedToDo.completed = false;
        }
      });
      state.items.active = [...[...state.items.todo].sort((a, b) =>
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        new Date(a.createdTimeStamp) - new Date(b.createdTimeStamp),
      )];
      state.items.completed = [];
      state.items.todo = [...[...state.items.active].reverse()];
    },
    resetBoard() {
      this.replaceState({
        items: {
          todo: [],
          completed: [],
          active: [],
        },
        nextId: uuid.v4(),
      });
    },
  },
});
