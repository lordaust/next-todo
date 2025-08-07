// Server components for Todo feature
import { type ReactNode } from 'react';

export function TodoListContainer({ children }: { children: ReactNode }) {
  // This is a server component that will fetch data and provide it to client components
  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Todo App</h1>
      {children}
    </div>
  );
}

export function TodoStatsDisplay() {
  // This would normally fetch data from the server
  // For now it's just a placeholder
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
      <h2 className="font-semibold text-lg mb-2">Statistics</h2>
      <div className="flex justify-between">
        <span>Total: 0</span>
        <span>Completed: 0</span>
        <span>Pending: 0</span>
      </div>
    </div>
  );
}
