<template>
  <div>
    <div>
      <progress-ring></progress-ring>
    </div>
    <div class="utility-container">
      <input-bar class="utility-container__input" />
      <menu-bar class="utility-container__menu" />
    </div>
    <div>
      <filter-container class="filter"/>
    </div>
  </div>
</template>

<script>
import InputBar from './InputBar';
import MenuBar from './MenuBar';
import FilterContainer from './FilterContainer';
import ProgressBar from './ProgressBar';

export default {
  name: 'UtilityBar',
  components: {
    'input-bar': InputBar,
    'menu-bar': MenuBar,
    'filter-container': FilterContainer,
    'progress-ring': ProgressBar,
  },
};
</script>

<style scoped>
.utility-container {
  display: flex;
  padding: 10% 10% 5% 10%;
}
.utility-container__input {
  flex-grow: 9;
}
.utility-container__menu {
  flex-grow: 1;
}

.filter {
  padding: 10px;
}
</style>
