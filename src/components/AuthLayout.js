import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './AuthLayout.css';

const AuthLayout = ({ children }) => {
  const { theme, deviceType } = useTheme();

  return (
    <div className={`auth-layout ${deviceType}`}>
      <div className="auth-container">
        {/* Banner Column (8/12) - Hidden on mobile */}
        <div className="banner-column">
          <div className="banner-content">
            <div className="banner-image">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets%2F4e2638fd7aa547069a56c9c92f2fedf5%2F7e401220b5d64ffabc04a6aafee60633?format=webp&width=800" 
                alt="Medical consultation" 
                className="banner-img"
              />
            </div>
            <div className="banner-overlay">
              <div className="banner-text">
                <h1 className="banner-title">
                  Welcome to <span className="highlight">Meds Navigator</span>
                </h1>
                <p className="banner-description">
                  Your trusted partner in healthcare management. Connect with healthcare professionals, 
                  track your medications, and manage your health journey with confidence.
                </p>
                <div className="banner-features">
                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M22 12H18L15 21L9 3L6 12H2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span>Health Monitoring</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="white" strokeWidth="2"/>
                        <line x1="16" y1="2" x2="16" y2="6" stroke="white" strokeWidth="2"/>
                        <line x1="8" y1="2" x2="8" y2="6" stroke="white" strokeWidth="2"/>
                        <line x1="3" y1="10" x2="21" y2="10" stroke="white" strokeWidth="2"/>
                      </svg>
                    </div>
                    <span>Appointment Scheduling</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2"/>
                        <path d="M23 21V19C23 18.1645 22.7155 17.3541 22.2094 16.7007C21.7033 16.0473 20.9944 15.5902 20.2 15.4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span>Expert Healthcare Team</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column (4/12) */}
        <div className="form-column">
          <div className="form-wrapper">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
