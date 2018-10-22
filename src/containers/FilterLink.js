import { connect } from 'react-redux';
import Link from '../components/Link';
import Todo from '../models/Todo';

const mapStateToProps = () => ({ active: Todo.filter });

export default connect(mapStateToProps)(Link);
