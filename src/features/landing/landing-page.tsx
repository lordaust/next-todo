import { RecentTasks } from './recent-tasks';

type LandingPageProps = {
  tasks: Array<{
    id: string;
    title: string;
    assignee: string;
    category: string;
    status: 'open' | 'in-progress' | 'completed';
    dueDate: string;
  }>;
};

export function LandingPage({ tasks }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content wrapper */}
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
        {/* Task list */}
        <RecentTasks tasks={tasks} />
      </div>
    </div>
  );
}
