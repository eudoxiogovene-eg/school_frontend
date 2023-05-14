
import React from "react"
import { Link } from "react-router-dom"
import styles from './style.module.css'


export default function InputGeral({width,inputName,padding,setValue,value,corValidade,type}){

    let corBorder= corValidade || '#FF5677'
    let corLetras=corValidade || '#000'
    return(
        <div className={styles.input_box}>
               <label style={{
                color:corLetras
               }} >{inputName}</label>     
               <input type={type?type:"text"} name="" placeholder={inputName} required 
               style={{
                width:width,
                padding:padding,
                border:`1px solid ${corBorder}`,
                color:corLetras
               }}

               onChange={(e)=>setValue(e.target.value)}
               value={value}
               /> 
         </div>
    )
}
