import React from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import styles from "../../../styles/_Core/CustomInput.module.scss";

import CustomInputDropdownItems from "./CustomInputDropdownItems";
import PageLayout from "../../Layout/PageLayout";

const CustomInputDropdown = ({ dropdownSectionsData }) => {
  return (
    <ScrollArea.Root className={styles.customInputDropdown}>
      <ScrollArea.Viewport className={styles.scrollArea}>
        <PageLayout variant="small">
          {dropdownSectionsData.length !== 0 ? (
            dropdownSectionsData.map((section, idx) => (
              <CustomInputDropdownItems
                key={idx}
                data={section.data}
                title={section.title}
              />
            ))
          ) : (
            <h4>No data Found</h4>
          )}
        </PageLayout>
      </ScrollArea.Viewport>

      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};

export default CustomInputDropdown;
