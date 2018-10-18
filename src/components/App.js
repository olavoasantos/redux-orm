import React from "react";
import Footer from "./Footer";
import AddTodo from "../containers/AddTodo";
import VisibleTodoList from "../containers/VisibleTodoList";
import Todo from "../middleware/Todo";

class App extends React.PureComponent {
  componentWillUpdate() {
    const newTodo = new Todo();
    console.log(newTodo.all());
  }

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
