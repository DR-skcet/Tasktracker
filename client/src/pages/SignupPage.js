import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      alert("Signup failed: " + err.message);
    }
  };

  // Inline styles
  const containerStyle = {
    padding: '20px',
    maxWidth: '400px',
    margin: '40px auto',
    backgroundColor: '#fff',
    borderRadius: '20px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const headingStyle = {
    fontSize: '1.75rem',
    marginBottom: '24px',
    color: '#1f2937', // gray-800
    fontWeight: '700',
    textAlign: 'center',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const inputStyle = {
    padding: '12px 14px',
    fontSize: '1rem',
    borderRadius: '10px',
    border: '1.5px solid #d1d5db', // gray-300
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  };

  const inputFocusStyle = {
    borderColor: '#6366f1', // indigo-500
    boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.4)',
  };

  const buttonStyle = {
    padding: '14px 0',
    backgroundColor: '#6366f1', // indigo-500
    color: '#fff',
    fontWeight: '700',
    fontSize: '1.1rem',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#4f46e5', // indigo-600
  };

  const textCenterStyle = {
    fontSize: '0.875rem',
    color: '#6b7280', // gray-500
    textAlign: 'center',
    marginTop: '24px',
    lineHeight: '1.5',
  };

  const linkStyle = {
    color: '#6366f1', // indigo-500
    cursor: 'pointer',
    textDecoration: 'none',
  };

  const linkHoverStyle = {
    textDecoration: 'underline',
  };

  // Manage input focus for styling
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Sign Up</h2>
      <form onSubmit={handleSignup} style={formStyle} aria-label="Signup form">
        <input
          type="email"
          placeholder="Email"
          style={{
            ...inputStyle,
            ...(emailFocused ? inputFocusStyle : {}),
          }}
          value={email}
          onChange={e => setEmail(e.target.value)}
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
          required
          aria-label="Email address"
        />
        <input
          type="password"
          placeholder="Password (min 6 chars)"
          style={{
            ...inputStyle,
            ...(passwordFocused ? inputFocusStyle : {}),
          }}
          value={password}
          onChange={e => setPassword(e.target.value)}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
          required
          minLength={6}
          aria-label="Password"
        />
        <button
          type="submit"
          style={buttonHovered ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
          onMouseEnter={() => setButtonHovered(true)}
          onMouseLeave={() => setButtonHovered(false)}
          aria-label="Sign Up"
        >
          Sign Up
        </button>
      </form>
      <p style={textCenterStyle}>
        By signing up, you agree to our{' '}
        <Link
          to="/terms"
          style={linkStyle}
          onMouseEnter={e => (e.currentTarget.style.textDecoration = linkHoverStyle.textDecoration)}
          onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
        >
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link
          to="/privacy"
          style={linkStyle}
          onMouseEnter={e => (e.currentTarget.style.textDecoration = linkHoverStyle.textDecoration)}
          onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
        >
          Privacy Policy
        </Link>.
      </p>
      <p style={textCenterStyle}>
        Already have an account?{' '}
        <Link
          to="/"
          style={linkStyle}
          onMouseEnter={e => (e.currentTarget.style.textDecoration = linkHoverStyle.textDecoration)}
          onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
        >
          Login
        </Link>
      </p>
    </div>
  );
}
