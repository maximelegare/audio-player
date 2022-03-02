import React from 'react'
import styles from "../../styles/_Core/Box.module.scss"
const Box = ({children, variant}) => {

    const getStyles = (variant) => {
        switch (variant){
            case "center" :{
                return styles.center
            }
        }
    }
  return (
    <div className={getStyles(variant)}>
        {children}
    </div>
  )
}

export default Box