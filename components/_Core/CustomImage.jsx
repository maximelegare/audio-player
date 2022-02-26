import React, { useEffect } from "react";
import Image from "next/image";

import styles from "../../styles/_Core/Image.module.scss";

import fallbackImage from "../../public/assets/SVG/musicNote.svg";

const CustomImage = ({ src, width, height, alt, round, noBorderRadius }) => {




  

  return (
    <div className={styles.imageWrapper}>
      <Image
        src={src ? src : fallbackImage}
        alt={alt}
        width={width}
        height={height}
        objectFit="cover"
        className={`${round ? styles.round : styles.square} ${noBorderRadius && styles.noBorderRadius}`}
        placeholder="blur"
        blurDataURL={fallbackImage}
        
      />
    </div>
  );
};

export default CustomImage;
