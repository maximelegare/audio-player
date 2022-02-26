import React from "react";
import styles from "../../styles/_Core/Image.module.scss";
import CustomImage from "./CustomImage";

const FourImagesSquare = ({ images, width, height }) => {
  return (
    <div className={styles.fourImagesContainer}>
      {images.map(({picture_url}, idx) => {
          console.log(picture_url)
        return (<CustomImage
          key={idx}
          src={picture_url}
          width={width}
          height={height}
          alt=""
          noBorderRadius
        />)
    })}
    </div>
  );
};

export default FourImagesSquare;
