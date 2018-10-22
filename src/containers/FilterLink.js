import { connect } from 'react-redux';
import Link from '../components/Link';
import Todo from '../models/Todo';

export default connect(() => ({ activeFilter: Todo.filter }))(Link);
