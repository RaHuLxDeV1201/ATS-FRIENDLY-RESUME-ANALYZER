import { Routes, Route } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import UploadResume from './pages/UploadResume';
import ATSReport from './pages/ATSReport';
import GrammarChecker from './pages/GrammarChecker';
import JobMatch from './pages/JobMatch';
import ResumeBuilder from './pages/ResumeBuilder';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-gray-900 font-sans">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-6">
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
      </main>

      <Footer />
    </div>
  );
}

export default App;