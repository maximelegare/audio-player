import React, { useEffect } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import styles from "../../../styles/_Core/CustomInput.module.scss";

import CustomInputDropdownItems from "./CustomInputDropdownItems";
import PageLayout from "../../Layout/PageLayout";

import WithSpinner from "../../../HOC/withSpinner";

const CustomInputDropdownItemsWithSpinner = WithSpinner(
  CustomInputDropdownItems
);

const CustomInputDropdown = ({ dropdownSectionsData, isLoading }) => {


  return (
    <ScrollArea.Root className={styles.customInputDropdown}>
      <ScrollArea.Viewport className={styles.scrollArea}>
        <PageLayout variant="small">
          <CustomInputDropdownItemsWithSpinner
            sections={dropdownSectionsData}
            isLoading={isLoading}
          />
        </PageLayout>
      </ScrollArea.Viewport>

      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};

export default CustomInputDropdown;
