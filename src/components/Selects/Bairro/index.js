
import React,{useState,useEffect} from 'react'
import styles from './style.module.css'

import api from '../../../services/api'
export default function Bairro({width,setValue,padding,estadoSelecionado,display,marginTop}){
    


    const [bairros, setBairros]=useState([])
    useEffect(()=>{
        async function listarBairros(){
            try {
                const response= await api.get('/listarbairros')
                const data= await response.data.data
                console.log(data)
                setBairros(data)
                console.log(bairros)
                
            } catch (error) {
                console.log('houve um erro')
                console.log(error)
            }
        }

        listarBairros()
    },[])
    return(
        <div className={styles.container}
        
        style={{
            display:display,
            alignItems:'center'
        }}
        >
            <label
            style={{display:'flex'}}
            >bairro</label>
            <select 
            style={{
                width:width,
                padding:padding,
                marginTop:marginTop
            }}
             onChange={(e)=>setValue(e.target.value)}
             value={estadoSelecionado}
            >
                  <option value=''>selecione</option>
                {bairros.map((bairro)=>(
                  
                  <option key={bairro._id} value={bairro._id}>{bairro.nomeBairro}</option>
                ))}
            </select>
        </div>
    )
}