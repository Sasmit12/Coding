import React, { useState } from "react";

// Root component
export function Select({ children, value, onChange, ...props }) {
  return (
    <select className="border rounded px-2 py-1" value={value} onChange={onChange} {...props}>
      {children}
    </select>
  );
}

export function SelectTrigger({ children, ...props }) {
  return <>{children}</>; // no-op for compatibility
}

export function SelectValue({ value }) {
  return <span>{value}</span>;
}

export function SelectContent({ children }) {
  return <>{children}</>;
}

export function SelectItem({ value, children, ...props }) {
  return (
    <option value={value} {...props}>
      {children}
    </option>
  );
}