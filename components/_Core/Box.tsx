import React from 'react'
import styles from "../../styles/_Core/Box.module.scss"



interface Props {
    children:React.ReactNode;
    variant: string
}

const Box: React.FC<Props> = ({children, variant}) => {

    const getStyles = (variant :string) => {
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