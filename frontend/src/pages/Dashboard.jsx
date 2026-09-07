import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto my-8 px-4 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ATS Analyzer Dashboard</h1>
          <p className="text-gray-500 text-sm">Overview of your local resume scans and optimization stats.</p>
        </div>
        <Link
          to="/upload"
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow transition-colors"
        >
          + Analyze New Resume
        </Link>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Engine Status</span>
          <div className="text-2xl font-extrabold text-emerald-600 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Active (Local)
          </div>
          <p className="text-xs text-gray-500">FastAPI backend running locally</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-2">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Supported Format</span>
          <div className="text-2xl font-extrabold text-gray-900">PDF Documents</div>
          <p className="text-xs text-gray-500">pypdf text extraction enabled</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-2">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Skill Taxonomies</span>
          <div className="text-2xl font-extrabold text-purple-600">50+ Tech Skills</div>
          <p className="text-xs text-gray-500">Languages, frameworks & databases</p>
        </div>
      </div>

      {/* Quick Start Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-2xl shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Ready to check your resume?</h3>
          <p className="text-blue-100 text-sm max-w-xl">
            Upload your resume PDF to view instant ATS score breakdown, missing skills, and grammatical suggestions.
          </p>
        </div>
        <Link
          to="/upload"
          className="px-6 py-3 bg-white text-blue-700 hover:bg-blue-50 font-bold rounded-xl shadow transition-colors whitespace-nowrap"
        >
          Start Analysis Now
        </Link>
      </div>
    </div>
  );
}
