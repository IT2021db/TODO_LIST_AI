interface TasksUILayoutProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

export default function TasksUILayout({
  header,
  children,
}: TasksUILayoutProps) {
  return (
    <div className="min-h-screen bg-[#0F1115] text-white">
      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        <div className="flex justify-between items-center">
          {header}
        </div>
        {children}
      </div>
    </div>
  );
}
