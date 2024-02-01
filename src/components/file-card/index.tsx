import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  faDownload,
  faFilePdf,
  faFileVideo,
  faFileImage,
} from "@fortawesome/free-solid-svg-icons";
import { logToAndroid, triggerEventInAndroid } from "../../utils/android-events";
import ImageCard from "./image-card";
import VideoPlayer from "./video-player";
const loader = require("../../assets/images/loader.gif");
const FileCard = ({ url, user, type,messageId }) => {
  const name = useMemo(
    () => url?.split("/")?.[url.split("/").length - 1] || "Name Not Available",
    [url]
  );

  const assetId= useMemo(()=>name?.split(".")?.[0] || 'invalid asset id',[name])
  const [isAssetAvailable, setIsAssetAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const icon = useMemo(() => {
    if (type === "video") return faFileVideo;
    if (type === "file") return faFilePdf;
    return faFileImage;
  }, [type]);

  

  useEffect(() => {
    if (window) {
      logToAndroid(
        `isAssestDownloaded msgId:${messageId} url:${url} ,name:${assetId}} type:${type==="file" ? "doc" : type} here`
      );
      const isAvailable = window?.androidInteract?.isAssetDownloaded(
        messageId,
        assetId,
        url,
        type==="file" ? "doc" : type
      );
      logToAndroid(`isAssestDownloaded return value:${isAvailable}`);
      setIsAssetAvailable(isAvailable);
    }
  }, [messageId, assetId, type, url]);

  const onCardClick = useCallback(
    (ev) => {
      console.log({messageId,assetId,url,type})
      setIsLoading(true);
      ev.stopPropagation();
      if (window) {
        logToAndroid(
          `onAssetClicked msgId:${messageId} url:${url} ,name:${assetId}} type:${type==="file" ? "doc" : type} here`
        );
        window?.androidInteract?.onAssetClicked(messageId, assetId, url, type==="file" ? "doc" : type);
        setIsAssetAvailable(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    },
    [url, messageId, assetId,type]
  );


  if (type === "image") return <ImageCard url={url} onCardClick={onCardClick} isAssetAvailable={isAssetAvailable} isLoading={isLoading}/>;

  if (type === "video") return <VideoPlayer url={url} onCardClick={onCardClick}/>;
  return (
    <>
      <div
        style={{ background: "lightgray", width: "100%" }}
        className="px-1"
        onClick={onCardClick}
      >
        <div
          style={{ height: "60px" }}
          className="d-flex justify-content-between px-2 align-items-center"
        >
          <div style={{ display: "inline-block" }}>
            <FontAwesomeIcon icon={icon} className="fa-3x" />
          </div>
          <div style={{ display: "inline-block" }}>
          {isLoading && (
              <img
                src={loader}
                style={{ width: "35px", height: "35px" }}
                alt="loader"
              />
            )}
            {!isAssetAvailable && (
              <FontAwesomeIcon
                icon={faDownload}
                className="fa-2x"
               
              />
            )}
          </div>
        </div>
        {name}
      </div>
    </>
  );
};

export default FileCard;
