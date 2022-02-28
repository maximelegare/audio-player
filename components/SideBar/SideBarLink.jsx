import React from "react";
import styles from "../../styles/SideBar/SideBarLink.module.scss";
import Link from "next/link";

import { useRouter } from "next/router";

import SidePopOver from "../_Core/PopOver/PopOver";
const SideBarLink = ({
  icon,
  text,
  href,
  wholeButtonTrigger,
  dotsIcon,
  menuItem,
  handleClick,
}) => {
  const router = useRouter();

  const style = {
    color: router.asPath === href && "#fff0e8",
    opacity: router.asPath === href && 1,
  };

  return (
    <div>
      {
        // If the element possess the three dots icon
        dotsIcon ? (
          <>
            <div className={styles.container}>
              {
                //When the whole button is a trigger
                // Everything is in SideDropdownMenu (display flex)
                wholeButtonTrigger ? (
                  <SidePopOver
                    wholeButtonTrigger={wholeButtonTrigger}
                    trigger={
                      <>
                        <div>
                          {icon && (
                            <div className={styles.sideBarIcon}>{icon}</div>
                          )}
                        </div>
                        <h4 className={styles.text}>{text}</h4>
                      </>
                    }
                    menuItem={menuItem}
                  />
                ) : (
                  // When only the three dots icon is the trigger
                  // Top container set display flex to these elements
                  <>
                    
                      {icon && <div className={styles.sideBarIcon}>{icon}</div>}
                      <h4 className={styles.text}>{text}</h4>
                    <SidePopOver
                      wholeButtonTrigger={wholeButtonTrigger}
                      menuItem={menuItem}
                    />
                  </>
                )
              }
            </div>
          </>
        ) : (
          // If there is no dots icon
          <>
            {
              // If the element is a link
              href ? (
                <Link passHref href={href}>
                  <div className={styles.container} style={style}>
                    {icon && <div className={styles.sideBarIcon}>{icon}</div>}

                    <h4 className={styles.text}>{text}</h4>
                  </div>
                </Link>
              ) : (
                // If the element is a normal button
                <>
                  <div
                    className={styles.container}
                    style={style}
                    onClick={handleClick}
                  >
                    {icon && <div className={styles.sideBarIcon}>{icon}</div>}

                    <h4 className={styles.text}>{text}</h4>
                  </div>
                </>
              )
            }
          </>
        )
      }
    </div>
  );
};

export default SideBarLink;

// return (
//   <div>
//     {href ? (
//       <Link passHref href={href}>
//         <div className={styles.container} style={style}>
//           {icon && <div className={styles.sideBarIcon}>{icon}</div>}

//           <h4 className={styles.text}>{text}</h4>
//         </div>
//       </Link>
//     ) : (
//       <div className={styles.container}>
//         {wholeButtonTrigger ? (
//           //When the whole button is a trigger
//           // Everything is in SideDropdownMenu (display flex)
//           <SidePopOver
//             wholeButtonTrigger={wholeButtonTrigger}
//             trigger={
//               <>
//                 <div>
//                   {icon && <div className={styles.sideBarIcon}>{icon}</div>}
//                 </div>
//                 <h4 className={styles.text}>{text}</h4>
//               </>
//             }
//             menuItem={menuItem}
//           />
//         ) : (
//           // Top container set display flex to these elements
//           <>
//             {icon && <div className={styles.sideBarIcon}>{icon}</div>}
//             <h4 className={styles.text}>{text}</h4>
//             <SidePopOver
//               wholeButtonTrigger={wholeButtonTrigger}
//               menuItem={menuItem}
//             />
//           </>
//         )}
//       </div>
//     )}
//   </div>
// );
