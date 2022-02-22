import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { BiDotsVerticalRounded } from "react-icons/bi";

import styles from "../../styles/_Core/SideDropdownMenu.module.scss";

const SideDropdownMenu = ({ children, wholeButtonTrigger }) => {



  return (
    
    <DropdownMenu.Root>
      {wholeButtonTrigger ? (

        // Trigger when the whole button can be clicked
        <DropdownMenu.Trigger className={styles.trigger}>
          {children}
          <BiDotsVerticalRounded className={styles.icon} />
        </DropdownMenu.Trigger>
      ) : (

        // Trigger when only dots can be clicked
        <div>
          {children}
          <DropdownMenu.Trigger className={styles.trigger}>
            <BiDotsVerticalRounded className={styles.icon}  />
          </DropdownMenu.Trigger>
        </div>
      )}

      <DropdownMenu.DropdownMenuContent>
        <DropdownMenu.Item>new tab</DropdownMenu.Item>
        <DropdownMenu.Item>new window</DropdownMenu.Item>
        <DropdownMenu.Item>new something</DropdownMenu.Item>
      </DropdownMenu.DropdownMenuContent>
    </DropdownMenu.Root>
  );
};

export default SideDropdownMenu;
