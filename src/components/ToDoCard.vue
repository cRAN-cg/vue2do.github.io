<template>
    <div class="card todo-item">
        <div class="card-block">
            <h5 class="card-title" @click.stop="removeToDo(todo)">
              <span  @click="addFilterTag($event)" v-html="formatToDo(todo.text)"></span>
              <!-- <span v-for="(elemBlock, index) in todo.split(' ')" v-bind:key="index">
                <span
                v-if="elemBlock[0] && elemBlock[0].includes('#')" class="badge badge-info hash-tag">
                  {{elemBlock}}
                </span>
                <span v-else>{{elemBlock}}</span>
              </span> -->
            </h5>
        </div>

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
      return values.split(' ').map((element) => {
        if (element[0] === '#') {
          return `<span class="badge badge-info hash-tag">${element}</span>`;
        }
        return element;
      }).join(' ');
    },
    addFilterTag: function addFilterTag(event) {
      if (event.srcElement && event.srcElement.className.includes('hash-tag')) {
        this.$store.commit('modifyFilter', { hashTag: event.target.innerText, ...this.todo });
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
