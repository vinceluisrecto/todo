import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import { useAppContext } from '../context/AppContext';
import { Todo } from '../types';

// Mock the useAppContext to simulate the todo list and delete function
jest.mock('../context/AppContext', () => ({
  useAppContext: jest.fn(),
}));

describe('Home Component', () => {
  const mockDeleteTodo = jest.fn();
  const mockTodoList: Todo[] = [
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
      description: 'Second Description',
      status: 'In Progress',
      due_date: '2024-11-22',
    },
    {
      id: '3',
      title: 'Completed Todo',
      description: 'Completed Description',
      status: 'Completed',
      due_date: '2024-11-23',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppContext as jest.Mock).mockReturnValue({
      todo: mockTodoList,
      deleteTodo: mockDeleteTodo,
    });
  });

  it('renders the Home component correctly', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Check that the search input, status select, and TodoList component render
    expect(screen.getByLabelText('Search')).toBeInTheDocument();
    expect(screen.getByLabelText('Status')).toBeInTheDocument();
    expect(screen.getByText('To-Do List')).toBeInTheDocument();
    expect(screen.getByText('Add Todo')).toBeInTheDocument();
  });

  it('filters todos based on search input', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText(
      'Title'
    ) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'First' } });

    // Check that only the 'First Todo' is displayed
    expect(screen.getByText('First Todo')).toBeInTheDocument();
    expect(screen.queryByText('Second Todo')).not.toBeInTheDocument();
    expect(screen.queryByText('Completed Todo')).not.toBeInTheDocument();
  });

  it('filters todos based on status', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const statusSelect = screen.getByLabelText('Status') as HTMLSelectElement;
    fireEvent.change(statusSelect, { target: { value: 'Pending' } });

    // Check that only 'Pending' todos are displayed
    expect(screen.getByText('First Todo')).toBeInTheDocument();
    expect(screen.queryByText('Second Todo')).not.toBeInTheDocument();
    expect(screen.queryByText('Completed Todo')).not.toBeInTheDocument();
  });

  it('filters todos based on both search input and status filter', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText(
      'Title'
    ) as HTMLInputElement;
    const statusSelect = screen.getByLabelText('Status') as HTMLSelectElement;

    // Search for "Todo" and filter by "In Progress"
    fireEvent.change(searchInput, { target: { value: 'Todo' } });
    fireEvent.change(statusSelect, { target: { value: 'In Progress' } });

    // Ensure only the 'Second Todo' is shown
    expect(screen.queryByText('First Todo')).not.toBeInTheDocument();
    expect(screen.getByText('Second Todo')).toBeInTheDocument();
    expect(screen.queryByText('Completed Todo')).not.toBeInTheDocument();
  });

  it('should match the snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Capture the snapshot of the component's rendered output
    expect(asFragment()).toMatchSnapshot();
  });
});

export {};
