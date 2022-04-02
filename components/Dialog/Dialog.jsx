import * as AlertDialog from "@radix-ui/react-alert-dialog";
import styles from "../../styles/_Core/Dialog.module.scss";
import CustomInput from "../_Core/CustomInput/CustomInput";
import logo from "../../public/assets/SVG/hodei-logo-white.svg";
import Image from "next/image";
import { useState } from "react";
import CustomButton from "../_Core/CustomButton";
import { signIn } from "next-auth/react";

const Dialog = () => {
  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputValues({ ...inputValues, [name]: value });
  };

  return (
    <div suppressHydrationWarning={true}>
      <AlertDialog.Root defaultOpen>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className={styles.overlay}></AlertDialog.Overlay>
          <AlertDialog.Content className={styles.content}>
            <div className={styles.container}>
              <div className={styles.contentElement}>
                <Image src={logo} width={100} height={50} alt="" />
              </div>
              <div className={styles.contentElement}>
                <CustomInput
                  autoFocus
                  placeHolder="Username"
                  value={inputValues.username}
                  handleChange={handleChange}
                  name="username"
                />
              </div>
              <div className={styles.contentElement}>
                <CustomInput
                  placeHolder="Password"
                  name="password"
                  type="password"
                  value={inputValues.password}
                  handleChange={handleChange}
                />
              </div>
              <div className={styles.contentElement}>
                <CustomButton
                  variant="text"
                  handleClick={(e) => {
                    e.preventDefault()
                    signIn("spotify", { callbackUrl: "/" });
                  }}
                >
                  Login
                </CustomButton>
              </div>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
};

export default Dialog;
