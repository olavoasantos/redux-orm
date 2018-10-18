import Eloquent from './Eloquent';

const Operators = {
  '=': (key, value) => key === value,
  '!=': (key, value) => key !== value,
  '>': (key, value) => key > value,
  '>=': (key, value) => key >= value,
  '<': (key, value) => key < value,
  '<=': (key, value) => key <= value,
};

const normalizeFieldOperatorValue = (field, operator, value) => {
  if (field == null) return {};
  if (value == null && operator == null) {
    value = field;
    field = 'id';
    operator = '=';
  } else if (value == null && operator != null) {
    value = operator;
    operator = '=';
  }
  return { field, operator, value };
};

class BaseModel {
  static table = '';

  get table() {
    return this.constructor.table;
  }

  static store = Eloquent.store;

  get store() {
    return this.constructor.store;
  }

  static get dispatch() {
    return this.store().dispatch;
  }

  get dispatch() {
    return this.constructor.store().dispatch;
  }

  static all(...args) {
    const { field, operator, value } = normalizeFieldOperatorValue(...args);
    return this.store()
      .getState()[this.table]
      .filter(item => field ? Operators[operator](item[field], value) : true)
      .map(item => new this(item));
  }

  static find(...args) {
    const { field, operator, value } = normalizeFieldOperatorValue(...args);
    if (!Operators[operator]) throw new Error('invalid find operator');
    if (field == null) throw new Error('field in find method is required');
    const item = this.store()
      .getState()[this.table]
      .find(item => (Operators[operator](item[field], value)));

    return item ? new this(item) : undefined;
  }

  constructor(data) {
    Object.keys(data).forEach(key => (this[key] = data[key]));
  }
}


export default BaseModel;