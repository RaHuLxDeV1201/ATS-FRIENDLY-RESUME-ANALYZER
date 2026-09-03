import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeResumeFile } from '../services/api';

export default function UploadResume() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    setError("");
    if (selectedFile.type !== "application/pdf" && !selectedFile.name.endsWith('.pdf')) {
      setError("Please upload a valid PDF document.");
      setFile(null);
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit.");
      setFile(null);
      return;
    }
    setFile(selectedFile);
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const reportData = await analyzeResumeFile(file, jobDescription);
      setLoading(false);
      // Navigate to ATS Report with analysis results
      navigate('/ats-report', { state: { reportData } });
    } catch (err) {
      setLoading(false);
      setError(err.message || "An error occurred while analyzing the resume. Make sure the local backend server is running.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 px-4">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 sm:p-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <span className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-800 border border-blue-200/80 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
            AI-Powered Analysis
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] mt-3 mb-2">Upload Your Resume</h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Get instant feedback on ATS match score, skill gaps, grammatical errors, and formatting recommendations.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* PDF Drag and Drop Zone with #F0F9FF hover state */}
          <div 
            className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-200 cursor-pointer ${
              dragActive 
                ? "border-cyan-500 bg-[#F0F9FF] shadow-lg shadow-cyan-500/10 scale-[1.01]" 
                : "border-slate-300 bg-slate-50/60 hover:bg-[#F0F9FF] hover:border-cyan-400/80"
            } ${error ? "border-red-400 bg-red-50/50" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={onButtonClick}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleChange}
            />

            <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-600 rounded-2xl flex items-center justify-center mb-1 shadow-xs border border-blue-200/60">
                <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div className="text-base text-slate-700">
                <span className="font-bold text-blue-600 hover:underline">Click to upload</span> or drag & drop your PDF resume
              </div>
              <p className="text-xs text-slate-500 font-medium">PDF documents up to 10MB</p>
            </div>
          </div>

          {/* Selected File Preview Card */}
          {file && (
            <div className="mt-5 flex items-center justify-between p-4 bg-gradient-to-r from-blue-50/80 via-cyan-50/80 to-blue-50/80 border border-cyan-200 rounded-2xl shadow-sm">
              <div className="flex items-center space-x-3.5 truncate">
                <div className="p-2.5 bg-red-500 text-white rounded-xl shadow-xs">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-extrabold text-[#0F172A] truncate">{file.name}</p>
                    <span className="text-[11px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                      ✓ Ready for Analysis
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{(file.size / (1024 * 1024)).toFixed(2)} MB • PDF Document</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={(e) => { e.stopPropagation(); setFile(null); }}
                className="text-slate-400 hover:text-red-500 font-semibold text-xs px-3 py-1.5 rounded-lg border border-transparent hover:border-red-200 hover:bg-red-50 transition-all flex items-center gap-1 cursor-pointer"
                title="Remove file"
              >
                <span>Remove</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          )}

          {/* Target Job Description Input with Colored Focus Ring */}
          <div className="mt-6">
            <label className="block text-sm font-extrabold text-[#0F172A] mb-2">
              Target Job Description <span className="text-slate-400 font-normal text-xs">(Optional for targeted Skill Gap matching)</span>
            </label>
            <textarea
              rows={4}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here to check how well your resume matches required skills and job requirements..."
              className="w-full p-4 border border-slate-300 rounded-2xl shadow-xs focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-sm text-slate-800 placeholder-slate-400 bg-white transition-all"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl flex items-center gap-2 font-medium">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Primary Action Button (Gradient Blue to Cyan with Soft Shadow Glow) */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={!file || loading}
              className={`w-full flex items-center justify-center py-4 px-6 rounded-2xl font-extrabold text-lg text-white transition-all transform cursor-pointer ${
                file && !loading 
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:scale-98" 
                  : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
              }`}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Analyzing Resume...</span>
                </div>
              ) : (
                "Analyze Resume Now →"
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}