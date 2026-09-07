import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Analyze Resume', path: '/upload', icon: '📄' },
    { name: 'Grammar Checker', path: '/grammar', icon: '✍️' },
    { name: 'Job Match', path: '/job-match', icon: '🎯' },
    { name: 'Resume Builder', path: '/builder', icon: '📝' },
    { name: 'Profile', path: '/profile', icon: '👤' },
    { name: 'Settings', path: '/settings', icon: '⚙️' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 min-h-screen p-4 space-y-6 hidden md:block">
      <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-400">
        Navigation
      </div>
      <nav className="space-y-1">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              isActive(link.path)
                ? 'bg-blue-50 text-blue-600 font-bold'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <span>{link.icon}</span>
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
