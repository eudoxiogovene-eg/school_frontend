


import React,{useState,useEffect} from 'react'
import styles from './style.module.css'

import api from '../../../services/api'



export default function HorarioComponent({width,setValue,padding,LocalSelecionado,display,marginTop,corValidade}){
 
    let corBorder= corValidade || '#FF5677'
    let corLetras=corValidade || '#000'

    return(
        <div className={styles.container}
        style={{
            display:display,
            alignItems:'center'
        }}
        >
            <label
            style={{display:'flex',color:corLetras}}
            >horaio</label>
            <select style={{
                width:width,
                padding:padding,
                marginTop:marginTop,
                border:`1px solid ${corBorder}`,
                color:corLetras
            }}
            value={LocalSelecionado}
             onChange={(e)=>setValue(e.target.value)}
             
            >
                   <option value="">selecione</option>
                   <option value="06:00">06:00</option>
                   <option value="07:00">07:00</option>
                   <option value="08:00">08:00</option>
                   <option value="09:00">09:00</option>
                   <option value="10:00">10:00</option>
                   <option value="11:00">11:00</option>
                   <option value="12:00">12:00</option>
                   <option value="13:00">13:00</option>
                   <option value="14:00">14:00</option>
                   <option value="15:00">15:00</option>
                   <option value="16:00">16:00</option>
                   <option value="17:00">17:00</option>
                   <option value="18:00">18:00</option>
                   <option value="19:00">19:00</option>
                   <option value="20:00">20:00</option>
                   <option value="21:00">21:00</option>
                   <option value="22:00">22:00</option>
                   <option value="23:00">23:00</option>
                 
                  
                  
            </select>
        </div>
    )
}


