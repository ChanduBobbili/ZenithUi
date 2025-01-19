import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
