import React from "react";

interface PanelProps {
  title?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export default function Panel({ title, actions, children }: PanelProps) {
  return (
     <div className="bg-[#1A1D24] rounded-2xl overflow-hidden">
      {(title || actions) && (
        <div className="flex justify-between items-center px-4 py-3 border-b border-white/5">
          <div className="text-sm font-bold text-gray-400">{title}</div>
          <div className="flex gap-2">{actions}</div>
        </div>
      )}
      <div className="p-2">{children}</div>
    </div>
  );
}
