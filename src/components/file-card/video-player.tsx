import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  faClose,
  faDownload,
  faFileVideo,
} from "@fortawesome/free-solid-svg-icons";
import { triggerEventInAndroid } from "../../utils/android-events";
import "./file-card.css";
import VideoViewer from "../video-viewer";
import { useHistory } from "react-router-dom";

const VideoPlayer = ({ url, user ,messageId}) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const history = useHistory();
  useEffect(() => {
    //@ts-ignore
    const unblock = history.block((loation) => {
      if (isViewerOpen) {
        setIsViewerOpen(false);
        return false; // Block navigation
      }
      return true; // Allow navigation
    });

    return () => unblock();
  }, [history, isViewerOpen]);

  const openViewer = () => {
    if(!isViewerOpen){
      triggerEventInAndroid("onVideoDownload", { id: user?.id, url,isPreview:true,messageId });
    }
    setSelectedImage(url);
    setIsViewerOpen((prev) => !prev);
  
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
    setSelectedImage("");
  };
  const name = useMemo(
    () => url?.split("/")?.[url.split("/").length - 1] || "Name Not Available",
    [url]
  );

  const onDownloadClick = useCallback(
    (ev) => {
      ev.stopPropagation();
      triggerEventInAndroid("onVideoDownload", { id: user?.id, url,messageId });
    },
    [url, user?.id,messageId]
  );

  return (
    <>
      <div
        style={{ background: "lightgray", width: "100%" }}
        className="px-1"
        onClick={openViewer}
      >
        
          <>
            <div
              style={{ height: "60px" }}
              className="d-flex justify-content-between px-2 align-items-center"
            >
              <div style={{ display: "inline-block" }}>
                <FontAwesomeIcon icon={faFileVideo} className="fa-3x" />
              </div>
              <div style={{ display: "inline-block" }}>
                <FontAwesomeIcon
                  icon={faDownload}
                  className="fa-2x"
                  onClick={onDownloadClick}
                />
              </div>
            </div>
            {name}
          </>
      
      </div>
      {isViewerOpen && (
        <VideoViewer imageUrl={selectedImage} onClose={closeViewer} />
      )}
    </>
  );
};

export default VideoPlayer;
