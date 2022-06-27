import { deleteTodo } from '../features/todos/todosSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

function ClearCompletedTodosButton() {
  const { todos } = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  const handleClearCompletedTodos = async () => {
    const completedTodos = todos.filter(todo => todo.completed === true);

    completedTodos.forEach(todo => dispatch(deleteTodo(todo.id)));
  };

  const isClearButtonHidden: boolean
    = todos.every(todo => todo.completed === false);

  return (
    <button
      type="button"
      className="clear-completed"
      hidden={isClearButtonHidden}
      onClick={handleClearCompletedTodos}
    >
      Clear completed
    </button>
  );
}

export default ClearCompletedTodosButton;
