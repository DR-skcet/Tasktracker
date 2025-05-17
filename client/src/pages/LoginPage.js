import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // Container styles for two-column layout
  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    padding: '0',
    margin: '0',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  // Left panel with app info and welcoming text
  const leftPanelStyle = {
    flex: 1,
    background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)',
    color: '#fff',
    padding: '60px 40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderTopLeftRadius: '24px',
    borderBottomLeftRadius: '24px',
  };

  const appTitleStyle = {
    fontSize: '2.5rem',
    fontWeight: '900',
    marginBottom: '20px',
    lineHeight: 1.1,
  };

  const appDescStyle = {
    fontSize: '1.125rem',
    lineHeight: 1.6,
    maxWidth: '360px',
  };

  // Right panel for login form
  const rightPanelStyle = {
    flex: '0 0 420px',
    backgroundColor: '#fff',
    padding: '40px 32px',
    borderTopRightRadius: '24px',
    borderBottomRightRadius: '24px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const headingStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: '24px',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const labelStyle = {
    fontWeight: '600',
    color: '#374151',
    marginBottom: '6px',
    display: 'block',
    fontSize: '1rem',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    fontSize: '1rem',
    borderRadius: '10px',
    border: '1.5px solid #d1d5db',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  };

  const inputFocusStyle = {
    borderColor: '#6366f1',
    boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.4)',
  };

  const errorStyle = {
    color: '#dc2626',
    fontSize: '0.875rem',
    marginTop: '-8px',
  };

  const buttonStyle = {
    width: '100%',
    backgroundColor: '#6366f1',
    color: '#fff',
    fontWeight: '700',
    padding: '12px 0',
    borderRadius: '10px',
    fontSize: '1.1rem',
    cursor: loading ? 'not-allowed' : 'pointer',
    opacity: loading ? 0.6 : 1,
    border: 'none',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#4f46e5',
  };

  const textCenterStyle = {
    textAlign: 'center',
    fontSize: '0.875rem',
    color: '#6b7280',
    marginTop: '16px',
  };

  const linkStyle = {
    color: '#6366f1',
    cursor: 'pointer',
    textDecoration: 'none',
  };

  const linkHoverStyle = {
    textDecoration: 'underline',
  };

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  return (
    <div style={containerStyle}>
      <aside style={leftPanelStyle} aria-label="Application Info">
        <h1 style={appTitleStyle}>Welcome to DRTracks</h1>
        <p style={appDescStyle}>
          DRTracks helps you manage your tasks efficiently and stay organized.
          Login to access your personalized dashboard and start boosting your productivity today!
        </p>
      </aside>
      <main style={rightPanelStyle}>
        <h2 style={headingStyle}>Welcome Back</h2>
        <form onSubmit={handleLogin} style={formStyle} aria-label="Login form">
          <div>
            <label htmlFor="email" style={labelStyle}>Email</label>
            <input
              id="email"
              type="email"
              style={{
                ...inputStyle,
                ...(emailFocused ? inputFocusStyle : {}),
              }}
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              aria-label="Email address"
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
            />
          </div>
          <div>
            <label htmlFor="password" style={labelStyle}>Password</label>
            <input
              id="password"
              type="password"
              style={{
                ...inputStyle,
                ...(passwordFocused ? inputFocusStyle : {}),
              }}
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              aria-label="Password"
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
          </div>
          {error && <p style={errorStyle} role="alert">{error}</p>}
          <button
            type="submit"
            style={buttonStyle}
            disabled={loading}
            aria-label="Sign In"
            onMouseEnter={e => !loading && (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseLeave={e => !loading && (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <p style={textCenterStyle}>
          Don't have an account?{' '}
          <Link
            to="/signup"
            style={linkStyle}
            onMouseEnter={e => (e.currentTarget.style.textDecoration = linkHoverStyle.textDecoration)}
            onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
          >
            Sign up
          </Link>
        </p>
        <p style={textCenterStyle}>
          <Link
            to="/forgot-password"
            style={linkStyle}
            onMouseEnter={e => (e.currentTarget.style.textDecoration = linkHoverStyle.textDecoration)}
            onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
          >
            Forgot Password?
          </Link>
        </p>
      </main>
    </div>
  );
}
