/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { request } from '../../api/api';
import { USER_ID } from '../../api/users';

const initialState: { todos: Todo[], error: boolean } = {
  todos: [],
  error: false,
};

export const getTodos = createAsyncThunk(
  'todos/getTodos',
  async () => request(`todos?userId=${USER_ID}`),
);

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (title: string) => request('todos', {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    method: 'POST',
    body: JSON.stringify({
      title,
      userId: USER_ID,
      completed: false,
    }),
  }),
);

export const editTodo = createAsyncThunk(
  'todos/editTodo',
  async ({ id, title, completed }: Todo) => {
    request(`todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ title, completed }),
    });

    return { id, title, completed };
  },
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (todoId: number) => {
    request(
      `todos/${todoId}`,
      { method: 'DELETE' },
    );

    return todoId;
  },
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.error = false;
    });
    builder.addCase(getTodos.rejected, (state) => {
      state.error = true;
    });

    builder.addCase(addTodo.fulfilled, (state, action) => {
      const addedTodo = action.payload;

      state.todos = [...state.todos, addedTodo];
      state.error = false;
    });
    builder.addCase(addTodo.rejected, (state) => {
      state.error = true;
    });

    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      const todoId = action.payload;

      state.todos = state.todos.filter(todo => todoId !== todo.id);
      state.error = false;
    });
    builder.addCase(deleteTodo.rejected, (state) => {
      state.error = true;
    });

    builder.addCase(editTodo.fulfilled, (state, action) => {
      const { id, title, completed } = action.payload;

      state.todos = state.todos.map(todo => {
        if (todo.id === id) {
          todo.title = title;
          todo.completed = completed;
        }

        return todo;
      });
      state.error = false;
    });
    builder.addCase(editTodo.rejected, (state) => {
      state.error = true;
    });
  },
});

export default todosSlice.reducer;
