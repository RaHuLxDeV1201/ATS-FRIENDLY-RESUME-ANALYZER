import Card from '../components/Card';
import Button from '../components/Button';

export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto my-8 px-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your local account settings and ATS preferences.</p>
      </div>

      <Card title="Account Overview">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
          <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
            GU
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Guest User</h3>
            <p className="text-xs text-gray-500">Local Environment Profile</p>
          </div>
        </div>

        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase">Target Career Domain</span>
            <p className="font-semibold text-gray-800 mt-1">Full Stack / Software Engineering</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase">Local Storage Mode</span>
            <p className="font-semibold text-emerald-600 mt-1">✓ Offline SQLite Enabled</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
