import React from "react";

type ButtonProps = {
  label: string;
  variant?: "primary" | "outline";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
  icon,
  iconPosition = "left",
  className = "",
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full focus:outline-none transition ease-in-out duration-200";
  const sizeStyles = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };
  const variantStyles = {
    primary: "bg-gradient-to-r from-[#3290EA] to-[#A728F5] text-white",
    outline: "border border-[#A728F5] text-white",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {label}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
