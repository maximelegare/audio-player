import * as AlertDialog from "@radix-ui/react-alert-dialog";
import styles from "../../styles/_Core/Dialog.module.scss";
import CustomInput from "../_Core/CustomInput/CustomInput";
import logo from "../../public/assets/SVG/hodei-logo-white.svg";
import Image from "next/image";

import CustomButton from "../_Core/CustomButton";

const Dialog = () => {
  return (
    <AlertDialog.Root defaultOpen>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={styles.overlay} />
        <AlertDialog.Content className={styles.content}>
          <div className={styles.container}>
            <div className={styles.contentElement}>
              <Image src={logo} width={100} height={50} alt="" />
            </div>
            <div className={styles.contentElement}>
              <CustomInput placeHolder="Username" />
            </div>
            <div className={styles.contentElement}>
              <CustomInput placeHolder="Password" />
            </div>
            <div className={styles.contentElement}>
              <CustomButton variant="text">Login</CustomButton>
            </div>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default Dialog;
