import BaseModel from '../EloquentRedux/BaseModel';

class Todo extends BaseModel {
  static $store = 'todos';

  static $initialState = {
    filter: 'SHOW_ALL',
    list: []
  };

  static filters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_ACTIVE: 'SHOW_ACTIVE',
    SHOW_COMPLETED: 'SHOW_COMPLETED'
  };

  static get filter() {
    return this.$state.filter;
  }

  static $fields = function() {
    return [
      {
        name: 'id',
        default: this.$stateList().length + 1
      },
      {
        name: 'text',
        validation: value => value !== undefined
      },
      {
        name: 'completed',
        default: false
      }
    ];
  };

  static $defineActions() {
    return { SET_FILTER: `SET_TODO_FILTER` };
  }

  static $extend() {
    this.$addHandler(this.$actions('SET_FILTER'), (state, action) => ({
      ...state,
      filter: action.filter
    }));
  }

  static setFilter(name) {
    this.$dispatch({
      filter: name,
      type: this.$actions('SET_FILTER')
    });
  }

  toggle() {
    this.update({ completed: !this.completed });
  }
}

export default Todo;
