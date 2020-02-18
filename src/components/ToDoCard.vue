<template>
  <div class="card todo-item" @click.stop="removeToDo(todo)">
    <div class="card-block">
      <h5 class="card-title"></h5>
      <span @click="addFilterTag($event)" v-html="formatToDo(todo.text)"></span>
    </div>
    {{todo.id}}
  </div>
</template>

<script>
export default {
  name: 'ToDoCard',
  props: ['todo'],
  methods: {
    removeToDo(selectedToDo) {
      this.$store.commit('removeToDo', selectedToDo);
    },
    formatToDo: function formatToDo(values) {
      return values
        .split(' ')
        .map((element) => {
          if (element[0] === '#') {
            return `<span class="badge badge-info hash-tag">${element}</span>`;
          }
          return element;
        })
        .join(' ');
    },
    addFilterTag: function addFilterTag(event) {
      if (event.srcElement && event.srcElement.className.includes('hash-tag')) {
        this.$store.commit('addFilter', {
          hashTag: event.target.innerText,
          ...this.todo,
        });
        event.stopPropagation();
      }
    },
  },
};
</script>

<style scoped>
.card.todo-item {
  background: #627180;
}
</style>
