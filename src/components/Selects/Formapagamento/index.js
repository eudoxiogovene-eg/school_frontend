


import React,{useState,useEffect} from 'react'
import styles from './style.module.css'

import api from '../../../services/api'

const Estado=['activo','inactivo']
export default function FormaPagamentoComponent({width,setValue,padding,LocalSelecionado,display,marginTop,labelName,marginTopContainer,corValidade}){
 
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
            value={LocalSelecionado}
             onChange={(e)=>setValue(e.target.value)}
             
            >
                 <option value="">selecione</option>
                 <option value="mpesa">mpesa</option>
                 <option value="numerario">numerario</option>
                 <option value="trans_bancaria">trans_bancaria</option>
                 <option value="m-kesh">m-kesh</option>
                 <option value="e-mola">e-mola</option>

                                              
                  
            </select>
        </div>
    )
}


