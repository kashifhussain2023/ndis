import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './FormHeader.css';

const FormHeader = ({ title, showBackButton = false, onBackClick }) => {
  const { theme, isMobile } = useTheme();

  return (
    <header className="form-header">
      {showBackButton && (
        <button 
          className="back-button"
          onClick={onBackClick}
          aria-label="Go back"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M15 18L9 12L15 6" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      
      <h1 className="form-title">{title}</h1>
      
      {showBackButton && <div className="spacer" />}
    </header>
  );
};

export default FormHeader;
