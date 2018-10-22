import React from 'react';

import Todo from './Todo';

const TodoList = ({ todos }) => {
  return (
  <ul>
    {todos.map(todo => (
      <Todo
        todo={todo}
        key={todo.id}
        onClick={() => todo.toggle()}
      />
    ))}
  </ul>
);
}

export default TodoList;
