import { RecentTasks } from './recent-tasks';
import type { Task } from '../../data-access-layer/types';

type LandingPageProps = {
  tasks: Task[];
};

// Server-side conversion function
function convertToUITask(task: Task) {
  return {
    id: task.id,
    title: task.title,
    assignee: task.assignee.username || 
              `${task.assignee.firstName} ${task.assignee.lastName}`.trim() || 
              task.assignee.email,
    category: task.category,
    status: task.status,
    urgent: task.urgent,
    dueDate: task.dueDate ? (typeof task.dueDate === 'string' ? task.dueDate : task.dueDate.toISOString()) : undefined,
  };
}

export function LandingPage({ tasks }: LandingPageProps) {
  // Convert schema tasks to UI tasks on the server
  const uiTasks = tasks.map(convertToUITask);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content wrapper */}
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
        {/* Task list */}
        <RecentTasks tasks={uiTasks} />
      </div>
    </div>
  );
}
