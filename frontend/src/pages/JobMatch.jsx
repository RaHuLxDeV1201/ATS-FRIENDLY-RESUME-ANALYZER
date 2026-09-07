import { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';

// Rich taxonomy of skills categorized by domain
const SKILL_TAXONOMY = {
  frontend: [
    "react", "react.js", "typescript", "javascript", "next.js", "vue", "vue.js", "angular",
    "tailwind", "tailwindcss", "html", "html5", "css", "css3", "redux", "sass", "webpack", "vite"
  ],
  backend: [
    "node", "node.js", "express", "express.js", "python", "fastapi", "django", "flask",
    "java", "spring boot", "c#", ".net", "go", "golang", "ruby", "php", "graphql", "rest api", "microservices"
  ],
  databases: [
    "postgresql", "postgres", "mysql", "mongodb", "sqlite", "redis", "elasticsearch", "dynamodb", "sql"
  ],
  cloud_devops: [
    "aws", "azure", "gcp", "docker", "kubernetes", "terraform", "ci/cd", "git", "github",
    "gitlab", "nginx", "linux", "bash"
  ],
  data_ai: [
    "machine learning", "deep learning", "pandas", "numpy", "scikit-learn", "tensorflow",
    "pytorch", "opencv", "nlp", "power bi", "tableau", "spark", "r"
  ],
  practices_soft: [
    "agile", "scrum", "jira", "unit testing", "jest", "pytest", "cypress", "system design",
    "oop", "data structures", "algorithms", "leadership", "code review", "communication"
  ]
};

// Preset Job Descriptions for quick 1-click testing
const PRESET_JDS = [
  {
    label: "Frontend React Engineer",
    icon: "🎨",
    title: "Senior React / TypeScript Developer",
    text: `We are looking for a Senior Frontend Developer proficient in React, TypeScript, Tailwind CSS, and Next.js.
Key Requirements:
- 3+ years of experience with React, TypeScript, and state management (Redux/Zustand).
- Deep knowledge of modern CSS frameworks including Tailwind CSS and SASS.
- Hands-on experience with REST APIs, GraphQL, and performance optimization.
- Familiarity with Unit Testing (Jest, React Testing Library), Git, and CI/CD pipelines.
- Agile / Scrum methodology background with strong communication skills.`
  },
  {
    label: "Full-Stack Developer",
    icon: "🚀",
    title: "Full-Stack Software Engineer (Python & React)",
    text: `Seeking a versatile Full-Stack Engineer with strong Python and modern JavaScript skills.
Key Requirements:
- Backend expertise in Python, FastAPI, Django, or Node.js with REST API design.
- Frontend proficiency in React.js, TypeScript, HTML5, and CSS3.
- Database experience with PostgreSQL, MySQL, and Redis caching.
- Cloud deployment experience using AWS, Docker, Kubernetes, and GitHub Actions CI/CD.
- Solid understanding of System Design, Unit Testing (pytest/jest), and Agile workflows.`
  },
  {
    label: "Backend & Cloud Engineer",
    icon: "⚡",
    title: "Backend Platform Engineer",
    text: `Looking for a Backend Platform Engineer to build scalable microservices.
Key Requirements:
- Strong core foundation in Java (Spring Boot) or Python / Go.
- Expertise in Microservices architecture, REST APIs, and System Design.
- Heavy experience with PostgreSQL, Redis, MongoDB, and SQL query optimization.
- Hands-on DevOps experience with Docker, Kubernetes, Terraform, AWS, and Linux.
- Background in OOP, Data Structures, Algorithms, and Agile development.`
  },
  {
    label: "AI / Data Engineer",
    icon: "🧠",
    title: "Data & Machine Learning Engineer",
    text: `Hiring a Data Engineer to develop AI pipelines and data analytics solutions.
Key Requirements:
- Proficient in Python, SQL, R, and Data Structures.
- Hands-on experience with Pandas, NumPy, Scikit-learn, PyTorch, or TensorFlow.
- Experience building Machine Learning models, NLP pipelines, and Data Visualization dashboards (Tableau/Power BI).
- Knowledge of Docker, AWS, Git, and Linux server environments.`
  }
];

// Sample Resume Text
const SAMPLE_RESUME = `RUPAL CHAUDHARY
Full-Stack Software Engineer | rupal@example.com | github.com/rupal | linkedin.com/in/rupal

SUMMARY
Results-driven Full-Stack Engineer with experience building scalable web applications using Python, FastAPI, JavaScript, React, and PostgreSQL. Passionate about clean code, UI design, and automated testing.

TECHNICAL SKILLS
• Languages: Python, JavaScript, TypeScript, SQL, HTML5, CSS3
• Frontend: React, Tailwind CSS, Redux, Next.js, Vite
• Backend & APIs: Node.js, Express, FastAPI, Django, REST APIs, GraphQL
• Databases & Cloud: PostgreSQL, MongoDB, Redis, SQLite, Docker, AWS, Git, CI/CD
• Practices: Agile, Scrum, Unit Testing (Jest, Pytest), System Design, OOP

PROJECTS & EXPERIENCE
Full-Stack Web Developer
- Engineered ATS Resume Analyzer using React, FastAPI, Python, and PostgreSQL.
- Implemented real-time skill matching algorithms reducing job application review time by 40%.
- Deployed multi-container architecture using Docker, Nginx, and GitHub Actions CI/CD.
- Created responsive user interfaces with Tailwind CSS and modern React components.`;

export default function JobMatch() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleMatch = () => {
    if (!resumeText.trim() || !jobDescription.trim()) return;

    const rLower = resumeText.toLowerCase();
    const jLower = jobDescription.toLowerCase();

    // Flatten all taxonomy skills
    const allKnownSkills = Object.values(SKILL_TAXONOMY).flat();
    
    // Find skills mentioned in JD
    const jdDetectedSkills = allKnownSkills.filter(s => {
      const regex = new RegExp(`\\b${s.replace('.', '\\.')}\\b`, 'i');
      return regex.test(jLower);
    });

    // Remove duplicates normalized
    const uniqueJdSkills = Array.from(new Set(jdDetectedSkills));

    // Evaluate matches & missing
    const matchedSkills = [];
    const missingSkills = [];
    const resumeSkills = [];

    uniqueJdSkills.forEach(skill => {
      const regex = new RegExp(`\\b${skill.replace('.', '\\.')}\\b`, 'i');
      if (regex.test(rLower)) {
        matchedSkills.push(skill);
      } else {
        missingSkills.push(skill);
      }
    });

    // Find bonus skills in resume not in JD
    allKnownSkills.forEach(skill => {
      const regex = new RegExp(`\\b${skill.replace('.', '\\.')}\\b`, 'i');
      if (regex.test(rLower) && !uniqueJdSkills.includes(skill)) {
        if (!resumeSkills.includes(skill)) resumeSkills.push(skill);
      }
    });

    // Domain breakdown scores
    const categoryScores = {};
    Object.keys(SKILL_TAXONOMY).forEach(cat => {
      const catSkillsInJd = uniqueJdSkills.filter(s => SKILL_TAXONOMY[cat].includes(s));
      if (catSkillsInJd.length > 0) {
        const catMatched = catSkillsInJd.filter(s => matchedSkills.includes(s));
        categoryScores[cat] = Math.round((catMatched.length / catSkillsInJd.length) * 100);
      } else {
        categoryScores[cat] = null; // No requirements in this category
      }
    });

    // Overall Score
    const overallScore = uniqueJdSkills.length > 0 
      ? Math.round((matchedSkills.length / uniqueJdSkills.length) * 100)
      : 80;

    // Formatting display skill names
    const formatSkill = (s) => {
      if (s === "aws") return "AWS";
      if (s === "gcp") return "GCP";
      if (s === "ci/cd") return "CI/CD";
      if (s === "sql") return "SQL";
      if (s === "html" || s === "html5") return "HTML5";
      if (s === "css" || s === "css3") return "CSS3";
      if (s === "nlp") return "NLP";
      if (s === "oop") return "OOP";
      if (s === "ui/ux") return "UI/UX";
      if (s === "rest api") return "REST APIs";
      return s.charAt(0).toUpperCase() + s.slice(1);
    };

    setResult({
      score: overallScore,
      totalJdSkills: uniqueJdSkills.length,
      matched: matchedSkills.map(formatSkill),
      missing: missingSkills.map(formatSkill),
      bonus: resumeSkills.slice(0, 8).map(formatSkill),
      categoryScores
    });

    setActiveTab("overview");
  };

  const handleClear = () => {
    setResumeText("");
    setJobDescription("");
    setResult(null);
    showToast("Cleared inputs");
  };

  const handleLoadSampleResume = () => {
    setResumeText(SAMPLE_RESUME);
    showToast("Loaded sample resume text");
  };

  const handleSelectPresetJd = (preset) => {
    setJobDescription(preset.text);
    showToast(`Loaded "${preset.label}" JD`);
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    showToast("Copied to clipboard!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Word count helpers
  const getWordCount = (str) => str.trim() ? str.trim().split(/\s+/).length : 0;

  // Grade color and badge text
  const getGradeInfo = (score) => {
    if (score >= 85) return { label: "Excellent Match", bg: "bg-emerald-500", text: "text-emerald-700", border: "border-emerald-200", badgeBg: "bg-emerald-100" };
    if (score >= 70) return { label: "Strong Fit", bg: "bg-blue-600", text: "text-blue-700", border: "border-blue-200", badgeBg: "bg-blue-100" };
    if (score >= 50) return { label: "Moderate Gap", bg: "bg-amber-500", text: "text-amber-700", border: "border-amber-200", badgeBg: "bg-amber-100" };
    return { label: "High Skill Gap", bg: "bg-rose-500", text: "text-rose-700", border: "border-rose-200", badgeBg: "bg-rose-100" };
  };

  return (
    <div className="max-w-6xl mx-auto my-6 px-4 space-y-8 pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 animate-bounce">
          <span>✨</span> {toastMessage}
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wide">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            Job Match Engine 2.0
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Job Description Skill Match Analyzer
          </h1>
          <p className="text-blue-100/80 text-sm max-w-2xl leading-relaxed">
            Compare your resume text against any target job description. Instantly identify exact matching skills, missing keywords, domain alignment, and tailored bullet point suggestions to optimize your ATS score.
          </p>
        </div>
      </div>

      {/* Quick Action Presets Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Quick Load Sample Job Descriptions:
          </span>
          <button 
            onClick={handleLoadSampleResume} 
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors border border-blue-200/60"
          >
            📋 Load Sample Resume
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {PRESET_JDS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPresetJd(preset)}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-200/80 bg-gray-50/50 hover:bg-blue-50/70 hover:border-blue-300 text-left transition-all group"
            >
              <span className="text-lg">{preset.icon}</span>
              <div className="truncate">
                <div className="text-xs font-bold text-gray-800 group-hover:text-blue-700 truncate">
                  {preset.label}
                </div>
                <div className="text-[10px] text-gray-400 truncate">{preset.title}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Inputs Workspace Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Resume Input Panel */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5 space-y-3 flex flex-col focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                📄
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">Your Resume Content</h3>
                <p className="text-[11px] text-gray-500">Paste your resume text or bullet points</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
              {getWordCount(resumeText)} words
            </span>
          </div>

          <textarea
            rows={12}
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume text here (e.g. Summary, Experience, Technical Skills, Education)..."
            className="w-full p-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-0 text-sm text-gray-800 placeholder-gray-400 font-sans resize-y leading-relaxed bg-gray-50/30"
          />

          <div className="flex justify-between items-center text-xs text-gray-400 pt-1">
            <span>Character count: {resumeText.length}</span>
            {resumeText && (
              <button 
                onClick={() => setResumeText("")}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                Clear Resume
              </button>
            )}
          </div>
        </div>

        {/* Job Description Input Panel */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5 space-y-3 flex flex-col focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                💼
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">Target Job Description</h3>
                <p className="text-[11px] text-gray-500">Paste the job posting requirements</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
              {getWordCount(jobDescription)} words
            </span>
          </div>

          <textarea
            rows={12}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the target job description or requirements here..."
            className="w-full p-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-0 text-sm text-gray-800 placeholder-gray-400 font-sans resize-y leading-relaxed bg-gray-50/30"
          />

          <div className="flex justify-between items-center text-xs text-gray-400 pt-1">
            <span>Character count: {jobDescription.length}</span>
            {jobDescription && (
              <button 
                onClick={() => setJobDescription("")}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                Clear Job Description
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="text-xs text-gray-500 text-center sm:text-left">
          💡 <span className="font-semibold">Pro-tip:</span> Paste complete job posts to analyze skill frequencies and exact ATS keyword phrasing.
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button 
            variant="outline"
            onClick={handleClear}
            disabled={!resumeText && !jobDescription}
            className="w-1/2 sm:w-auto"
          >
            Reset All
          </Button>
          <Button 
            onClick={handleMatch} 
            disabled={!resumeText.trim() || !jobDescription.trim()}
            className="w-1/2 sm:w-auto shadow-md"
            size="lg"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Calculate Skill Match
            </span>
          </Button>
        </div>
      </div>

      {/* Analysis Results Display */}
      {result && (
        <div className="space-y-6 animate-fadeIn">
          {/* Result Card Top Banner */}
          <Card className="border-t-4 border-t-blue-600 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Score Circular Metric */}
              <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-gray-100 text-center space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-gray-500">Overall Match Score</span>
                <div className="relative inline-flex items-center justify-center">
                  <div className={`text-5xl font-black ${getGradeInfo(result.score).text}`}>
                    {result.score}%
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getGradeInfo(result.score).badgeBg} ${getGradeInfo(result.score).text} border ${getGradeInfo(result.score).border}`}>
                  {getGradeInfo(result.score).label}
                </span>
              </div>

              {/* Match Details Summary */}
              <div className="md:col-span-2 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
                  <h3 className="text-lg font-bold text-gray-900">Skill Gap & Compatibility Summary</h3>
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {result.matched.length} of {result.totalJdSkills} Skills Matched
                  </span>
                </div>

                <ProgressBar 
                  label="Match Level Progress" 
                  percentage={result.score} 
                  color={result.score >= 80 ? 'emerald' : result.score >= 60 ? 'blue' : 'amber'} 
                />

                <div className="grid grid-cols-3 gap-3 text-center pt-2">
                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
                    <div className="text-xl font-bold text-emerald-700">{result.matched.length}</div>
                    <div className="text-[11px] font-semibold text-emerald-800">Matched Skills</div>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-100">
                    <div className="text-xl font-bold text-rose-700">{result.missing.length}</div>
                    <div className="text-[11px] font-semibold text-rose-800">Missing Gaps</div>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100">
                    <div className="text-xl font-bold text-purple-700">{result.bonus.length}</div>
                    <div className="text-[11px] font-semibold text-purple-800">Bonus Skills</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Result Navigation Tabs */}
          <div className="flex border-b border-gray-200 gap-4">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === "overview"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <span>📊</span> Skill Gap Matrix
            </button>
            <button
              onClick={() => setActiveTab("categories")}
              className={`pb-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === "categories"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <span>🎯</span> Domain Breakdown
            </button>
            <button
              onClick={() => setActiveTab("suggestions")}
              className={`pb-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === "suggestions"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <span>💡</span> ATS Bullet Suggestions
            </button>
          </div>

          {/* TAB 1: Skill Matrix */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Matched Skills */}
              <Card title="Matched Skills in Resume" subtitle="Keywords successfully found in your resume text">
                {result.matched.length > 0 ? (
                  <div className="flex flex-wrap gap-2.5">
                    {result.matched.map((skill, idx) => (
                      <span 
                        key={idx} 
                        className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-3 py-1.5 rounded-xl text-xs font-bold shadow-xs hover:bg-emerald-100 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">No exact skill matches found. Try adding key technologies from the job post.</p>
                )}
              </Card>

              {/* Missing Skills */}
              <Card title="Missing Skills / Skill Gap" subtitle="Critical requirements from the job description not detected in your resume">
                {result.missing.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2.5">
                      {result.missing.map((skill, idx) => (
                        <span 
                          key={idx} 
                          className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-800 border border-rose-200/80 px-3 py-1.5 rounded-xl text-xs font-bold shadow-xs hover:bg-rose-100 transition-colors"
                        >
                          <svg className="w-3.5 h-3.5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          + Add {skill}
                        </span>
                      ))}
                    </div>
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 text-xs text-amber-800">
                      📌 <span className="font-bold">ATS Optimization Tip:</span> Incorporate these missing terms naturally into your work experience bullet points or Technical Skills section to improve recruiter search rankings.
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2">
                    🎉 Excellent work! Your resume covers all key skill requirements identified in the job description!
                  </div>
                )}
              </Card>

              {/* Bonus Skills */}
              {result.bonus.length > 0 && (
                <Card title="Bonus & Additional Resume Skills" subtitle="Skills present in your resume that add value beyond the explicit JD requirements">
                  <div className="flex flex-wrap gap-2">
                    {result.bonus.map((skill, idx) => (
                      <span key={idx} className="bg-purple-50 text-purple-700 border border-purple-200/80 px-3 py-1 rounded-xl text-xs font-semibold">
                        ✦ {skill}
                      </span>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* TAB 2: Domain Breakdown */}
          {activeTab === "categories" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(result.categoryScores).map(([category, score]) => {
                if (score === null) return null;
                const catTitles = {
                  frontend: "Frontend Technologies",
                  backend: "Backend & API Architecture",
                  databases: "Databases & Storage",
                  cloud_devops: "Cloud, DevOps & Tooling",
                  data_ai: "Data Science & AI",
                  practices_soft: "Practices & Soft Skills"
                };

                return (
                  <div key={category} className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-900">{catTitles[category] || category}</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                        {score}% Match
                      </span>
                    </div>
                    <ProgressBar percentage={score} color={score >= 80 ? 'emerald' : score >= 50 ? 'blue' : 'amber'} showPercentage={false} />
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 3: AI Bullet Points Suggestions */}
          {activeTab === "suggestions" && (
            <Card title="Tailored Resume Improvement Bullet Points" subtitle="Copy & adapt these ATS-optimized accomplishment statements incorporating your missing skills">
              {result.missing.length > 0 ? (
                <div className="space-y-3">
                  {result.missing.slice(0, 5).map((skill, idx) => {
                    const bulletTemplates = [
                      `Utilized ${skill} to streamline development workflows, improving project delivery efficiency by 25%.`,
                      `Designed and deployed robust software features leveraging ${skill} best practices within an Agile team environment.`,
                      `Integrated ${skill} into core application architecture, enhancing system performance and reliability.`,
                      `Collaborated cross-functionally to implement ${skill} solutions adhering to industry standards.`,
                      `Optimized existing backend/frontend pipelines by introducing ${skill}, reducing latency and execution overhead.`
                    ];
                    const bullet = bulletTemplates[idx % bulletTemplates.length];

                    return (
                      <div key={idx} className="p-4 bg-gray-50 hover:bg-blue-50/50 rounded-xl border border-gray-200/80 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="text-xs font-bold text-blue-700 uppercase tracking-wide">
                            Target Keyword: {skill}
                          </div>
                          <p className="text-sm text-gray-800 font-medium">"{bullet}"</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(bullet, idx)}
                          className="shrink-0 px-3 py-1.5 bg-white border border-gray-200 hover:border-blue-300 text-xs font-semibold text-gray-700 hover:text-blue-700 rounded-lg shadow-xs transition-all flex items-center gap-1.5"
                        >
                          {copiedIndex === idx ? "✓ Copied" : "📋 Copy"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 bg-emerald-50 rounded-xl text-emerald-800 text-sm font-semibold">
                  Your resume already contains all required skill keywords! You can focus on showcasing quantifiable metrics and results.
                </div>
              )}
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

