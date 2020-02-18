<template>
  <div>
    <span v-for="filter in filters" :key="filter" class="badge badge-success filter-item">
      <span class="filter__text-content">{{filter}}</span>
      <span class="filter__close-btn" @click.stop="removeFilter(filter)">&times;</span>
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'FilterContainer',
  computed: mapState({
    filters: state => state.filters,
  }),
  methods: {
    removeFilter: function removeFilter(filter) {
      this.$store.commit('removeFilter', filter);
    },
  },
};
</script>

<style scoped>
.filter-item {
  margin-right: 10px;
  border-radius: 10px;
}

</style>
