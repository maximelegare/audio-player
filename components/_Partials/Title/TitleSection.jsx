import React from 'react'
import styles from "../../../styles/Title/titleSection.module.scss"


const TitleSection = ({children}) => {
  return (
    <div className={styles.container}>{children}</div>
  )
}

export default TitleSection