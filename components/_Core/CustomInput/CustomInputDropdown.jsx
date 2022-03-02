import React from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import styles from "../../../styles/_Core/CustomInput.module.scss";

import CustomInputDropdownListTitle from "./CustomInputDropdownListTitle";
import RowListElement from "../../_Partials/List/RowList/RowListElement";
import PageLayout from "../../Layout/PageLayout";

const CustomInputDropdown = ({ list }) => {
  return (
    <ScrollArea.Root className={styles.customInputDropdown}>
      <ScrollArea.Viewport className={styles.scrollArea}>
        {list.length !== 0 && (
          <PageLayout variant="small">
            <CustomInputDropdownListTitle title="Songs" />
            {list.map((song) => (
              <RowListElement
                key={song.title}
                song={song}
                options={{
                  imgWidth: 35,
                  imgHeight: 35,
                  noHighlightWhenClicked: true,
                  noOptionsIcon: true,
                  condensed: true,
                  noAlbum: true,
                  noDuration: true,
                }}
              />
            ))}
          </PageLayout>
        )}
      </ScrollArea.Viewport>

      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};

export default CustomInputDropdown;
