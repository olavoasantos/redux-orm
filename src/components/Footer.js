import React from "react";
import FilterLink from "../containers/FilterLink";

import Todo from '../models/Todo';

const Footer = () => (
  <div>
    <span>Show: </span>
    <FilterLink filter={Todo.filters.SHOW_ALL}>All</FilterLink>
    <FilterLink filter={Todo.filters.SHOW_ACTIVE}>Active</FilterLink>
    <FilterLink filter={Todo.filters.SHOW_COMPLETED}>Completed</FilterLink>
  </div>
);

export default Footer;
