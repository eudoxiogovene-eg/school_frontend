
import React,{useState,useEffect} from "react";
import styles from './style.module.css'

import Tabelageral from "../../../components/Tabelas/Tabelageral";
import NammePage from "../../../components/NamePage";
import FilterInput from "../../../components/Input/FilterInput";
import InputGeral from "../../../components/Input/InputGeral";
import ButtaoComponent from "../../../components/Butao";
import Popup from "../../../components/Popups/Popup";
import PopupMessage from "../../../components/Popups/PopupMessage";

import api from "../../../services/api";


const tabelaHeader=['nomeEscola','localizacao','codigoDaEscola']



export default function Escolas(){
    const [nomeEscola, setNomeEscola]=useState('')
    const [localizacao,setLocalizacao]=useState('')
    const [visiblePopup,setVisiblePopup]=useState('none')
    const [escolas,setEscolas]=useState([])
    const [idEscola, setIdEscola]=useState('')
    const [escolasTransformadasPraArray,setEscolasTransformadasPraArray]=useState([])

    const[displayPopup,setDisplayPopup]=useState('none')
    const[displayContainer,setDisplayContainer]=useState('block')
    const [confirmPopup,setConfirmPopup]=useState('none')
    const [messageConfirmPopup,setMessageConfirmPopup]=useState('none')
    const [infoPopup,setInfoPopup]=useState('none')
    const [messageInfoPopup,setMessafeInfoPopup]=useState('')

    const [evento, setEvento]=useState(null)

  

   

    function ObjectToArray(){
        const newEscolas=[]
        console.log(newEscolas)
        escolas.map((escola)=>{
            const newEscola=[]
            newEscola.push(escola.nomeEscola)
            newEscola.push(escola.localizacao)
            newEscola.push(escola._id)
            newEscolas.push(newEscola)

        })
        setEscolasTransformadasPraArray(newEscolas)
        
    }

    async  function cadastrarEscola(){
        // //alert("cadastrando escola")
        // console.log(nomeEscola)
        // console.log(localizacao)
       
        closeConfirmPopup()
        try {
            

        const response= await api.post('/cadastrarescola',{
            nomeEscola,
            localizacao
        })

       console.log(response)
        alert("escola cadastrada com sucesso")
        setLocalizacao('')
        setNomeEscola('')
        } catch (error) {
            
            console.log(error)
        }
        
    }
    function validarDados(){
        let errors=[]
        if(!nomeEscola || nomeEscola=="" || nomeEscola==undefined || nomeEscola==null){
            errors.push('error')
        }
        if(!localizacao || localizacao=="" || localizacao==undefined || localizacao==null){
            errors.push('error')
        }
       
        if(errors.length>=1){
            closeConfirmPopup()
            setMessafeInfoPopup("preencha todos campos obrigatorios!")
            abrirInfoPopup()
            return 
        }
    }

    async function listarEscolas(){
        try {
            const response= await api.get('/listarescolas')
            const data= await response.data.data
            console.log(data)
            setEscolas(data)
            ObjectToArray()
        } catch (error) {
            console.log('houve um erro')
            console.log(error)
        }
    }

    async function editarEscola(){
       
        closeConfirmPopup()
        const id=idEscola
        
        if(!id){
            return alert("selecione uma escola")
        }

        const dados={
            nomeEscola,
            localizacao
        }

        try {
            const response= await api.put('/escola/'+id,dados)
            console.log(response.data)
            alert("escola editada com sucesso")
        } catch (error) {
            console.log(error)
            console.log(error.response.data)
        }
        
    }
    

    async function preencherDadosEscola(id){
       
        
       if(!id){
        return alert("selecione uma escola")
       }
        try {
            const response= await api.get(`/escola/${id}`)
                    const data= await response.data.data
                    console.log(data)
                  setNomeEscola(data.nomeEscola)
                  setLocalizacao(data.localizacao)
                  setIdEscola(data._id)
                   
                    
        } catch (error) { 
            console.log(error)
        }
    }


    function eventCadastrarEscola(){
        openConfirmPopup()
        setMessageConfirmPopup('DESEJA CADASTRAR ESTa escola')
        setEvento('cadastrarEscola')
       validarDados()
    }
    function eventEditarDadosEscola(){
        openConfirmPopup()
        setMessageConfirmPopup('DESEJA editar dados desta escola')
        setEvento('editarEscola')
        validarDados()
        
    }
  
    function chooseOptionFunction(){
        if(evento=="cadastrarEscola"){
           return cadastrarEscola()
        }

        if(evento=="editarEscola"){
            return editarEscola()
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



    return(
        <>  
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
        <div className={styles.container} >
            <div className={styles.content}>
                <div className={styles.header_container_table}>
                    <div className={styles.filtro}>
                        <FilterInput width='100%'
                         />
                    </div>
                   <div className={styles.namepage}>
                        <NammePage 
                        width='100%' 
                        namepage='tela de cadastro de escola'
                         padding={6} 
                         background='#fff'
                         borderColor='#0c0ce94d'
                         />
                   </div>
                    
                </div>
                <div className={styles.tabela}>
                     <Tabelageral 
                     list={tabelaHeader} 
                     listBody={escolas}
                     width='100%' height={200}
                     
                     tbody={escolas.map((escola)=>{
                         return(
                             <tr onClick={()=>{preencherDadosEscola(escola._id)}} key={escola._id}>
                                 <td>{escola.nomeEscola}</td>
                                 <td>{escola.localizacao}</td>
                                 <td>{escola._id}</td>
                             </tr>
                         )
                        
                     })}
                     />
                </div>

                <div className={styles.action_button}>
                    <div className={styles.action_button_container}>
                        <div className={styles.contain}>
                            <div className={styles.input_group}>
                                <div className={styles.input}>
                                    <InputGeral width={250} padding={7.3} inputName='nome da escola'
                                     setValue={setNomeEscola}
                                     value={nomeEscola}

                                    />
                                </div>
                                <div className={styles.input}>
                                    <InputGeral width={250} padding={7.3} inputName='localizacao'
                                    setValue={setLocalizacao}
                                    value={localizacao}
                                    />
                                </div>
                            </div>
                            <div className={styles.button_group}>
                                <div className={styles.button_content}>
                                        <div className={styles.button}>
                                            <ButtaoComponent width={260} padding={8} text='cadastrar'
                                            
                                            event={eventCadastrarEscola}
                                            />
                                        </div>

                                        <div className={styles.button}>
                                            <ButtaoComponent  width={260} padding={8} text='listar escolas'
                                            event={listarEscolas}
                                            />
                                        </div>
                                </div>
                                <div className={styles.button_content}>
                                        <div className={styles.button}>
                                            <ButtaoComponent width={260} padding={8} text='editar escola' event={eventEditarDadosEscola}   />
                                        </div>

                                        <div className={styles.button}>
                                            <ButtaoComponent  width={260} padding={8} text='cadastrar' />
                                        </div>
                                </div>
                                <div className={styles.button_content}>
                                        <div className={styles.button}>
                                            <ButtaoComponent width={260} padding={8} text='cadastrar'/>
                                        </div>

                                        <div className={styles.button}>
                                            <ButtaoComponent  width={260} padding={8} text='cadastrar' />
                                        </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        </>
    )
}