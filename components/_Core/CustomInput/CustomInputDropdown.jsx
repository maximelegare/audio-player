import React from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import styles from "../../../styles/_Core/CustomInput.module.scss";

import RowListElement from "../../_Partials/List/RowList/RowListElement";

const CustomInputDropdown = ({ list }) => {
  return (
    <ScrollArea.Root className={styles.customInputDropdown}>
      <ScrollArea.Viewport className={styles.scrollArea}>
        <div>
          {list.length !== 0 && <h3>Songs</h3>}
          {list.map((song) => (
            <RowListElement
              key={song.title}
              song={song}
              options={{
                imgWidth: 35,
                imgHeight: 35,
                noHighlightWhenClicked: true,
                noOptionsIcon: true,
                condensed:true,
                noAlbum:true,
                noDuration:true
              }}
            />
          ))}
        </div>
      </ScrollArea.Viewport>

      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};

export default CustomInputDropdown;
