import React, {useEffect} from "react";
import styles from "../../styles/Header/Header.module.scss";
import CustomImage from "../_Core/CustomImage";
import FourImagesSquare from "../_Core/FourImagesSquare";

const Header = ({ title, smallTitle, src, round, images, headerImage }) => {


  return (
    <div className={styles.container}>
      {src && (
        <div className={styles.image}>
          {images?.length === 4 ? (
            <FourImagesSquare images={images} width={95} height={95}/>
          ) : (
            <CustomImage
              round={round}
              src={images && images[0]?.picture_url || src}
              alt=""
              width={190}
              height={190}
              headerImage={headerImage}
            />
          )}
        </div>
      )}

      <div className={styles.headerInfos}>
        {smallTitle && (
          <h3 className={styles.artist}>{smallTitle.toUpperCase()}</h3>
        )}
        <h1 className={styles.title}>{title}</h1>
      </div>
    </div>
  );
};

export default Header;
