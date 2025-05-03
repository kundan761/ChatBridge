import React from 'react';
import { User } from '../../types';

interface AvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
}

const Avatar: React.FC<AvatarProps> = ({ user, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden flex-shrink-0`}>
      {user.avatar ? (
        <img 
          src={user.avatar} 
          alt={`${user.name}'s avatar`}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback if image fails to load
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`;
          }}
        />
      ) : (
        <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
          {user.name.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default Avatar;