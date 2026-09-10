import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy-loaded Pages for Core Web Vitals optimization
const Home = lazy(() => import('./pages/Home'));
const UploadResume = lazy(() => import('./pages/UploadResume'));
const ATSReport = lazy(() => import('./pages/ATSReport'));
const GrammarChecker = lazy(() => import('./pages/GrammarChecker'));
const JobMatch = lazy(() => import('./pages/JobMatch'));
const ResumeBuilder = lazy(() => import('./pages/ResumeBuilder'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]" aria-live="polite">
    <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
    <span className="sr-only">Loading page...</span>
  </div>
);

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-gray-900 font-sans">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<UploadResume />} />
            <Route path="/ats-report" element={<ATSReport />} />
            <Route path="/ats-report/:id" element={<ATSReport />} />
            <Route path="/grammar" element={<GrammarChecker />} />
            <Route path="/job-match" element={<JobMatch />} />
            <Route path="/builder" element={<ResumeBuilder />} />
            <Route path="/dashboard" element={<UploadResume />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default App;