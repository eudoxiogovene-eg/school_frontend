
import React from "react";
import styles from './style.module.css'

export  default function PopupMessage({eventClose,eventCadastrar,message,event}){
    return(
        <div className={styles.container}>
           <div className={styles.alert}>
                <span>atencao</span>
            </div>
            <div className={styles.container_info}>
                <div className={styles.content}>
                    <div className={styles.message}>
                        <span>{message}</span>
                    </div>
                    <div className={styles.button_action}>
                       <button onClick={event}>ok</button>
                    </div>
                </div>
            </div>
        </div>
    )
}