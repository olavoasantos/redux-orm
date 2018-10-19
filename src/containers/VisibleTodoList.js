import { connect } from "react-redux";
import TodoList from "../components/TodoList";
import { VisibilityFilters } from "../actions";
import Todo from '../models/Todo';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return Todo.all();
    case VisibilityFilters.SHOW_COMPLETED:
      return Todo.all('completed', true);
    case VisibilityFilters.SHOW_ACTIVE:
      return Todo.all('completed', false);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
});

export default connect(mapStateToProps)(TodoList);
