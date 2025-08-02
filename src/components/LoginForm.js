import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import InputField from './InputField';
import CheckboxField from './CheckboxField';
import Button from './Button';
import './LoginForm.css';

const LoginForm = ({ onSubmit, onSignUpClick, onForgotPassword }) => {
  const { theme, deviceType } = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (name) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      setErrors({ general: 'Login failed. Please check your credentials.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`login-form ${deviceType}`}>
      <div className="login-header">
        <div className="logo-container">
          <div className="logo">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="32" fill="#E8F8F5"/>
              <path d="M20 28C20 25.79 21.79 24 24 24H40C42.21 24 44 25.79 44 28V36C44 38.21 42.21 40 40 40H24C21.79 40 20 38.21 20 36V28Z" fill="#00BCD4"/>
              <path d="M26 30L32 34L38 30" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="32" cy="20" r="6" fill="#FF9AA2"/>
              <path d="M28 16C28 14.89 28.89 14 30 14H34C35.11 14 36 14.89 36 16V18C36 19.11 35.11 20 34 20H30C28.89 20 28 19.11 28 18V16Z" fill="white"/>
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-name">Meds</span>
            <span className="brand-suffix">NAVIGATOR</span>
          </div>
        </div>
      </div>

      <h1 className="login-title">Login</h1>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-fields">
          <InputField
            label="Email Address"
            type="email"
            placeholder="Enter Email Address"
            value={formData.email}
            onChange={handleInputChange('email')}
            error={errors.email}
            required
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleInputChange('password')}
            error={errors.password}
            required
          />
        </div>

        {errors.general && (
          <div className="error-message general-error">{errors.general}</div>
        )}

        <div className="form-options">
          <CheckboxField
            checked={formData.rememberMe}
            onChange={handleInputChange('rememberMe')}
            label="Remember me"
          />
          
          <button 
            type="button" 
            className="forgot-password-link"
            onClick={onForgotPassword}
          >
            Forgot Password?
          </button>
        </div>

        <div className="form-actions">
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            loading={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Submit'}
          </Button>

          <div className="signup-link">
            <span>Do you have an account? </span>
            <button 
              type="button" 
              className="link-button"
              onClick={onSignUpClick}
            >
              Signup
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
