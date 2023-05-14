


import React,{useState,useEffect} from 'react'
import styles from './style.module.css'

import api from '../../../services/api'


export default function InputCalendario({width,setValue,padding,value,display,marginTop,labelName,marginTopContainer,corValidade}){
    
    
    let corBorder= corValidade || '#FF5677'
    let corLetras=corValidade || '#000'
   
    return(
        <div className={styles.container}
        style={{
            display:display,
            alignItems:'center',
            marginTop:marginTopContainer
        }}
        >
            <label
            style={{display:'flex',color:corLetras}}
            >{labelName}</label>
            <input type="date" 
            style={{
                width:width,
                padding:padding,
                border:`1px solid ${corBorder}`,
                color:corLetras
            }}
             value={value}
            onChange={(e)=>setValue(e.target.value)}
               
            />
        </div>
    )
}


