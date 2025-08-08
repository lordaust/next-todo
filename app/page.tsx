import { LandingPage } from '../src/features/landing/landing-page';
import type { Task } from '../src/data-access-layer/types';

/**
 * Home page following Catalyst design
 * Server Component that prepares data and renders the landing page
 * Following architectural guidelines
 */
export default function Home() {
  // Create mock Person objects
  const mockPerson1 = {
    id: 'person-1',
    username: 'johndoe',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    createdDate: new Date('2024-01-01'),
    status: 'open' as const,
    role: 'user' as const,
  };
  
  const mockPerson2 = {
    id: 'person-2',
    username: 'janesmith',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    createdDate: new Date('2024-01-01'),
    status: 'open' as const,
    role: 'user' as const,
  };
  
  const mockPerson3 = {
    id: 'person-3',
    username: 'mikejohnson',
    email: 'mike.johnson@example.com',
    firstName: 'Mike',
    lastName: 'Johnson',
    createdDate: new Date('2024-01-01'),
    status: 'open' as const,
    role: 'user' as const,
  };
  
  const mockPerson4 = {
    id: 'person-4',
    username: 'sarahwilson',
    email: 'sarah.wilson@example.com',
    firstName: 'Sarah',
    lastName: 'Wilson',
    createdDate: new Date('2024-01-01'),
    status: 'open' as const,
    role: 'user' as const,
  };
  
  // Prepare mock data matching the Task schema
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Update project documentation',
      category: 'work',
      urgent: true,
      status: 'new',
      creator: mockPerson1,
      assignee: mockPerson1,
      created: new Date('2024-01-10'),
      modified: new Date('2024-01-10'),
      dueDate: new Date('2024-01-15'),
      description: 'Update all project documentation for the new release',
    },
    {
      id: '2',
      title: 'Review team feedback',
      category: 'work',
      urgent: false,
      status: 'approved',
      creator: mockPerson2,
      assignee: mockPerson2,
      created: new Date('2024-01-09'),
      modified: new Date('2024-01-11'),
      dueDate: new Date('2024-01-14'),
      description: 'Review and incorporate team feedback from the last sprint',
    },
    {
      id: '3',
      title: 'Buy groceries',
      category: 'shopping',
      urgent: false,
      status: 'done',
      creator: mockPerson3,
      assignee: mockPerson3,
      created: new Date('2024-01-08'),
      modified: new Date('2024-01-13'),
      dueDate: new Date('2024-01-13'),
      description: 'Weekly grocery shopping for the household',
    },
    {
      id: '4',
      title: 'Schedule doctor appointment',
      category: 'health',
      urgent: true,
      status: 'new',
      creator: mockPerson4,
      assignee: mockPerson4,
      created: new Date('2024-01-07'),
      modified: new Date('2024-01-07'),
      dueDate: new Date('2024-01-12'),
      description: 'Schedule annual health checkup',
    },
    {
      id: '5',
      title: 'Pay utility bills',
      category: 'finance',
      urgent: true,
      status: 'new',
      creator: mockPerson1,
      assignee: mockPerson1,
      created: new Date('2024-01-06'),
      modified: new Date('2024-01-06'),
      dueDate: new Date('2024-01-16'),
      description: 'Pay monthly electricity and water bills',
    },
  ];

  return (
    <LandingPage 
      tasks={tasks}
    />
  );
}
