import React from 'react';
import './SkeletonLoader.css'; // Assicurati di creare e importare il file CSS

const SkeletonLoader = () => {
  return (
    <div className="skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text small"></div>
    </div>
  );
};

export default SkeletonLoader;
