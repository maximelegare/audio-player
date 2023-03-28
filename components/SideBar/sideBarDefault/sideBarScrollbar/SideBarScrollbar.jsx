import React from "react";
import { Scrollbar } from "react-scrollbars-custom";
import SideBarLink from "../../SideBarLink";
import styles from "../../../../styles/SideBar/SideBarScrollbar.module.scss";
import { useRecoilValue } from "recoil";
import { selectedSideBarProvider } from "../../../../atoms/generalAtom" 

export const SideBarScrollbar = ({ playlists }) => {

  const provider = useRecoilValue(selectedSideBarProvider)

  return (
    <div className={styles.scrollbarContainer}>
      <Scrollbar noScrollX style={{ marginTop:"10px", height: "100%", width: "100%" }}>
        <div className={styles.linkContainer}>
          {playlists?.map((item) => {

            if(provider === "spotify"){
                return <SideBarLink key={item.id} text={item.name} href={`/sp/playlists/${item.id}`} />;
            }else{
                return <SideBarLink key={item.id} text={item.title} href={item.route} />
            }                

          })}
        </div>
      </Scrollbar>
    </div>
  );
};
