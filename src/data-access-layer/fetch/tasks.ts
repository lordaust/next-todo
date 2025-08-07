/**
 * Task fetch functions - Direct localStorage interaction
 * These functions handle raw data retrieval from storage
 */

import type { Task } from '../types';

const STORAGE_KEY = 'tasks';

/**
 * Fetch all tasks from localStorage
 */
export function fetchAllTasks(): Task[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error fetching tasks from localStorage:', error);
    return [];
  }
}

/**
 * Fetch single task by ID from localStorage
 */
export function fetchTaskById(id: string): Task | null {
  const tasks = fetchAllTasks();
  return tasks.find(task => task.id === id) || null;
}

/**
 * Store tasks array to localStorage
 */
export function storeTasks(tasks: Task[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error storing tasks to localStorage:', error);
  }
}
