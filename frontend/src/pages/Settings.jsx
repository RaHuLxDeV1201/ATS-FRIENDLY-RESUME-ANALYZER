import Card from '../components/Card';

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto my-8 px-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Application Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Configure ATS scoring sensitivity and server connection settings.</p>
      </div>

      <Card title="Backend API Configuration">
        <div className="space-y-4 text-sm">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Local Backend Server URL</label>
            <input
              type="text"
              readOnly
              value="http://localhost:8000"
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 font-mono text-xs"
            />
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
            <div>
              <span className="font-semibold text-gray-800">Direct PDF Upload Processing</span>
              <p className="text-xs text-gray-500">Extracts text instantly using local pypdf parser.</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
              Enabled
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
