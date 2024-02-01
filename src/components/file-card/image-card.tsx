import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo } from "react";
import { faFileImage } from "@fortawesome/free-solid-svg-icons";
//@ts-ignore
import downloadIcon from '../../assets/images/download.png'
import "./file-card.css";
const loader = require("../../assets/images/loader.gif");

const ImageCard = ({ url, onCardClick, isAssetAvailable, isLoading }) => {

  const name = useMemo(
    () => url?.split("/")?.[url.split("/").length - 1] || "Name Not Available",
    [url]
  );

  return (
    <>
      <div
        style={{ width: "100%", position: "relative", borderRadius: "5px" }}
        className="px-1"
        onClick={onCardClick}
      >
        <div
          style={{
            height: "170px",
            filter: "blur(2px)",
            backgroundImage: `url(${url})`,
            backgroundSize: "cover", // Cover the entire viewport
            color: "white", // Text color
            borderRadius: '5px'
          }}
          className="d-flex justify-content-between px-2 align-items-end"
        >

        </div>
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
          {isLoading && (
            <img
              src={loader}
              style={{ width: "35px", height: "35px" }}
              alt="loader"
            />
          )}
          {!isAssetAvailable && (
            <img
              src={downloadIcon}
              alt="download-btn"
              style={{ maxWidth: "40px" }}
            />
          )}

        </div>

        <div
          style={{
            display: "inline-block",
            fontWeight: "bolder",
          }}
        >
          <FontAwesomeIcon icon={faFileImage} /> &nbsp;
          {name}
        </div>

      </div>

    </>
  );
};

export default ImageCard;
