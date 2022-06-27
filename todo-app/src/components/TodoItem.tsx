import { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch } from '../hooks/hooks';
import {
  deleteTodo,
  editTodo,
} from '../features/todos/todosSlice';

type Props = {
  todo: Todo,
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const inputEl = useRef<HTMLInputElement>(null);

  const handleDelete = async () => {
    await dispatch(deleteTodo(todo.id));
  };

  const handleChangeStatus = async () => {
    await dispatch(editTodo({
      id: todo.id,
      title: todo.title,
      completed: !todo.completed,
    }));
  };

  const escFunction = useCallback((event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      setTitle(todo.title);
      inputEl.current?.blur();
    }
  }, [todo]);

  const handleEditTodoTitle = () => {
    setEditing(true);
    document.addEventListener('keyup', escFunction);
    requestAnimationFrame(() => {
      inputEl.current?.focus();
    });
  };

  const onBlurInput = async () => {
    if (title.trim().length) {
      await dispatch(editTodo({
        id: todo.id,
        title,
        completed: todo.completed,
      }));
    } else {
      await dispatch(deleteTodo(todo.id));
    }

    setEditing(false);
    document.removeEventListener('keyup', escFunction);
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      inputEl.current?.blur();
    }
  };

  return (
    <li
      className={classNames(
        'todo-item',
        { completed: todo.completed === true },
        { editing },
      )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => handleChangeStatus()}
        />
        <label
          onDoubleClick={handleEditTodoTitle}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={handleDelete}
        />
      </div>
      <input
        type="text"
        className="edit"
        id="editTodo"
        ref={inputEl}
        value={title}
        onChange={event => setTitle(event.target.value)}
        onBlur={onBlurInput}
        onKeyPress={handleEnterPress}
      />
    </li>
  );
};

export default TodoItem;
