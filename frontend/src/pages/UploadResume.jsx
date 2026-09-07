import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UploadResume() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle dropped files
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Handle files selected via the browse button
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // Validate and set the file
  const handleFile = (selectedFile) => {
    setError("");
    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a valid PDF document.");
      setFile(null);
      return;
    }
    setFile(selectedFile);
  };

  // Trigger the hidden input when clicking the drag zone
  const onButtonClick = () => {
    inputRef.current.click();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    // TODO: Phase 4 - Send file to backend API
    console.log("Submitting file:", file.name);
    alert("File ready for upload! We will connect this to the backend API next.");
    
    // navigate('/ats-report'); // We'll uncomment this later
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Optimize Your Resume</h1>
          <p className="text-gray-500">Upload your resume in PDF format to get an instant ATS compatibility score and actionable feedback.</p>
        </div>

        <form onSubmit={handleSubmit} onDragEnter={handleDrag}>
          {/* Drag and Drop Zone */}
          <div 
            className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer
              ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"}
              ${error ? "border-red-400 bg-red-50" : ""}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={onButtonClick}
          >
            {/* Hidden file input */}
            <input
              ref={inputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleChange}
            />

            <div className="flex flex-col items-center justify-center space-y-4 pointer-events-none">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <div className="text-lg text-gray-700">
                <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
              </div>
              <p className="text-sm text-gray-500">PDF up to 5MB</p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 text-sm text-red-600 text-center bg-red-50 py-2 rounded-md">
              {error}
            </div>
          )}

          {/* Selected File Display */}
          {file && (
            <div className="mt-6 flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3 truncate">
                <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-gray-900 truncate">{file.name}</span>
              </div>
              <button 
                type="button" 
                onClick={() => setFile(null)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={!file}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors
                ${file ? "bg-blue-600 hover:bg-blue-700 cursor-pointer" : "bg-gray-300 cursor-not-allowed"}
              `}
            >
              Analyze Resume
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}