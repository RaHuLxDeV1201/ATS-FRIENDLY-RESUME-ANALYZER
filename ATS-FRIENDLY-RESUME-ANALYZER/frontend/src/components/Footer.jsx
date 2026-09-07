import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800/80 pt-12 pb-8 mt-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info & Social Media Links */}
          <div className="space-y-4 md:col-span-2">
            <Logo size="sm" variant="light" showTagline={true} />
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              Empowering job seekers with AI-driven resume scoring, skill gap detection, and ATS format optimization to land more interview calls.
            </p>

            {/* Social Media Links Collection */}
            <div className="pt-2">
              <h6 className="text-[11px] font-extrabold text-slate-300 uppercase tracking-wider mb-2.5">Connect With Us</h6>
              <div className="flex items-center space-x-3">
                
                {/* LinkedIn */}
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-800/80 transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/>
                  </svg>
                </a>

                {/* GitHub */}
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="w-9 h-9 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 hover:bg-slate-800/80 transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                  </svg>
                </a>

                {/* X (Twitter) */}
                <a 
                  href="https://x.com" 
                  target="_blank" 
                  rel="noreferrer"
                  aria-label="X (Twitter)"
                  className="w-9 h-9 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 hover:bg-slate-800/80 transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-pink-400 hover:border-pink-500/40 hover:bg-slate-800/80 transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

              </div>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-2.5">
            <h5 className="font-extrabold text-[#F8FAFC] uppercase tracking-wider text-[11px]">Product Tools</h5>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li>
                <Link to="/upload" className="hover:text-cyan-300 transition-colors">Resume ATS Analyzer</Link>
              </li>
              <li>
                <Link to="/job-match" className="hover:text-cyan-300 transition-colors">Job Match Scanner</Link>
              </li>
              <li>
                <Link to="/grammar" className="hover:text-cyan-300 transition-colors">Action Verb & Grammar Checker</Link>
              </li>
              <li>
                <Link to="/builder" className="hover:text-cyan-300 transition-colors">ATS Resume Formatter</Link>
              </li>
              <li>
                <Link to="/upload" className="hover:text-cyan-300 transition-colors">ATS Resume Analyzer</Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support Links */}
          <div className="space-y-2.5">
            <h5 className="font-extrabold text-[#F8FAFC] uppercase tracking-wider text-[11px]">Legal & Support</h5>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li>
                <a href="#privacy" className="hover:text-cyan-300 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms" className="hover:text-cyan-300 transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#cookies" className="hover:text-cyan-300 transition-colors">Cookie Preferences</a>
              </li>
              <li>
                <a href="mailto:support@navireq.com" className="hover:text-cyan-300 transition-colors">Contact Support</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Divider */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 font-medium text-[11px]">
          <p>© 2026 NAVIREQ ATS. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Built for high-performance job seekers</span>
            <span>•</span>
            <span className="text-cyan-400 font-semibold">100% Free Scanner</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
