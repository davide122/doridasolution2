import React from 'react';
import { Image } from 'react-bootstrap';

const UserProfile = ({ userProfile }) => {
  return userProfile ? (
    <div className="PositionBottomImage img-user d-flex flex-column justify-content-center align-items-center">
      <Image src={userProfile.profile_picture_url} alt="User Profile" roundedCircle fluid />
      <p className="mt-2 mb-0 fs-5 text-center">{userProfile.username}</p>
    </div>
  ) : null;
};

export default UserProfile;
