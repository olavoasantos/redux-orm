import Operators from './Operators';

export default (field, operator, value) => {
  if (field == null) return {};
  if (value == null && operator == null) {
    value = field;
    field = 'id';
    operator = '=';
  } else if (value == null && operator != null) {
    value = operator;
    operator = '=';
  }
  if (!Operators[operator]) throw new Error('invalid find operator');
  return { field, operator, value };
};