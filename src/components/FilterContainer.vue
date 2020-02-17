<template>
  <div>
    <span v-for="filter in filters" :key="filter" class="badge badge-success">
      <span>{{filter}}</span><span @click.stop="removeFilter(filter)">&times;</span>
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

</style>
