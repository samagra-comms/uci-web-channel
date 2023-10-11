// ImageCacheComponent.js

import React, { useEffect, useState } from "react";

const CachedImage = ({ imageUrl }) => {
  const [cachedImageUrl, setCachedImageUrl] = useState(null);

  useEffect(() => {
    const cachedImageUrl = localStorage.getItem(imageUrl);

    if (cachedImageUrl) {
      setCachedImageUrl(cachedImageUrl);
    } else {
      // If not cached, fetch the image and cache it
      fetchAndCacheImage(imageUrl);
    }
  }, [imageUrl]);

  const fetchAndCacheImage = (imageUrl) => {
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      // Store the image URL in the cache
      localStorage.setItem(`${imageUrl}`, imageUrl);
      setCachedImageUrl(imageUrl);
    };
  };
  return (
    <div>
      {cachedImageUrl ? (
        <img src={cachedImageUrl} alt="Cached" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CachedImage;
