const API_BASE_URL = typeof window !== 'undefined' && window.location.hostname === "localhost"
  ? "http://localhost:8000"
  : "";

/**
 * Register a new user
 */
export async function registerUser(fullName, email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ full_name: fullName, email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Registration failed.");
  }

  return await response.json();
}

/**
 * Login user
 */
export async function loginUser(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Invalid email or password.");
  }

  return await response.json();
}

/**
 * Upload PDF resume and perform ATS analysis with optional Job Description
 */
export async function analyzeResumeFile(file, jobDescription = "") {
  const formData = new FormData();
  formData.append("file", file);
  if (jobDescription) {
    formData.append("job_description", jobDescription);
  }

  const response = await fetch(`${API_BASE_URL}/ats/analyze-file`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Failed to analyze resume PDF.");
  }

  return await response.json();
}

/**
 * Fetch ATS report by resume ID
 */
export async function getATSReport(resumeId) {
  const response = await fetch(`${API_BASE_URL}/ats/report/${resumeId}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Failed to fetch ATS report.");
  }

  return await response.json();
}

/**
 * Health check for backend
 */
export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    return response.ok;
  } catch (error) {
    return false;
  }
}
