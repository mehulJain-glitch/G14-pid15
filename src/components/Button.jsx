import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // 'primary', 'secondary', 'danger', 'icon'
  size = 'md',
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  icon,
  ...props
}) => {
  const baseClass = variant === 'icon' ? 'btn-icon' : `btn btn-${variant}`;
  return (
    <button
      type={type}
      className={`${baseClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="btn-icon-wrapper">{icon}</span>}
      {children}
    </button>
  );
};
