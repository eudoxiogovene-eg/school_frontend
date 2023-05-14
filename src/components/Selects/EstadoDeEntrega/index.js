


import React,{useState,useEffect} from 'react'
import styles from './style.module.css'

import api from '../../../services/api'

const Estado=['pendente','entregue']
export default function EstadoDEEntrega({width,setValue,padding,estadoSelecionado,display,marginTop,labelName,marginTopContainer,corValidade}){
 

    let corBorder= corValidade || '#FF5677'
    let corLetras=corValidade || '#000'

    const [escolas, setEscolas]=useState([])
    const [seleciona]=useState('63a4a6e8720c9ddaaaf559d7')

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
            <select style={{
                width:width,
                padding:padding,
                marginTop:marginTop,
                border:`1px solid ${corBorder}`,
                color:corLetras
            }}
            value={estadoSelecionado}
             onChange={(e)=>setValue(e.target.value)}
             
            >
                  <option value=''>selecione</option>
                
                  {Estado.map((estado,index)=>{
                    return(
                        <option key={index} value={estado}>{estado}</option>
                        
                    )
                  })}
                  
            </select>
        </div>
    )
}


