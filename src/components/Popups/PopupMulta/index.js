
import React from "react";
import styles from './style.module.css'

export  default function PopupMulta({eventClose,event,event2,message,messageMulta}){
    return(
        <div className={styles.container}>
            <div className={styles.alert}>
                <span>atencao</span>
            </div>
            <div className={styles.container_info}>
                <div className={styles.content}>
                    <div className={styles.message}>
                        <h2 className={styles.top_span}>{message}</h2>
                        <span>{messageMulta}</span>
                    </div>
                    <div className={styles.button_action}>
                        <div className={styles.yes}>
                            <button onClick={event}>yes</button>
                        </div>
                        <div className={styles.no}>
                        <button onClick={event2}>no</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}