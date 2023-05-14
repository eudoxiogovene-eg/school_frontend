


import React  from "react";

import styles from './style.module.css'

export default function BotaoPaginacao(){
    return(
        <div className={styles.container}>
            <div className={styles.button}>
                <span>fast</span>
            </div>
            <div className={styles.button}>
                <span onClick={()=>{alert('clicou em volar')}} >prev</span>
            </div>
            <div className={styles.button}>
                <span className={styles.page_number}>1</span>
            </div>
            <div className={styles.button}>
                <span>next</span>
            </div>
            <div className={styles.button}>
                <span>last</span>
            </div>
           
        </div>
    )
}