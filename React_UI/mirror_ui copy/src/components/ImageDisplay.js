import React from 'react';
import './ImageDisplay.css'; // CSS for the image styling

const ImageDisplay = ({ imageUrl }) => {
  return (
    <div className="image-container">
      <img src={imageUrl} alt="Outfit Display" />
    </div>
  );
};

export default ImageDisplay;
