import React from "react";
import styles from './style.module.css'


export default function TextArea({height,width,name,placeholder,value,setValue}){
    return(
        <div className={styles.container}>
            <label>{name}</label>
            <textarea 
            placeholder={placeholder}
            style={{
                width:width,
                height:height,
                maxHeight:height,
                maxWidth:width,
                minWidth:width,
                minHeight:height
            }}

            onChange={(e)=>setValue(e.target.value)}
            value={value}
            >

            </textarea>
        </div>
    )
}