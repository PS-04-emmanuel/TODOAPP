import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const TodoForm = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd({ title, description });
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <div className="flex flex-col gap-2">
                <input
                    type="text"
                    placeholder="Add a new task..."
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description (optional)"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button
                    type="submit"
                    className="mt-2 w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-1 font-semibold"
                >
                    <Plus size={18} /> Add Task
                </button>
            </div>
        </form>
    );
};

export default TodoForm;
