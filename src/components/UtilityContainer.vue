<template>
  <div>
    <div class="utility-container">
      <input-bar class="utility-container__input" />
      <menu-bar class="utility-container__menu" />
    </div>
    <div>
      <filter-container />
    </div>
  </div>
</template>

<script>
import InputBar from './InputBar';
import MenuBar from './MenuBar';
import FilterContainer from './FilterContainer';

export default {
  name: 'UtilityBar',
  components: {
    'input-bar': InputBar,
    'menu-bar': MenuBar,
    'filter-container': FilterContainer,
  },
};
</script>

<style scoped>
.utility-container {
  display: flex;
}
.utility-container__input {
  flex-grow: 9;
}
.utility-container__menu {
  flex-grow: 1;
}
</style>
