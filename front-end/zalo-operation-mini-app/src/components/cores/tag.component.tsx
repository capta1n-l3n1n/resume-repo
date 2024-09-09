import React from "react";

interface TagProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

const Tag: React.FC<TagProps> = ({ label, onClick, className = "" }) => {
  return (
    <span
      onClick={onClick}
      className={`rounded-full bg-blue-500 px-2 py-1 font-medium text-white ${className}`}
    >
      {label}
    </span>
  );
};

export default Tag;
