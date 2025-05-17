import React, { useState } from 'react';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../firebase';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [emailValid, setEmailValid] = useState(true);

  // Simple email regex for basic validation
  const validateEmail = (email) => {
    // RFC 5322 simplified version
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.trim());
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailValid(validateEmail(value));
  };

  const mapFirebaseError = (errorMessage) => {
    if (errorMessage.includes("auth/user-not-found")) {
      return "No user found with this email.";
    }
    if (errorMessage.includes("auth/invalid-email")) {
      return "Invalid email address.";
    }
    if (errorMessage.includes("auth/too-many-requests")) {
      return "Too many requests. Please try again later.";
    }
    return errorMessage; // fallback to original
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setMessage('✅ Password reset email sent! Check your inbox.');
      setEmail('');
    } catch (err) {
      setError(mapFirebaseError(err.message));
    }
    setLoading(false);
  };

  // Styles
  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const boxStyle = {
    backgroundColor: '#f9fafb',
    padding: '30px 40px',
    borderRadius: '20px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  };

  const headingStyle = {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '24px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    textAlign: 'left',
    color: '#374151',
    fontSize: '1rem',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    fontSize: '1rem',
    borderRadius: '10px',
    border: '1.5px solid #d1d5db',
    outline: 'none',
    marginBottom: '16px',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  };

  const inputFocusStyle = {
    borderColor: '#6366f1',
    boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.4)',
  };

  const inputErrorStyle = {
    borderColor: '#dc2626',
    boxShadow: '0 0 0 3px rgba(220, 38, 38, 0.3)',
  };

  const buttonStyle = {
    width: '100%',
    padding: '14px 0',
    backgroundColor: loading ? '#a5b4fc' : '#6366f1',
    color: '#fff',
    fontWeight: '700',
    fontSize: '1.1rem',
    borderRadius: '10px',
    border: 'none',
    cursor: loading ? 'not-allowed' : emailValid && email.trim() !== '' ? 'pointer' : 'not-allowed',
    opacity: loading || !emailValid || email.trim() === '' ? 0.6 : 1,
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverFocusStyle = {
    backgroundColor: '#4f46e5',
    outline: 'none',
  };

  const messageStyle = {
    color: '#22c55e',
    marginBottom: '16px',
  };

  const errorStyle = {
    color: '#dc2626',
    marginBottom: '16px',
  };

  const linkStyle = {
    color: '#6366f1',
    cursor: 'pointer',
    textDecoration: 'none',
    fontWeight: '600',
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h2 style={headingStyle}>Reset Password</h2>
        <form onSubmit={handleReset} aria-label="Forgot password form" noValidate>
          <label htmlFor="email" style={labelStyle}>Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            style={{
              ...inputStyle,
              ...(emailFocused ? inputFocusStyle : {}),
              ...(!emailValid && email !== '' ? inputErrorStyle : {}),
            }}
            value={email}
            onChange={handleChange}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            required
            aria-label="Email address"
            aria-invalid={!emailValid}
            aria-describedby="email-error"
          />
          {message && <p style={messageStyle} role="alert" aria-live="polite">{message}</p>}
          {error && <p id="email-error" style={errorStyle} role="alert" aria-live="polite">{error}</p>}
          <button
            type="submit"
            style={buttonStyle}
            disabled={loading || !emailValid || email.trim() === ''}
            aria-label="Send password reset email"
            onMouseOver={e => { if (!loading && emailValid && email.trim() !== '') e.currentTarget.style.backgroundColor = buttonHoverFocusStyle.backgroundColor; }}
            onMouseOut={e => { e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor; }}
            onFocus={e => { if (!loading && emailValid && email.trim() !== '') e.currentTarget.style.backgroundColor = buttonHoverFocusStyle.backgroundColor; }}
            onBlur={e => { e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor; }}
          >
            {loading ? 'Sending...' : 'Send Reset Email'}
          </button>
        </form>
        <p style={{ marginTop: '24px' }}>
          <Link to="/" style={linkStyle}>Back to Login</Link>
        </p>
      </div>
    </div>
  );
}
