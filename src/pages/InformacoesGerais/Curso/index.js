

import React ,{useState,useEffect} from "react";
import styles from './style.module.css'
import avatar from '../../../assents/avatar/avatar-16.svg'
import Tabelageral from "../../../components/Tabelas/Tabelageral";

import api from "../../../services/api";

const tabelaHeader=['nome curso','valor adulto','valor crianca','duracao','desconto',]


export default function InfoCurso(){
    const [cursos,setCursos]=useState([])
     const[displayPopup,setDisplayPopup]=useState('block')
     const[displayContainer,setDisplayContainer]=useState('none')
     const [nomeCurso, setNomeCurso]=useState('')
     const [valorCursoAdulto, setvalorCursoAdulto]=useState('')
     const [valorCursoCrianca, setValorCursoCrianca]=useState('')
     const [duracao, setDuracaoCurso]=useState('')
     const [valorDescontadoAdulto, setValorDescontadoAdulto]=useState('')
     const [valorDescontadoCrianca, setValorDescontadoCrianca]=useState('')
     const [multa, setMultaCurso]=useState('')
     const [taxaMulta, setTaxaMulta]=useState('')
     const [descricaoCurso, setDescricaoCurso]=useState('')
     const [descontoCurso, setDescontoCurso]=useState('')
     
     const [sexo, setsexo]=useState('')


  
    useEffect(()=>{

        async function listarCursos(){
            try {
                const response= await api.get('/listarCursos')
                    const data= await response.data.data
                    console.log(data)
                    setCursos(data)
            } catch (error) {
                console.log(error)
            }
        }
        listarCursos()
    },[])

    async  function preencherCursos(id){
       // alert('clicou em preencher')
        //alert(id)

        let id_curso=id
        try {
            const response= await api.get(`/pesquisarCurso/${id_curso}`)
                    const data= await response.data.data
                    console.log(data)
                  setNomeCurso(data.nomeCurso)
                  setvalorCursoAdulto(data.valorCursoAdulto)
                  setValorCursoCrianca(data.valorCursoCrianca)
                  setDuracaoCurso(data.duracaoCurso)
                  setValorDescontadoAdulto(data.valorCursoAdultoDesconto)
                  setValorDescontadoCrianca(data.valorCursoCriancaDesconto)
                  setMultaCurso(data.statusMulta)
                  setTaxaMulta(data.taxaMultaCurso)
                  setDescricaoCurso(data.descricaoCurso)
                  setDescontoCurso(data.descontoCurso)
                   fecharPopup()
                    
        } catch (error) { 
            console.log(error)
        }
    }

    function fecharPopup(){
        
        let container=displayContainer
       
        if(container=='none'){
            setDisplayPopup('none')
            setDisplayContainer('block')
        }else{
            setDisplayPopup('block')
            setDisplayContainer('none')
        }
    }

    return(

     
        <>
            <div className={styles.container}
            style={{
                display:displayContainer
            }}
            >
               <div className={styles.container_info}>
                        <div className={styles.content}>
                                    <div className={styles.info_geral}>
                                        <div className={styles.top_info_geral}>
                                            <div className={styles.info}>
                                                <div className={styles.info_content}>
                                                    <h2>nome do curso</h2>
                                                    <span>{nomeCurso}</span>
                                                </div>
                                                <div className={styles.info_content}>
                                                    <h2>valor do curso adulto</h2>
                                                    <span>{valorCursoAdulto}</span>
                                                </div>
                                                <div className={styles.info_content}>
                                                    <h2>valor curso crianca</h2>
                                                    <span>{valorCursoCrianca}</span>
                                                </div>
                                                <div className={styles.info_content}>
                                                    <h2>duracao do curso</h2>
                                                    <span>{duracao}</span>
                                                </div>
                                                <div className={styles.info_content}>
                                                    <h2>desconto do curso</h2>
                                                    <span>{descontoCurso}</span>
                                                </div>
                                               
                                            </div>

                                    </div>
                                    <div className={styles.bottom_info_geral}>
                                        <div className={styles.info}>
                                            <div className={styles.info_content}>
                                                <h2>valor curso adulto descontado</h2>
                                                <span>{valorDescontadoAdulto}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>valor curso crianca descontado</h2>
                                                <span>{valorDescontadoCrianca}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>multa do curso</h2>
                                                <span>{multa}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>taxa multa do curso</h2>
                                                <span>{taxaMulta}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>descricao do curso</h2>
                                                <span>{descricaoCurso}</span>
                                            </div>
                                            
                                        </div>
                                        
                                    </div>
                                        
                                        
                        </div>
                                    
                                    
                        </div>


                      
               </div>
               <div className={styles.search_button}>
                    <button onClick={fecharPopup} type="button">pesquisar estudante</button>
               </div>
                    
            </div>

           
            <div className={styles.popup_container}
            style={{
                display:displayPopup
            }}
            >
                    <div className={styles.tabela}>
                        <div className={styles.search_container}>
                            <input type='search' placeholder="pesquisar estudante" />
                            <div className={styles.close_button}>
                                <button onClick={fecharPopup} type='button'>fechar</button>
                            </div>
                        </div>
                        <Tabelageral width='100%' height='100%'
                                        list={tabelaHeader}
                                        tbody={cursos.map((curso)=>{
                                            return(
                                                <tr onClick={()=>{preencherCursos(curso._id)}}  key={curso._id}>
                                                    <td>{curso.nomeCurso}</td>
                                                    <td>{curso.valorCursoAdulto}</td>
                                                    <td>{curso.valorCursoCrianca}</td>
                                                    <td>{curso.duracaoCurso}</td>
                                                    <td>{curso.descontoCurso}</td>
                                                    
                                                   
                                                </tr>
                                            )
                                        
                                        })}
                                    />
                    </div>
            </div>
       </>
    )
}