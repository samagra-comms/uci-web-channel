import React from "react";
import "./styles.css";
import { Video } from "samagra-chatui";
function VideoViewer({ imageUrl, onClose }) {
  
  return (
    <div className="video-viewer">
      <div className="video-container">
        <Video
          style={{ width: "100%" ,height:'100%'}}
          src={imageUrl}
        />
      </div>
       <button onClick={onClose} className="close-button">
        Close
      </button>
    </div>
  );
}

export default VideoViewer;
