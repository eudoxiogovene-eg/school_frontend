
import React ,{useState,useEffect} from "react";
import styles from './style.module.css'
import api from "../../../services/api";
import BotaoPaginacao from "../../BotaoPaginacao";
import InputGeral from "../../Input/InputGeral";
import NiveisComponent from "../../Selects/Niveis";
import HorarioComponent from "../../Selects/Horario";
import EstadoComponent from "../../Selects/Estado";
import Escola from "../../Selects/Escola";
import CursoSelect from "../../Selects/Cursos";

import avatar  from '../../../assents/avatar/avatar-16.svg'



export default function ComponentManuais({nameScreen}){

    const [manuais,setManuais]=useState([])
    const [estudantes,setEstudantes]=useState([])
    const [lista,setLista]=useState([])
    const[displayPopup,setDisplayPopup]=useState('none')
    const[displayContainer,setDisplayContainer]=useState('flex')
    const [dadosFiltrados, setDadosFiltrados]=useState([])

    const [anoCadastro,setAnoCadastro]=useState('')
    const [estadoEstudante,setEstadoEstudante]=useState('')
    const [nivel,setNivel]=useState('')
    const [horario,setHorario]=useState('')
    const [curso,setCurso]=useState('')
    const [descontoEstudante,setDescontoEstudante]=useState('')
    const [escola,setEscola]=useState('')
 
///const [nameScreen,setNameScreen]=useState('')



    // paginacao
    const[itensPerpage,setItensperpege]=useState(4)
    const[currentPage,setCurentpage]=useState(1)

    const pages=Math.ceil(manuais.length/itensPerpage)
    const startIndex=(currentPage-1) * itensPerpage
    const endIndex= startIndex + itensPerpage
    const currentItens=manuais.slice(startIndex,endIndex)
 
   //alert(pages)


   useEffect(()=>{

    async function listarManuais(){
        try {
            const response= await api.get('/listarvendas')
                const data= await response.data.data
                console.log(data)
               
                setManuais(data)

                if(nameScreen=="activo"){
                    let estudantes2
                     estudantes2= data.filter((estudante)=>{
                        return estudante.estado=="activo"
                      })
                      
                     if(estudantes2.length==0){
                      return  alert("estudante nao encontrado")
                     }else{
                        setManuais(estudantes2)
                     }
                }
                if(nameScreen=="inactivo"){
                    let estudantes2
                     estudantes2= data.filter((estudante)=>{
                        return estudante.estado=="inactivo"
                      })


                     if(estudantes2.length==0){
                      return  alert("estudante nao encontrado")
                     }else{
                        setManuais(estudantes2)
                     }
                }
              
        } catch (error) {
            console.log(error)
        }
    }

    listarManuais()
    
},[])

 
   function nextPage(){
     setCurentpage(currentPage+1)
   }

   function prevPage(){
     setCurentpage(currentPage-1)
   }

   function lastPage(){
    setCurentpage(pages)
   }

   function firstPage(){
    setCurentpage(1)
   }





    // async function filtrarEstudante(){


    //     //   return alert('clicou')
    //     
    //             setEstudantes(estudantes2)
    //             console.log(estudantes) 
                 
    // }
      


async function filtarEstudantes(){
    const dados={
        anoCadastro,
        estadoEstudante,
        nivel,
        horario,
        curso,
        descontoEstudante,
        escola
    }

    try {
        const response= await api.post('/filtrarestudantes',
      dados)
      const data= await response.data.data
      console.log(data)
      setEstudantes(data)
      console.log(dados)
      fecharPopup()
    } catch (error) {
        console.log(error)
    }

   
}
    useEffect(()=>{
        if(currentPage<1){
            setCurentpage(currentPage+1)
         }

         if(currentPage>pages){
            setCurentpage(currentPage-1)
         }
    },[currentPage])

  

 




   

  

    

    // useEffect(()=>{
    //    actualizarPagina() 
    // },[])

    function fecharPopup(){
        
        let container=displayContainer
       
        if(container=='none'){
            setDisplayPopup('none')
            setDisplayContainer('flex')
        }else{
            setDisplayPopup('block')
            setDisplayContainer('none')
        }
    }


//   function antigaPaginacao(){
// // let perPage=2
//     // const state={
//     //     page:1,
//     //     perPage,
//     //     totalPage:Math.ceil(estudantes.length / perPage)
        
//     // }


//     // console.log(state)
  

//     // const controllers={
//     //     next(){
    
//     //         state.page++
//     //         const lastPage= state.page>state.totalPage
//     //         if(lastPage){
//     //             state.page--
//     //         }
           
           
            
         
//     //         console.log(state.page)
           
            
//     //     },
//     //     prev(){
           
//     //         state.page--

//     //         if(state.page <1){
//     //             state.page++
//     //         }
//     //         console.log(state.page)
//     //     },
//     //     goTo(page){
//     //         if(page<1){
//     //             page=1
//     //         }
//     //         state.page=page
//     //         if(page>state.totalPage){
//     //             state.page=state.totalPage
//     //         }
//     //     }
//     // }
    
//     //  function actualizarPagina(){
//     //     alert('actualizando')
//     //      console.log(estudantes.slice(1,5))
//     //      let page=state.page-1
//     //      let start=page* state.perPage
//     //      let end =start+state.perPage
//     //      console.log(state.page)
//     //      console.log(start)
//     //      console.log(end)
       
//     //     let paginiteditems=estudantes.slice(start,end)
//     //     console.log(paginiteditems)
//     //     setEstudantes(paginiteditems)
//     //  }
   
   
   
//    // console.log(state.page)
//     //controllers.next()
//     // console.log(state.page)
//     // controllers.prev()
//     // console.log(state.page)
//     // controllers.prev()
//     // controllers.goTo(-8)
//     // console.log(state.page)
//   }
    
    return(
        <div className={styles.div_geral}>
            <div className={styles.contain} style={{display:displayContainer}} >
                <div className={styles.content_geral}>
                    {currentItens.map(manual=>(
                        
                                <div key={manual._id} className={styles.container}
                                      
                                        >
                                        <div className={styles.container_info}>
                                                    <div className={styles.content}>
                                                                <div className={styles.info_geral}>
                                                                    <div className={styles.top_info_geral}>
                                                                    <div className={styles.info}>
                                                                        <div className={styles.info_content}>
                                                                            <h2>nome </h2>
                                                                            <span>{manual.codigoInscricao.nome}</span>
                                                                        </div>
                                                                        <div className={styles.info_content}>
                                                                            <h2>apelido </h2>
                                                                            <span>{manual.codigoInscricao.apelido}</span>
                                                                        </div>
                                                                        <div className={styles.info_content}>
                                                                            <h2>telefone </h2>
                                                                            <span>{manual.codigoInscricao.contactos.contactoPrincipal}</span>
                                                                        </div>
                                                                        <div className={styles.info_content}>
                                                                            <h2>curso</h2>
                                                                            <span>{manual.curso.nomeCurso}</span>
                                                                        </div>
                                                                        <div className={styles.info_content}>
                                                                            <h2>nivel</h2>
                                                                            <span>{manual.codigoCadastro.nivel}</span>
                                                                        </div>
                                                                        <div className={styles.info_content}>
                                                                            <h2>codigo estudante</h2>
                                                                            <span>{manual.codigoCadastro.codigoEstudante}</span>
                                                                        </div>
                                                                        <div className={styles.info_content}>
                                                                            <h2>data pagamento</h2>
                                                                            <span>{manual.dataPagamento}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className={styles.info}>
                                                                        <div className={styles.info_content}>
                                                                            <h2>valor manual</h2>
                                                                            <span>{manual.codigoManualId.valorManual}</span>
                                                                        </div>
                                                                        <div className={styles.info_content}>
                                                                            <h2>valor total pago</h2>
                                                                            <span>{manual.valorTotalPago}</span>
                                                                        </div>
                                                                        <div className={styles.info_content}>
                                                                            <h2>quantidade comprada</h2>
                                                                            <span>{manual.quantidade}</span>
                                                                        </div>
                                                                        <div className={styles.info_content}>
                                                                            <h2>estado entrega</h2>
                                                                            <span>{manual.statusEntrega}</span>
                                                                        </div>
                                                                        <div className={styles.info_content}>
                                                                            <h2>forma pagamento</h2>
                                                                            <span>{manual.formPagamento}</span>
                                                                        </div>
                                                                        <div className={styles.info_content}>
                                                                            <h2>nome manual</h2>
                                                                            <span>{manual.codigoManualId.nomeManual}</span>
                                                                        </div>
                                                                        <div className={styles.info_content}>
                                                                            <h2>nivel manual</h2>
                                                                            <span>{manual.codigoManualId.nivelManual}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                                    
                                                                </div>
                                                                <div className={styles.image}>
                                                                    <img src={manual.codigoInscricao.url || avatar} alt='foto do estudante' />
                                                                
                                                                </div>
                                                                
                                                    </div>


                                                
                                        </div>
                                                
                                </div>
                    ))}


                    
                </div> 
                <div className={styles.container_later}>
                        <div className={styles.filtro}
                        style={{
                            display:nameScreen=="filtro"?'block':'none'
                        }}
                        >
                                <span onClick={fecharPopup}>filtrar</span>
                        </div>
                        <div className={styles.container_filtro}>
                                <div className={styles.button}>
                                    <span onClick={firstPage} >fast</span>
                                </div>
                                <div className={styles.button}>
                                    <span onClick={prevPage} >prev</span>
                                </div>
                                <div className={styles.button}>
                                    <span className={styles.page_number}>{currentPage}</span>
                                </div>
                                <div className={styles.button}>
                                    <span onClick={nextPage} >next</span>
                                </div>
                                <div className={styles.button}>
                                    <span onClick={lastPage}>last</span>
                                </div>
                        </div>
                </div>
            </div> 

            <div className={styles.popup} style={{display:displayPopup}} >
                
                <div className={styles.input_group}>
                <InputGeral
                width='100%'
                value={anoCadastro}
                inputName='ano cadastro'
                padding={7}
                setValue={setAnoCadastro}
                />
                </div>
                <div className={styles.input_group}>
                <EstadoComponent
                width='100%'
                padding={7}
                labelName='estado'
                display='block'
                setValue={setEstadoEstudante}
                LocalSelecionado={estadoEstudante}
                />
                <NiveisComponent
                width='100%'
                padding={7}
                labelName='estado'
                display='block'
                setValue={setNivel}
                LocalSelecionado={nivel}
                />
                <HorarioComponent
                width='100%'
                padding={7}
                labelName='estado'
                display='block'
                setValue={setHorario}
                LocalSelecionado={horario}
                />
                <CursoSelect
                 width='100%'
                padding={7}
                nome='curso'
                display='block'
                setValue={setCurso}
                LocalSelecionado={curso}
                />
                <EstadoComponent
                width='100%'
                
                padding={7}
                labelName='desconto estudante'
                display='block'
                setValue={setDescontoEstudante}
                LocalSelecionado={descontoEstudante}
                />

                <Escola
                width='100%'
                inputName='ano cadastro'
                padding={7}
                labelName='estado'
                display='block'
                setValue={setEscola}
                LocalSelecionado={escola}
                />
                </div>
                <div className={styles.search_button}>
                    <button onClick={filtarEstudantes} type="button">visualizar relatorio</button>
                </div>
            </div>
        </div>
    )
}


