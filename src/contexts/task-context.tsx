'use client';

import { createContext, useContext, ReactNode } from 'react';

// Minimal context for optimistic updates and shared state only
// URL is the primary state manager for filtering, sorting, and listing
// Server actions handle all mutations
type TaskContextType = {
  // Future: authenticated user, global optimistic state reset, etc.
  resetOptimisticState?: () => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

type TaskProviderProps = {
  children: ReactNode;
};

// Minimal provider - only for future shared state like authenticated user
export function TaskProvider({ children }: TaskProviderProps) {
  const contextValue: TaskContextType = {
    // Future: resetOptimisticState implementation
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}
