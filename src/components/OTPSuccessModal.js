import React from 'react';
import { useTheme } from '../context/ThemeContext';
import Button from './Button';
import './OTPSuccessModal.css';

const OTPSuccessModal = ({ onClose }) => {
  const { theme } = useTheme();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="success-modal" onClick={(e) => e.stopPropagation()}>
        <div className="success-icon">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="32" fill="#00BCD4"/>
            <circle cx="32" cy="32" r="24" fill="white"/>
            <path 
              d="M26 32L30 36L38 28" 
              stroke="#00BCD4" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        <h2 className="success-title">Verification Complete!</h2>
        <p className="success-message">
          Your account has been successfully verified.
        </p>
        
        <Button
          type="button"
          variant="primary"
          onClick={onClose}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default OTPSuccessModal;
