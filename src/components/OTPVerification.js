import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import FormHeader from './FormHeader';
import Button from './Button';
import OTPSuccessModal from './OTPSuccessModal';
import './OTPVerification.css';

const OTPVerification = ({ email, onSuccess, onBack }) => {
  const { theme, deviceType } = useTheme();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleInputChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
    if (pastedData.length === 6) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      setError('');
      inputRefs.current[5]?.focus();
    }
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isOtpComplete) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const otpValue = otp.join('');
      if (otpValue === '123456') { // Demo validation
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          onSuccess();
        }, 2000);
      } else {
        setError('Invalid OTP. Please try again.');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    setTimeLeft(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    setError('');
    inputRefs.current[0]?.focus();
    console.log('Resending OTP...');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`otp-verification ${deviceType}`}>
      <FormHeader 
        title="OTP Verification" 
        showBackButton={true}
        onBackClick={onBack}
      />
      
      <div className="otp-content">
        <p className="otp-description">
          Enter the One-Time Password (OTP) sent to your email to verify your account.
        </p>
        
        <form onSubmit={handleSubmit} className="otp-form">
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`otp-input ${error ? 'error' : ''}`}
                autoFocus={index === 0}
              />
            ))}
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="resend-section">
            {canResend ? (
              <button 
                type="button" 
                className="resend-button"
                onClick={handleResend}
              >
                Resend
              </button>
            ) : (
              <span className="timer">
                {formatTime(timeLeft)} <span className="resend-text">Resend</span>
              </span>
            )}
          </div>
          
          <Button
            type="submit"
            variant="primary"
            disabled={!isOtpComplete || isLoading}
            loading={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Continue'}
          </Button>
        </form>
      </div>

      {showSuccess && (
        <OTPSuccessModal onClose={() => setShowSuccess(false)} />
      )}
    </div>
  );
};

export default OTPVerification;
