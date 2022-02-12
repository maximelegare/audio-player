import React, { useEffect } from "react";
import Image from "next/image";

import styles from "../../styles/_Core/Image.module.scss";

import fallbackImage from "../../public/assets/SVG/musicNote.svg";

const CustomImage = ({ src, width, height, alt, round }) => {




  

  return (
    <div className={styles.imageWrapper}>
      <Image
        src={src ? src : fallbackImage}
        alt={alt}
        width={width}
        height={height}
        // loader={myLoader}
        objectFit="cover"
        className={round ? styles.round : styles.square}
        placeholder="blur"
        blurDataURL={fallbackImage}
      />
    </div>
  );
};

export default CustomImage;
