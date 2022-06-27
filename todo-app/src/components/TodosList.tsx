import TodoItem from './TodoItem';

type Props = {
  todos: Todo[],
};

const TodosList: React.FC<Props> = ({ todos }) => (
  <>
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  </>
);

export default TodosList;
