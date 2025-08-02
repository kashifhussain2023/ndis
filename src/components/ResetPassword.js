import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import FormHeader from './FormHeader';
import InputField from './InputField';
import Button from './Button';
import './ResetPassword.css';

const ResetPassword = ({ onSubmit, onBack }) => {
  const { theme, deviceType } = useTheme();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (name) => (e) => {
    const value = e.target.value;
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSuccess(true);
      setTimeout(() => {
        onSubmit();
      }, 2000);
    } catch (error) {
      setErrors({ general: 'Failed to reset password. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`reset-password ${deviceType}`}>
        <FormHeader 
          title="Success" 
          showBackButton={false}
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
          
          <h2 className="success-title">Password Reset Successfully!</h2>
          <p className="success-message">
            Your password has been updated. You can now login with your new password.
          </p>
          
          <Button
            type="button"
            variant="primary"
            onClick={onSubmit}
          >
            Continue to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`reset-password ${deviceType}`}>
      <FormHeader 
        title="Reset Password" 
        showBackButton={true}
        onBackClick={onBack}
      />
      
      <div className="reset-content">
        <p className="reset-description">
          Enter Your New Password
        </p>
        
        <form onSubmit={handleSubmit} className="reset-form">
          <div className="form-fields">
            <InputField
              label="New Password"
              type="password"
              placeholder="Enter New Password"
              value={formData.newPassword}
              onChange={handleInputChange('newPassword')}
              error={errors.newPassword}
              required
            />

            <InputField
              label="Re-Enter New Password"
              type="password"
              placeholder="Re-Enter New Password"
              value={formData.confirmPassword}
              onChange={handleInputChange('confirmPassword')}
              error={errors.confirmPassword}
              required
            />
          </div>

          {errors.general && (
            <div className="error-message general-error">{errors.general}</div>
          )}
          
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            loading={isLoading}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
