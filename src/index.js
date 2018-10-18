import "./styles.css";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import App from "./components/App";
import Access from "./model/Eloquent";

const store = Access.createStore(rootReducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
