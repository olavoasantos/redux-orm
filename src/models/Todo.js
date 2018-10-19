import BaseModel from '../EloquentRedux/BaseModel';

class Todo extends BaseModel {
  static $store = 'todos';

  static $fields = ['id', 'text', 'completed'];

  static $defaults() {
    return {
      id: this.$state.list.length + 1,
      completed: false
    };
  }

  toggle() {
    this.update({ completed: !this.completed });
  }
}

export default Todo;
