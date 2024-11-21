import { Link } from 'react-router-dom';
import TodoList from '../components/TodoList';
import { useAppContext } from '../context/AppContext';
import { useState } from 'react';

const Home = () => {
  const { todo, deleteTodo } = useAppContext();
  const [status, setStatus] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const filteredTodo = () => {
    const filteredTodo = todo.filter((t) => t.title.includes(search));
    if (status !== 'All')
      return filteredTodo.filter((t) => t.status === status);
    return filteredTodo;
  };

  const onStatusChange = (
    e: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setStatus(e.currentTarget.value);
  };

  const onSearchChange = (
    e: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSearch(e.currentTarget.value);
  };

  return (
    <div className="min-w-full min-h-[100vh] flex items-center justify-center">
      <div className="my-5 flex flex-col items-center justify-center w-full max-w-[35%] border border-gray-300 rounded-lg p-6 gap-3">
        <h1 className="text-[29px]">To-Do List</h1>

        <div className="flex flex-row items-center justify-between w-full gap-3">
          <div className="flex-1">
            <label
              htmlFor="search"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Search
            </label>
            <input
              id="search"
              type="text"
              name="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Title"
              onChange={onSearchChange}
              value={search}
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={onStatusChange}
              value={status}
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="w-full">
          <TodoList todos={filteredTodo()} deleteTodo={deleteTodo} />
        </div>

        <Link
          to="/add-todo"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-3 w-full text-center"
          data-testid="add-todo-button"
        >
          Add Todo
        </Link>
      </div>
    </div>
  );
};

export default Home;
