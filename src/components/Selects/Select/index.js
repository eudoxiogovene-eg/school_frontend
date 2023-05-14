


import React, {useState} from "react";
import styles from './style.module.css'


export default function Select({padding,width,inputName,corValidade}){

  let corBorder= corValidade || '#FF5677'
    let corLetras=corValidade || '#000'
    return(
        <div className={styles.container}>
              <label >{inputName}</label>   
                <select
                  style={{
                    width:width,
                    padding:padding
                  }}
                >
                  <option value="10:00">10:00</option>            
                </select>
        </div>
    )
}