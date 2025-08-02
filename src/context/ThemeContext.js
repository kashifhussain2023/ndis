import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const breakpoints = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)'
};

const theme = {
  colors: {
    primary: '#00BCD4',
    primaryDark: '#00ACC1',
    secondary: '#FFF',
    text: '#333333',
    textSecondary: '#666666',
    placeholder: '#999999',
    border: '#E0E0E0',
    background: '#FFFFFF',
    error: '#F44336',
    success: '#4CAF50'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px'
  },
  shadows: {
    light: '0 2px 4px rgba(0,0,0,0.1)',
    medium: '0 4px 12px rgba(0,0,0,0.15)',
    heavy: '0 8px 24px rgba(0,0,0,0.2)'
  },
  breakpoints
};

export const ThemeProvider = ({ children }) => {
  const [deviceType, setDeviceType] = useState('mobile');

  useEffect(() => {
    const updateDeviceType = () => {
      if (window.matchMedia(breakpoints.desktop).matches) {
        setDeviceType('desktop');
      } else if (window.matchMedia(breakpoints.tablet).matches) {
        setDeviceType('tablet');
      } else {
        setDeviceType('mobile');
      }
    };

    updateDeviceType();
    window.addEventListener('resize', updateDeviceType);
    
    return () => window.removeEventListener('resize', updateDeviceType);
  }, []);

  const value = {
    theme,
    deviceType,
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet',
    isDesktop: deviceType === 'desktop'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
