import React from "react";

interface InputProps {
  placeholder: string;
  name: string;
  type: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
}

export const Input = ({
  placeholder,
  name,
  type,
  handleChange,
}: InputProps) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);
