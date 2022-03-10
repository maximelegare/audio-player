import React, { useState, useEffect } from "react";

import styles from "../../../styles/_Core/Icons.module.scss";

const RepeatIcon = ({repeatValue}) => {

  useEffect(() => {
    console.log(repeatValue)
  },[repeatValue])

  const getStyles = (value) => {
    switch (value) {
      case 0:{
       return styles.disabled 
      }
      case 1:{
       return styles.repeatAll
      }
      case 2:{
       return styles.repeatSong
      }
    }
  }


  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 95.05 65.78"
      className={`${styles.repeatIcon} ${getStyles(repeatValue)}`}
      
    >
      <title>repeat</title>
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0DE7DA" />
          <stop offset="100%" stopColor="#2DE282" />
        </linearGradient>
        <linearGradient id="white" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1" fill={repeatValue == 1 || 2  && "url(#bg)"  }>
          <path d="M47.94,9.75a2.75,2.75,0,0,1-2.75,2.75h-22C13.43,12.5,5.5,21.56,5.5,32.7s7.93,20.19,17.68,20.19H25.6V47.56a2.07,2.07,0,0,1,3.11-1.78l13.73,8.08a2.06,2.06,0,0,1,0,3.56L28.71,65.49a2.1,2.1,0,0,1-1.05.29,2,2,0,0,1-1-.28,2,2,0,0,1-1-1.79V58.39H23.18C10.4,58.39,0,46.87,0,32.7S10.4,7,23.18,7h22A2.75,2.75,0,0,1,47.94,9.75Z" />
          <path
            className={styles.number}
            d="M50.32,18V42.7H45.1V27c0-.92,0-1.75,0-2.47L42,27.09l-.59.47L38.6,24l7.61-6Z"
          />
          <path d="M95.05,33.08c0,14.17-10.39,25.7-23.17,25.7H49.27a2.75,2.75,0,0,1,0-5.5H71.88c9.74,0,17.67-9.06,17.67-20.2S81.62,12.89,71.88,12.89H69.45v5.33A2.06,2.06,0,0,1,66.35,20L52.61,11.92a2.06,2.06,0,0,1,0-3.56L66.35.29a2,2,0,0,1,2.06,0,2,2,0,0,1,1,1.8V7.39h2.43C84.66,7.39,95.05,18.91,95.05,33.08Z" />
        </g>
      </g>
    </svg>
  );
};

export default RepeatIcon;
