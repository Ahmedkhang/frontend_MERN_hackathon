"use client";

import React from "react";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  text?: string;
  overlay?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({
  size = "medium",
  text,
  overlay = false,
}) => {
  const sizeClasses = {
    small: "w-5 h-5 border-2",
    medium: "w-10 h-10 border-[3px]",
    large: "w-[60px] h-[60px] border-4",
  };

  const loader = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={`border-gray-200 border-t-blue-500 rounded-full animate-spin ${sizeClasses[size]}`}
      ></div>
      {text && <p className="text-sm text-gray-500 text-center m-0">{text}</p>}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-[9999]">
        {loader}
      </div>
    );
  }

  return loader;
};
