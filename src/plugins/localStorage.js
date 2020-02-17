export default (store) => {
  store.subscribe((m, state) => {
    localStorage.setItem('todoState', JSON.stringify(state));
  });
};
