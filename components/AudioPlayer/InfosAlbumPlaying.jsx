import React, {useRef, useState, useEffect} from "react";
import CustomImage from "../_Core/CustomImage";
import styles from "../../styles/AudioPlayer/AudioPlayer.module.scss"


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
      <CustomImage
        src="https://upload.wikimedia.org/wikipedia/en/8/8e/World_Domination_%28Band-Maid_album%29.png"
        alt=""
        width={70}
        height={70}
      />
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
