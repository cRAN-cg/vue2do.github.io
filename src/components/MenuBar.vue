<template>
  <div class="menubar">
    <div class="btn-group" role="group" aria-label="Menu bar">
      <button v-on:click="resetBoard">
        <i class="fa fa-refresh" aria-hidden="true"></i>
      </button>
      <button v-on:click="undoState">
        <i class="fa fa-undo" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuBar',
  methods: {
    resetBoard: function resetBoard() {
      this.$store.commit('resetBoard', {
        text: this.itemText,
      });
    },
    undoState: function undoState() {
      this.$store.commit('undoState', {
      });
    },
  },
};
</script>

<style  scoped>
.menubar {
  margin-bottom: 16px;
}
</style>
