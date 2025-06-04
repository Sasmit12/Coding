import React from "react";

export function Card({ className = "", children, ...props }) {
  return (
    <div className={`bg-white border rounded shadow p-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children, ...props }) {
  return (
    <div className={`mb-2 font-semibold text-lg ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ className = "", children, ...props }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}