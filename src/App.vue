<template>
  <div id="todo">
    <div class="page-header">
      <h1>TODO:</h1>
      <p>simple, offline TODO app, powered by Vue.js</p>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#todo {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin-top: 60px;
}

.page-header h1 {
  font-weight: 300;
}
</style>
