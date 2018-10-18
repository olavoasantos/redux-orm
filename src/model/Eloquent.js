import { createStore, applyMiddleware } from "redux";

const accessMiddleware = store => next => action => {
  Eloquent.setStore(store);
  next(action);
};

const Eloquent = (() => {
  let reduxStore;
  return {
    createStore: rootReducer => {
      reduxStore = createStore(rootReducer, applyMiddleware(accessMiddleware));
      return reduxStore;
    },
    setStore: redux => {
      reduxStore = redux;
    },
    store: () => reduxStore
  };
})();

export default Eloquent;
