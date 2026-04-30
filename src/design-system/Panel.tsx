import React from "react";

interface PanelProps {
  title?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export default function Panel({ title, actions, children }: PanelProps) {
  return (
    <div className="bg-gray-50 rounded">
      {(title || actions) && (
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-300">
          <div className="text-2xl font-bold">{title}</div>

          <div className="flex gap-3">{actions}</div>
        </div>
      )}

      <div className="m-0 pb-0 break-all">{children}</div>
    </div>
  );
}
