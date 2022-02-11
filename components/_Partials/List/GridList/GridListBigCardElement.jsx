import React from 'react'

import styles from "../../../../styles/List/GridListBigCard.module.scss"
import CustomImage from '../../../_Core/CustomImage'


const GridListBigCardElement = ({src, title, route, year, round}) => {
  return (
    <div className={styles.container}>
      <CustomImage width={90} height={90} src={src} alt="" round={round}/>
      <div className={styles.infos}>
        <h5>{title.length < 11? title : `${title.slice(0, 11)}...`}</h5>
        <p>{year}</p>
      </div>
    </div>
  )
}

export default GridListBigCardElement