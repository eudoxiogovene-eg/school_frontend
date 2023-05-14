


import React,{useState,useEffect} from 'react'
import styles from './style.module.css'

import api from '../../../services/api'



export default function CursoSelect({width,setValue,padding,LocalSelecionado,display,marginTop,nome,corValidade}){
 
    const [cursos, setCursos]=useState([])
    let corBorder= corValidade || '#FF5677'
    let corLetras=corValidade || '#000'
    useEffect(()=>{
        async function listarCursos(){
            try {
                const response= await api.get('/listarCursos')
                const data= await response.data.data
                console.log(data)
                setCursos(data)
                
            } catch (error) {
                console.log('houve um erro')
                console.log(error)
            }
        }

        listarCursos()
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
            >{nome}</label>
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
                
                  {cursos.map((curso)=>(
                  
                  <option key={curso._id} value={curso._id}>{curso.nomeCurso}</option>
                ))}
                  
            </select>
        </div>
    )
}


