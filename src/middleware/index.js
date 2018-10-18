import Access from "./Access";

const customMiddleWare = store => next => action => {
  Access.setStore(store);
  next(action);
};

export default customMiddleWare;
