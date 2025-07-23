import SpendingDashboard from '@/components/SpendingDashboard';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">
          Financial Dashboard
        </h1>
        <SpendingDashboard />
      </div>
    </div>
  );
}
