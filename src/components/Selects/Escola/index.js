


import React,{useState,useEffect} from 'react'
import styles from './style.module.css'

import api from '../../../services/api'
export default function Escola({width,setValue,padding,estadoSelecionado,display,marginTop,LocalSelecionado,corValidade}){
 

    let corBorder= corValidade || '#FF5677'
    let corLetras=corValidade || '#000'

    const [escolas, setEscolas]=useState([])
    const [seleciona]=useState('63a4a6e8720c9ddaaaf559d7')
    useEffect(()=>{
        async function listarEScola(){
            try {
                const response= await api.get('/listarescolas')
                const data= await response.data.data
                console.log(data)
                setEscolas(data)
                
            } catch (error) {
                console.log('houve um erro')
                console.log(error)
            }
        }

        listarEScola()
    },[])
    return(
        <div className={styles.container}
        style={{
            display:display,
            alignItems:'center',

        }}
        >
            <label
            style={{display:'flex',color:corLetras}}
            >escola</label>
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
                
                  {escolas.map((escola)=>(
                  
                  <option key={escola._id} value={escola._id}>{escola.nomeEscola}</option>
                ))}
                  
            </select>
        </div>
    )
}


