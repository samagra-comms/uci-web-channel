import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { faDownload, faFileImage } from "@fortawesome/free-solid-svg-icons";
import {
  logToAndroid,
  triggerEventInAndroid,
} from "../../utils/android-events";
import ImageViewer from "../image-viewer";
import "./file-card.css";
import { useHistory } from "react-router-dom";
import { toast } from "react-hot-toast";
const loader = require("../../assets/images/loader.gif");


const ImageCard = ({ url, user, messageId }) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [isImageAvailable, setIsImageAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("image1")) {
      setIsImageAvailable(true);
      setSelectedImage(localStorage.getItem("image1"));
    } else {
      setSelectedImage(url);
    }
  }, [url]);

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
    if (!isViewerOpen) {
      triggerEventInAndroid("onImageDownload", {
        id: user?.id,
        url,
        isPreview: true,
        messageId,
      });
    }
    //  setSelectedImage(url);
    setIsViewerOpen(true);
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
    setSelectedImage("");
  };
  const name = useMemo(
    () => url?.split("/")?.[url.split("/").length - 1] || "Name Not Available",
    [url]
  );

  useEffect(() => {
    if (window) {
      logToAndroid(
        `passing values to isAssestDownloaded msgId:${messageId} url:${url} ,name:${name}} image here`
      );
      const isAssetAvailable = window?.androidInteract?.isAssetDownloaded(
        messageId,
        name,
        url,
        "image"
      );
      logToAndroid(`isAssestDownloaded return value:${isAssetAvailable}`);
      setIsImageAvailable(isAssetAvailable);
    }
  }, [messageId, name, url]);

  const onDownloadClick = useCallback(
    (ev) => {
      setIsLoading(true);
      ev.stopPropagation();
      triggerEventInAndroid("onImageDownload", {
        id: user?.id,
        url,
        messageId,
        assetId: name,
      });
      if (window) {
        logToAndroid(
          `passing values to onAssetClicked msgId:${messageId} url:${url} ,name:${name}} image here`
        );
        window?.androidInteract?.onAssetClicked(messageId, name, url, "image");
        setIsImageAvailable(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    },
    [user?.id, url, messageId, name]
  );

  return (
    <>
      <div
        style={{ background: "lightgray", width: "100%" }}
        className="px-1"
        onClick={openViewer}
      >
        <div
          style={{ height: "60px" }}
          className="d-flex justify-content-between px-2 align-items-center"
        >
          <div style={{ display: "inline-block" }}>
            <FontAwesomeIcon icon={faFileImage} className="fa-3x" />
          </div>
          <div style={{ display: "inline-block" }}>
            {isLoading && (
              <img
                src={loader}
                style={{ width: "35px", height: "35px" }}
                alt="loader"
              />
            )}
            {!isImageAvailable && (
              <FontAwesomeIcon
                icon={faDownload}
                className="fa-2x"
                onClick={onDownloadClick}
              />
            )}
          </div>
        </div>
        {name}
      </div>

      {/* {isViewerOpen && (
        <ImageViewer imageUrl={selectedImage} onClose={closeViewer} />
      )} */}
    </>
  );
};

export default ImageCard;
