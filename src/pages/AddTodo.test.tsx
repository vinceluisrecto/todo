import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddTodo from './AddTodo';
import { useAppContext } from '../context/AppContext';
import { Todo } from '../types';
import { v4 as uuidv4 } from 'uuid';

jest.mock('../context/AppContext', () => ({
  useAppContext: jest.fn(),
}));

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

describe('AddTodo Component', () => {
  const mockAddTodo = jest.fn();
  const mockUpdateTodo = jest.fn();
  const mockLocation = { search: '' };
  const mockTodoList: Todo[] = [
    {
      id: '1',
      title: 'Test Todo',
      description: 'Test Description',
      status: 'Pending',
      due_date: '2024-11-21',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppContext as jest.Mock).mockReturnValue({
      addTodo: mockAddTodo,
      updateTodo: mockUpdateTodo,
      todo: mockTodoList,
    });
    (uuidv4 as jest.Mock).mockReturnValue('new-uuid');
  });

  it('renders the Add Todo form for creating a new todo', () => {
    render(
      <MemoryRouter>
        <AddTodo />
      </MemoryRouter>
    );

    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Status')).toBeInTheDocument();
    expect(screen.getByLabelText('Due Date')).toBeInTheDocument();
  });

  it('handles form changes correctly', () => {
    render(
      <MemoryRouter>
        <AddTodo />
      </MemoryRouter>
    );

    const titleInput = screen.getByPlaceholderText('Title') as HTMLInputElement;
    fireEvent.change(titleInput, { target: { value: 'New Todo Title' } });
    expect(titleInput.value).toBe('New Todo Title');
  });

  it('submits a new todo and calls addTodo', async () => {
    render(
      <MemoryRouter>
        <AddTodo />
      </MemoryRouter>
    );

    const titleInput = screen.getByPlaceholderText('Title') as HTMLInputElement;
    const descriptionInput = screen.getByPlaceholderText(
      'Description'
    ) as HTMLInputElement;
    const dueDateInput = screen.getByPlaceholderText(
      'Date'
    ) as HTMLInputElement;
    const statusSelect = screen.getByLabelText('Status') as HTMLSelectElement;

    fireEvent.change(titleInput, { target: { value: 'New Todo' } });
    fireEvent.change(descriptionInput, {
      target: { value: 'Description for new todo' },
    });
    fireEvent.change(statusSelect, { target: { value: 'In Progress' } });
    fireEvent.change(dueDateInput, { target: { value: '2024-11-25' } });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockAddTodo).toHaveBeenCalledWith({
        id: 'new-uuid',
        title: 'New Todo',
        description: 'Description for new todo',
        status: 'In Progress',
        due_date: '2024-11-25',
      });
    });
  });

  it('edits an existing todo when id query parameter is present', async () => {
    mockLocation.search = '?id=1';

    render(
      <MemoryRouter initialEntries={['/add-todo?id=1']}>
        <AddTodo />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Todo')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
      expect(screen.getByDisplayValue('2024-11-21')).toBeInTheDocument();
    });

    const titleInput = screen.getByPlaceholderText('Title') as HTMLInputElement;
    fireEvent.change(titleInput, { target: { value: 'Updated Todo Title' } });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockUpdateTodo).toHaveBeenCalledWith({
        id: '1',
        title: 'Updated Todo Title',
        description: 'Test Description',
        status: 'Pending',
        due_date: '2024-11-21',
      });
    });
  });

  it('disables submit button after it is clicked once', async () => {
    render(
      <MemoryRouter>
        <AddTodo />
      </MemoryRouter>
    );

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
  });
});

export {};
