
import React from "react";
import styles from './style.module.css'



export default function NammePage({
    namepage,
    padding,
    width,
    background,
    borderColor
}){
    return(
        <div className={styles.container} style={{
            width:width,
            padding:padding,
            backgroundColor:background,
            borderColor:borderColor
            }}>
            <span>{namepage}</span>
        </div>
    )
}