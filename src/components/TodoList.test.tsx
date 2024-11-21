import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';
import { Todo } from '../types';

jest.mock(
  './TodoItem',
  () =>
    ({ todo, deleteTodo }: { todo: Todo; deleteTodo: (id: string) => void }) =>
      (
        <div>
          <span>{todo.title}</span>
          <button onClick={() => deleteTodo(todo.id!)}>Delete</button>
        </div>
      )
);

describe('TodoList', () => {
  const mockDeleteTodo = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with todos', () => {
    const todos: Todo[] = [
      {
        id: '1',
        title: 'First Todo',
        description: 'First Description',
        status: 'Pending',
        due_date: '2024-11-21',
      },
      {
        id: '2',
        title: 'Second Todo',
        description: 'First Description',
        status: 'Pending',
        due_date: '2024-11-21',
      },
    ];

    render(<TodoList todos={todos} deleteTodo={mockDeleteTodo} />);

    expect(screen.getByText('First Todo')).toBeInTheDocument();
    expect(screen.getByText('Second Todo')).toBeInTheDocument();
    expect(screen.queryByText('-- No data --')).not.toBeInTheDocument();
  });

  it('shows empty state when no todos are provided', () => {
    render(<TodoList todos={[]} deleteTodo={mockDeleteTodo} />);

    expect(screen.getByText('-- No data --')).toBeInTheDocument();
    expect(screen.queryByText('First Todo')).not.toBeInTheDocument();
  });

  it('calls deleteTodo when the delete button is clicked', () => {
    const todos: Todo[] = [
      {
        id: '1',
        title: 'First Todo',
        description: 'First Description',
        status: 'Pending',
        due_date: '2024-11-21',
      },
    ];

    render(<TodoList todos={todos} deleteTodo={mockDeleteTodo} />);

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(mockDeleteTodo).toHaveBeenCalledTimes(1);
    expect(mockDeleteTodo).toHaveBeenCalledWith('1');
  });
});

export {};
