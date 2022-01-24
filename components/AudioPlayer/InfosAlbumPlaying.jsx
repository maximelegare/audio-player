import React, {useRef, useState, useEffect} from "react";
import Image from "next/image";

import styles from "../../styles/AudioPlayer.module.scss"


const InfosAlbumPlaying = ({title, artist, imgUrl}) => {

  // State
  const [scroll, setScroll] = useState({
    title: false,
    artist: false,
  });
  
  // References
  const titleRef = useRef();
  const artistRef = useRef();
  

  // checks the width of the text to determine if it needs to scroll or not
  useEffect(() => {
    if (titleRef.current) {
      if (titleRef.current.offsetWidth === 300) {
        setScroll({ ...scroll, title: true });
      }
      if (artistRef.current.offsetWidth === 300) {
        setScroll({ ...scroll, artist: true });
      }
    }
  }, [titleRef.current, artistRef.current]);





  return (
    <div className={styles.infosContainer}>
      <div className={styles.infosWrapper}>
        <div className={styles.imageWrapper}>
          <Image
            src={imgUrl}
            alt=""
            width={95}
            height={90}
            objectFit="cover"
            className={styles.image}
          />
        </div>

        <div className={styles.infos}>
          <h3 ref={titleRef} className={styles.titleAnimation}>
            {title}
          </h3>
          <p ref={artistRef}>{artist}</p>
        </div>
      </div>
    </div>
  );
};

export default InfosAlbumPlaying;
