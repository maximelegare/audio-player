import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";

import * as Popover from '@radix-ui/react-popover';

import styles from "../../styles/_Core/SidePopOver.module.scss";

const SidePopOver = ({ trigger, menuItem, wholeButtonTrigger }) => {



  return (
    
    <Popover.Root>
      {wholeButtonTrigger ? (

        // Trigger when the whole button can be clicked
        <Popover.Trigger className={styles.trigger}>
          {trigger}
          <BiDotsVerticalRounded className={styles.icon} />
        </Popover.Trigger>
      ) : (

        // Trigger when only dots can be clicked
        <div>
          <Popover.Trigger className={styles.trigger}>
            <BiDotsVerticalRounded className={styles.icon}  />
          </Popover.Trigger>
        </div>
      )}

      <Popover.Content className={styles.menuContent} align="end">
        <div className={styles.container}>
        {menuItem}
        </div>
        {/* <DropdownMenu.Item onSelect={(e) => e.preventDefault()}>{menuItem}</DropdownMenu.Item>  */}
      </Popover.Content>
    </Popover.Root>
  );
};

export default SidePopOver;
