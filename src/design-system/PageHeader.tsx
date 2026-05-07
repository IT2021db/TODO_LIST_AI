interface PageHeaderProps {
  title: React.ReactNode;
}

export default function PageHeader({ title }: PageHeaderProps) {
  return <div className="text-2xl font-semibold">{title}</div>;
}