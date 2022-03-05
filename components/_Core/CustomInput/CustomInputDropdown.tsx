import React, { ReactElement } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import styles from "../../../styles/_Core/CustomInput.module.scss";

import CustomInputDropdownItems from "./CustomInputDropdownItems";
import PageLayout from "../../Layout/PageLayout";

interface Props {
  dropdownSectionsData?: any;
}

const CustomInputDropdown: React.FC<Props> = ({ dropdownSectionsData }) => {
  return (
    <ScrollArea.Root className={styles.customInputDropdown}>
      <ScrollArea.Viewport className={styles.scrollArea}>
        {dropdownSectionsData && (
          <PageLayout variant="small">
            {dropdownSectionsData.length !== 0 ? (
              dropdownSectionsData.map(
                (section, idx: number): ReactElement => (
                  <CustomInputDropdownItems
                    key={idx}
                    data={section.data}
                    title={section.title}
                  />
                )
              )
            ) : (
              <h4>No data Found</h4>
            )}
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
