import { connect } from "react-redux";
import TodoList from "../components/TodoList";
import Todo from '../models/Todo';

const getVisibleTodos = (filter) => {
  switch (Todo.filter) {
    case Todo.filters.SHOW_ALL:
      return Todo.all();
    case Todo.filters.SHOW_COMPLETED:
      return Todo.all('completed', true);
    case Todo.filters.SHOW_ACTIVE:
      return Todo.all('completed', false);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.visibilityFilter)
});

export default connect(mapStateToProps)(TodoList);
