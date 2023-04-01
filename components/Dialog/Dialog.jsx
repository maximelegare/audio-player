import * as AlertDialog from "@radix-ui/react-alert-dialog";
import styles from "../../styles/_Core/Dialog.module.scss";
import logo from "../../public/assets/SVG/hodei-logo-white.svg";
import Image from "next/image";
import { useState } from "react";
import CustomButton from "../_Core/CustomButton";
import { signIn } from "next-auth/react";
import * as Dialog from "@radix-ui/react-dialog";



const DialogComponent = ({
  children,
  noCloseButton,
  openTriggerComponent,
  title,
}) => {
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
      <Dialog.Root>
        <Dialog.Trigger asChild>{openTriggerComponent}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.DialogOverlay} />
          <Dialog.Content className={styles.DialogContent}>
            {title && (
              <Dialog.Title className={styles.DialogTitle}>
                {title}
              </Dialog.Title>
            )}
            {
              children
            }
            <div
              style={{
                display: "flex",
                marginTop: 25,
                justifyContent: "flex-end",
              }}
            >
              <Dialog.Close asChild>
                <button className="Button green">Save changes</button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <button className="IconButton" aria-label="Close">
                  Close
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default DialogComponent;

{
  /* <div className={styles.contentElement}>
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
</div> */
}

//  <AlertDialog.Root>
//         <AlertDialog.Portal>
//           <AlertDialog.Overlay className={styles.overlay}></AlertDialog.Overlay>
//           <AlertDialog.Content className={styles.content}>
//             {/* <div className={styles.container}>
//               <div className={styles.contentElement}>
//                 <Image src={logo} width={100} height={50} alt="" />
//               </div>

//               <div className={styles.contentElement}>
//                 <CustomButton
//                   variant="text"
//                   handleClick={(e) => {
//                     e.preventDefault()
//                     signIn("spotify", { callbackUrl: "/" });
//                   }}
//                 >
//                   Login with Spotify
//                 </CustomButton>
//               </div>
//             </div> */}
//           </AlertDialog.Content>
//         </AlertDialog.Portal>
//       </AlertDialog.Root>
