import React, { useEffect } from "react";
import styles from "../../styles/Header/Header.module.scss";
import CustomImage from "../_Core/CustomImage";
import FourImagesSquare from "../_Core/FourImagesSquare";
import UserMenu from "../UserMenu/UserMenu";

const Header = ({ title, smallTitle, src, round, images }) => {

  const getImage = (images) => {
    if (images && images[0].picture_url) {
      return images[0].picture_url;
    } else if (images) {
      return images[0];
    } else {
      return src;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {src && (
          <div className={styles.image}>
            {images?.length === 4 ? (
              <FourImagesSquare images={images} width={95} height={95} />
            ) : (
              <CustomImage
                round={round}
                src={getImage(images)}
                alt=""
                width={190}
                height={190}
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
      <UserMenu />
    </div>
  );
};

export default Header;
