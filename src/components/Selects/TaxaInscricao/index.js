


import React,{useState,useEffect} from 'react'
import styles from './style.module.css'

import api from '../../../services/api'

const Estado=['activo','inactivo']
export default function TaxaInscricaoComponent({width,setValue,padding,LocalSelecionado,display,marginTop,labelName,marginTopContainer,corValidade}){
 
    const [escolas, setEscolas]=useState([])
    const [seleciona]=useState('63a4a6e8720c9ddaaaf559d7')

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
                
                  <option value="selecione">selecione</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="400">400</option>
                  <option value="500">500</option>
                  <option value="600">600</option>
                  <option value="700">700</option>
                  <option value="800">800</option>
                  <option value="900">900</option>
                  <option value="1000">1000</option>
                  <option value="1100">1100</option>
                  <option value="1200">1200</option>
                  <option value="1300">1300</option>
                  <option value="1400">1400</option>
                  <option value="1500">1500</option>

                                              
                  
            </select>
        </div>
    )
}


