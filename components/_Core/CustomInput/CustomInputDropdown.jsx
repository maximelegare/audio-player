import React from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import styles from "../../../styles/_Core/CustomInput.module.scss";

import CustomInputDropdownItem from "./CustomInputDropdownItem";

const CustomInputDropdown = ({ list }) => {
  return (
    <ScrollArea.Root className={styles.customInputDropdown}>
      <ScrollArea.Viewport className={styles.scrollArea}>
        <div>
          {list.length !== 0 && <h3>Songs</h3>}
          {list.map((item) => (
            <CustomInputDropdownItem
              key={item.title}
              title={item.title}
              src={item.picture_url}
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
