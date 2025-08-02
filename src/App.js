import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import RegistrationForm from './components/RegistrationForm';
import './styles/GlobalStyles.css';
import './App.css';

function App() {
  const handleRegistration = async (formData) => {
    console.log('Registration data:', formData);

    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        alert('Registration successful! Welcome to the app.');
        resolve();
      }, 1500);
    });
  };

  const handleSignInClick = () => {
    console.log('Navigate to sign in');
    alert('Navigate to Sign In page');
  };

  return (
    <ThemeProvider>
      <div className="app-container">
        <main className="main-content">
          <RegistrationForm
            onSubmit={handleRegistration}
            onSignInClick={handleSignInClick}
          />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
