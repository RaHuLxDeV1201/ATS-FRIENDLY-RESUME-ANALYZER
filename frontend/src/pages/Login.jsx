import React, { useState } from "react";
import "./login.css"; // Aapki CSS file yahan import hogi

export default function NavireqLogin() {
  // 1. Script.js ke variables yahan React State ban gaye hain
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Error aur success messages ke liye state
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [formMessage, setFormMessage] = useState({ text: "", color: "" });

  // 2. Toggle Password ka function
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // 3. Form Submit hone ka function (JS ka addEventListener('submit'))
  const handleSubmit = (event) => {
    event.preventDefault(); // Page refresh rokne ke liye

    // Puraane errors clear karo
    let currentErrors = { email: "", password: "" };
    let hasError = false;

    // Validation logic (trim karke check karna)
    if (email.trim() === "") {
      currentErrors.email = "Please enter your email or phone.";
      hasError = true;
    }

    if (password.trim() === "") {
      currentErrors.password = "Please enter your password.";
      hasError = true;
    }

    // Agar error hai toh set karo, warna success message dikhao
    if (hasError) {
      setErrors(currentErrors);
      setFormMessage({ text: "Please fix the errors above.", color: "#c92a2a" });
      return;
    }

    // Agar sab theek hai toh success
    setErrors({ email: "", password: "" });
    setFormMessage({ text: "Demo login successful!", color: "#087f5b" });
  };

  // 4. Social Buttons ka onClick handler
  const handleSocialClick = (provider) => {
    setFormMessage({
      text: `${provider} social login is a demo button.`,
      color: "#0B6BCB",
    });
  };

  // 5. JSX Render (Aapka HTML yahan JSX format mein hai)
  return (
    <>
      <header className="brand">
        <a href="#" className="brand-link" aria-label="Navireq home">
          {/* SVG me stroke-width aur stroke-linecap camelCase ho gaye */}
          <svg className="brand-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" aria-hidden="true">
            <rect width="100" height="100" rx="22.5" fill="#0B6BCB"/>
            <path d="M 20 38 L 32 26 L 36 26 L 64 60 L 64 26 L 80 26 L 80 70 L 68 82 L 64 82 L 36 48 L 36 82 L 20 82 Z" fill="#FFFFFF"/>
            <circle cx="72" cy="22" r="12" fill="#0B6BCB"/>
            <line x1="77" y1="27" x2="89" y2="39" stroke="#0B6BCB" strokeWidth="10.5" strokeLinecap="round"/>
            <circle cx="72" cy="22" r="9" fill="#FFFFFF"/>
            <circle cx="72" cy="22" r="4.5" fill="#083B70"/>
            <line x1="76.5" y1="26.5" x2="86.5" y2="36.5" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round"/>
          </svg>
          <span className="brand-name">Navireq</span>
        </a>
      </header>

      <main className="page-content">
        <section className="login-card" aria-labelledby="signin-title">
          <h1 id="signin-title">Sign in</h1>

          <p className="signup-text">
            New to Navireq? <a href="#" className="text-link">Sign up </a>
          </p>

          <div className="social-buttons" aria-label="Social sign-in options">
            {/* onClick event se handleSocialClick function call kar rahe hain */}
            <button type="button" className="social-button" onClick={() => handleSocialClick("Google")}>
              <span className="social-icon google-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M21.35 12.2c0-.7-.06-1.23-.2-1.8H12v3.4h5.37a4.6 4.6 0 0 1-1.98 3.01v2.5h3.2c1.88-1.74 2.96-4.3 2.96-7.11Z"/>
                  <path fill="#34A853" d="M12 21.75c2.69 0 4.95-.89 6.6-2.44l-3.2-2.5c-.89.6-2.02.96-3.4.96-2.6 0-4.8-1.75-5.59-4.1H3.1v2.58A9.96 9.96 0 0 0 12 21.75Z"/>
                  <path fill="#FBBC05" d="M6.41 13.67A5.99 5.99 0 0 1 6.1 12c0-.58.11-1.15.31-1.67V7.75H3.1A9.95 9.95 0 0 0 2.08 12c0 1.53.37 2.98 1.02 4.25l3.31-2.58Z"/>
                  <path fill="#EA4335" d="M12 6.23c1.47 0 2.79.5 3.83 1.49l2.87-2.87C16.95 3.26 14.69 2.25 12 2.25a9.96 9.96 0 0 0-8.9 5.5l3.31 2.58c.79-2.35 2.99-4.1 5.59-4.1Z"/>
                </svg>
              </span>
              <span>Continue with Google</span>
            </button>

            <button type="button" className="social-button" onClick={() => handleSocialClick("Microsoft")}>
              <span className="social-icon microsoft-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="3" width="8" height="8" fill="#f35325"/>
                  <rect x="13" y="3" width="8" height="8" fill="#81bc06"/>
                  <rect x="3" y="13" width="8" height="8" fill="#05a6f0"/>
                  <rect x="13" y="13" width="8" height="8" fill="#ffba08"/>
                </svg>
              </span>
              <span>Sign in with Microsoft</span>
            </button>

            <button type="button" className="social-button" onClick={() => handleSocialClick("Apple")}>
              <span className="social-icon apple-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path fill="currentColor" d="M16.79 12.72c.02 2.26 1.98 3.01 2 3.02-.02.05-.31 1.05-1.02 2.08-.62.9-1.26 1.8-2.28 1.82-1 .02-1.32-.59-2.46-.59-1.15 0-1.5.57-2.45.61-.99.04-1.75-.97-2.38-1.87-1.3-1.86-2.3-5.27-.96-7.56.66-1.14 1.84-1.86 3.12-1.88.97-.02 1.89.66 2.46.66.57 0 1.64-.81 2.76-.69.47.02 1.79.19 2.64 1.44-.07.04-1.58.92-1.57 2.76ZM15.02 6.63c.51-.62.85-1.48.76-2.34-.74.03-1.63.49-2.15 1.1-.47.55-.88 1.43-.77 2.27.82.06 1.65-.42 2.16-1.03Z"/>
                </svg>
              </span>
              <span>Sign in with Apple</span>
            </button>
          </div>

          <p className="terms-text">
            By continuing, you agree to Navireq's
            <a href="#" className="text-link"> User Agreement</a>,
            <a href="#" className="text-link"> Privacy Policy</a>, and
            <a href="#" className="text-link"> Cookie Policy</a>.
          </p>

          <div className="divider" aria-hidden="true">
            <span></span>
            <strong>or</strong>
            <span></span>
          </div>

          {/* onSubmit pe handleSubmit function call hoga */}
          <form id="loginForm" noValidate onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email or phone</label> {/* for ki jagah htmlFor */}
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="username"
                aria-describedby="emailError"
                value={email} // React State se value attach ki
                onChange={(e) => setEmail(e.target.value)} // User type karega toh state update hogi
              />
              {/* Dynamic Error dikhane ke liye */}
              <p id="emailError" className="error-message" role="alert">{errors.email}</p> 
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>

              <div className="password-wrapper">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"} // State ke basis pe type change
                  autoComplete="current-password"
                  aria-describedby="passwordError"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  id="togglePassword"
                  className="password-toggle"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  onClick={handleTogglePassword} // Toggle ka function call
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M2.5 12s3.3-5 9.5-5 9.5 5 9.5 5-3.3 5-9.5 5-9.5-5-9.5-5Z" fill="none" stroke="currentColor" strokeWidth="1.8"/>
                    <circle cx="12" cy="12" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.8"/>
                  </svg>
                </button>
              </div>
              <p id="passwordError" className="error-message" role="alert">{errors.password}</p>
            </div>

            <a href="#" className="forgot-link">Forgot password?</a>

            <label className="remember-row">
              <input type="checkbox" id="keepSignedIn" />
              <span className="custom-checkbox" aria-hidden="true"></span>
              <span>Keep me signed in</span>
            </label>

            <button type="submit" className="signin-button">Sign in</button>

            {/* Success ya Form Error message yaha show hoga */}
            <p id="formMessage" className="form-message" role="status" style={{ color: formMessage.color }}>
              {formMessage.text}
            </p>
          </form>
        </section>
      </main>

      <footer className="footer">
        <span>Navireq © 2026</span>
        <a href="#">User Agreement</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Community Guidelines</a>
        <a href="#">Cookie Policy</a>
        <a href="#">Copyright Policy</a>
        <a href="#">Send Feedback</a>
        <button type="button" className="language-button">Language <span aria-hidden="true">▼</span></button>
      </footer>
    </>
  );
}

