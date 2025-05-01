import React from 'react';
import { useSelector } from 'react-redux';

const UserList = () => {
  const { allUsers } = useSelector((state) => state.user);

  return (
    <div className="user-list-container">
      <h3>All Users</h3>
      <div className="user-list">
        {allUsers.map((user) => (
          <div key={user._id} className="user-item">
            <img src={user.profilePic} alt={user.name} className="user-profile-pic" />
            <div className="user-details">
              <span className="user-name">{user.name}</span>
              <span className="user-about">{user.about}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
