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
  return { field, operator, value };
};