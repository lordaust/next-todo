"use client";

import { useState } from 'react';

type TodoItemProps = {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TodoItem({ id, text, completed, onToggle, onDelete }: TodoItemProps) {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <li
      className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 rounded-md shadow transition-all hover:shadow-md"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
          className="w-5 h-5 accent-blue-600"
          aria-label={`Mark ${text} as ${completed ? 'incomplete' : 'complete'}`}
        />
        <span className={completed ? 'line-through text-gray-400' : ''}>
          {text}
        </span>
      </div>
      <button
        onClick={() => onDelete(id)}
        className={`text-red-500 hover:text-red-700 ${isHovering ? 'opacity-100' : 'opacity-50'} transition-opacity`}
        aria-label={`Delete ${text}`}
      >
        Delete
      </button>
    </li>
  );
}
