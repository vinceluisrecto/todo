import React, { useEffect, useState } from 'react';
import { Todo } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { useAppContext } from '../context/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';

const AddTodo = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const todoId = queryParams.get('id');

  const navigate = useNavigate();

  const { addTodo, todo, updateTodo } = useAppContext();
  const [newTodo, setNewTodo] = useState<Todo>({
    status: 'Pending',
    title: '',
    description: '',
    due_date: '',
  });
  const [isSubmitClicked, setIsSubmitClicked] = useState<boolean>(false);

  const onFormChange = (
    e: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewTodo({
      ...newTodo,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const onSubmit = () => {
    setIsSubmitClicked(true);
    if (newTodo.id) {
      updateTodo({
        ...newTodo,
      });
    } else {
      addTodo({
        ...newTodo,
        id: uuidv4(),
      });
    }
    navigate('/');
  };

  useEffect(() => {
    const selectedTodo = todo.find((t) => t.id === todoId);
    if (selectedTodo) setNewTodo(selectedTodo);
  }, [todo, todoId]);

  return (
    <div className="min-w-full min-h-[100vh] flex items-center justify-center">
      <div className="my-5 flex flex-col items-center justify-center w-full max-w-[35%] border border-gray-300 rounded-lg p-6">
        <h1 className="text-[29px] mb-3">
          {newTodo?.id ? 'Edit' : 'Add'} Todo
        </h1>

        <div className="w-full">
          <div className="my-3">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Title"
              required
              onChange={onFormChange}
              value={newTodo.title}
            />
          </div>

          <div className="my-3">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Description
            </label>
            <input
              id="description"
              type="text"
              name="description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Description"
              required
              onChange={onFormChange}
              value={newTodo.description}
            />
          </div>

          <div className="my-3">
            <label
              htmlFor="status"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={onFormChange}
              required
              value={newTodo.status}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="my-3">
            <label
              htmlFor="due_date"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Due Date
            </label>
            <input
              id="due_date"
              type="date"
              name="due_date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Date"
              required
              onChange={onFormChange}
              value={newTodo.due_date}
            />
          </div>

          <button
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-3 w-full"
            onClick={onSubmit}
            disabled={isSubmitClicked}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
