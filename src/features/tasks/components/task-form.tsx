'use client';

import { useOptimistic, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskInputSchema } from '../../../data-access-layer/schemas';
import type { CreateTaskInput, Task } from '../../../data-access-layer/types';
import { createTaskAction } from '../actions';
import { getCurrentUser } from '../../../lib/service/task-service';

type TaskFormProps = {
  initialTasks: Task[];
  onOptimisticAdd?: (task: Task) => void;
};

export function TaskForm({ initialTasks, onOptimisticAdd }: TaskFormProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticTasks, addOptimistic] = useOptimistic(
    initialTasks,
    (state: Task[], newTask: Task) => [...state, newTask]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateTaskInputSchema),
    defaultValues: {
      title: '',
      category: 'other' as const,
      assigneeId: '',
      urgent: false,
      subtasks: [],
      dueDate: undefined,
      description: '',
    },
  });

  const onSubmit = async (data: CreateTaskInput) => {
    const currentUser = getCurrentUser();
    
    // Create optimistic task
    const optimisticTask: Task = {
      id: uuidv4(),
      title: data.title,
      category: data.category,
      subtasks: data.subtasks?.map(st => ({
        subtaskId: uuidv4(),
        subtaskName: st.subtaskName,
        subtaskStatus: 'open',
      })),
      urgent: data.urgent,
      dueDate: data.dueDate,
      description: data.description,
      status: 'new',
      creator: currentUser,
      assignee: currentUser, // Simplified for example
      created: new Date(),
      modified: new Date(),
    };

    // Add optimistic update
    addOptimistic(optimisticTask);
    onOptimisticAdd?.(optimisticTask);

    // Submit with server action
    startTransition(async () => {
      const result = await createTaskAction(data);
      if (result.success) {
        reset();
      } else {
        // Handle error - in real app, show toast/notification
        console.error('Failed to create task:', result.error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Task Title
        </label>
        <input
          {...register('title')}
          type="text"
          id="title"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium">
          Category
        </label>
        <select
          {...register('category')}
          id="category"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="shopping">Shopping</option>
          <option value="health">Health</option>
          <option value="home">Home</option>
          <option value="finance">Finance</option>
          <option value="other">Other</option>
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          {...register('description')}
          id="description"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div className="flex items-center">
        <input
          {...register('urgent')}
          type="checkbox"
          id="urgent"
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        <label htmlFor="urgent" className="ml-2 block text-sm">
          Mark as urgent
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? 'Creating...' : 'Create Task'}
      </button>

      {/* Show optimistic tasks count for demo */}
      <p className="text-sm text-gray-500">
        Tasks (including optimistic): {optimisticTasks.length}
      </p>
    </form>
  );
}
