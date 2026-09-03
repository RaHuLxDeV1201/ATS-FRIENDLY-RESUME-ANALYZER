import { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';

// Sample Presets for 1-click loading
const PRESET_RESUMES = {
  software_engineer: {
    personal: {
      fullName: "Sangram Yadav",
      headline: "Full-Stack Software Engineer",
      email: "sangram.yadav@example.com",
      phone: "+1 (555) 234-5678",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/sangramyadav",
      github: "github.com/sangramyadav",
      portfolio: "sangram.dev"
    },
    summary: "Versatile and results-driven Software Engineer with 4+ years of experience architecting scalable web applications, microservices, and cloud solutions. Proficient in Python, JavaScript/TypeScript, React, FastAPI, and PostgreSQL with a strong commitment to clean code and ATS optimization.",
    skills: "JavaScript, TypeScript, Python, React.js, FastAPI, Node.js, Express, SQL, PostgreSQL, MongoDB, Redis, Docker, Kubernetes, AWS, Git, Tailwind CSS, System Design, CI/CD",
    experience: [
      {
        id: 1,
        company: "Tech Solutions Inc.",
        role: "Senior Software Engineer",
        dates: "2022 - Present",
        location: "San Francisco, CA",
        bullets: "• Spearheaded the development of core REST APIs using FastAPI and PostgreSQL, reducing latency by 35%.\n• Designed and maintained responsive React frontend components used by 100,000+ monthly active users.\n• Automated CI/CD deployment pipelines using Docker, GitHub Actions, and AWS ECS.\n• Mentored 3 junior engineers in code review practices and unit testing methodologies."
      },
      {
        id: 2,
        company: "Innovate Analytics",
        role: "Full-Stack Developer",
        dates: "2020 - 2022",
        location: "Austin, TX",
        bullets: "• Built real-time data visualization dashboards using React, Redux, and Node.js.\n• Refactored legacy monolithic backend services into containerized microservices.\n• Optimized database query execution speed, achieving a 40% reduction in database CPU utilization."
      }
    ],
    education: [
      {
        id: 1,
        school: "State University",
        degree: "B.S. in Computer Science",
        dates: "2016 - 2020",
        location: "Austin, TX",
        details: "Graduated with Honors (GPA: 3.8/4.0). Specialization in Software Engineering & Database Systems."
      }
    ],
    projects: [
      {
        id: 1,
        name: "ATS Resume Analyzer & Matcher",
        tech: "Python, FastAPI, React, PostgreSQL, Tailwind CSS",
        description: "Built an intelligent ATS resume analyzer that parses PDF text, extracts technical skills, calculates job match scores, and provides real-time grammar suggestions."
      }
    ]
  },
  data_engineer: {
    personal: {
      fullName: "Alex Morgan",
      headline: "Data & Machine Learning Engineer",
      email: "alex.morgan@email.com",
      phone: "+1 (555) 987-6543",
      location: "New York, NY",
      linkedin: "linkedin.com/in/alexmorgan",
      github: "github.com/alexmorgan-data",
      portfolio: "alexmorgan.ai"
    },
    summary: "Data & Machine Learning Engineer with 5+ years of experience constructing high-throughput ETL data pipelines, predictive ML models, and analytics platforms using Python, PyTorch, SQL, Spark, and AWS.",
    skills: "Python, SQL, PyTorch, TensorFlow, Pandas, NumPy, Scikit-Learn, Apache Spark, Airflow, Snowflake, AWS, Docker, Git, Tableau",
    experience: [
      {
        id: 1,
        company: "DataScale Analytics",
        role: "Lead Machine Learning Engineer",
        dates: "2021 - Present",
        location: "New York, NY",
        bullets: "• Designed and deployed scalable NLP pipelines processing 5M+ daily documents with 96% accuracy.\n• Engineered automated ETL workflows using Apache Airflow and Snowflake.\n• Reduced model training cycles by 50% by leveraging distributed PyTorch computing clusters on AWS."
      }
    ],
    education: [
      {
        id: 1,
        school: "Columbia University",
        degree: "M.S. in Data Science",
        dates: "2019 - 2021",
        location: "New York, NY",
        details: "Focus on Machine Learning, Statistical Inference, and Big Data Architecture."
      }
    ],
    projects: [
      {
        id: 1,
        name: "Predictive Customer Churn Model",
        tech: "Python, XGBoost, Scikit-Learn, AWS SageMaker",
        description: "Developed an enterprise customer retention model predicting churn risk with 92% precision."
      }
    ]
  }
};

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState(PRESET_RESUMES.software_engineer);
  const [templateStyle, setTemplateStyle] = useState("classic"); // 'classic', 'modern', 'minimal'
  const [activeTab, setActiveTab] = useState("personal");
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Personal Info Handler
  const handlePersonalChange = (e) => {
    setResumeData({
      ...resumeData,
      personal: { ...resumeData.personal, [e.target.name]: e.target.value }
    });
  };

  // Generic Field Handler
  const handleFieldChange = (field, value) => {
    setResumeData({ ...resumeData, [field]: value });
  };

  // Experience Handlers
  const handleExperienceChange = (id, key, value) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(item => 
        item.id === id ? { ...item, [key]: value } : item
      )
    });
  };

  const addExperience = () => {
    const newId = Date.now();
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        { id: newId, company: "New Company", role: "Software Developer", dates: "2023 - Present", location: "City, State", bullets: "• Accomplishment bullet point..." }
      ]
    });
  };

  const removeExperience = (id) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter(item => item.id !== id)
    });
  };

  // Education Handlers
  const handleEducationChange = (id, key, value) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map(item => 
        item.id === id ? { ...item, [key]: value } : item
      )
    });
  };

  const addEducation = () => {
    const newId = Date.now();
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        { id: newId, school: "University Name", degree: "B.S. Degree", dates: "2018 - 2022", location: "City, State", details: "Major coursework or honors..." }
      ]
    });
  };

  const removeEducation = (id) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter(item => item.id !== id)
    });
  };

  // Projects Handlers
  const handleProjectChange = (id, key, value) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.map(item => 
        item.id === id ? { ...item, [key]: value } : item
      )
    });
  };

  const addProject = () => {
    const newId = Date.now();
    setResumeData({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        { id: newId, name: "Project Title", tech: "React, Python, SQL", description: "Key achievements and metric impact..." }
      ]
    });
  };

  const removeProject = (id) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.filter(item => item.id !== id)
    });
  };

  // Print Handler
  const handlePrint = () => {
    window.print();
  };

  // Load Preset
  const handleLoadPreset = (key) => {
    if (PRESET_RESUMES[key]) {
      setResumeData(PRESET_RESUMES[key]);
      showToast(`Loaded ${key === 'software_engineer' ? 'Software Engineer' : 'Data Engineer'} sample`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-6 px-4 space-y-8 pb-12">
      {/* Print Stylesheet for flawless A4 output */}
      <style>{`
        @media print {
          nav, footer, .no-print, header { display: none !important; }
          main { padding: 0 !important; margin: 0 !important; max-width: 100% !important; }
          .print-area {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 20px !important;
            box-shadow: none !important;
            border: none !important;
          }
        }
      `}</style>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 animate-bounce">
          <span>✨</span> {toastMessage}
        </div>
      )}

      {/* Header Banner */}
      <div className="no-print bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              100% ATS Compliant Single-Column Format
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              ATS-Friendly Resume Builder
            </h1>
            <p className="text-blue-100/80 text-sm max-w-xl">
              Create clean, ATS-parser-approved resumes. Formatted with recruiter-trusted typography, clear section hierarchy, and zero parsing errors.
            </p>
          </div>

          {/* Export & Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => handleLoadPreset('software_engineer')} className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              📋 Load Sample Resume
            </Button>
            <Button size="lg" onClick={handlePrint} className="shadow-lg bg-emerald-600 hover:bg-emerald-700 text-white">
              🖨️ Print / Export PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Toolbar & Template Selector */}
      <div className="no-print bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Template Layout:</span>
          <div className="inline-flex p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setTemplateStyle("classic")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                templateStyle === "classic" ? "bg-white text-blue-700 shadow-xs" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Classic ATS Clean
            </button>
            <button
              onClick={() => setTemplateStyle("modern")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                templateStyle === "modern" ? "bg-white text-indigo-700 shadow-xs" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Modern Accent
            </button>
            <button
              onClick={() => setTemplateStyle("minimal")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                templateStyle === "minimal" ? "bg-white text-gray-900 shadow-xs" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Minimal Executive
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span>✔️ Standard Fonts</span>
          <span>•</span>
          <span>✔️ Bullet Point Formatting</span>
          <span>•</span>
          <span>✔️ No Tables / Columns Chaos</span>
        </div>
      </div>

      {/* Editor & Live Preview Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT PANEL: Form Editor Controls (5 cols) */}
        <div className="no-print lg:col-span-5 space-y-6">
          
          {/* Navigation Tabs */}
          <div className="flex flex-wrap border-b border-gray-200 gap-2">
            {[
              { id: "personal", label: "👤 Contact", icon: "👤" },
              { id: "summary", label: "📝 Summary", icon: "📝" },
              { id: "skills", label: "🛠️ Skills", icon: "🛠️" },
              { id: "experience", label: "💼 Work", icon: "💼" },
              { id: "education", label: "🎓 Education", icon: "🎓" },
              { id: "projects", label: "🚀 Projects", icon: "🚀" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 px-3 text-xs font-bold border-b-2 transition-all ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form Card Content */}
          <Card className="shadow-sm">
            {/* 1. Contact Info */}
            {activeTab === "personal" && (
              <div className="space-y-4 text-sm">
                <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">Personal Information</h3>
                
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={resumeData.personal.fullName}
                    onChange={handlePersonalChange}
                    placeholder="e.g. Sangram Yadav"
                    className="w-full p-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Professional Title / Headline</label>
                  <input
                    type="text"
                    name="headline"
                    value={resumeData.personal.headline}
                    onChange={handlePersonalChange}
                    placeholder="e.g. Senior Software Engineer"
                    className="w-full p-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={resumeData.personal.email}
                      onChange={handlePersonalChange}
                      placeholder="alex@example.com"
                      className="w-full p-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      value={resumeData.personal.phone}
                      onChange={handlePersonalChange}
                      placeholder="(555) 234-5678"
                      className="w-full p-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={resumeData.personal.location}
                      onChange={handlePersonalChange}
                      placeholder="San Francisco, CA"
                      className="w-full p-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">LinkedIn Profile</label>
                    <input
                      type="text"
                      name="linkedin"
                      value={resumeData.personal.linkedin}
                      onChange={handlePersonalChange}
                      placeholder="linkedin.com/in/sangram"
                      className="w-full p-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">GitHub Profile</label>
                    <input
                      type="text"
                      name="github"
                      value={resumeData.personal.github}
                      onChange={handlePersonalChange}
                      placeholder="github.com/sangram"
                      className="w-full p-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Portfolio / Website</label>
                    <input
                      type="text"
                      name="portfolio"
                      value={resumeData.personal.portfolio}
                      onChange={handlePersonalChange}
                      placeholder="sangram.dev"
                      className="w-full p-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 2. Professional Summary */}
            {activeTab === "summary" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900">Professional Summary</h3>
                  <span className="text-[11px] text-gray-500">2-4 high-impact sentences</span>
                </div>
                <textarea
                  rows={6}
                  value={resumeData.summary}
                  onChange={(e) => handleFieldChange("summary", e.target.value)}
                  placeholder="Summarize your years of experience, core technical stack, key achievements, and domain expertise..."
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm leading-relaxed focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
                <p className="text-[11px] text-gray-500 italic">
                  💡 ATS Tip: Include key title terms (e.g. "Software Engineer", "Full-Stack") and main technologies early in your summary.
                </p>
              </div>
            )}

            {/* 3. Technical Skills */}
            {activeTab === "skills" && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-900">Technical Skills</h3>
                <label className="block text-xs text-gray-600">Enter comma-separated skills (or group by category)</label>
                <textarea
                  rows={5}
                  value={resumeData.skills}
                  onChange={(e) => handleFieldChange("skills", e.target.value)}
                  placeholder="JavaScript, TypeScript, Python, React, FastAPI, PostgreSQL, Docker, AWS, Git..."
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm leading-relaxed focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            )}

            {/* 4. Work Experience */}
            {activeTab === "experience" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <h3 className="text-sm font-bold text-gray-900">Work Experience</h3>
                  <Button size="sm" variant="outline" onClick={addExperience}>+ Add Experience</Button>
                </div>

                {resumeData.experience.map((exp, idx) => (
                  <div key={exp.id} className="p-4 bg-gray-50/70 border border-gray-200 rounded-xl space-y-3 relative group">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-700">Role #{idx + 1}</span>
                      {resumeData.experience.length > 1 && (
                        <button onClick={() => removeExperience(exp.id)} className="text-xs text-rose-600 hover:text-rose-800 font-semibold">
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-600">Company Name</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(exp.id, "company", e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-600">Job Title</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => handleExperienceChange(exp.id, "role", e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-600">Dates (e.g., 2022 - Present)</label>
                        <input
                          type="text"
                          value={exp.dates}
                          onChange={(e) => handleExperienceChange(exp.id, "dates", e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-600">Location</label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => handleExperienceChange(exp.id, "location", e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600">Accomplishment Bullets</label>
                      <textarea
                        rows={4}
                        value={exp.bullets}
                        onChange={(e) => handleExperienceChange(exp.id, "bullets", e.target.value)}
                        placeholder="• Bullet point starting with strong action verb..."
                        className="w-full p-2 border border-gray-300 rounded-lg text-xs leading-relaxed font-sans"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 5. Education */}
            {activeTab === "education" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <h3 className="text-sm font-bold text-gray-900">Education</h3>
                  <Button size="sm" variant="outline" onClick={addEducation}>+ Add Education</Button>
                </div>

                {resumeData.education.map((edu, idx) => (
                  <div key={edu.id} className="p-4 bg-gray-50/70 border border-gray-200 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-700">School #{idx + 1}</span>
                      {resumeData.education.length > 1 && (
                        <button onClick={() => removeEducation(edu.id)} className="text-xs text-rose-600 hover:text-rose-800 font-semibold">
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-600">Institution / University</label>
                        <input
                          type="text"
                          value={edu.school}
                          onChange={(e) => handleEducationChange(edu.id, "school", e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-600">Degree & Major</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => handleEducationChange(edu.id, "degree", e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-600">Dates (e.g. 2018 - 2022)</label>
                        <input
                          type="text"
                          value={edu.dates}
                          onChange={(e) => handleEducationChange(edu.id, "dates", e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-600">Location</label>
                        <input
                          type="text"
                          value={edu.location}
                          onChange={(e) => handleEducationChange(edu.id, "location", e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 6. Key Projects */}
            {activeTab === "projects" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <h3 className="text-sm font-bold text-gray-900">Key Projects</h3>
                  <Button size="sm" variant="outline" onClick={addProject}>+ Add Project</Button>
                </div>

                {resumeData.projects.map((proj, idx) => (
                  <div key={proj.id} className="p-4 bg-gray-50/70 border border-gray-200 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-700">Project #{idx + 1}</span>
                      <button onClick={() => removeProject(proj.id)} className="text-xs text-rose-600 hover:text-rose-800 font-semibold">
                        Remove
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600">Project Name</label>
                      <input
                        type="text"
                        value={proj.name}
                        onChange={(e) => handleProjectChange(proj.id, "name", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600">Technologies Used</label>
                      <input
                        type="text"
                        value={proj.tech}
                        onChange={(e) => handleProjectChange(proj.id, "tech", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600">Description / Highlights</label>
                      <textarea
                        rows={3}
                        value={proj.description}
                        onChange={(e) => handleProjectChange(proj.id, "description", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg text-xs leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* RIGHT PANEL: Live A4 Resume Paper Preview (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-gray-100/80 p-4 sm:p-8 rounded-3xl border border-gray-200/80 shadow-inner flex flex-col items-center">
            
            {/* Preview Toolbar */}
            <div className="no-print w-full flex items-center justify-between mb-4 px-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                Live ATS Resume Preview
              </span>
              <button 
                onClick={handlePrint}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 bg-white hover:bg-blue-50 border border-gray-300 px-3 py-1.5 rounded-lg shadow-xs transition-colors"
              >
                🖨️ Export PDF
              </button>
            </div>

            {/* Physical Resume Document Page */}
            <div 
              id="resume-preview-document"
              className={`print-area w-full bg-white p-8 sm:p-12 shadow-2xl rounded-sm border border-gray-200 text-gray-900 text-sm font-sans space-y-5 min-h-[800px] max-w-[794px] transition-all ${
                templateStyle === 'modern' ? 'border-t-8 border-t-indigo-600' : ''
              }`}
            >
              {/* Header Contact Block */}
              <div className={`border-b pb-4 text-center ${templateStyle === 'modern' ? 'border-indigo-100' : 'border-gray-300'}`}>
                <h1 className={`text-2xl sm:text-3xl font-extrabold uppercase tracking-wider ${
                  templateStyle === 'modern' ? 'text-indigo-950' : 'text-gray-900'
                }`}>
                  {resumeData.personal.fullName || "Your Full Name"}
                </h1>
                
                {resumeData.personal.headline && (
                  <div className={`text-xs font-bold mt-1 uppercase tracking-wide ${
                    templateStyle === 'modern' ? 'text-indigo-600' : 'text-gray-600'
                  }`}>
                    {resumeData.personal.headline}
                  </div>
                )}

                <div className="text-xs text-gray-600 mt-2 flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
                  {resumeData.personal.email && <span>{resumeData.personal.email}</span>}
                  {resumeData.personal.phone && <span>| {resumeData.personal.phone}</span>}
                  {resumeData.personal.location && <span>| {resumeData.personal.location}</span>}
                  {resumeData.personal.linkedin && <span>| {resumeData.personal.linkedin}</span>}
                  {resumeData.personal.github && <span>| {resumeData.personal.github}</span>}
                  {resumeData.personal.portfolio && <span>| {resumeData.personal.portfolio}</span>}
                </div>
              </div>

              {/* Professional Summary */}
              {resumeData.summary && (
                <div className="space-y-1">
                  <h2 className={`font-bold border-b text-xs uppercase tracking-wider pb-0.5 mb-1.5 ${
                    templateStyle === 'modern' ? 'text-indigo-900 border-indigo-200' : 
                    templateStyle === 'minimal' ? 'text-gray-900 border-gray-900' : 'text-blue-900 border-gray-300'
                  }`}>
                    Professional Summary
                  </h2>
                  <p className="text-xs text-gray-800 leading-relaxed font-sans">{resumeData.summary}</p>
                </div>
              )}

              {/* Technical Skills */}
              {resumeData.skills && (
                <div className="space-y-1">
                  <h2 className={`font-bold border-b text-xs uppercase tracking-wider pb-0.5 mb-1.5 ${
                    templateStyle === 'modern' ? 'text-indigo-900 border-indigo-200' : 
                    templateStyle === 'minimal' ? 'text-gray-900 border-gray-900' : 'text-blue-900 border-gray-300'
                  }`}>
                    Technical Skills
                  </h2>
                  <p className="text-xs text-gray-800 leading-normal font-sans">{resumeData.skills}</p>
                </div>
              )}

              {/* Work Experience */}
              {resumeData.experience && resumeData.experience.length > 0 && (
                <div className="space-y-3">
                  <h2 className={`font-bold border-b text-xs uppercase tracking-wider pb-0.5 mb-1.5 ${
                    templateStyle === 'modern' ? 'text-indigo-900 border-indigo-200' : 
                    templateStyle === 'minimal' ? 'text-gray-900 border-gray-900' : 'text-blue-900 border-gray-300'
                  }`}>
                    Work Experience
                  </h2>
                  
                  {resumeData.experience.map((exp) => (
                    <div key={exp.id} className="space-y-1 text-xs">
                      <div className="flex flex-wrap justify-between items-baseline font-bold text-gray-900">
                        <span>{exp.role} — <span className="font-semibold text-gray-700">{exp.company}</span></span>
                        <span className="text-gray-600 font-medium text-[11px]">{exp.dates} {exp.location ? `| ${exp.location}` : ''}</span>
                      </div>
                      <pre className="text-xs font-sans text-gray-800 whitespace-pre-line leading-relaxed pl-1">{exp.bullets}</pre>
                    </div>
                  ))}
                </div>
              )}

              {/* Key Projects */}
              {resumeData.projects && resumeData.projects.length > 0 && (
                <div className="space-y-2">
                  <h2 className={`font-bold border-b text-xs uppercase tracking-wider pb-0.5 mb-1.5 ${
                    templateStyle === 'modern' ? 'text-indigo-900 border-indigo-200' : 
                    templateStyle === 'minimal' ? 'text-gray-900 border-gray-900' : 'text-blue-900 border-gray-300'
                  }`}>
                    Key Projects
                  </h2>

                  {resumeData.projects.map((proj) => (
                    <div key={proj.id} className="text-xs space-y-0.5">
                      <div className="flex justify-between font-bold text-gray-900">
                        <span>{proj.name}</span>
                        {proj.tech && <span className="font-mono text-[10px] text-gray-500 font-normal">[{proj.tech}]</span>}
                      </div>
                      <p className="text-xs text-gray-700 leading-normal">{proj.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Education */}
              {resumeData.education && resumeData.education.length > 0 && (
                <div className="space-y-2">
                  <h2 className={`font-bold border-b text-xs uppercase tracking-wider pb-0.5 mb-1.5 ${
                    templateStyle === 'modern' ? 'text-indigo-900 border-indigo-200' : 
                    templateStyle === 'minimal' ? 'text-gray-900 border-gray-900' : 'text-blue-900 border-gray-300'
                  }`}>
                    Education
                  </h2>

                  {resumeData.education.map((edu) => (
                    <div key={edu.id} className="text-xs space-y-0.5">
                      <div className="flex justify-between font-bold text-gray-900">
                        <span>{edu.degree} — <span className="font-semibold text-gray-700">{edu.school}</span></span>
                        <span className="text-gray-600 font-medium text-[11px]">{edu.dates} {edu.location ? `| ${edu.location}` : ''}</span>
                      </div>
                      {edu.details && <p className="text-xs text-gray-600">{edu.details}</p>}
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

