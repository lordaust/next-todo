import { LandingPage } from '../src/features/landing/landing-page';

/**
 * Home page following Catalyst design
 * Server Component that prepares data and renders the landing page
 * Following architectural guidelines
 */
export default function Home() {
  // Prepare mock data for the landing page
  const userName = 'Erica';
  const currentPath = '/';
  
  const tasks = [
    {
      id: '1',
      title: 'Update project documentation',
      assignee: 'John Doe',
      category: 'development',
      status: 'open' as const,
      dueDate: '2024-01-15',
    },
    {
      id: '2',
      title: 'Review team feedback',
      assignee: 'Jane Smith',
      category: 'design',
      status: 'in-progress' as const,
      dueDate: '2024-01-14',
    },
    {
      id: '3',
      title: 'Create marketing campaign',
      assignee: 'Mike Johnson',
      category: 'marketing',
      status: 'completed' as const,
      dueDate: '2024-01-13',
    },
    {
      id: '4',
      title: 'Schedule team meeting',
      assignee: 'Sarah Wilson',
      category: 'other',
      status: 'open' as const,
      dueDate: '2024-01-12',
    },
  ];

  return (
    <LandingPage 
      tasks={tasks}
    />
  );
}
