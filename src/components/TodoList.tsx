import { Todo } from '../types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  deleteTodo: (id: string) => void;
}

const TodoList = ({ todos, deleteTodo }: TodoListProps) => {
  return (
    <div className="w-full min-h-[200px]">
      {todos.length === 0 ? (
        <div className=" min-h-[200px] flex items-center justify-center">
          <span className="text-[20px] italic text-[#8c8c8c] text-center">
            -- No data --
          </span>
        </div>
      ) : (
        todos.map((data) => <TodoItem todo={data} deleteTodo={deleteTodo} />)
      )}
    </div>
  );
};

export default TodoList;
