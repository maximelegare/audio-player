import React from "react";
import { useSession } from "next-auth/react";
import CustomImage from "../_Core/CustomImage";
import styles from "../../styles/UserMenu/UserMenu.module.scss"
import { signOut } from "next-auth/react";

const UserMenu = () => {
  const { data: session } = useSession();
  return (
    <div className={styles.container} onClick={() => signOut()}>
      <CustomImage
        width={40}
        height={40}
        src={session?.user.image}
        round
        alt="User profile picture"
      />
      <p className={styles.userName}>{session?.user.name}</p>
    </div>
  );
};

export default UserMenu;
