import React, { FC } from "react";
import { cn } from "../utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button: FC<ButtonProps> = ({ children, className, ...rest }) => {
  return (
    <button
      {...rest}
      className={cn("px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600", className)}
    >
      {children}
    </button>
  );
};

export default Button;
