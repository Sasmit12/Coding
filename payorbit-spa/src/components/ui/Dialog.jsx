import React from "react";

export function Dialog({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30" onClick={onClose}>
      <div className="bg-white rounded shadow p-6" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export function DialogContent({ children }) {
  return <div className="mt-2">{children}</div>;
}

export function DialogHeader({ children }) {
  return <div className="mb-2 font-bold text-lg">{children}</div>;
}

export function DialogTitle({ children }) {
  return <div className="text-xl font-semibold">{children}</div>;
}