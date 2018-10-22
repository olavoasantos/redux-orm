import "./models";
import "./styles.css";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import Eloquent from "./EloquentRedux/Eloquent";

const store = Eloquent.createStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
