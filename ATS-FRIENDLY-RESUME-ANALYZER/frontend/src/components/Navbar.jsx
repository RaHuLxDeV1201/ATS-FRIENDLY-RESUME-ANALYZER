import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        setUser(null);
      }
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  // Squishy button base styles with #F8FAFC text color & increased horizontal padding for breathability
  const squishyNavClass = (path) => `
    inline-flex items-center px-4.5 py-2 text-sm font-semibold rounded-2xl transition-all duration-200 ease-out transform
    hover:scale-105 hover:-translate-y-0.5 active:scale-90 active:translate-y-1 select-none cursor-pointer
    ${isActive(path)
      ? 'bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-cyan-500/30 text-cyan-300 font-bold border border-cyan-400/40 shadow-lg shadow-cyan-500/10'
      : 'text-[#F8FAFC] hover:text-white hover:bg-slate-900/90 border border-transparent'
    }
  `;

  return (
    <nav className="bg-slate-950/90 text-white shadow-2xl border-b border-slate-800/80 sticky top-0 z-50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo / Brand with Squishy scale effect */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center transform transition-transform duration-200 hover:scale-105 active:scale-95">
              <Logo size="sm" variant="light" />
            </Link>
          </div>

          {/* Center Navigation Links with Increased Item Spacing (#F8FAFC text color) */}
          <div className="hidden lg:flex space-x-3">
            <Link to="/" className={squishyNavClass('/')}>
              Home
            </Link>

            <Link to="/upload" className={squishyNavClass('/upload')}>
              Analyze Resume
            </Link>

            <Link to="/grammar" className={squishyNavClass('/grammar')}>
              Grammar Checker
            </Link>

            <Link to="/job-match" className={squishyNavClass('/job-match')}>
              Job Match
            </Link>

            <Link to="/builder" className={squishyNavClass('/builder')}>
              Builder
            </Link>
          </div>

          {/* Right side Authentication Links / Profile */}
          <div className="flex items-center space-x-3.5">
            {user ? (
              <div className="flex items-center gap-3">
                <Link 
                  to="/profile" 
                  className="flex items-center gap-2 text-sm font-semibold text-[#F8FAFC] hover:text-cyan-300 transition-transform duration-200 hover:scale-105 active:scale-95"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white border border-blue-400/40 rounded-full flex items-center justify-center font-bold text-xs shadow-md">
                    {user.user_name ? user.user_name.substring(0, 2).toUpperCase() : 'US'}
                  </div>
                  <span className="hidden sm:inline">{user.user_name || 'User'}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-3.5 py-1.5 text-xs font-bold text-slate-400 hover:text-red-400 border border-slate-800 rounded-xl hover:border-red-900/60 hover:bg-red-950/30 transition-all duration-200 hover:scale-105 active:scale-90 cursor-pointer"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                {/* Enhanced Log in Button with crisp border & background tint */}
                <Link 
                  to="/login" 
                  className={`text-sm font-bold px-4 py-2 rounded-2xl border transition-all duration-200 transform hover:scale-105 active:scale-90 shadow-xs ${
                    isActive('/login')
                      ? 'bg-blue-600/30 text-cyan-300 border-cyan-400/50'
                      : 'bg-slate-900/90 text-[#F8FAFC] border-slate-700/80 hover:bg-slate-800 hover:border-cyan-500/40 hover:text-white'
                  }`}
                >
                  Log in
                </Link>

                {/* Cyan Pill SIGN UP Button matching uploaded screenshot */}
                <Link 
                  to="/register" 
                  className="inline-flex items-center justify-center px-7 py-2 rounded-full text-sm font-extrabold text-white uppercase tracking-wider bg-[#00BCF2] hover:bg-[#00A3D4] shadow-md shadow-cyan-500/25 transform hover:scale-105 hover:-translate-y-0.5 active:scale-90 active:translate-y-1 transition-all duration-200 ease-out cursor-pointer"
                >
                  SIGN UP
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}