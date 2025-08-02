import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './CheckboxField.css';

const CheckboxField = ({
  checked,
  onChange,
  onBlur,
  error,
  label,
  required = false,
  disabled = false
}) => {
  const { theme } = useTheme();

  return (
    <div className="checkbox-field-container">
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          className="checkbox-input"
          required={required}
          disabled={disabled}
        />
        
        <span className={`checkbox-custom ${error ? 'error' : ''}`}>
          {checked && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path 
                d="M20 6L9 17L4 12" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
        
        <span className="checkbox-text">
          {label}
        </span>
      </label>
      
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default CheckboxField;
