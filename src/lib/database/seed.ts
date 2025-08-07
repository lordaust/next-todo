/**
 * Database seeding functions
 * Generate test data for development
 */

import { v4 as uuidv4 } from 'uuid';
import type { Task, Person } from '../../data-access-layer/types';
import { storeTasks } from '../../data-access-layer/fetch/tasks';

/**
 * Generate sample persons for testing
 */
function generateSamplePersons(): Person[] {
  return [
    {
      id: 'person-1',
      username: 'john.doe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      role: 'admin',
      status: 'open',
      createdDate: new Date('2024-01-01'),
    },
    {
      id: 'person-2',
      username: 'jane.smith',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      role: 'user',
      status: 'open',
      createdDate: new Date('2024-01-02'),
    },
  ];
}

/**
 * Generate sample tasks for testing
 */
function generateSampleTasks(): Task[] {
  const persons = generateSamplePersons();
  const john = persons[0];
  const jane = persons[1];

  return [
    {
      id: uuidv4(),
      title: 'Complete project documentation',
      description: 'Write comprehensive documentation for the new task management system',
      category: 'work',
      status: 'new',
      urgent: true,
      dueDate: new Date('2024-12-31'),
      creator: john,
      assignee: jane,
      subtasks: [
        {
          subtaskId: uuidv4(),
          subtaskName: 'Write API documentation',
          subtaskStatus: 'open',
        },
        {
          subtaskId: uuidv4(),
          subtaskName: 'Create user guide',
          subtaskStatus: 'open',
        },
      ],
      created: new Date('2024-01-15'),
      modified: new Date('2024-01-15'),
    },
    {
      id: uuidv4(),
      title: 'Buy groceries',
      description: 'Weekly grocery shopping',
      category: 'personal',
      status: 'approved',
      urgent: false,
      dueDate: new Date('2024-12-20'),
      creator: jane,
      assignee: jane,
      subtasks: [
        {
          subtaskId: uuidv4(),
          subtaskName: 'Buy milk and bread',
          subtaskStatus: 'closed',
        },
        {
          subtaskId: uuidv4(),
          subtaskName: 'Buy vegetables',
          subtaskStatus: 'open',
        },
      ],
      created: new Date('2024-01-10'),
      modified: new Date('2024-01-16'),
    },
    {
      id: uuidv4(),
      title: 'Schedule dentist appointment',
      description: 'Annual dental checkup',
      category: 'health',
      status: 'done',
      urgent: false,
      creator: john,
      assignee: john,
      created: new Date('2024-01-05'),
      modified: new Date('2024-01-18'),
    },
  ];
}

/**
 * Seed the database with test data
 */
export function seedDatabase(): void {
  console.log('Seeding database with test data...');
  
  const tasks = generateSampleTasks();
  storeTasks(tasks);
  
  console.log(`Seeded ${tasks.length} tasks`);
}

/**
 * Check if database needs seeding (empty or no data)
 */
export function shouldSeedDatabase(): boolean {
  if (typeof window === 'undefined') return false;
  
  const tasks = localStorage.getItem('tasks');
  return !tasks || JSON.parse(tasks).length === 0;
}
