interface BadgeProps {
  text: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}

const Badge = ({ text, status }: BadgeProps) => {
  const getBadgeColor = () => {
    if (status === 'In Progress') return 'ring-blue-700/10 bg-blue-50';
    if (status === 'Completed') return 'ring-green-600/20 bg-green-50';
    return 'ring-gray-500/10 bg-gray-50';
  };

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ${getBadgeColor()}`}
    >
      {text}
    </span>
  );
};

export default Badge;
