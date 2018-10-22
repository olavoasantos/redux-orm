import React from "react";
import PropTypes from "prop-types";

import Todo from '../models/Todo';

const Link = ({ children, active, filter }) => (
  <button
    disabled={active === filter}
    onClick={() => Todo.setFilter(filter)}
    style={{
      marginLeft: "4px"
    }}
  >
    {children}
  </button>
);

Link.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Link;
