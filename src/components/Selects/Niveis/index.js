


import React,{useState,useEffect} from 'react'
import styles from './style.module.css'

import api from '../../../services/api'



export default function NiveisComponent({width,setValue,padding,LocalSelecionado,display,marginTop,corValidade}){
 
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
            >nivel</label>
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
                  <option value=''>selecione</option>
                  <option value="1º nivel">1º nivel</option>
                  <option value="2º nivel">2º nivel</option>
                  <option value="3º nivel">3º nivel</option>
                  <option value="4º nivel">4º nivel</option>
                  <option value="5º nivel">5º nivel</option>
                  <option value="6º nivel">6º nivel</option>
                  <option value="7º nivel">7º nivel</option>
                  <option value="8º nivel">8º nivel</option>
                  <option value="9º nivel">9º nivel</option>
                  <option value="todos niveis">todos niveis</option>
                  
            </select>
        </div>
    )
}


