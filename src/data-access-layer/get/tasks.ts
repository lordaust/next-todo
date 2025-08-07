/**
 * Task get functions - Validation & security layer
 * These functions call fetch functions and add validation/security
 */

import { TaskSchema } from '../schemas';
import { fetchAllTasks, fetchTaskById } from '../fetch/tasks';
import type { Task } from '../types';

/**
 * Get all tasks with validation
 */
export function getAllTasks(): Task[] {
  const tasks = fetchAllTasks();
  
  // Validate each task against schema
  return tasks.filter(task => {
    const result = TaskSchema.safeParse(task);
    if (!result.success) {
      console.warn('Invalid task found in storage:', task.id, result.error);
      return false;
    }
    return true;
  });
}

/**
 * Get single task by ID with validation
 */
export function getTaskById(id: string): Task | null {
  // Basic input validation
  if (!id || typeof id !== 'string') {
    return null;
  }
  
  const task = fetchTaskById(id);
  if (!task) return null;
  
  // Validate task against schema
  const result = TaskSchema.safeParse(task);
  if (!result.success) {
    console.warn('Invalid task found in storage:', id, result.error);
    return null;
  }
  
  return result.data;
}
