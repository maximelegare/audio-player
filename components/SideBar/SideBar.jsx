import React, { useState } from "react";

import styles from "../../styles/SideBar/SideBar.module.scss";

import Image from "next/image";
import hodeiMainLogo from "../../public/assets/SVG/hodei-logo-white.svg";

import { SideBarDefault } from "./sideBarDefault/SideBarDefault";

import { sideBarPage } from "../../atoms/visibilityAtom";
import { useRecoilState } from "recoil";
import SideBarLink from "./SideBarLink";
import { HiOutlineCog } from "react-icons/hi";
import { SideBarOptions } from "./sideBarOptions/SideBarOptions";
import { MdArrowBackIosNew } from "react-icons/md";

const SideBar = () => {
  const [isSynching, setIsSynching] = useState(false);
  const [page, setSideBarPage] = useRecoilState(sideBarPage);

  const getSideBarPage = (page) => {
    switch (page) {
      case "default": {
        return <SideBarDefault />;
      }
      case "options": {
        return <SideBarOptions />;
      }
    }
  };

  const handleSyncButton = async () => {
    setIsSynching(true);
    const res = await fetch("/api/sync");
    const resData = await res.json();
    setIsSynching(false);
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.linkContainer} self-start`}>
        <Image src={hodeiMainLogo} width={100} height={50} alt="" />
      </div>
      <hr />
      {getSideBarPage(page)}
      <div className={styles.linkContainer}>
        {page === "default" ? (
          <SideBarLink
            icon={<HiOutlineCog className={`${styles.sideBarIcon}`} />}
            wholeButtonTrigger
            handleClick={() => {
              setSideBarPage("options");
            }}
          />
        ) : (
          <SideBarLink
            icon={<MdArrowBackIosNew className={`${styles.sideBarIcon}`} />}
            wholeButtonTrigger
            text="Back"
            handleClick={() => {
              setSideBarPage("default");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SideBar;
