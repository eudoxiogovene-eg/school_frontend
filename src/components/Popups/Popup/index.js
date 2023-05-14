
import React from "react";
import styles from './style.module.css'

export  default function Popup({eventClose,event,message}){
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
                        <div className={styles.yes}>
                            <button onClick={event}>yes</button>
                        </div>
                        <div className={styles.no}>
                        <button onClick={eventClose}>no</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}