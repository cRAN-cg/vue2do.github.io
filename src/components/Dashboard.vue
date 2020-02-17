<template>
  <div class="dashboard-container">
    <input-bar />
  </div>
</template>

<script>
import InputBar from './InputBar';

export default {
  name: 'Dashboard',
  components: {
    'input-bar': InputBar,
  },
};
</script>

<style scoped>

</style>
