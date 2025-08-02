import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import AuthLayout from './components/AuthLayout';
import Dashboard from './components/Dashboard';
import RegistrationForm from './components/RegistrationForm';
import OTPVerification from './components/OTPVerification';
import LoginForm from './components/LoginForm';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import './styles/GlobalStyles.css';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login'); // login, register, otp, forgot, reset, dashboard
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);

  // Check for existing user on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('medsNavigatorUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentScreen('dashboard');
    }
  }, []);

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
    
    // Create dummy user and save to localStorage
    const dummyUser = {
      id: '1',
      name: 'Anna Donne',
      email: loginData.email,
      avatar: 'AD',
      role: 'Participant',
      loginTime: new Date().toISOString()
    };
    
    setUser(dummyUser);
    localStorage.setItem('medsNavigatorUser', JSON.stringify(dummyUser));
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('medsNavigatorUser');
    setCurrentScreen('login');
  };

  const handleForgotPassword = (email) => {
    console.log('Forgot password for:', email);
    setCurrentScreen('reset');
  };

  const renderCurrentScreen = () => {
    if (user && currentScreen === 'dashboard') {
      return <Dashboard user={user} onLogout={handleLogout} />;
    }

    const authScreens = {
      register: (
        <RegistrationForm
          onSubmit={handleRegistration}
          onSignInClick={() => setCurrentScreen('login')}
        />
      ),
      otp: (
        <OTPVerification
          email={userData?.email}
          onSuccess={handleOTPSuccess}
          onBack={() => setCurrentScreen('register')}
        />
      ),
      login: (
        <LoginForm
          onSubmit={handleLogin}
          onSignUpClick={() => setCurrentScreen('register')}
          onForgotPassword={() => setCurrentScreen('forgot')}
        />
      ),
      forgot: (
        <ForgotPassword
          onSubmit={handleForgotPassword}
          onBack={() => setCurrentScreen('login')}
        />
      ),
      reset: (
        <ResetPassword
          onSubmit={() => setCurrentScreen('login')}
          onBack={() => setCurrentScreen('forgot')}
        />
      )
    };

    return (
      <AuthLayout>
        {authScreens[currentScreen] || authScreens.login}
      </AuthLayout>
    );
  };

  return (
    <ThemeProvider>
      <div className="app">
        {user && currentScreen === 'dashboard' && (
          <Header user={user} onLogout={handleLogout} />
        )}
        {renderCurrentScreen()}
      </div>
    </ThemeProvider>
  );
}

export default App;
