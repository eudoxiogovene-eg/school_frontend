
import React from "react"
import styles from './style.module.css'


import Header from "../Header"

export default function LayoutComponent(props){
    return(
       <div className={styles.container}>
         <div className={styles.header_geral}>
            <Header />
         </div>
         <div className={styles.children_page}>
            {props.children}
         </div>
       </div>
    )
}