import React, { useMemo } from 'react';
import './styles.css';




function ImageViewer({ imageUrl, onClose }) {
    
  return (
    <div className="image-viewer">
      <div className="image-container">
         <img src={imageUrl} alt="Full View" /> 
      </div>
      <button onClick={onClose} className="close-button">
        Close
      </button>
    </div>
  );
}

export default ImageViewer;
