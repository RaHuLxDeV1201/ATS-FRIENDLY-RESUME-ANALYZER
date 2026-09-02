import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  // We use this to check which page we are currently on so we can highlight the active link
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* 1. Logo / Brand Area */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600 flex items-center gap-2">
              {/* SVG Document Icon */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              ATS Analyzer
            </Link>
          </div>

          {/* 2. Center Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'border-blue-600 text-gray-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/upload" 
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                isActive('/upload') 
                  ? 'border-blue-600 text-gray-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              Analyze Resume
            </Link>
            <Link 
              to="/dashboard" 
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                isActive('/dashboard') 
                  ? 'border-blue-600 text-gray-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              Dashboard
            </Link>
          </div>

          {/* 3. Right Side - Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/login" 
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Log in
            </Link>
            <Link 
              to="/register" 
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Sign up
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}