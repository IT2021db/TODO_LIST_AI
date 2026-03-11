interface TasksUILayoutProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

export default function TasksUILayout({
  header,
  children,
}: TasksUILayoutProps) {
  return (
    <div>

      <header className="bg-teal-500 text-white p-8 w-full h-24">
        {header}
      </header>

      <main className="grid grid-cols-1 mx-auto p-5 max-w-4xl gap-5 caret-transparent">
        {children}
      </main>

    </div>
  );
}