import { useState, useEffect } from 'react';

const PRESET_ACCOUNTS = [
  {
    name: "Sangram Singh",
    email: "sangram.singh@gmail.com",
    avatarColor: "bg-blue-600 text-white",
    initials: "SS",
  },
  {
    name: "Alex Chen",
    email: "alex.chen.dev@gmail.com",
    avatarColor: "bg-purple-600 text-white",
    initials: "AC",
  },
  {
    name: "Priya Sharma",
    email: "priya.sharma.tech@gmail.com",
    avatarColor: "bg-emerald-600 text-white",
    initials: "PS",
  },
];

export default function GoogleAccountModal({ isOpen, onClose, onSelectAccount }) {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customEmail, setCustomEmail] = useState("");
  const [customError, setCustomError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset state when opening/closing
  useEffect(() => {
    if (!isOpen) {
      setShowCustomInput(false);
      setCustomName("");
      setCustomEmail("");
      setCustomError("");
      setSelectedUser(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAccountClick = (account) => {
    setSelectedUser(account);
    setTimeout(() => {
      onSelectAccount(account);
    }, 450);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customEmail.trim() || !customEmail.includes("@")) {
      setCustomError("Please enter a valid Gmail address.");
      return;
    }

    const name = customName.trim() || customEmail.split("@")[0].replace(".", " ").replace("_", " ").replace(/\b\w/g, c => c.toUpperCase());
    const initials = name.substring(0, 2).toUpperCase();

    const newAccount = {
      name,
      email: customEmail.trim(),
      avatarColor: "bg-amber-600 text-white",
      initials,
    };

    setSelectedUser(newAccount);
    setTimeout(() => {
      onSelectAccount(newAccount);
    }, 450);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      
      {/* Modal Card */}
      <div 
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-200/90 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="pt-8 pb-4 px-8 text-center relative border-b border-gray-100">
          {/* Close button */}
          <button 
            type="button" 
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            title="Cancel"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Google Logo */}
          <div className="flex justify-center mb-3">
            <svg className="w-8 h-8" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.31 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.17 0 9.99 0 12s.46 3.83 1.26 5.42l4.02-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
          </div>

          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Choose an account</h2>
          <p className="text-xs text-gray-500 mt-1">
            to continue to <span className="font-semibold text-gray-700">ATS Friendly Resume Analyzer</span>
          </p>
        </div>

        {/* Account Selection List */}
        <div className="p-6">
          
          {selectedUser ? (
            <div className="py-10 text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-bold text-gray-800">Signing in with Google...</p>
              <p className="text-xs text-gray-500">{selectedUser.email}</p>
            </div>
          ) : (
            <div className="space-y-1.5">
              
              {/* List of preset Google accounts */}
              {PRESET_ACCOUNTS.map((acc, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleAccountClick(acc)}
                  className="w-full text-left p-3.5 rounded-2xl flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition-all border border-transparent hover:border-slate-200 group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shadow-xs ${acc.avatarColor}`}>
                      {acc.initials}
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                        {acc.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{acc.email}</p>
                    </div>
                  </div>
                  <svg className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}

              <div className="pt-2 border-t border-gray-100">
                {showCustomInput ? (
                  /* Custom Gmail Input Form */
                  <form onSubmit={handleCustomSubmit} className="space-y-3 pt-2 bg-slate-50/80 p-4 rounded-2xl border border-slate-200">
                    <p className="text-xs font-bold text-gray-700">Sign in with another Google account</p>
                    
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">Full Name (optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. John Doe"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">Google Email address</label>
                      <input
                        type="email"
                        required
                        placeholder="your.email@gmail.com"
                        value={customEmail}
                        onChange={(e) => { setCustomEmail(e.target.value); setCustomError(""); }}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                      />
                    </div>

                    {customError && (
                      <p className="text-[11px] text-red-600 font-medium">⚠️ {customError}</p>
                    )}

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="submit"
                        className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                      >
                        Sign in
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCustomInput(false)}
                        className="py-2 px-3 text-gray-500 hover:text-gray-700 text-xs font-semibold rounded-xl hover:bg-gray-200/60 transition-colors cursor-pointer"
                      >
                        Back
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Use another account button */
                  <button
                    type="button"
                    onClick={() => setShowCustomInput(true)}
                    className="w-full text-left p-3.5 rounded-2xl flex items-center gap-3.5 hover:bg-slate-50 active:bg-slate-100 transition-all border border-transparent hover:border-slate-200 group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                        Use another account
                      </p>
                      <p className="text-xs text-gray-400">Enter custom email address</p>
                    </div>
                  </button>
                )}
              </div>

            </div>
          )}

        </div>

        {/* Footer Disclaimer */}
        <div className="px-8 py-4 bg-slate-50/70 border-t border-gray-100 text-center">
          <p className="text-[11px] text-gray-500 leading-relaxed">
            To continue, Google will share your name, email address, and profile picture with Navireq ATS Analyzer.
          </p>
        </div>

      </div>

    </div>
  );
}
