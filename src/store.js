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
        nextId: uuid.v4(),
      });
    },
    modifyFilter(state, { hashTag: item, id }) {
      // change the associated value of tag
      const indexInArray = [...state.items.todo].findIndex(
        i => i.id === id,
      );
      if (indexInArray > -1) {
        const hashTagArray = [...[...state.items.todo][indexInArray].hashTags];
        const hashTagIndex = hashTagArray.findIndex(hashTag => hashTag[item]);
        if (hashTagIndex > -1) {
          const hashFilterActivated = [...hashTagArray][hashTagIndex][item].activateFilter;
          // eslint-disable-next-line max-len
          state.items.todo[indexInArray].hashTags[hashTagIndex][item].activateFilter = !hashFilterActivated;

          // if activate is true add to the filter array else splice

          if (!hashFilterActivated === true) {
            if (!state.filters || !state.filters.some(hashTag => hashTag === item)) {
              state.filters.push(item);
            }
          } else {
            const filterIndex = [...state.filters].findIndex(
              filterName => filterName === item,
            );
            if (filterIndex > -1) {
              state.filters.splice(filterIndex, 1);
            }
          }
        }
      }
    },
  },
});
