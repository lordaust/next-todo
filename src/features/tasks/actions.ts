'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { taskService } from '../../lib/service/task-service';
import { CreateTaskInputSchema, UpdateTaskInputSchema } from '../../data-access-layer/schemas';
import type { CreateTaskInput, UpdateTaskInput } from '../../data-access-layer/types';

export async function createTaskAction(input: CreateTaskInput) {
  try {
    const validatedInput = CreateTaskInputSchema.parse(input);
    const task = await taskService.createTask(validatedInput);
    
    revalidatePath('/tasks');
    return { success: true, data: task };
  } catch (error) {
    console.error('Failed to create task:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create task' 
    };
  }
}

export async function updateTaskAction(input: UpdateTaskInput) {
  try {
    const validatedInput = UpdateTaskInputSchema.parse(input);
    const task = await taskService.updateTask(validatedInput);
    
    revalidatePath('/tasks');
    return { success: true, data: task };
  } catch (error) {
    console.error('Failed to update task:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update task' 
    };
  }
}

export async function deleteTaskAction(taskId: string) {
  try {
    await taskService.deleteTask(taskId);
    
    revalidatePath('/tasks');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete task:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to delete task' 
    };
  }
}

export async function toggleTaskCompleteAction(taskId: string) {
  try {
    const task = await taskService.getTaskById(taskId);
    if (!task) {
      return { success: false, error: 'Task not found' };
    }

    const newStatus = task.status === 'done' ? 'approved' : 'done';
    const updatedTask = await taskService.updateTask({
      id: taskId,
      status: newStatus,
      doneDate: newStatus === 'done' ? new Date() : undefined,
    });
    
    revalidatePath('/tasks');
    return { success: true, data: updatedTask };
  } catch (error) {
    console.error('Failed to toggle task completion:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to toggle task completion' 
    };
  }
}

export async function approveTaskAction(taskId: string) {
  try {
    const updatedTask = await taskService.updateTask({
      id: taskId,
      status: 'approved',
    });
    
    revalidatePath('/tasks');
    return { success: true, data: updatedTask };
  } catch (error) {
    console.error('Failed to approve task:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to approve task' 
    };
  }
}
