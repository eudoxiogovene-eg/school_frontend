
import React from "react"
import styles from './style.module.css'


import RelatorioEstudantes from "../../pages/Relatorios/RelatorioEstudantes"

export default function LayoutComponentRelatorioEstudantes(props){
    return(
       <div className={styles.container}>
         <div className={styles.header_geral}>
            <RelatorioEstudantes />
         </div>
         <div className={styles.children_page}>
            {props.children}
         </div>
       </div>
    )
}