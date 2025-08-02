import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useFormValidation } from '../hooks/useFormValidation';
import FormHeader from './FormHeader';
import InputField from './InputField';
import CheckboxField from './CheckboxField';
import Button from './Button';
import './RegistrationForm.css';

const initialFormData = {
  fullName: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false
};

const RegistrationForm = ({ onSubmit, onSignInClick }) => {
  const { theme, deviceType } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset
  } = useFormValidation(initialFormData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateAll()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(values);
      reset();
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (name) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    handleChange(name, value);
  };

  const handleInputBlur = (name) => () => {
    handleBlur(name);
  };

  return (
    <div className={`registration-form ${deviceType}`}>
      <FormHeader 
        title="Register" 
        showBackButton={true}
        onBackClick={() => window.history.back()}
      />
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-fields">
          <InputField
            label="Full Name"
            type="text"
            placeholder="Full Name"
            value={values.fullName}
            onChange={handleInputChange('fullName')}
            onBlur={handleInputBlur('fullName')}
            error={touched.fullName ? errors.fullName : null}
            required
          />

          <InputField
            label="Email"
            type="email"
            placeholder="Email"
            value={values.email}
            onChange={handleInputChange('email')}
            onBlur={handleInputBlur('email')}
            error={touched.email ? errors.email : null}
            required
          />

          <InputField
            label="Phone Number"
            type="tel"
            placeholder="Phone Number"
            value={values.phoneNumber}
            onChange={handleInputChange('phoneNumber')}
            onBlur={handleInputBlur('phoneNumber')}
            error={touched.phoneNumber ? errors.phoneNumber : null}
            optional
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleInputChange('password')}
            onBlur={handleInputBlur('password')}
            error={touched.password ? errors.password : null}
            required
          />

          <InputField
            label="Re-enter Password"
            type="password"
            placeholder="Re-enter Password"
            value={values.confirmPassword}
            onChange={handleInputChange('confirmPassword')}
            onBlur={handleInputBlur('confirmPassword')}
            error={touched.confirmPassword ? errors.confirmPassword : null}
            required
          />

          <CheckboxField
            checked={values.agreeToTerms}
            onChange={handleInputChange('agreeToTerms')}
            onBlur={handleInputBlur('agreeToTerms')}
            error={touched.agreeToTerms ? errors.agreeToTerms : null}
            label="I agree to the Terms and Conditions & Privacy Policy"
            required
          />
        </div>

        <div className="form-actions">
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            {isSubmitting ? 'Signing up...' : 'Signup'}
          </Button>

          <div className="sign-in-link">
            <span>Do you have an account? </span>
            <button 
              type="button" 
              className="link-button"
              onClick={onSignInClick}
            >
              Sign In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
