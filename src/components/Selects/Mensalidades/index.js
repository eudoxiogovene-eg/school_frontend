
import React,{useState,useEffect} from 'react'
import styles from './style.module.css'

import api from '../../../services/api'
export default function Meses({width,setValue,padding,LocalSelecionado,display,marginTop,corValidade}){
    
    let corBorder= corValidade || '#FF5677'
    let corLetras=corValidade || '#000'

    const [meses, setMeses]=useState([])
    useEffect(()=>{
        async function listarMeses(){
            try {
                const response= await api.get('/listarmeses')
                const data= await response.data.data
                console.log(data)
                setMeses(data)
                console.log(meses)
                
            } catch (error) {
                console.log('houve um erro')
                console.log(error)
            }
        }

        listarMeses()
    },[])
    return(
        <div className={styles.container}
        
        style={{
            display:display,
            alignItems:'center'
        }}
        >
            <label
            style={{display:'flex',color:corLetras}}
            >mensalidade</label>
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
                {meses.map((mes)=>(
                  
                  <option key={mes._id} value={mes._id}>{mes.mes}</option>
                ))}
            </select>
        </div>
    )
}