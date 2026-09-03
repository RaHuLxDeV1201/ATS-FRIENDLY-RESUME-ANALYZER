import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { getATSReport } from '../services/api';

export default function ATSReport() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [report, setReport] = useState(location.state?.reportData || null);
  const [loading, setLoading] = useState(!report && !!id);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!report && id) {
      setLoading(true);
      getATSReport(id)
        .then((data) => {
          setReport(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message || "Failed to load report.");
          setLoading(false);
        });
    }
  }, [id, report]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <svg className="animate-spin h-10 w-10 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-gray-600 font-medium">Fetching ATS Analysis Report...</p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="max-w-2xl mx-auto my-12 text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Report Found</h2>
        <p className="text-gray-600 mb-6">{error || "Please upload a resume first to view the analysis report."}</p>
        <Link
          to="/upload"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md"
        >
          Upload Resume Now
        </Link>
      </div>
    );
  }

  const { overall_score, grade, category_scores, skills_analysis, sections_status, grammar_result, suggestions, file_name } = report;

  // Grade badge styling helper
  const getGradeBadge = (scoreGrade) => {
    switch (scoreGrade) {
      case 'Excellent':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Good':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Needs Work':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-red-100 text-red-800 border-red-300';
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-8 px-4 space-y-8">
      
      {/* Top Banner & Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-semibold text-gray-500">Analysis Report for</span>
            <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded-md">{file_name || "Resume.pdf"}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">ATS Resume Evaluation</h1>
          <p className="text-gray-500 text-sm mt-1">Detailed compatibility analysis and optimization feedback.</p>
        </div>

        <div className="flex items-center gap-6 bg-gradient-to-br from-gray-50 to-blue-50/50 p-5 rounded-2xl border border-gray-200">
          {/* Radial Score Display */}
          <div className="relative w-24 h-24 flex items-center justify-center bg-white rounded-full shadow-inner border-4 border-blue-500 text-3xl font-extrabold text-gray-900">
            {overall_score}
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Overall ATS Score</div>
            <span className={`inline-block px-3 py-1 text-sm font-bold rounded-full border ${getGradeBadge(grade)}`}>
              {grade} ({overall_score}/100)
            </span>
          </div>
        </div>
      </div>

      {/* Category Breakdown Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Skills Match Score */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-600">Skills Match</span>
            <span className="text-base font-bold text-blue-600">{category_scores?.skills_score || 0}%</span>
          </div>
          <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${category_scores?.skills_score || 0}%` }}></div>
          </div>
        </div>

        {/* Section Structure Score */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-600">Sections Complete</span>
            <span className="text-base font-bold text-emerald-600">{category_scores?.sections_score || 0}%</span>
          </div>
          <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${category_scores?.sections_score || 0}%` }}></div>
          </div>
        </div>

        {/* Grammar Score */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-600">Grammar & Style</span>
            <span className="text-base font-bold text-purple-600">{category_scores?.grammar_score || 0}%</span>
          </div>
          <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
            <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${category_scores?.grammar_score || 0}%` }}></div>
          </div>
        </div>

        {/* Formatting Score */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-600">Formatting</span>
            <span className="text-base font-bold text-amber-600">{category_scores?.formatting_score || 0}%</span>
          </div>
          <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${category_scores?.formatting_score || 0}%` }}></div>
          </div>
        </div>

      </div>

      {/* Main Content Grid: Skill Gap + Section Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Skill Gap Analysis (Spans 2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Skill Gap Analysis
            </h2>
            <p className="text-gray-500 text-sm mt-1">Comparison of detected resume skills against target job requirements.</p>
          </div>

          {/* Matched Skills */}
          <div>
            <h3 className="text-sm font-semibold text-emerald-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Matched Skills ({skills_analysis?.matched_skills?.length || 0})
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills_analysis?.matched_skills?.length > 0 ? (
                skills_analysis.matched_skills.map((skill, idx) => (
                  <span key={idx} className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-lg text-sm font-medium">
                    ✓ {skill}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-500 italic">No skills matched directly to job description.</span>
              )}
            </div>
          </div>

          {/* Missing Skills (Skill Gap) */}
          <div>
            <h3 className="text-sm font-semibold text-amber-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span> Recommended / Missing Skills ({skills_analysis?.missing_skills?.length || 0})
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills_analysis?.missing_skills?.length > 0 ? (
                skills_analysis.missing_skills.map((skill, idx) => (
                  <span key={idx} className="bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-lg text-sm font-medium">
                    + Add {skill}
                  </span>
                ))
              ) : (
                <span className="text-sm text-emerald-600 font-medium">Great job! All target skills were found in your resume.</span>
              )}
            </div>
          </div>

          {/* All Detected Skills */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
              All Extracted Skills ({skills_analysis?.all_detected_skills?.length || 0})
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {skills_analysis?.all_detected_skills?.map((skill, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Resume Section Structure Checklist (1 col) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Required Sections
          </h2>
          <p className="text-gray-500 text-sm">Essential ATS section presence check.</p>

          <div className="space-y-3 pt-2">
            {sections_status && Object.entries(sections_status).map(([section, present]) => (
              <div key={section} className="flex items-center justify-between p-3 bg-gray-50/80 rounded-xl border border-gray-100">
                <span className="capitalize font-semibold text-sm text-gray-800">{section}</span>
                {present ? (
                  <span className="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                    ✓ Found
                  </span>
                ) : (
                  <span className="inline-flex items-center text-xs font-bold text-red-700 bg-red-100 px-2.5 py-1 rounded-full">
                    ✕ Missing
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Grammar & Writing Style Diagnostics */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Grammar & Action Verb Improvements ({grammar_result?.total_mistakes || 0})
            </h2>
            <p className="text-gray-500 text-sm mt-1">Suggestions to improve active phrasing, fix typos, and enhance readability.</p>
          </div>
        </div>

        {grammar_result?.mistakes?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {grammar_result.mistakes.map((item, idx) => (
              <div key={idx} className="p-4 bg-purple-50/50 border border-purple-100 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider bg-purple-100 px-2 py-0.5 rounded-md">
                    {item.type}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-800">{item.message}</p>
                <div className="text-xs bg-white p-2.5 rounded-lg border border-purple-100 space-y-1">
                  <div><span className="font-semibold text-gray-500">Detected:</span> <code className="text-red-600 bg-red-50 px-1 py-0.5 rounded">{item.original}</code></div>
                  <div><span className="font-semibold text-gray-500">Suggested Fix:</span> <span className="font-semibold text-emerald-700">{item.suggestion}</span></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center bg-emerald-50/50 border border-emerald-100 rounded-xl text-emerald-800 text-sm font-medium">
            ✨ No grammatical or weak action verb issues detected! Excellent writing quality.
          </div>
        )}
      </div>

      {/* Actionable Recommendations List */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Priority Improvement Recommendations
        </h2>

        <div className="space-y-3">
          {suggestions?.map((suggestion, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3.5 bg-amber-50/40 border border-amber-100 rounded-xl text-sm text-gray-800">
              <span className="flex-shrink-0 w-6 h-6 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center font-bold text-xs">
                {idx + 1}
              </span>
              <p className="mt-0.5 font-medium">{suggestion}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="flex justify-center gap-4 pt-4">
        <button
          onClick={() => navigate('/upload')}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md"
        >
          Upload Another Resume
        </button>
      </div>

    </div>
  );
}
