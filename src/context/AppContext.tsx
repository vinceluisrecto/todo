import { createContext, useContext, useState, ReactNode } from 'react';
import { AppContextType, Todo } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [todo, setTodo] = useState<Todo[]>([]);

  const addTodo = (todo: Todo) => {
    setTodo((props) => [...props, todo]);
  };

  const deleteTodo = (id: string) => {
    setTodo((props) => props.filter((p) => p.id !== id));
  };

  const updateTodo = (todo: Todo) => {
    setTodo((props) =>
      props.map((p) => {
        if (p.id === todo.id) return todo;
        return p;
      })
    );
  };

  return (
    <AppContext.Provider value={{ todo, addTodo, deleteTodo, updateTodo }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
