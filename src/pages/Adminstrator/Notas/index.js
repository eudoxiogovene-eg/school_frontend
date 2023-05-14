import React from "react";
import styles from './style.module.css'

import PopupMessage from "../../../components/Popups/PopupMessage";



export default function Notas(){
    return(
        <div className={styles.container} >
            <PopupMessage />
        </div>
    )
}