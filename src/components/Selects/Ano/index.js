
import React,{useState,useEffect} from 'react'
import styles from './style.module.css'

import api from '../../../services/api'
export default function Ano({width,setValue,padding,LocalSelecionado,display,marginTop,corValidade}){
    

    let corBorder= corValidade || '#FF5677'
    let corLetras=corValidade || '#000'
  const Data=new Date()
  const ano=Data.getFullYear()
  const anoLimitePosetivo=ano+1
  const anoLimiteNegativo=ano-5

  const anos=[]
  for(var i=anoLimiteNegativo;i<anoLimitePosetivo;i++){
    anos.push(i)
  }
  

  console.log(ano,anoLimiteNegativo,anoLimitePosetivo,anos)

 
  
    return(
        <div className={styles.container}
        
        style={{
            display:display,
            alignItems:'center'
        }}
        >
            <label
            style={{display:'flex',color:corLetras}}
            >ano a pagar</label>
            <select 
            style={{
                width:width,
                padding:padding,
                marginTop:marginTop,
                border:`1px solid ${corBorder}`,
                color:corLetras
            }}
             onChange={(e)=>setValue(e.target.value)}
             value={LocalSelecionado}
            >
                  <option value=''>selecione</option>
                {anos.map((ano,index)=>(
                  
                  <option key={index} value={ano}>{ano}</option>
                ))}
            </select>
        </div>
    )
}