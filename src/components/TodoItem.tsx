import { Link } from 'react-router-dom';
import { Todo } from '../types';
import Badge from './Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

interface TodoItemProps {
  todo: Todo;
  deleteTodo: (id: string) => void;
}

const TodoItem = ({ todo, deleteTodo }: TodoItemProps) => {
  const today = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  };

  const isDueDate = (due: string) => {
    const todayDate = new Date(today());
    const dueDate = new Date(due);
    return todayDate.getTime() > dueDate.getTime()
      ? 'bg-red-300 py-2 rounded-lg'
      : '';
  };

  return (
    <div className="w-full my-1 py-2 border-b-[1px] border-[#d1d5db]">
      <div
        className={`flex flex-row items-center px-2 ${isDueDate(
          todo.due_date
        )}`}
        data-testid="container-todo-item"
      >
        <div className="flex-1">
          <span className="text-[16px]">{todo.title}</span>
          <p className="text-[11px] opacity-70">{todo.description}</p>
          <p className="text-[11px] opacity-70">Due: {todo.due_date}</p>
        </div>

        <div className="flex items-center gap-3">
          <Badge text={todo.status} status={todo.status} />
          <Link to={`/add-todo?id=${todo.id}`}>
            <FontAwesomeIcon icon={faPenToSquare} color="blue" />
          </Link>
          <FontAwesomeIcon
            icon={faTrash}
            color="red"
            className="cursor-pointer"
            onClick={() => deleteTodo(todo.id!)}
            data-testid="delete-item"
          />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
