import Reducer from './Reducer';
import Eloquent from './Eloquent';
import Operators from './Operators';
import FieldOperatorValue from './FieldOperatorValue';

class BaseModel {
  static $store = '';

  get $store() {
    return this.constructor.$store;
  }

  static $actions() {
    return {
      ...this.$baseActions(),
      ...this.$defineActions(),
    };
  }

  get $actions() {
    return this.constructor.$actions;
  }

  static $baseActions() {
    return {
      WILL_CREATE: `@@eloquent_redux_${this.$store}_will_create`,
      CREATE: `@@eloquent_redux_${this.$store}_create`,
      CREATED: `@@eloquent_redux_${this.$store}_created`,
      WILL_UPDATE: `@@eloquent_redux_${this.$store}_will_update`,
      UPDATE: `@@eloquent_redux_${this.$store}_update`,
      UPDATED: `@@eloquent_redux_${this.$store}_updated`,
      WILL_DELETE: `@@eloquent_redux_${this.$store}_will_delete`,
      DELETE: `@@eloquent_redux_${this.$store}_delete`,
      DELETED: `@@eloquent_redux_${this.$store}_deleted`
    };
  }

  get $baseActions() {
    return this.constructor.$baseActions;
  }

  static $defineActions() {
    return {};
  }

  get $defineActions() {
    return this.constructor.$defineActions;
  }

  static $initialState = {
    list: []
  };

  static $stateList() {
    return this.$state.list;
  }

  get $stateList() {
    return this.constructor.$stateList;
  }

  static $reducer() {
    this.$basicHandlers();
    this.$extend();
    return Reducer.switch(this.$store, this.$initialState);
  }

  static $addHandler(action, callback) {
    Reducer.case(this.$store, action, callback);
  }

  static $basicHandlers() {
    this.$addHandler(
      this.$actions(this.$store).CREATE,
      function(state, action) {
        this.willCreate(state, action);
        state = this.creating(state, action);
        this.created(state, action);

        return state;
      }.bind(this)
    );
    this.$addHandler(
      this.$actions(this.$store).UPDATE,
      function(state, action) {
        this.willUpdate(state, action);
        state = this.updating(state, action);
        this.updated(state, action);

        return state;
      }.bind(this)
    );
    this.$addHandler(
      this.$actions(this.$store).DELETE,
      function(state, action) {
        this.willDelete(state, action);
        state = this.deleting(state, action);
        this.deleted(state, action);

        return state;
      }.bind(this)
    );
  }

  static $extend() {}

  static $global = Eloquent.store;

  get $global() {
    return this.constructor.$global;
  }

  static get $dispatch() {
    return this.$global().dispatch;
  }

  get $dispatch() {
    return this.constructor.$global().dispatch;
  }

  static get $state() {
    return this.$global().getState()[this.$store];
  }

  get $state() {
    return this.constructor.$state;
  }

  static $fields = [];

  get $fields() {
    return this.constructor.$fields;
  }

  static $defaults() {
    return {};
  }

  get $defaults() {
    return this.constructor.$defaults;
  }

  static $referencedBy = 'id';

  get $referencedBy() {
    return this.constructor.$referencedBy;
  }

  static all(...args) {
    const { field, operator, value } = FieldOperatorValue(...args);
    return this.$stateList()
      .filter(item => (field ? Operators[operator](item[field], value) : true));
  }

  static find(...args) {
    const { field, operator, value } = FieldOperatorValue(...args);
    if (field == null) throw new Error('field in find method is required');
    return this.$stateList().find(item =>
      Operators[operator](item[field], value)
    );
  }

  static create(data) {
    const defaults = this.$defaults();
    const payload = this.$fields.reduce((model, field) => {
      return typeof field === 'string'
        ? {
            ...model,
            [field]: data[field] !== undefined ? data[field] : defaults[field]
          }
        : { ...model, [field.name]: data[field.name] };
    }, {});

    const item = new this(payload);

    this.$dispatch({
      payload: item,
      type: this.$actions().CREATE
    });

    return item;
  }

  constructor(data = {}) {
    this.$defineFields();
    this.$hydrate(data);
  }

  $data = {};

  $defineFields() {
    this.$fields.forEach(
      field => {
        const attribute = (typeof field === 'object') ? field.name : field;
        Object.defineProperty(this, attribute, {
          get: () => {
            return this.$data[attribute];
          },
          set: (value) => {
            this.$data[attribute] = value;
            return this.$data[attribute];
          },
        });
      }
    );
  }

  $mapFieldsFrom(data) {
    return this.$fields.map(field => {
      if (typeof field === 'object') {
        if (field.validate && !field.validate(data[field.name])) {
          throw new Error(
            `Invalid value "${data[field]}" of field ${field.name}`
          );
        }
        field = field.name;
      }

      return { name: field, value: data[field] != null ? data[field] : this.$defaults()[field] };
    });
  }

  $hydrate(data) {
    this.$mapFieldsFrom(data).forEach(
      attribute => (this[attribute.name] = attribute.value)
    );
  }

  create() {
    const defaults = this.$defaults();
    const payload = this.$fields.reduce((data, field) => {
      return typeof field === 'string'
        ? {
            ...data,
            [field]: this[field] !== undefined ? this[field] : defaults[field]
          }
        : { ...data, [field.name]: this[field.name] };
    }, {});

    this.$dispatch({
      payload: new this.constructor(payload),
      type: this.$actions().CREATE
    });
  }

  update(data = {}) {
    const payload = {
      ...this.$data,
      ...this.$mapFieldsFrom(data).reduce(($data, attribute) => {
        return attribute.value === undefined
          ? $data
          : { ...$data, [attribute.name]: attribute.value };
      }, {})
    };

    this.$dispatch({
      type: this.$actions().UPDATE,
      reference: this[this.$referencedBy],
      payload: new this.constructor(payload)
    });
  }

  static willCreate(state, action) {}

  static creating(state, action) {
    return {
      ...state,
      list: [...state.list, action.payload]
    };
  }

  static created(state, action) {}

  static willUpdate(state, action) {}

  static updating(state, action) {
    return {
      ...state,
      list: state.list.map(item => {
        return item[this.$referencedBy] === action.reference
          ? action.payload
          : item;
      }),
    };
  }

  static updated(state, action) {}

  static willDelete(state, action) {}

  static deleting(state, action) {
    return {
      ...state,
      list: state.list.filter(
        item => item[this.$referencedBy] === action.reference
      )
    };
  }

  static deleted(state, action) {}
}

export default BaseModel;
