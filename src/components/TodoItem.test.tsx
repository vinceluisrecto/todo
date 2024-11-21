import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';
import { BrowserRouter } from 'react-router-dom';
import { Todo } from '../types';

jest.mock(
  './Badge',
  () =>
    ({ text, status }: { text: string; status: string }) =>
      (
        <div className={`badge ${status}`} data-testid="badge">
          {text}
        </div>
      )
);

describe('TodoItem Component', () => {
  const mockDeleteTodo = jest.fn();

  const mockTodo: Todo = {
    id: '1',
    title: 'Test Todo',
    description: 'Test Description',
    due_date: '2023-01-01',
    status: 'Pending',
  };

  beforeEach(() => {
    mockDeleteTodo.mockClear();
  });

  test('renders TodoItem with correct content', () => {
    render(
      <BrowserRouter>
        <TodoItem todo={mockTodo} deleteTodo={mockDeleteTodo} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Test Todo/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Description/i)).toBeInTheDocument();
    expect(screen.getByText(/Due: 2023-01-01/i)).toBeInTheDocument();

    expect(screen.getByTestId('badge')).toHaveTextContent('Pending');
  });

  test('displays due date as red if it is past due', () => {
    const overdueTodo: Todo = { ...mockTodo, due_date: '2022-01-01' }; // Past date

    render(
      <BrowserRouter>
        <TodoItem todo={overdueTodo} deleteTodo={mockDeleteTodo} />
      </BrowserRouter>
    );

    const todoElement = screen.getByTestId('container-todo-item');
    expect(todoElement).toHaveClass('bg-red-300');
  });

  test('calls deleteTodo when trash icon is clicked', () => {
    render(
      <BrowserRouter>
        <TodoItem todo={mockTodo} deleteTodo={mockDeleteTodo} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByTestId('delete-item'));
    expect(mockDeleteTodo).toHaveBeenCalledWith(mockTodo.id);
  });

  test('navigates to edit page when edit icon is clicked', () => {
    const { container } = render(
      <BrowserRouter>
        <TodoItem todo={mockTodo} deleteTodo={mockDeleteTodo} />
      </BrowserRouter>
    );

    const editLink = container.querySelector('a[href="/add-todo?id=1"]');
    expect(editLink).toBeInTheDocument();
  });
});

export {};
