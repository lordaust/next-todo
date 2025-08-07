import { z } from 'zod';

// Enum schemas
export const TaskStatusSchema = z.enum(['new', 'approved', 'done', 'deleted']);
export const SubtaskStatusSchema = z.enum(['open', 'closed']);
export const PersonStatusSchema = z.enum(['open', 'archived']);
export const UserRoleSchema = z.enum(['guest', 'user', 'admin']);
export const CategoryTypeSchema = z.enum([
  'work',
  'personal', 
  'shopping',
  'health',
  'home',
  'finance',
  'other'
]);

// Person schema
export const PersonSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(1),
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  createdDate: z.date(),
  status: PersonStatusSchema,
  role: UserRoleSchema,
});

// Subtask schema
export const SubtaskSchema = z.object({
  subtaskId: z.string().uuid(),
  subtaskName: z.string().min(1),
  subtaskStatus: SubtaskStatusSchema.default('open'),
});

// Task schema
export const TaskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  category: CategoryTypeSchema,
  subtasks: z.array(SubtaskSchema).optional(),
  urgent: z.boolean().default(false),
  dueDate: z.date().optional(),
  doneDate: z.date().optional(),
  description: z.string().optional(),
  status: TaskStatusSchema,
  creator: PersonSchema,
  assignee: PersonSchema,
  created: z.date(),
  modified: z.date(),
});

// Input schemas for forms (without generated fields)
export const CreateTaskInputSchema = z.object({
  title: z.string().min(1, 'Task title is required'),
  category: CategoryTypeSchema,
  subtasks: z.array(z.object({
    subtaskName: z.string().min(1, 'Subtask name is required'),
  })).optional(),
  urgent: z.boolean().optional().default(false),
  dueDate: z.date().optional(),
  description: z.string().optional(),
  assigneeId: z.string().uuid(),
});

export const UpdateTaskInputSchema = CreateTaskInputSchema.partial().extend({
  id: z.string().uuid(),
  status: TaskStatusSchema.optional(),
  doneDate: z.date().optional(),
});

export const CreatePersonInputSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Valid email is required'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  role: UserRoleSchema.default('user'),
});

export const UpdatePersonInputSchema = CreatePersonInputSchema.partial().extend({
  id: z.string().uuid(),
});

// Search and filter schemas
export const TaskFilterSchema = z.object({
  status: TaskStatusSchema.optional(),
  category: CategoryTypeSchema.optional(),
  urgent: z.boolean().optional(),
  assigneeId: z.string().uuid().optional(),
  creatorId: z.string().uuid().optional(),
  dueBefore: z.date().optional(),
  dueAfter: z.date().optional(),
});

export const SearchQuerySchema = z.object({
  query: z.string().min(1),
  filters: TaskFilterSchema.optional(),
});
