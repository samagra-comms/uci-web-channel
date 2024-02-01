import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useState } from "react";
import {
  faFileVideo,
} from "@fortawesome/free-solid-svg-icons";
import "./file-card.css";
import { useHistory } from "react-router-dom";
import VideoThumbnail from "react-video-thumbnail";
const VideoPlayer = ({ url, onCardClick }) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [thumbnail, setthumbnail] = useState(null);

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

  const name = useMemo(
    () => url?.split("/")?.[url.split("/").length - 1] || "Name Not Available",
    [url]
  );



  return (
    <>
      <div style={{ display: "none" }}>
        <VideoThumbnail
          videoUrl={url}
          thumbnailHandler={(thumbnailData) => setthumbnail(thumbnailData)}
        />
      </div>
      <div style={{ width: "100%", position: "relative", borderRadius: "5px" }}>
        <div
          style={{
            background: "lightgray",
            width: "100%",
            position: "relative",
            borderRadius: "5px",
          }}
          className="px-1"
          onClick={onCardClick}
        >
          <>
            <div
              style={{
                height: "170px",
                filter: "blur(2px)",
                backgroundImage: `url(${thumbnail})`,
                backgroundSize: "cover", // Cover the entire viewport
                color: "white", // Text color
              }}
              className="d-flex justify-content-between px-2 align-items-center"
            >

            </div>
          </>
          <div
            style={{
              width: "50px",
              height: "50px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <img
              src={`https://cdn-icons-png.flaticon.com/512/81/81097.png`}
              alt="play-btn"
            />
          </div>
        </div>
        <div
          style={{
            display: "inline-block",
            fontWeight: "bolder",
          }}
        >
          <FontAwesomeIcon icon={faFileVideo} /> &nbsp;
          {name}
        </div>
      </div>

    </>
  );
};

export default VideoPlayer;
