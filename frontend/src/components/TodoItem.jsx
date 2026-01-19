import React from 'react';
import { Trash2, CheckCircle, Circle } from 'lucide-react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
    return (
        <div className={`flex items-center justify-between p-3 mb-2 bg-white rounded-lg shadow-sm border-l-4 ${todo.completed ? 'border-green-500 bg-gray-50' : 'border-blue-500'}`}>
            <div className="flex items-center gap-3 flex-1 overflow-hidden">
                <button onClick={() => onToggle(todo)} className="text-gray-500 hover:text-green-600 focus:outline-none">
                    {todo.completed ? <CheckCircle className="text-green-500" /> : <Circle />}
                </button>
                <div className={`flex flex-col ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                    <span className="font-medium truncate">{todo.title}</span>
                    {todo.description && <span className="text-xs truncate">{todo.description}</span>}
                </div>
            </div>
            <button
                onClick={() => onDelete(todo.id)}
                className="text-red-400 hover:text-red-600 p-2 focus:outline-none"
                aria-label="Delete todo"
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
};

export default TodoItem;
