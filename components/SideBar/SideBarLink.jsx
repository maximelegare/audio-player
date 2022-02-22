import React from "react";
import styles from "../../styles/SideBar/SideBarLink.module.scss";
import Link from "next/link";

import { useRouter } from "next/router";

import SideDropdownMenu from "../_Core/SideDropdownMenu";

const SideBarLink = ({ icon, text, href, wholeButtonTrigger }) => {
  const router = useRouter();

  const style = {
    color: router.asPath === href && "#fff0e8",
    opacity: router.asPath === href && 1,
  };

  return (
    <div>
      {href ? (
        <Link passHref href={href}>
          <div className={styles.container} style={style}>
            {icon && <div className={styles.icon}>{icon}</div>}

            <h4 className={styles.text}>{text}</h4>
          </div>
        </Link>
      ) : (
        <div className={styles.container}>
          {wholeButtonTrigger ? (
            
            //When the whole button is a trigger
            // Everything is in SideDropdownMenu (display flex) 
            <SideDropdownMenu wholeButtonTrigger={wholeButtonTrigger}>
              <div>{icon && <div className={styles.icon}>{icon}</div>}</div>
              <h4 className={styles.text}>{text}</h4>
            </SideDropdownMenu>
          ) : (

            // Top container set display flex to these elements
            <>
              {icon && <div className={styles.icon}>{icon}</div>}
              <h4 className={styles.text}>{text}</h4>
              <SideDropdownMenu wholeButtonTrigger={wholeButtonTrigger} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SideBarLink;
