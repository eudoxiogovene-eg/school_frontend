

import React ,{useState,useEffect} from "react";
import styles from './style.module.css'
import avatar from '../../../assents/avatar/avatar-16.svg'
import Tabelageral from "../../../components/Tabelas/Tabelageral";

import api from "../../../services/api";

const tabelaHeader=['nome manual','valor unitario','nivel manual','quantidade disponivel','curso manual','descricao manual']


export default function InfoManual(){
    const [manuais,setManuais]=useState([])
    
     
     const [sexo, setsexo]=useState('')


  
    useEffect(()=>{

        async function listarManuais(){
            try {
                const response= await api.get('/listarmanuais')
                    const data= await response.data.data
                    console.log(data)
                    setManuais(data)
            } catch (error) {
                console.log(error)
            }
        }
        listarManuais()
    },[])

   

    return(

     
        <>
            <div className={styles.popup_container}>
                    <div className={styles.tabela}>
                        
                        <Tabelageral width='100%' height='100%'
                                        list={tabelaHeader}
                                        tbody={manuais.map((manual)=>{
                                            return(
                                                <tr   key={manual._id}>
                                                    <td>{manual.nomeManual}</td>
                                                    <td>{manual.valorManual}</td>
                                                    <td>{manual.nivelManual}</td>
                                                    <td>{manual.quantidadeManual}</td>
                                                    <td>{manual.CursoManual.nomeCurso}</td>
                                                    <td>{manual.descricacaoManual}</td>
                                                    
                                                   
                                                </tr>
                                            )
                                        
                                        })}
                                    />
                    </div>
            </div>
       </>
    )
}