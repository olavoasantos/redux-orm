export default {
  '=': (key, value) => key === value,
  'is': (key, value) => key === value,
  '!=': (key, value) => key !== value,
  'is not': (key, value) => key !== value,
  '>': (key, value) => key > value,
  'bigger than': (key, value) => key > value,
  '>=': (key, value) => key >= value,
  'bigger or equal than': (key, value) => key >= value,
  '<': (key, value) => key < value,
  'smaller than': (key, value) => key < value,
  '<=': (key, value) => key <= value,
  'smaller or equal than': (key, value) => key <= value,
};