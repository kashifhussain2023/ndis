import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import FormHeader from './FormHeader';
import InputField from './InputField';
import Button from './Button';
import './ForgotPassword.css';

const ForgotPassword = ({ onSubmit, onBack }) => {
  const { theme, deviceType } = useTheme();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email address is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSuccess(true);
      setTimeout(() => {
        onSubmit(email);
      }, 1500);
    } catch (error) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) {
      setError('');
    }
  };

  if (isSuccess) {
    return (
      <div className={`forgot-password ${deviceType}`}>
        <FormHeader 
          title="Email Sent" 
          showBackButton={true}
          onBackClick={onBack}
        />
        
        <div className="success-content">
          <div className="success-icon">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="32" fill="#E8F5E8"/>
              <circle cx="32" cy="32" r="20" fill="#4CAF50"/>
              <path 
                d="M25 32L29 36L39 26" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          
          <h2 className="success-title">Check Your Email</h2>
          <p className="success-message">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          
          <Button
            type="button"
            variant="primary"
            onClick={() => onSubmit(email)}
          >
            Continue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`forgot-password ${deviceType}`}>
      <FormHeader 
        title="Forgot Password" 
        showBackButton={true}
        onBackClick={onBack}
      />
      
      <div className="forgot-content">
        <p className="forgot-description">
          Enter your email address to receive a verification code
        </p>
        
        <form onSubmit={handleSubmit} className="forgot-form">
          <InputField
            label="Email Address"
            type="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={handleEmailChange}
            error={error}
            required
          />
          
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            loading={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send OTP'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
