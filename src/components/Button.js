import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './Button.css';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  ...props
}) => {
  const { theme } = useTheme();

  const buttonClasses = [
    'button',
    `button-${variant}`,
    `button-${size}`,
    disabled && 'button-disabled',
    loading && 'button-loading',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <div className="button-spinner">
          <svg className="spinner" viewBox="0 0 50 50">
            <circle
              className="path"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="5"
            />
          </svg>
        </div>
      )}
      <span className={loading ? 'button-text-hidden' : 'button-text'}>
        {children}
      </span>
    </button>
  );
};

export default Button;
