import React, { useState } from 'react';
import { addTodo } from '../features/todos/todosSlice';
import { useAppDispatch } from '../hooks/hooks';

const NewTodoForm = () => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newTodoTitle.trim().length === 0) {
      return;
    }

    await dispatch(addTodo(newTodoTitle));
    setNewTodoTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={newTodoTitle}
        onChange={event => setNewTodoTitle(event.target.value)}
      />
    </form>
  );
};

export default NewTodoForm;
