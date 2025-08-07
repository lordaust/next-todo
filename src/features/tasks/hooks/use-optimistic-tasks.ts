'use client';

import { useOptimistic } from 'react';
import type { Task, CreateTaskInput, UpdateTaskInput } from '../../../data-access-layer/types';

type OptimisticAction = 
  | { type: 'create'; task: Task }
  | { type: 'update'; task: Task }
  | { type: 'delete'; taskId: string };

function optimisticReducer(state: Task[], action: OptimisticAction): Task[] {
  switch (action.type) {
    case 'create':
      return [...state, action.task];
    case 'update':
      return state.map(task => 
        task.id === action.task.id ? action.task : task
      );
    case 'delete':
      return state.filter(task => task.id !== action.taskId);
    default:
      return state;
  }
}

export function useOptimisticTasks(initialTasks: Task[]) {
  const [optimisticTasks, addOptimistic] = useOptimistic(
    initialTasks,
    optimisticReducer
  );

  const optimisticCreate = (task: Task) => {
    addOptimistic({ type: 'create', task });
  };

  const optimisticUpdate = (task: Task) => {
    addOptimistic({ type: 'update', task });
  };

  const optimisticDelete = (taskId: string) => {
    addOptimistic({ type: 'delete', taskId });
  };

  return {
    tasks: optimisticTasks,
    optimisticCreate,
    optimisticUpdate,
    optimisticDelete,
  };
}
