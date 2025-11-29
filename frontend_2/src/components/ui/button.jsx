import React from "react";

const Button = ({ 
  children, 
  className = "", 
  variant = "default",
  size = "default",
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-red-600 text-white hover:bg-red-700",
    outline: "border-2 border-red-600 text-red-600 hover:bg-red-50",
    ghost: "hover:bg-red-50 text-red-600",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  };
  
  const sizes = {
    default: "h-11 px-6 text-base",
    sm: "h-9 px-4 text-sm",
    lg: "h-12 px-8 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

