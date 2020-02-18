<template>
  <div class="menubar">
    <div class="btn-group" role="group" aria-label="Menu bar">
      <button type="button" class="button reset-button" v-on:click="resetBoard">
        <i class="fa fa-trash" aria-hidden="true"></i>
      </button>
      <button type="button" class="button undo-button" v-on:click="undoState">
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

.button {
  background: transparent;
  border: 0;
  margin: 0 0 0 20px;
  padding: 0;
  color: white;
  opacity: 0.3;
}

.undo-button:focus,
.reset-button:focus {
  outline: none
}
</style>
