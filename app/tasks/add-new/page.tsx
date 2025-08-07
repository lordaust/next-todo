import Link from 'next/link';

export default function AddNewTaskPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Add New Task
          </h1>
          
          <div className="mb-8">
            <p className="text-lg text-gray-600 mb-4">
              Current route: <code className="bg-gray-100 px-2 py-1 rounded">/tasks/add-new</code>
            </p>
            <p className="text-gray-500">
              This page will contain the task creation form.
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
              href="/tasks/example-task-id"
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              View Task Detail Example
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
