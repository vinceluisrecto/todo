export interface Todo {
  id?: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  title: string;
  description: string;
  due_date: string;
}

export interface AppContextType {
  todo: Todo[];
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (todo: Todo) => void;
}
