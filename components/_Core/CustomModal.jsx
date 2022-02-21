import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";


import styles from "../../styles/_Core/SideDropdownMenu.module.scss"

const SideDropdownMenu = ({children}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={styles.trigger}>
        {children}  
        
      </DropdownMenu.Trigger>

      <DropdownMenu.DropdownMenuContent>
        <DropdownMenu.Item>new tab</DropdownMenu.Item>
        <DropdownMenu.Item>new window</DropdownMenu.Item>
        <DropdownMenu.Item>new something</DropdownMenu.Item>
      </DropdownMenu.DropdownMenuContent>
    </DropdownMenu.Root>
  );
};

export default SideDropdownMenu;
