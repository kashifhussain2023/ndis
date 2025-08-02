import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import RegistrationForm from './components/RegistrationForm';
import OTPVerification from './components/OTPVerification';
import LoginForm from './components/LoginForm';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import './styles/GlobalStyles.css';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('register'); // register, otp, login, forgot, reset
  const [userData, setUserData] = useState(null);

  const handleRegistration = async (formData) => {
    console.log('Registration data:', formData);
    setUserData(formData);
    setCurrentScreen('otp');
  };

  const handleOTPSuccess = () => {
    console.log('OTP verified successfully');
    setCurrentScreen('login');
  };

  const handleLogin = async (loginData) => {
    console.log('Login data:', loginData);
    alert('Login successful!');
  };

  const handleForgotPassword = (email) => {
    console.log('Forgot password for:', email);
    setCurrentScreen('reset');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'register':
        return (
          <RegistrationForm
            onSubmit={handleRegistration}
            onSignInClick={() => setCurrentScreen('login')}
          />
        );
      case 'otp':
        return (
          <OTPVerification
            email={userData?.email}
            onSuccess={handleOTPSuccess}
            onBack={() => setCurrentScreen('register')}
          />
        );
      case 'login':
        return (
          <LoginForm
            onSubmit={handleLogin}
            onSignUpClick={() => setCurrentScreen('register')}
            onForgotPassword={() => setCurrentScreen('forgot')}
          />
        );
      case 'forgot':
        return (
          <ForgotPassword
            onSubmit={handleForgotPassword}
            onBack={() => setCurrentScreen('login')}
          />
        );
      case 'reset':
        return (
          <ResetPassword
            onSubmit={() => setCurrentScreen('login')}
            onBack={() => setCurrentScreen('forgot')}
          />
        );
      default:
        return (
          <RegistrationForm
            onSubmit={handleRegistration}
            onSignInClick={() => setCurrentScreen('login')}
          />
        );
    }
  };

  return (
    <ThemeProvider>
      <div className="app-container">
        <main className="main-content">
          {renderCurrentScreen()}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
