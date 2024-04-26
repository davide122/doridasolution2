function UserProfileComponent({ userProfile }) {
    return (
      <div className="img-user">
        <img src={userProfile && userProfile.profile_picture_url} alt="User Profile" className="img-fluid" />
      </div>
    );
  }
  
  export default UserProfileComponent;
  