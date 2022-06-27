import { useAppSelector } from '../hooks/hooks';

function ActiveTodosCounter() {
  const { todos } = useAppSelector(state => state.todos);

  const activeTodosNumber
    = todos.filter((todo: Todo) => todo.completed === false)
      .length;

  return (
    <span className="todo-count">
      {`${activeTodosNumber} ${activeTodosNumber !== 1 ? 'items' : 'item'} left`}
    </span>
  );
}

export default ActiveTodosCounter;
