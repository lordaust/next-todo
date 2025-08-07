import { v4 as uuidv4 } from 'uuid';
import { 
  Task, 
  CreateTaskInput, 
  UpdateTaskInput, 
  Person, 
  TaskStats, 
  CategoryType 
} from '../../data-access-layer/types';
import { 
  TaskSchema, 
  CreateTaskInputSchema, 
  UpdateTaskInputSchema 
} from '../../data-access-layer/schemas';
import { CATEGORY_CONFIGS } from '../../data-access-layer/constants/categories';

const STORAGE_KEYS = {
  TASKS: 'todo-app-tasks',
  CURRENT_USER: 'todo-app-current-user',
} as const;

// Mock current user - in a real app this would come from authentication
export const getCurrentUser = (): Person => {
  const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  if (stored) {
    return JSON.parse(stored, (key, value) => {
      // Convert date strings back to Date objects
      if (key === 'createdDate' && typeof value === 'string') {
        return new Date(value);
      }
      return value;
    });
  }

  // Create default user
  const defaultUser: Person = {
    id: uuidv4(),
    username: 'demo-user',
    email: 'demo@example.com',
    firstName: 'Demo',
    lastName: 'User',
    createdDate: new Date(),
    status: 'open',
    role: 'user',
  };

  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(defaultUser));
  return defaultUser;
};

class TaskService {
  private getTasks(): Task[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TASKS);
      if (!stored) return [];

      const tasks = JSON.parse(stored, (key, value) => {
        // Convert date strings back to Date objects
        if ((key === 'created' || key === 'modified' || key === 'dueDate' || key === 'doneDate' || key === 'createdDate') && typeof value === 'string') {
          return new Date(value);
        }
        return value;
      });

      // Validate each task against schema
      return tasks.filter((task: unknown) => {
        try {
          TaskSchema.parse(task);
          return true;
        } catch {
          console.warn('Invalid task found in storage, skipping:', task);
          return false;
        }
      });
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      return [];
    }
  }

  private saveTasks(tasks: Task[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
      throw new Error('Failed to save tasks');
    }
  }

  async getAllTasks(): Promise<Task[]> {
    // Simulate async operation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getTasks());
      }, 100);
    });
  }

  async getTaskById(id: string): Promise<Task | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = this.getTasks();
        const task = tasks.find(t => t.id === id);
        resolve(task || null);
      }, 50);
    });
  }

  async createTask(input: CreateTaskInput): Promise<Task> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Validate input
          const validatedInput = CreateTaskInputSchema.parse(input);
          
          const currentUser = getCurrentUser();
          const now = new Date();
          
          // Find assignee (for now, just use current user)
          const assignee = currentUser; // In real app, look up by assigneeId

          const newTask: Task = {
            id: uuidv4(),
            title: validatedInput.title,
            category: validatedInput.category,
            subtasks: validatedInput.subtasks?.map(st => ({
              subtaskId: uuidv4(),
              subtaskName: st.subtaskName,
              subtaskStatus: 'open',
            })),
            urgent: validatedInput.urgent,
            dueDate: validatedInput.dueDate,
            doneDate: undefined,
            description: validatedInput.description,
            status: 'new',
            creator: currentUser,
            assignee,
            created: now,
            modified: now,
          };

          const tasks = this.getTasks();
          tasks.push(newTask);
          this.saveTasks(tasks);

          resolve(newTask);
        } catch (error) {
          reject(error);
        }
      }, 100);
    });
  }

  async updateTask(input: UpdateTaskInput): Promise<Task> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Validate input
          const validatedInput = UpdateTaskInputSchema.parse(input);
          
          const tasks = this.getTasks();
          const taskIndex = tasks.findIndex(t => t.id === validatedInput.id);
          
          if (taskIndex === -1) {
            throw new Error('Task not found');
          }

          const existingTask = tasks[taskIndex];
          const now = new Date();

          // Update task with provided fields
          const updatedTask: Task = {
            ...existingTask,
            ...validatedInput,
            modified: now,
            // Handle subtasks update
            subtasks: validatedInput.subtasks?.map(st => ({
              subtaskId: uuidv4(), // Always generate new ID for input subtasks
              subtaskName: st.subtaskName,
              subtaskStatus: 'open', // Default status for new subtasks
            })) || existingTask.subtasks,
          };

          tasks[taskIndex] = updatedTask;
          this.saveTasks(tasks);

          resolve(updatedTask);
        } catch (error) {
          reject(error);
        }
      }, 100);
    });
  }

  async deleteTask(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const tasks = this.getTasks();
          const taskIndex = tasks.findIndex(t => t.id === id);
          
          if (taskIndex === -1) {
            throw new Error('Task not found');
          }

          // Soft delete - mark as deleted instead of removing
          tasks[taskIndex] = {
            ...tasks[taskIndex],
            status: 'deleted',
            modified: new Date(),
          };

          this.saveTasks(tasks);
          resolve();
        } catch (error) {
          reject(error);
        }
      }, 100);
    });
  }

  calculateStats(tasks: Task[]): TaskStats {
    const activeTasks = tasks.filter(t => t.status !== 'deleted');
    const now = new Date();

    const stats: TaskStats = {
      total: activeTasks.length,
      new: activeTasks.filter(t => t.status === 'new').length,
      approved: activeTasks.filter(t => t.status === 'approved').length,
      done: activeTasks.filter(t => t.status === 'done').length,
      urgent: activeTasks.filter(t => t.urgent && t.status !== 'done').length,
      overdue: activeTasks.filter(t => 
        t.dueDate && 
        t.dueDate < now && 
        t.status !== 'done'
      ).length,
      byCategory: {} as Record<CategoryType, number>,
    };

    // Calculate category stats
    Object.keys(CATEGORY_CONFIGS).forEach(category => {
      const categoryType = category as CategoryType;
      stats.byCategory[categoryType] = activeTasks.filter(
        t => t.category === categoryType
      ).length;
    });

    return stats;
  }

  async searchTasks(query: string): Promise<Task[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = this.getTasks();
        const searchTerm = query.toLowerCase();
        
        const results = tasks.filter(task => 
          task.status !== 'deleted' &&
          (task.title.toLowerCase().includes(searchTerm) ||
           (task.description && task.description.toLowerCase().includes(searchTerm)))
        );

        resolve(results);
      }, 150);
    });
  }

  // Utility method to seed some sample data for development
  async seedSampleData(): Promise<void> {
    const existingTasks = this.getTasks();
    if (existingTasks.length > 0) return; // Don't seed if data already exists

    const currentUser = getCurrentUser();
    const sampleTasks: CreateTaskInput[] = [
      {
        title: 'Pay the bills',
        category: 'finance',
        urgent: true,
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        description: 'Monthly utility bills and rent',
        assigneeId: currentUser.id,
      },
      {
        title: 'Reply to urgent emails',
        category: 'work',
        urgent: true,
        assigneeId: currentUser.id,
      },
      {
        title: 'Go to the dentist',
        category: 'health',
        urgent: false,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
        assigneeId: currentUser.id,
      },
      {
        title: 'Clean the fridge',
        category: 'home',
        urgent: false,
        assigneeId: currentUser.id,
      },
      {
        title: 'Buy office chair',
        category: 'shopping',
        urgent: false,
        subtasks: [
          { subtaskName: 'Research ergonomic chairs' },
          { subtaskName: 'Compare prices' },
          { subtaskName: 'Make purchase' },
        ],
        assigneeId: currentUser.id,
      },
    ];

    for (const taskInput of sampleTasks) {
      await this.createTask(taskInput);
    }
  }
}

export const taskService = new TaskService();
