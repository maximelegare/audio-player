import React from "react";
import { Scrollbar } from "react-scrollbars-custom";
import SideBarLink from "../../SideBarLink";
import styles from "../../../../styles/SideBar/SideBarScrollbar.module.scss";

export const SideBarScrollbar = ({ playlists }) => {
  return (
    <div className={styles.scrollbarContainer}>
      <Scrollbar noScrollX style={{ marginTop:"10px", height: "100%", width: "100%" }}>
        <div className={styles.linkContainer}>
          {playlists?.map((item) => {

            if(item?.uri?.slice(0,7) === "spotify"){
                return <SideBarLink key={item.id} text={item.name}  />;
            }else{
                return <SideBarLink key={item.id} text={item.title} href={item.route} />
            }                

          })}
        </div>
      </Scrollbar>
    </div>
  );
};
