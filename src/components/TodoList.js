import React from "react";
import PropTypes from "prop-types";
import TodoComponent from "./Todo";
// import Todo from "../middleware/Todo";

const TodoList = ({ todos, toggleTodo }) => {
  return (
    <ul>
      {todos.map(todo => (
        <TodoComponent
          key={todo.id}
          {...todo}
          onClick={() => {
            todo.toggleTodo();
          }}
        />
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  toggleTodo: PropTypes.func.isRequired
};

export default TodoList;
