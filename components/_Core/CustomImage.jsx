import React from "react";
import Image from "next/image";

import styles from "../../styles/_Core/Image.module.scss"

const CustomImage = ({src, width, height, alt}) => {
  return (
    <div className={styles.imageWrapper}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        objectFit="cover"
        className={styles.image}
      />
    </div>
  );
};

export default CustomImage;
