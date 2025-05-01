import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../redux/chatSlice.js';
import { fetchAllUsers } from '../redux/userSlice.js';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.user);
  const { selectedUser } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleUserSelect = (userId) => {
    dispatch(selectUser(userId));
  };

  return (
    <div className="sidebar">
      <h3>Users & Groups</h3>
      <div className="user-list">
        {allUsers.map((user) => (
          <div
            key={user._id}
            className={`user-item ${selectedUser === user._id ? 'selected' : ''}`}
            onClick={() => handleUserSelect(user._id)}
          >
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

export default Sidebar;
