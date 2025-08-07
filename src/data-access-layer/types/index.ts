import { z } from 'zod';
import {
  TaskSchema,
  SubtaskSchema,
  PersonSchema,
  TaskStatusSchema,
  SubtaskStatusSchema,
  PersonStatusSchema,
  UserRoleSchema,
  CategoryTypeSchema,
  CreateTaskInputSchema,
  UpdateTaskInputSchema,
  CreatePersonInputSchema,
  UpdatePersonInputSchema,
  TaskFilterSchema,
  SearchQuerySchema,
} from '../schemas';

// Inferred types from Zod schemas
export type Task = z.infer<typeof TaskSchema>;
export type Subtask = z.infer<typeof SubtaskSchema>;
export type Person = z.infer<typeof PersonSchema>;

// Enum types
export type TaskStatus = z.infer<typeof TaskStatusSchema>;
export type SubtaskStatus = z.infer<typeof SubtaskStatusSchema>;
export type PersonStatus = z.infer<typeof PersonStatusSchema>;
export type UserRole = z.infer<typeof UserRoleSchema>;
export type CategoryType = z.infer<typeof CategoryTypeSchema>;

// Input types for forms and API
export type CreateTaskInput = z.infer<typeof CreateTaskInputSchema>;
export type UpdateTaskInput = z.infer<typeof UpdateTaskInputSchema>;
export type CreatePersonInput = z.infer<typeof CreatePersonInputSchema>;
export type UpdatePersonInput = z.infer<typeof UpdatePersonInputSchema>;

// Filter and search types
export type TaskFilter = z.infer<typeof TaskFilterSchema>;
export type SearchQuery = z.infer<typeof SearchQuerySchema>;

// Utility types
export type TaskWithoutRelations = Omit<Task, 'creator' | 'assignee'> & {
  creatorId: string;
  assigneeId: string;
};

export type TaskSummary = Pick<Task, 'id' | 'title' | 'category' | 'urgent' | 'status' | 'dueDate'>;

export type PersonSummary = Pick<Person, 'id' | 'username' | 'firstName' | 'lastName'>;

// API Response types
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

// Category configuration type
export type CategoryConfig = {
  type: CategoryType;
  label: string;
  emoji: string;
  color: string;
};

// Task statistics type
export type TaskStats = {
  total: number;
  new: number;
  approved: number;
  done: number;
  urgent: number;
  overdue: number;
  byCategory: Record<CategoryType, number>;
};
