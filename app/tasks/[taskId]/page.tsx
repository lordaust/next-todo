import Link from 'next/link';

type TaskDetailPageProps = {
  params: Promise<{
    taskId: string;
  }>;
};

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
  const { taskId } = await params;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Task Detail / Edit
          </h1>
          
          <div className="mb-8">
            <p className="text-lg text-gray-600 mb-2">
              Current route: <code className="bg-gray-100 px-2 py-1 rounded">/tasks/{taskId}</code>
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Task ID: <span className="font-mono bg-yellow-100 px-2 py-1 rounded">{taskId}</span>
            </p>
            <p className="text-gray-500">
              This page will contain the task details and edit form for the specified task.
            </p>
          </div>

          <div className="flex gap-4">
            <Link 
              href="/"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              ← Back to Task List
            </Link>
            <Link 
              href="/tasks/add-new"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              + Add New Task
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
