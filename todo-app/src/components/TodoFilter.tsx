import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';
import TodosList from './TodosList';

const FILTERS = {
  all: 'all',
  active: 'active',
  completed: 'completed',
};

const TodoFilter: React.FC = () => {
  const { todos } = useAppSelector(state => state.todos);
  const completedTodos = todos.filter((todo: Todo) => todo.completed);
  const activeTodos = todos.filter((todo: Todo) => !todo.completed);

  return (
    <Routes>
      <Route path="/" element={<TodosList todos={todos} />} />
      <Route path={FILTERS.all} element={<Navigate to="/" />} />
      <Route
        path={FILTERS.active}
        element={<TodosList todos={activeTodos} />}
      />
      <Route
        path={FILTERS.completed}
        element={<TodosList todos={completedTodos} />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default TodoFilter;
