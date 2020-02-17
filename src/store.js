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
    filters: [],
    nextId: uuid.v4(),
  },
  mutations: {
    addTodo(state, item) {
      state.items.active.push({ ...item,
        id: state.nextId,
        hashTags: [...item.text.split(' ').map((word) => {
          if (word[0] === '#') {
            return ({ [word]: { activateFilter: false } });
          }
          return null;
        // eslint-disable-next-line eqeqeq
        }).filter(word => !!word == true)] });
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
        filters: [],
        nextId: uuid.v4(),
      });
    },
    removeFilter(state, filter) {
      const index = [...state.filters].findIndex(
        item => item === filter,
      );
      if (index > -1) {
        state.filters.splice(index, 1);
      }
    },
    addFilter(state, { hashTag: item }) {
      if (!state.filters.find((filter => filter === item))) {
        state.filters.push(item);
      }
    },
  },
});
