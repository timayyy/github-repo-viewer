import React, { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "pagination";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  isLoading = false,
  disabled,
  className = "",
  ...rest
}) => {
  // Base classes for all buttons
  const baseClasses =
    "cursor-pointer px-4 py-2 rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";

  // Variant-specific classes
  const variantClasses = {
    primary:
      "bg-black text-white hover:bg-black focus:ring-black disabled:bg-gray-100 disabled:text-gray-500",
    secondary:
      "bg-gray-200 hover:bg-gray-300 focus:ring-gray-400 disabled:bg-gray-100 disabled:text-gray-400",
    pagination:
      "px-3 py-2 border rounded hover:bg-gray-100 focus:ring-gray-400 disabled:opacity-50 disabled:hover:bg-white",
  };

  // Button Text
  const buttonText = isLoading ? "Loading..." : children;

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={isLoading || disabled}
      {...rest}
    >
      {buttonText}
    </button>
  );
};
