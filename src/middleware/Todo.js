import BaseModel from '../model/BaseModel';
import { toggleTodo } from "../actions";

class Todo extends BaseModel {
  static table = 'todos';

  toggleTodo() {
    this.dispatch(toggleTodo(this.id));
  }
}

export default Todo;
