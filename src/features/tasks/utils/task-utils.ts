import type { Task, TaskFilter, TaskStats, CategoryType } from '../../../data-access-layer/types';

export function filterTasks(tasks: Task[], filter: TaskFilter | null, searchQuery: string = ''): Task[] {
  let filtered = [...tasks];

  // Apply search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(task => 
      task.title.toLowerCase().includes(query) ||
      task.description?.toLowerCase().includes(query) ||
      task.subtasks?.some(subtask => 
        subtask.subtaskName.toLowerCase().includes(query)
      )
    );
  }

  // Apply filters
  if (filter) {
    if (filter.status) {
      filtered = filtered.filter(task => task.status === filter.status);
    }
    if (filter.category) {
      filtered = filtered.filter(task => task.category === filter.category);
    }
    if (filter.urgent !== undefined) {
      filtered = filtered.filter(task => task.urgent === filter.urgent);
    }
    if (filter.assigneeId) {
      filtered = filtered.filter(task => task.assignee.id === filter.assigneeId);
    }
    if (filter.creatorId) {
      filtered = filtered.filter(task => task.creator.id === filter.creatorId);
    }
    if (filter.dueBefore) {
      filtered = filtered.filter(task => 
        task.dueDate && task.dueDate <= filter.dueBefore!
      );
    }
    if (filter.dueAfter) {
      filtered = filtered.filter(task => 
        task.dueDate && task.dueDate >= filter.dueAfter!
      );
    }
  }

  return filtered;
}

export function calculateTaskStats(tasks: Task[]): TaskStats {
  const now = new Date();
  
  const stats: TaskStats = {
    total: tasks.length,
    new: 0,
    approved: 0,
    done: 0,
    urgent: 0,
    overdue: 0,
    byCategory: {
      work: 0,
      personal: 0,
      shopping: 0,
      health: 0,
      home: 0,
      finance: 0,
      other: 0,
    },
  };

  tasks.forEach(task => {
    // Count by status
    if (task.status === 'new') stats.new++;
    if (task.status === 'approved') stats.approved++;
    if (task.status === 'done') stats.done++;
    
    // Count urgent tasks
    if (task.urgent) stats.urgent++;
    
    // Count overdue tasks
    if (task.dueDate && task.dueDate < now && task.status !== 'done') {
      stats.overdue++;
    }
    
    // Count by category
    stats.byCategory[task.category]++;
  });

  return stats;
}

export function getTasksByStatus(tasks: Task[], status: Task['status']): Task[] {
  return tasks.filter(task => task.status === status);
}

export function getUrgentTasks(tasks: Task[]): Task[] {
  return tasks.filter(task => task.urgent && task.status !== 'done');
}

export function getOverdueTasks(tasks: Task[]): Task[] {
  const now = new Date();
  return tasks.filter(task => 
    task.dueDate && 
    task.dueDate < now && 
    task.status !== 'done'
  );
}

export function sortTasks(tasks: Task[], sortBy: 'dueDate' | 'created' | 'title' | 'urgent' = 'created', order: 'asc' | 'desc' = 'desc'): Task[] {
  return [...tasks].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'dueDate':
        const aDate = a.dueDate?.getTime() || 0;
        const bDate = b.dueDate?.getTime() || 0;
        comparison = aDate - bDate;
        break;
      case 'created':
        comparison = a.created.getTime() - b.created.getTime();
        break;
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'urgent':
        comparison = (a.urgent ? 1 : 0) - (b.urgent ? 1 : 0);
        break;
    }
    
    return order === 'asc' ? comparison : -comparison;
  });
}
