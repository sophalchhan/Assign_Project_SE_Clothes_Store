import React, { useState } from "react";
import {
  BsPersonCircle,
  BsCamera,
  BsPencil,
  BsCheck,
  BsX,
  BsEnvelope,
  BsTelephone
} from "react-icons/bs";

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    position: "Store Manager",
    joinDate: "2023-01-15",
    avatar: null,
    bio: "Experienced store manager with 5+ years in retail management."
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  const handleEditClick = () => {
    setIsEditing(true);
    setEditForm({ ...userProfile });
  };

  const handleSaveClick = () => {
    setUserProfile(editForm);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditForm({});
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="profile-page">
      <h1 className="page-title">My Profile</h1>
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="avatar-section">
            <div className="avatar-wrapper">
              {userProfile.avatar ? (
                <img src={userProfile.avatar} alt="Profile" className="profile-avatar" />
              ) : (
                <BsPersonCircle className="profile-avatar" />
              )}
              <button className="avatar-edit-btn">
                <BsCamera />
              </button>
            </div>
            <div className="profile-info">
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="profile-input"
                />
              ) : (
                <h2 className="profile-name">{userProfile.name}</h2>
              )}
              <p className="profile-position">{userProfile.position}</p>
              <p className="profile-join-date">Joined {userProfile.joinDate}</p>
            </div>
          </div>
          
          <div className="profile-actions">
            {isEditing ? (
              <div className="edit-actions">
                <button className="btn-save" onClick={handleSaveClick}>
                  <BsCheck /> Save
                </button>
                <button className="btn-cancel" onClick={handleCancelClick}>
                  <BsX /> Cancel
                </button>
              </div>
            ) : (
              <button className="btn-edit" onClick={handleEditClick}>
                <BsPencil /> Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Profile Details */}
        <div className="profile-details">
          <div className="detail-section">
            <h3>Contact Information</h3>
            <div className="detail-item">
              <BsEnvelope className="detail-icon" />
              <div className="detail-content">
                <label>Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="profile-input"
                  />
                ) : (
                  <p>{userProfile.email}</p>
                )}
              </div>
            </div>
            
            <div className="detail-item">
              <BsTelephone className="detail-icon" />
              <div className="detail-content">
                <label>Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="profile-input"
                  />
                ) : (
                  <p>{userProfile.phone}</p>
                )}
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>About</h3>
            <div className="detail-item">
              <div className="detail-content">
                <label>Bio</label>
                {isEditing ? (
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="profile-textarea"
                    rows="4"
                  />
                ) : (
                  <p>{userProfile.bio}</p>
                )}
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="detail-section">
            <h3>Account Information</h3>
            <div className="detail-grid">
              <div className="detail-card">
                <label>Member Since</label>
                <p>{userProfile.joinDate}</p>
              </div>
              <div className="detail-card">
                <label>Role</label>
                <p>{userProfile.position}</p>
              </div>
              <div className="detail-card">
                <label>Status</label>
                <p className="status-active">Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;