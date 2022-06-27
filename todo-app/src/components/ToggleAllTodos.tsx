import { editTodo } from '../features/todos/todosSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

const ToggleAllTodos = () => {
  const { todos } = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  const handleToggleAllTodosStatus = async () => {
    if (todos.some((todo: Todo) => todo.completed === false)) {
      todos.forEach((todo: Todo) => {
        if (!todo.completed) {
          dispatch(editTodo({
            id: todo.id,
            title: todo.title,
            completed: true,
          }));
        }
      });
    } else {
      todos.forEach((todo: Todo) => {
        dispatch(editTodo({
          id: todo.id,
          title: todo.title,
          completed: !todo.completed,
        }));
      });
    }
  };

  const isAllTodosTogled
  = todos.some(todo => todo.completed === false);

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        checked={isAllTodosTogled}
        onClick={handleToggleAllTodosStatus}
        readOnly
      />
      <label
        hidden={todos.length === 0}
        htmlFor="toggle-all"
      >
        Mark all as complete
      </label>
    </>
  );
};

export default ToggleAllTodos;
