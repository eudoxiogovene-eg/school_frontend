
import React, {useEffect, useState} from "react";
import styles from './style.module.css'

import HeaderComponenr from "../../../components/HeaderComponent";

import NammePage from "../../../components/NamePage";
import FilterInput from "../../../components/Input/FilterInput";
import Tabelageral from "../../../components/Tabelas/Tabelageral";
import ImageStudent from "../../../components/ImageStudent";
import ButtaoComponent from "../../../components/Butao";
import Select from "../../../components/Selects/Select";
import InputGeral from "../../../components/Input/InputGeral";
import TextArea from "../../../components/TextArea";

import CursoSelect from "../../../components/Selects/Cursos";
import NiveisComponent from "../../../components/Selects/Niveis";
import api from "../../../services/api";
import Popup from "../../../components/Popups/Popup";
import PopupMessage from "../../../components/Popups/PopupMessage";

const tabelaHeader=['nome manual','valor unitario','nivel manual','quantidade disponivel','curso manual','descricao manual']


export default function Manuais(){


    const [manuais,setManuais]=useState([])
    const [manuaisVendidos,setManuaisVendidos]=useState([])

    const [nomeManual, setNomeManual]=useState('')
    const [valorManual, setValorManual]=useState('')
    const [nivelManual, setNivelManual]=useState('')
    const [quantidadeManual, setQuantidadeManual]=useState('')
    const [CursoManual, setCursoManual]=useState('')
    const [descricacaoManual, setDescricaoManual]=useState('')
    const [idManual, setIdManual]=useState('')
    

   

    const user=localStorage.getItem('user')
    const userData=JSON.parse(user)
    const token=userData.token
    const usuario=userData.user.username

    const[corNomeManual, setCorNomeManual]=useState("")
    const[corValorManual, setCorValorManual]=useState("")
    const[corNivelManual, setCorNivelManual]=useState("")
    const[corQuantidade, setCorQuantidade]=useState("")
    const[corCurso, setCorCurso]=useState("")
    

    const [errorCor,setErrorCor]=useState("yellow")

    
    const [evento, setEvento]=useState(null)

  const[displayPopup,setDisplayPopup]=useState('none')
   const[displayContainer,setDisplayContainer]=useState('block')
   const [confirmPopup,setConfirmPopup]=useState('none')
   const [messageConfirmPopup,setMessageConfirmPopup]=useState('none')
   const [infoPopup,setInfoPopup]=useState('none')
   const [messageInfoPopup,setMessafeInfoPopup]=useState('')

   const [totalManuaisVendidos,setTotalManuaisVendidos]=useState(0)
   const [manuaisEntregues, setManuaisEntregues]=useState(0)
   const [manuaisPendentes,setManuaisPendentes]=useState(0)

   async function cadastrarManual(){
    closeConfirmPopup()
    
    
    const dados={
        nomeManual,valorManual,nivelManual,quantidadeManual,
        CursoManual,descricacaoManual
    }
      try {
        const response= await api.post('/cadastrarmanual',
        dados,{
          headers:{
              Authorization:`Bearer ${token}`
          }
      })
      const data= await response.data.data
   console.log(data)
      } catch (error) {
        console.log(error.response)
      }
   }

async  function preencherManual(id){
    //alert('clicou em preencher')
    //alert(id)
    fecharPopup()
     if(!id){
        return alert("selecione um manual")
     }
    try {
        const response= await api.get(`/pesquisarmanual/${id}`)
                const data= await response.data.data
                console.log(data)
                setNomeManual(data.nomeManual)
                setValorManual(data.valorManual)
                setNivelManual(data.nivelManual)
                setQuantidadeManual(data.quantidadeManual)
                setCursoManual(data.CursoManual._id)
                setDescricaoManual(data.descricacaoManual)
                console.log(CursoManual)
              
                setIdManual(data._id)
               //fecharPopup()
                
    } catch (error) { 
        console.log(error.response.data)
    }
}

async function editarManual(){
  //  alert("chegou aqui")
    closeConfirmPopup()
   const id= idManual
   if(!id){
    return alert("selecione um manual")
   }
    
   const dados={
    nomeManual,valorManual,nivelManual,quantidadeManual,
    CursoManual,descricacaoManual
   }
    try {
        const response= await api.put('/editarmanual/'+id,
        dados)
    const data= await response.data.data
    console.log(data)
    alert("dados editados com sucess")
    } catch (error) {
        console.log(error)
        console.log(error.response)
    }
   
   
}

async function deletarManual(){
    //alert("clicou em deletar manual")

    closeConfirmPopup()
    const id= idManual
    if(!id){
     return alert("selecione um manual")
    }

    try {
        const response= await api.delete('/deletarmanual/'+id)
    const data= await response.data.data
    console.log(data)
    alert("manual deletado com sucesso")
    } catch (error) {
        console.log(error)
        console.log(error.response)
    }
}

useEffect(()=>{

    async function listarVendas(){
        try {
            const response= await api.get('/listarvendas')
                const data= await response.data.data
                console.log(data)
                setManuaisVendidos(data)
                setTotalManuaisVendidos(data.length)

                let manuaisEntregues2
                manuaisEntregues2= await data.filter((manual)=>{
                     return manual.statusEntrega =="entregue"
                 })
                 console.log(manuaisEntregues2)
                setManuaisEntregues(manuaisEntregues2.length)

                  let manuaisPendentes2
                  manuaisPendentes2= await data.filter((manual)=>{
                      return manual.statusEntrega =='pendente'
                  })
                  console.log(manuaisPendentes2)
                  setManuaisPendentes(manuaisPendentes2.length)
        } catch (error) {
            console.log(error)
        }
    }
    listarVendas()
},[])


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


function validardados(){
    let errors=[]
    if(!nomeManual || nomeManual=="" || nomeManual==undefined || nomeManual==null){
        setCorNomeManual(errorCor)
        errors.push('error')
    }
    if(!valorManual || valorManual=="" || valorManual==undefined || valorManual==null){
        setCorValorManual(errorCor)
        errors.push('error')
    }
    if(!nivelManual || nivelManual=="" || nivelManual==undefined || nivelManual==null){
        setCorNivelManual(errorCor)
        errors.push('error')
    }
    if(!quantidadeManual || quantidadeManual=="" || quantidadeManual==undefined || quantidadeManual==null){
        setCorQuantidade(errorCor)
        errors.push('error')
    }
    if(!CursoManual || CursoManual=="" || CursoManual==undefined || CursoManual==null){
        setCorCurso(errorCor)
        errors.push('error')
    }

     if(errors.length>=1){
         closeConfirmPopup()
         setMessafeInfoPopup("preencha todos campos obrigatorios!")
         abrirInfoPopup()
         return 
     }
}

useEffect(()=>{
    function actualizarCor(){
        if(nomeManual){
            setCorNomeManual('')
            
        }
        if(valorManual){
            setCorValorManual('')
           
        }
        if(nivelManual){
            setCorNivelManual('')
            
        }
        if(quantidadeManual){
            setCorQuantidade('')
           
        }
        if(CursoManual ){
            setCorCurso('')
            
        }
    }
    actualizarCor()
},[nomeManual,valorManual,nivelManual,quantidadeManual,CursoManual])

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
function fecharInfoPopup(){
    setInfoPopup('none')
}
function abrirInfoPopup(){
    setInfoPopup('block')
}
function openConfirmPopup(){
    setConfirmPopup('block')
}
function closeConfirmPopup(){
    setConfirmPopup('none') 
}




function eventCadastrarManual(){
    openConfirmPopup()
    setMessageConfirmPopup('DESEJA CADASTRAR ESTE manual')
    setEvento('cadastrarManual')
    validardados()
}

function eventEditarManual(){
    openConfirmPopup()
    setMessageConfirmPopup('DESEJA editar ESTE manual')
    setEvento('editarManual')
    validardados()
}
function eventDeletarManual(){
    openConfirmPopup()
    setMessageConfirmPopup('DESEJA deletar ESTE manual')
    setEvento('deletarManual')
    
}



function chooseOptionFunction(){
     if(evento=="cadastrarManual"){
        return cadastrarManual() 
     }

     

     if(evento=="editarManual"){
         return editarManual()
      }


      if(evento=="deletarManual"){
         return deletarManual()
      }

    //  if(evento=="exclu"){
    //     return actualizarFoto()
    //  }
}

    return(
        <>
        <div className={styles.container} style={{display:displayContainer}} >
            
        <div className={styles.content}>
            <div className={styles.user_header}>
                <HeaderComponenr 
                 title1='manuais vendidos' 
                 title2='manuais entregues' 
                 title3='manuais pendentes' 
                
                 
                 dados1={totalManuaisVendidos}
                 dados2={manuaisEntregues}
                 dados3={manuaisPendentes}
                />
            </div>
            <div className={styles.bottom_container}>
                <div className={styles.form_container}>
                        <div className={styles.content_form}>
                            <div className={styles.form}>
                                <div className={styles.form_Contain}>
                                    <InputGeral 
                                    width='95%' 
                                    padding={7.3} 
                                    inputName='nome do manual'
                                    setValue={setNomeManual}
                                    value={nomeManual}
                                    corValidade={corNomeManual}
                                    />
                                    <InputGeral width='95%' padding={7.3} 
                                    inputName='valor do manual'
                                    setValue={setValorManual}
                                    value={valorManual}
                                    corValidade={corValorManual}
                                    />
                                    <div className={styles.select_container}>
                                        <NiveisComponent 
                                            nome='curso'
                                            width='92%' padding={7.3} 
                                            display='block'
                                            setValue={setNivelManual}
                                            LocalSelecionado={nivelManual}
                                            corValidade={corNivelManual}
                                            />
                                   </div>
                                </div>
                                <div className={styles.form_Contain}>
                                    <InputGeral width='95%' padding={7.3} inputName='quantidade'
                                    setValue={setQuantidadeManual}
                                    value={quantidadeManual}
                                    corValidade={corQuantidade}
                                    />
                                    <InputGeral
                                     width='95%' 
                                     padding={7.3} 
                                     inputName='nome do usuario' 
                                     value={usuario}  />
                                   <div className={styles.select_container}>
                                        <CursoSelect 
                                            nome='curso'
                                            width='92%' padding={7.3} 
                                            display='block'
                                            setValue={setCursoManual}
                                            LocalSelecionado={CursoManual}
                                            corValidade={corCurso}
                                            />

                                   </div>
                                </div>
                             
                                <div className={styles.form_Contain}>
                                    <div className={styles.text_area}>
                                         <TextArea name='descricao do cuso' width='90%' height={180}
                                         value={descricacaoManual}
                                         setValue={setDescricaoManual}
                                         />
                                    </div>
                                </div>
                                
                            </div>
                           
                        </div>
                    </div>
            </div>
            <div className={styles.action_button_container}>
                <div className={styles.action_button_action_content}>
                    <div className={styles.button_contain}>
                        <div className={styles.button_area}>
                            <div className={styles.button_area_click}>
                                     <ButtaoComponent width={270} text='cadastrar manual' padding={10}
                                     event={eventCadastrarManual}
                                     />
                                     
                            </div>
                            <div className={styles.button_area_click}>
                                     <ButtaoComponent width={270} text='pesquisar manual' padding={10} event={fecharPopup} />
                            </div>
                        </div>
                        <div className={styles.button_area}>
                            <div className={styles.button_area_click}>
                                     <ButtaoComponent width={270} text='editar manual' padding={10} event={eventEditarManual}  />
                            </div>
                            <div className={styles.button_area_click}>
                                     <ButtaoComponent width={270} text='excluir manual' padding={10} event={eventDeletarManual}  />
                            </div>
                        </div>
                        <div className={styles.button_area}>
                            <div className={styles.button_area_click}>
                                     <ButtaoComponent width={270} text='cadastrar usuario' padding={10}/>
                            </div>
                            <div className={styles.button_area_click}>
                                     <ButtaoComponent width={270} text='cadastrar usuario' padding={10}/>
                            </div>
                        </div>
                        <div className={styles.button_area}>
                            <div className={styles.button_area_click}>
                                     <ButtaoComponent width={270} text='cadastrar usuario' padding={10}/>
                            </div>
                            <div className={styles.button_area_click}>
                                     <ButtaoComponent width={270} text='cadastrar usuario' padding={10}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

           
          
        </div>
        </div>

        <div className={styles.popup} style={{display:displayPopup}}>
            <div className={styles.close_button_and_search_area}>
                <div className={styles.search_area}>
                        <FilterInput width='60%' padding={8}/>
                </div>    
                <div className={styles.close_button}>
                    <span  onClick={fecharPopup}>fechar</span>
                </div>
            </div>

            <div className={styles.table}>
                <Tabelageral width='100%' height='100%'
                                        list={tabelaHeader}
                                        tbody={manuais.map((manual)=>{
                                            return(
                                                <tr onClick={()=>{preencherManual(manual._id)}}   key={manual._id}>
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

        <div className={styles.confirm_popup}  style={{display:confirmPopup}}>
            <Popup display={confirmPopup}
            eventClose={closeConfirmPopup}
            message={messageConfirmPopup}
            event={chooseOptionFunction}
            />
        </div>


        <div className={styles.infoPopup}  style={{display:infoPopup}}>
            <PopupMessage display={infoPopup}
            eventClose={closeConfirmPopup}
            message={messageInfoPopup}
            event={fecharInfoPopup}
            />
        </div>
        </>
    )
}