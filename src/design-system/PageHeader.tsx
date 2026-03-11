interface PageHeaderProps {
  title: React.ReactNode;
}

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="text-4xl font-bold">
      {title}
    </div>
  );
}