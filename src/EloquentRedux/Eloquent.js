import { createStore, combineReducers } from "redux";

const Eloquent = (() => {
  let reduxStore;
  let models = [];
  return {
    register: (model) => {
      const exist = models.find(registered => registered.$store === model.$store);
      if (!exist) {
        models.push(model);
      } else {
        throw new Error(`Model "${model.$store}" is duplicated`);
      }
    },
    createStore: (rootReducers, ...args) => {
      const $reducers = models.reduce((reducerBundle, model) => {
        if (reducerBundle[model.$store]) throw new Error(`Store ${model.$store} is duplicated`);

        return { ...reducerBundle, [model.$store]: model.$reducer() };
      }, { ...rootReducers });

      reduxStore = createStore(combineReducers($reducers), ...args);

      return reduxStore;
    },
    setStore: redux => {
      reduxStore = redux;
    },
    store: () => reduxStore
  };
})();

export default Eloquent;
