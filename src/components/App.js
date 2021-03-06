import React from "react";
import Footer from "./Footer";
import AddTodo from "./AddTodo";
import VisibleTodoList from "../containers/VisibleTodoList";

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
      </div>
    );
  }
}

export default App;
