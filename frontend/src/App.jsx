import React, { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from './api';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import { LayoutList } from 'lucide-react';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      const sorted = data.sort((a, b) => {
        if (a.completed === b.completed) return b.id - a.id;
        return a.completed ? 1 : -1;
      });
      setTodos(sorted);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todo) => {
    try {
      const newTodo = await createTodo(todo);
      setTodos([newTodo, ...todos]);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleToggleTodo = async (todo) => {
    try {
      const updated = await updateTodo(todo.id, { ...todo, completed: !todo.completed });
      setTodos(todos.map(t => t.id === todo.id ? updated : t).sort((a, b) => {
        if (a.completed === b.completed) return b.id - a.id;
        return a.completed ? 1 : -1;
      }));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(t => t.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center justify-center gap-2">
            <LayoutList className="text-blue-600" />
            TODO App
          </h1>
          <p className="mt-2 text-gray-600">Simple & Effective Task Management</p>
        </div>

        <TodoForm onAdd={handleAddTodo} />

        {loading ? (
          <div className="text-center text-gray-500 mt-10">Loading...</div>
        ) : (
          <div className="space-y-1">
            {todos.length === 0 ? (
              <div className="text-center text-gray-400 mt-10 p-6 border-2 border-dashed border-gray-200 rounded-lg">
                No tasks yet. Add one above!
              </div>
            ) : (
              todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
