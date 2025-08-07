'use client'

import { 
  CodeBracketIcon, 
  PaintBrushIcon, 
  MegaphoneIcon, 
  EllipsisHorizontalIcon 
} from '@heroicons/react/20/solid'
import { Fragment } from 'react'

type Task = {
  id: string;
  title: string;
  assignee: string;
  category: string;
  status: 'open' | 'in-progress' | 'completed';
  dueDate: string;
};

type RecentTasksProps = {
  tasks: Task[];
};

// Category icons mapping
const categoryIcons = {
  development: CodeBracketIcon,
  design: PaintBrushIcon,
  marketing: MegaphoneIcon,
  other: EllipsisHorizontalIcon,
};

// Status badge styles
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return (
        <div className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
          Completed
        </div>
      );
    case 'in-progress':
      return (
        <div className="rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
          In Progress
        </div>
      );
    case 'open':
      return (
        <div className="rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
          Open
        </div>
      );
    default:
      return null;
  }
};

// Group tasks by priority/importance
const groupTasksByPriority = (tasks: Task[]) => {
  // For demo purposes, let's group by due date proximity
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const importantTasks = tasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    return dueDate <= tomorrow; // Due today or tomorrow = important
  });
  
  const regularTasks = tasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    return dueDate > tomorrow; // Due later = regular
  });
  
  return [
    {
      date: 'Important Tasks',
      dateTime: 'important',
      tasks: importantTasks,
    },
    {
      date: 'Regular Tasks', 
      dateTime: 'regular',
      tasks: regularTasks,
    },
  ].filter(group => group.tasks.length > 0); // Only show groups with tasks
};

export function RecentTasks({ tasks }: RecentTasksProps) {
  const taskGroups = groupTasksByPriority(tasks);
  
  return (
    <div className="space-y-12">
      {/* Important Tasks Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-8 sm:px-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-8">
            Important Tasks
          </h2>
          <div className="overflow-hidden">
            <table className="w-full text-left">
              <thead className="sr-only">
                <tr>
                  <th>Task</th>
                  <th className="hidden sm:table-cell">Assignee</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {taskGroups.map((group) => (
                  <Fragment key={group.dateTime}>
                    <tr className="text-sm/6 text-gray-900">
                      <th scope="colgroup" colSpan={3} className="relative isolate py-4 font-semibold text-gray-700">
                        {group.date}
                        <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                        <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                      </th>
                    </tr>
                    {group.tasks.map((task) => {
                      const CategoryIcon = categoryIcons[task.category as keyof typeof categoryIcons] || EllipsisHorizontalIcon;
                      
                      return (
                        <tr key={task.id} className="border-b border-gray-100 last:border-b-0">
                          <td className="relative py-8 pr-6">
                            <div className="flex gap-x-6">
                              <CategoryIcon
                                aria-hidden="true"
                                className="hidden h-6 w-5 flex-none text-gray-400 sm:block"
                              />
                              <div className="flex-auto">
                                <div className="flex items-start gap-x-3">
                                  <div className="text-sm/6 font-medium text-gray-900">{task.title}</div>
                                  {getStatusBadge(task.status)}
                                </div>
                                <div className="mt-1 text-xs/5 text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</div>
                              </div>
                            </div>
                            <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                            <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                          </td>
                          <td className="hidden py-8 pr-6 sm:table-cell">
                            <div className="text-sm/6 text-gray-900">{task.assignee}</div>
                            <div className="mt-1 text-xs/5 text-gray-500">{task.category}</div>
                          </td>
                          <td className="py-8 text-right">
                            <div className="flex justify-end gap-x-2">
                              <a
                                href={`/tasks/${task.id}`}
                                className="text-sm/6 font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                View<span className="hidden sm:inline"> task</span>
                              </a>
                              <button
                                className="text-sm/6 font-medium text-green-600 hover:text-green-500"
                                onClick={() => {
                                  // Handle complete task action
                                  console.log('Complete task:', task.id);
                                }}
                              >
                                Complete
                              </button>
                            </div>
                            <div className="mt-1 text-xs/5 text-gray-500">
                              Task <span className="text-gray-900">#{task.id.slice(-4)}</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  )
}
