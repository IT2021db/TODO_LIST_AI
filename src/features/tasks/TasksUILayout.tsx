interface TasksUILayoutProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

export default function TasksUILayout({
  header,
  children,
}: TasksUILayoutProps) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-lg mx-auto px-4 py-6 space-y-4 rounded-2xl bg-[#0F1115]">
        <div className="flex justify-between items-center">{header}</div>
        {children}
      </div>
    </div>
  );
}
