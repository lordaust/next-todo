'use client'

import { Fragment } from 'react'
import { 
  BriefcaseIcon,
  UserIcon,
  ShoppingCartIcon,
  HeartIcon,
  HomeIcon,
  BanknotesIcon,
  EllipsisHorizontalIcon 
} from '@heroicons/react/24/solid'
import { SmallPillWithBorder, type BadgeVariant } from '../../components/ui/badge/small-pill-with-border'

// UI-specific task type with simplified assignee
type UITask = {
  id: string;
  title: string;
  assignee: string;
  category: 'work' | 'personal' | 'shopping' | 'health' | 'home' | 'finance' | 'other';
  status: 'new' | 'approved' | 'done' | 'deleted';
  urgent: boolean;
  dueDate?: string;
};

type TaskGroup = {
  name: string;
  tasks: UITask[];
};

type RecentTasksProps = {
  tasks: UITask[];
};

// Category icons mapping based on requirements
const categoryIcons = {
  work: BriefcaseIcon,
  personal: UserIcon,
  shopping: ShoppingCartIcon,
  health: HeartIcon,
  home: HomeIcon,
  finance: BanknotesIcon,
  other: EllipsisHorizontalIcon,
};

// Status configuration with badge variants
const statusConfig = {
  new: {
    label: 'Open',
    variant: 'blue' as BadgeVariant,
  },
  approved: {
    label: 'In Progress',
    variant: 'yellow' as BadgeVariant,
  },
  done: {
    label: 'Completed',
    variant: 'green' as BadgeVariant,
  },
  deleted: {
    label: 'Deleted',
    variant: 'gray' as BadgeVariant,
  },
};

// Group tasks by urgency (matching requirements)
const groupTasksByUrgency = (tasks: UITask[]): TaskGroup[] => {
  const urgentTasks = tasks.filter(task => task.urgent && task.status !== 'done');
  const regularTasks = tasks.filter(task => !task.urgent && task.status !== 'done');
  
  const groups: TaskGroup[] = [];
  
  if (urgentTasks.length > 0) {
    groups.push({
      name: 'Urgent Tasks',
      tasks: urgentTasks,
    });
  }
  
  if (regularTasks.length > 0) {
    groups.push({
      name: 'Regular Tasks',
      tasks: regularTasks,
    });
  }
  
  return groups;
};

export function RecentTasks({ tasks }: RecentTasksProps) {
  const taskGroups = groupTasksByUrgency(tasks);
  
  return (
    <div className="w-full max-w-none">
      {/* Component Header - Following design guidelines */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Recent Tasks</h2>
        <p className="text-sm text-gray-600">{tasks.length} total tasks</p>
      </div>

      {/* Table Container - Clean, minimal styling */}
      <div className="w-full bg-white border border-gray-200 rounded-lg">
        <div className="overflow-hidden">
          <table className="w-full">
            <thead className="sr-only">
              <tr>
                <th>Task Details</th>
                <th>Assignee & Status</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {taskGroups.map((group) => (
                <Fragment key={group.name}>
                  {/* Group Header - Full-width background strip */}
                  <tr>
                    <td colSpan={3} className="bg-gray-50 px-0 py-3">
                      <div className="w-full">
                        <h3 className="text-sm font-medium text-gray-900 px-6">
                          {group.name}
                        </h3>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Task Rows */}
                  {group.tasks.map((task, index) => {
                    const CategoryIcon = categoryIcons[task.category];
                    const statusInfo = statusConfig[task.status];
                    
                    return (
                      <tr 
                        key={task.id} 
                        className="group hover:bg-gray-25 transition-colors duration-150"
                      >
                        {/* Primary Content Cell */}
                        <td className="py-4 px-6">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="text-sm font-medium text-gray-900 truncate">
                                {task.title}
                              </h4>
                              {task.urgent && (
                                <span className="text-xs text-red-600 font-medium">
                                  Urgent
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 capitalize">
                              {task.category}
                            </p>
                          </div>
                        </td>
                        
                        {/* Assignee & Status Cell */}
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <div className="text-sm text-gray-900">
                              {task.assignee}
                            </div>
                            <SmallPillWithBorder variant={statusInfo.variant}>
                              {statusInfo.label}
                            </SmallPillWithBorder>
                          </div>
                        </td>
                        
                        {/* Due Date Cell */}
                        <td className="py-4 px-6">
                          <div className="text-sm text-gray-500">
                            {task.dueDate 
                              ? new Date(task.dueDate).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })
                              : '—'
                            }
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
      
      {/* Empty State */}
      {tasks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">
            <BriefcaseIcon className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-sm font-medium text-gray-900 mb-1">No tasks yet</h3>
          <p className="text-sm text-gray-500">Get started by creating your first task.</p>
        </div>
      )}
    </div>
  );
}
