import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="space-y-24 py-6">
      
      {/* Hero Section */}
      <section className="text-center max-w-5xl mx-auto px-4 space-y-8 pt-4">
        
        {/* Sleek Pill Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 border border-blue-200/80 px-4 py-2 rounded-full text-blue-900 text-xs sm:text-sm font-semibold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
          <span className="font-extrabold tracking-wide">NAVIREQ ATS</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600">Navigate the ATS. Land the Role.</span>
        </div>

        {/* Crisp Solid Charcoal Headline (#0F172A) with Dual-Color Accent */}
        <h1 className="text-4xl sm:text-6xl font-black text-[#0F172A] tracking-tight leading-tight">
          Beat the ATS. Get More{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
            Interview Calls.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          Upload your PDF resume to receive an instant ATS compatibility score, detect skill gaps, fix grammatical errors, and get actionable suggestions to optimize your resume.
        </p>

        {/* Optimized CTA Action Buttons with Soft Diffused Blue Shadow & Hover Fill */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          {/* Primary CTA: Soft Diffused Blue Shadow Glow */}
          <Link
            to="/upload"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-extrabold text-lg rounded-2xl shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all cursor-pointer transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95"
          >
            Analyze Resume Free →
          </Link>

          {/* Secondary CTA: Background Tint Fill on Hover */}
          <Link
            to="/grammar"
            className="w-full sm:w-auto px-7 py-4 bg-slate-50/80 hover:bg-slate-100/90 text-[#0F172A] hover:text-black font-bold text-lg rounded-2xl border border-slate-200/90 hover:border-slate-300 shadow-sm transition-all cursor-pointer transform hover:-translate-y-0.5 active:scale-95"
          >
            Check Action Verbs
          </Link>
        </div>

        {/* ========================================================================= */}
        {/* LIVE EXECUTIVE ATS ANALYSIS SHOWCASE (Matches actual site UI 100%)       */}
        {/* ========================================================================= */}
        <div className="pt-8 pb-4 relative max-w-5xl mx-auto">
          
          {/* Floating Pill Top Left */}
          <div className="absolute top-2 left-2 sm:-left-4 z-20 bg-slate-900 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2 transform -rotate-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>⚡ 92/100 ATS Compatibility</span>
          </div>

          {/* Floating Pill Bottom Right */}
          <div className="absolute bottom-2 right-2 sm:-right-4 z-20 bg-slate-900 text-cyan-300 font-extrabold text-xs px-3.5 py-1.5 rounded-2xl shadow-xl border border-cyan-500/40 flex items-center gap-2 transform rotate-1">
            <span>🎯 Instant Skill Gap Matrix</span>
          </div>

          {/* Main Showcase Container (Clean Light Theme matching actual site) */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden text-left text-gray-900">
            
            {/* Top Window Bar */}
            <div className="bg-slate-900 px-5 py-3 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                <span className="text-xs text-slate-300 font-mono ml-2 hidden sm:inline">Navireq ATS Analyzer • Live Report Dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-0.5 rounded-full">
                  ✓ Analysis Complete
                </span>
              </div>
            </div>

            {/* Showcase Dashboard Inner Layout */}
            <div className="p-6 sm:p-8 space-y-6 bg-slate-50/50">
              
              {/* Header Info Strip */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
                    📄
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Senior_FullStack_Engineer_Resume.pdf</h4>
                    <p className="text-xs text-gray-500">Evaluated against target Job Description • Parsed in 0.8s</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-full">
                    92% ATS Match Score
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold rounded-full">
                    High Recruiter Fit
                  </span>
                </div>
              </div>

              {/* Grid Content */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Score Gauge & Category Progress (5 cols) */}
                <div className="md:col-span-5 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-5">
                  <div className="text-center space-y-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Overall ATS Score</span>
                    <div className="w-32 h-32 mx-auto rounded-full bg-emerald-50 border-4 border-emerald-500/80 flex flex-col items-center justify-center shadow-inner">
                      <span className="text-4xl font-black text-emerald-700">92%</span>
                      <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide">Excellent</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                        <span>Technical Skill Match</span>
                        <span className="text-emerald-600">95%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full w-[95%]"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                        <span>Required Sections</span>
                        <span className="text-blue-600">100%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full w-[100%]"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                        <span>Action Verbs & Grammar</span>
                        <span className="text-purple-600">88%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-purple-600 h-full rounded-full w-[88%]"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skill Matrix & Recommendations (7 cols) */}
                <div className="md:col-span-7 space-y-4">
                  
                  {/* Skill Gap Box */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <h5 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider">Skill Gap Matrix</h5>
                      <span className="text-xs font-semibold text-gray-500">5 Matched • 2 Missing</span>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs font-bold">
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg">✓ React.js</span>
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg">✓ Python</span>
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg">✓ FastAPI</span>
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg">✓ PostgreSQL</span>
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg">✓ TypeScript</span>
                      <span className="bg-rose-50 text-rose-800 border border-rose-200 px-2.5 py-1 rounded-lg">+ Add Docker</span>
                      <span className="bg-rose-50 text-rose-800 border border-rose-200 px-2.5 py-1 rounded-lg">+ Add AWS</span>
                    </div>
                  </div>

                  {/* Bullet Point Fix Suggestion Box */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-2">
                    <h5 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider">ATS Bullet Recommendation</h5>
                    <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-xs space-y-1">
                      <div className="text-rose-600 line-through font-medium">❌ "Responsible for writing backend API endpoints"</div>
                      <div className="text-blue-900 font-bold">⚡ Recommended: "Architected high-throughput RESTful APIs using FastAPI & PostgreSQL, reducing latency by 35%."</div>
                    </div>
                  </div>

                  {/* Quick Features Checklist */}
                  <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex flex-wrap justify-between text-xs font-bold text-gray-700">
                    <span className="text-emerald-700">✓ Work Experience Found</span>
                    <span className="text-emerald-700">✓ Education Verified</span>
                    <span className="text-emerald-700">✓ Contact Info Standard</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Feature Cards Section (Balanced 4-Card Grid with Hover Lift, Soft Icon Pills & Action Links) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0F172A]">Comprehensive Resume Analysis</h2>
          <p className="text-slate-500 mt-2">Everything you need to optimize your resume for Applicant Tracking Systems.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: ATS Score */}
          <Link 
            to="/upload" 
            className="group bg-white p-7 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-400/60 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100 shadow-xs text-xl group-hover:scale-110 transition-transform">
                📊
              </div>
              <h3 className="text-lg font-extrabold text-[#0F172A] group-hover:text-blue-600 transition-colors">ATS Score & Grading</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Get an overall compatibility score (0-100) with category sub-scores for Skills, Sections, Grammar, and Formatting.
              </p>
            </div>
            <div className="pt-5 flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:text-cyan-600 transition-colors">
              <span>Try ATS Analyzer</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          {/* Card 2: Skill Gap */}
          <Link 
            to="/job-match" 
            className="group bg-white p-7 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-400/60 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-2xl flex items-center justify-center border border-cyan-100 shadow-xs text-xl group-hover:scale-110 transition-transform">
                🎯
              </div>
              <h3 className="text-lg font-extrabold text-[#0F172A] group-hover:text-cyan-600 transition-colors">Skill Gap Identification</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Automatically identify missing technical skills and frameworks compared against target job descriptions or industry benchmarks.
              </p>
            </div>
            <div className="pt-5 flex items-center gap-1 text-xs font-bold text-cyan-600 group-hover:text-blue-600 transition-colors">
              <span>Match Job Description</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          {/* Card 3: Action Verbs */}
          <Link 
            to="/grammar" 
            className="group bg-white p-7 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-400/60 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center border border-indigo-100 shadow-xs text-xl group-hover:scale-110 transition-transform">
                ✍️
              </div>
              <h3 className="text-lg font-extrabold text-[#0F172A] group-hover:text-indigo-600 transition-colors">Grammar & Action Verbs</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Detect weak phrasing like "worked on" or "responsible for" and replace them with impactful action verbs like "Spearheaded" or "Engineered".
              </p>
            </div>
            <div className="pt-5 flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:text-blue-600 transition-colors">
              <span>Check Action Verbs</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          {/* Card 4: Resume Formatter & Builder */}
          <Link 
            to="/builder" 
            className="group bg-white p-7 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-400/60 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center border border-sky-100 shadow-xs text-xl group-hover:scale-110 transition-transform">
                📄
              </div>
              <h3 className="text-lg font-extrabold text-[#0F172A] group-hover:text-sky-600 transition-colors">ATS Resume Formatter</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Create ATS-formatted resumes with clean single-column layouts, standard section headers, and verified font structures.
              </p>
            </div>
            <div className="pt-5 flex items-center gap-1 text-xs font-bold text-sky-600 group-hover:text-cyan-600 transition-colors">
              <span>Build ATS Resume</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

        </div>
      </section>

      {/* How It Works Section (Connected Workflow Cards with Micro-interactions) */}
      <section className="bg-slate-50/60 py-16 border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A]">How It Works</h2>
            <p className="text-slate-500 text-sm mt-2">Get your resume ATS-ready in 3 effortless steps.</p>
          </div>

          {/* Connected Grid Container */}
          <div className="relative">
            
            {/* Horizontal Flow Line Connecting Steps 1 -> 2 -> 3 */}
            <div className="hidden md:block absolute top-1/2 left-24 right-24 h-0.5 border-t-2 border-dashed border-cyan-400/50 -translate-y-8 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              
              {/* Step 1 Card */}
              <Link to="/upload" className="group bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-400/60 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-cyan-500 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-md shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                  1
                </div>
                <h4 className="font-extrabold text-[#0F172A] text-lg group-hover:text-blue-600 transition-colors">Upload PDF Resume</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Drag & drop your PDF resume into our secure ATS scanner. Your privacy is guaranteed.
                </p>
                <div className="pt-2 text-xs font-bold text-blue-600 group-hover:text-cyan-600 flex items-center gap-1 transition-colors">
                  <span>Select PDF File</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>

              {/* Step 2 Card */}
              <Link to="/upload" className="group bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-400/60 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-cyan-500 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-md shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                  2
                </div>
                <h4 className="font-extrabold text-[#0F172A] text-lg group-hover:text-cyan-600 transition-colors">Instant AI Scan</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our engine parses your resume, calculates section scores, checks grammar, and extracts skills.
                </p>
                <div className="pt-2 text-xs font-bold text-cyan-600 group-hover:text-blue-600 flex items-center gap-1 transition-colors">
                  <span>View Live Report</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>

              {/* Step 3 Card */}
              <Link to="/upload" className="group bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-400/60 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-cyan-500 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-md shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                  3
                </div>
                <h4 className="font-extrabold text-[#0F172A] text-lg group-hover:text-blue-600 transition-colors">Optimize & Win</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Apply tailored action verb recommendations and fill missing technical skills to land more interviews.
                </p>
                <div className="pt-2 text-xs font-bold text-blue-600 group-hover:text-cyan-600 flex items-center gap-1 transition-colors">
                  <span>Boost ATS Score</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
