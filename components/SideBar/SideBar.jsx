import React, { useState } from "react";

import styles from "../../styles/SideBar/SideBar.module.scss";

import Image from "next/image";
import hodeiMainLogo from "../../public/assets/SVG/hodei-logo-white.svg";

import { SideBarDefault } from "./sideBarDefault/SideBarDefault";

import { sideBarPage } from "../../atoms/generalAtom";
import { useRecoilState } from "recoil";
import SideBarLink from "./SideBarLink";
import { HiOutlineCog } from "react-icons/hi";
import { SideBarOptions } from "./sideBarOptions/SideBarOptions";
import { MdArrowBackIosNew } from "react-icons/md";
import { If, Then, Else } from "react-if";

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
      <div className="w-100 h-2"></div>
      <hr />
      <div className={styles.linkContainer}>
        <If condition={page === "default"}>
          <Then>
            <SideBarLink
              icon={<HiOutlineCog className={`${styles.sideBarIcon}`} />}
              iconOnly
              handleClick={() => {
                setSideBarPage("options");
              }}
            />
          </Then>
          <Else>
            <SideBarLink
              icon={<MdArrowBackIosNew className={`${styles.sideBarIcon}`} />}
              text="Back"
              handleClick={() => {
                setSideBarPage("default");
              }}
            />
          </Else>
        </If>
      </div>
    </div>
  );
};

export default SideBar;
