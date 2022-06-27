import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { getUserById, USER_ID } from './api/users';
import NewTodoForm from './components/NewTodoForm';

import {
  getTodos,
} from './features/todos/todosSlice';

import TodoFilter from './components/TodoFilter';
import ToggleAllTodos from './components/ToggleAllTodos';
import ActiveTodosCounter from './components/ActiveTodosCounter';
import ClearCompletedTodosButton from './components/ClearCompletedTodosButton';
import Error from './components/Error';

const TodoApp: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos, error } = useAppSelector(state => state.todos);
  const [userError, setUserError] = useState(false);
  const [name, setName] = useState('');
  const [isLoading, setLoading] = useState(true);

  const placeholder = isLoading ? 'Loading...' : 'Server error';

  const getUserName = async () => {
    try {
      const user = await getUserById(USER_ID);

      setName(user.name);
      setLoading(false);
    } catch (e) {
      setUserError(true);
    }
  };

  useEffect(() => {
    getUserName();
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>{name ? `${name}'s todos` : placeholder}</h1>
          <NewTodoForm />
        </header>

        <section className="main">
          <ToggleAllTodos />
          <TodoFilter />
        </section>

        {todos.length !== 0 && (
          <footer className="footer">
            <ActiveTodosCounter />
            <ul className="filters">
              <li>
                <NavLink
                  to="/"
                  className={
                    ({ isActive }) => classNames({ selected: isActive })
                  }
                >
                  All
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/active"
                  className={
                    ({ isActive }) => classNames({ selected: isActive })
                  }
                >
                  Active
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/completed"
                  className={
                    ({ isActive }) => classNames({ selected: isActive })
                  }
                >
                  Completed
                </NavLink>
              </li>
            </ul>

            <ClearCompletedTodosButton />
          </footer>
        )}
      </section>
      {(error || userError)
        && <Error message="Server error: try again later" />}
    </>
  );
};

export default TodoApp;
