const Reducer = (() => {
  const reducers = {};

  return {
    reducers,
    case: (name, action, handler) => {
      if (!reducers[name]) reducers[name] = {};
      if (reducers[name][action]) throw new Error(`Action ${action} already exists on ${name}`);
      reducers[name][action] = handler;
    },
    switch: (name, initialState = {}) => {
      return (state = initialState, action) => {
        return reducers[name][action.type]
          ? reducers[name][action.type](state, action)
          : state;
      }
    },
  }
})()

export default Reducer;
