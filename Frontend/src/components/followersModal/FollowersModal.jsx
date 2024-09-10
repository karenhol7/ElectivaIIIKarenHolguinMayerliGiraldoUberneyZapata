import React from 'react';
import Modal from 'react-modal';
import './FollowersModal.css';

Modal.setAppElement('#root');

export const FollowersModal = ({ isOpen, onRequestClose, title, users }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel={title}
    className="modal"
    overlayClassName="modal-overlay"
  >
    <h2>{title}</h2>
    <ul className="user-list">
      {users.length > 0 ? (
        users.map((user) => (
          <li key={user._id}>
            <img
              src={user.avatar || 'https://via.placeholder.com/30'}
              alt="User Avatar"
              className="user-avatar"
            />
            <span className="user-name">{user.userName}</span>
          </li>
        ))
      ) : (
        <li className="no-users">No users found</li>
      )}
    </ul>
    <button onClick={onRequestClose}>Close</button>
  </Modal>
);
