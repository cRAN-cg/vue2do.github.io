<template>
  <div class="card todo-item" @click.stop="removeToDo(todo)">
    <div v-bind:class="{'card-content' : true, line : todo.completed}">
      <h5 class="card__title">
        <span class="card__text"
        @click="addFilterTag($event)"
        v-html="formatToDo(todo.text)">
        </span>
      </h5>
      <div class="card-identity">
      <span class="card-identity__date">{{getCompactDate(todo.createdTimeStamp)}}</span>
      <span class="card-identity__id">{{todo.id}}</span>
      </div>
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
      return values
        .split(' ')
        .map((element) => {
          if (element[0] === '#') {
            return `<span class="card__text-word badge badge-info  hash-tag">${element} </span> `;
          }
          return `<span class="card__text-word">${element} </span> `;
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
    getCompactDate: function getCompactDate(timeStamp) {
      return new Date(timeStamp).getDate === new Date().getDate
        ? 'Today'
        : 'Some while back';
    },
  },
};
</script>

<style scoped>
.card.todo-item {
  display: flex;
  flex-direction: column;
  background: #627180;
}

.card__title {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.card-identity {
  display: flex;
}
.card-identity__date {
  display: flex;
  font-size: 0.8rem;
  margin-right: 10px;
}
.card-identity__id {
  display: flex;
  font-size: 0.8rem;
  margin-right: 10px;
}
.card__text
 {
  flex-wrap: wrap;
  text-align: justify;
}

.card__text-word::after{
  content: "&nbsp;";
}

.card-content {
  margin-left: 2%;
  padding: 1%;
}

.line {
  text-decoration: line-through;
}
</style>
