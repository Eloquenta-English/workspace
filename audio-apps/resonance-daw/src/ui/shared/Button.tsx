import React from 'react';
import './styles/app.scss';

const Button = ({ variant = 'default', size = 'md', children, onClick }: { variant?: string; size?: string; children: React.ReactNode; onClick?: () => void; }) => {
  const classes = `button ${variant} ${size}`;
  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;