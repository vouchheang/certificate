"use client";
import React, { useRef } from "react";

interface ButtonProps {
  label: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ label, className = "" }) => {
  return (
    <>
      <button
        className={`bg-[#00844C] py-3 px-6 rounded max-sm:py-4 ${className}`}
      >
        <p className="text-md max-sm:text-sm text-white font-semibold">
          {label}
        </p>
      </button>
      <input type="file" style={{ display: "none" }} />
    </>
  );
};

export default Button;
