// Component used to display text items
// Displays elements based by receiving an Array[]

import React, { ReactChildren, ReactElement } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import styles from "../../../styles/_Core/PopOver.module.scss";

interface Props {
  trigger:string;
  menuItem:React.ReactNode;
  wholeButtonTrigger:boolean
  open:boolean
  onOpenChange:() => void
}



const Dropdown:React.FC<Props> = ({ trigger, menuItem, wholeButtonTrigger, open, onOpenChange }) => {

  return (
    
    <DropdownMenu.Root modal={false} onOpenChange={onOpenChange} open={open}>
      {wholeButtonTrigger ? (

        // Trigger when the whole button can be clicked
        <DropdownMenu.Trigger className={styles.trigger}>
          {trigger}
          <BiDotsVerticalRounded className={styles.sidePopOverDotsIcon} />
        </DropdownMenu.Trigger>
      ) : (

        // Trigger when only dots can be clicked
        <div>
          <DropdownMenu.Trigger className={styles.trigger}>
            <BiDotsVerticalRounded className={styles.sidePopOverDotsIcon}  />
          </DropdownMenu.Trigger>
        </div>
      )}

      <DropdownMenu.Content className={styles.menuContent} align="end">
        {menuItem}  
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
