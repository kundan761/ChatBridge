import React from 'react';

interface BadgeProps {
  count: number;
}

const Badge: React.FC<BadgeProps> = ({ count }) => {
  return (
    <div className="bg-green-500 text-white text-xs font-medium rounded-full px-2 py-0.5 min-w-5 h-5 flex items-center justify-center">
      {count > 99 ? '99+' : count}
    </div>
  );
};

export default Badge;