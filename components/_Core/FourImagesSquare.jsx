import React from "react";
import styles from "../../styles/_Core/Image.module.scss";
import CustomImage from "./CustomImage";

const FourImagesSquare = ({ images, width, height }) => {
  return (
    <div className={styles.fourImagesContainer}>
      {images.map((img, idx) => {
        return (
          <div key={idx}>
            {img.picture_url ? (
              <CustomImage
                src={img.picture_url}
                width={width}
                height={height}
                alt=""
                noBorderRadius
              />
            ) : (
              <CustomImage
                src={img}
                width={width}
                height={height}
                alt=""
                noBorderRadius
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FourImagesSquare;
