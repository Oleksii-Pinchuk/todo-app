import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { Provider } from 'react-redux';
import { store } from './store';
import TodoApp from './TodoApp';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <TodoApp />
    </Provider>
  </Router>,
  document.getElementById('root'),
);
