import React from "react";
import styles from "../../styles/_Core/Image.module.scss";
import CustomImage from "./CustomImage";

const FourImagesSquare = ({ images, width, height }) => {
  return (
    <div className={styles.fourImagesContainer}>
      {images.map((img, idx) => {
        return (
          <>
            {img.picture_url ? (
              <CustomImage
                key={idx}
                src={img.picture_url}
                width={width}
                height={height}
                alt=""
                noBorderRadius
              />
            ) : (
              <CustomImage
                key={idx}
                src={img}
                width={width}
                height={height}
                alt=""
                noBorderRadius
              />
            )}
          </>
        );
      })}
    </div>
  );
};

export default FourImagesSquare;
