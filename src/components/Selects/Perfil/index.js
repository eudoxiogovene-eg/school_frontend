


import React,{useState,useEffect} from 'react'
import styles from './style.module.css'

import api from '../../../services/api'

const Perfil=['administrador','usuario']

export default function PerfilComponent({width,setValue,padding,LocalSelecionado,display,marginTop,corValidade}){
 
  
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
            >perfil</label>
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
                
                  {Perfil.map((perfil,index)=>{
                    return(
                        <option key={index} value={perfil}>{perfil}</option>
                        
                    )
                  })}
                  
            </select>
        </div>
    )
}


