
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


const tabelaHeader=['nome do bairro','cidade','codigo do bairro']



export default function Bairros(){
    const [nomeBairro, setNomeBairro]=useState('')
    const [cidade,setCidade]=useState('')
    const [visiblePopup,setVisiblePopup]=useState('none')
    const [bairros,setBairros]=useState([])
    const [idBairro, setidBairro]=useState('')

    const[displayPopup,setDisplayPopup]=useState('none')
    const[displayContainer,setDisplayContainer]=useState('block')
    const [confirmPopup,setConfirmPopup]=useState('none')
    const [messageConfirmPopup,setMessageConfirmPopup]=useState('none')
    const [infoPopup,setInfoPopup]=useState('none')
    const [messageInfoPopup,setMessafeInfoPopup]=useState('')

    const [evento, setEvento]=useState(null)
 




    useEffect(()=>{
        async function listarBairros(){
            try {
                const response= await api.get('/listarbairros')
                const data= await response.data.data
                console.log(data)
                setBairros(data)
            } catch (error) {
                console.log('houve um erro')
                console.log(error)
                const resultError=error.response.data.message
                setMessafeInfoPopup(resultError)
                abrirInfoPopup()
            }
        }

        listarBairros()
    },[])



    async  function cadastrarBairro(){
        closeConfirmPopup()
            const dados={
                nomeBairro,
                cidade
            }
        try {   
        const response= await api.post('/cadastarbairro',
              dados)

       console.log(response)
        setCidade('')
        setNomeBairro('')   
        setMessafeInfoPopup("bairro cadastrado com sucesso")
            abrirInfoPopup()
        } catch (error) {
            
            console.log(error)
            const resultError=error.response.data.message
            setMessafeInfoPopup(resultError)
                abrirInfoPopup()
        }
        
    }
    async function preencherDadosBairro(id){
       
        
        if(!id){
         return alert("selecione um bairro")
        }
         try {
             const response= await api.get(`/pesquisarbairro/${id}`)
                     const data= await response.data.data
                     console.log(data)
                   setNomeBairro(data.nomeBairro)
                   setCidade(data.cidade)
                   setidBairro(data._id)
                    
                     
         } catch (error) { 
             console.log(error)
             const resultError=error.response.data.message
             setMessafeInfoPopup(resultError)
             abrirInfoPopup()
         }
    }
    async function editarBairro(){
        closeConfirmPopup()
       
        closeConfirmPopup()
        const id=idBairro
        
        if(!id){
          
            setMessafeInfoPopup("selecione um bairro")
            abrirInfoPopup()
            return 
        }

        const dados={
            nomeBairro,
            cidade
        }

        try {
            const response= await api.put('/actualizarbairro/'+id,dados)
            console.log(response.data)
            alert("bairro editada com sucesso")
        } catch (error) {
            console.log(error)
            console.log(error.response.data)
        }
    }
    async function listarEscolas(){
        try {
            const response= await api.get('/listarbairros')
            const data= await response.data.data
            console.log(data)
            setBairros(data)
        
        } catch (error) {
            console.log('houve um erro')
            console.log(error)
        }
    }

    function validarDados(){
        let errors=[]
        if(!nomeBairro || nomeBairro=="" || nomeBairro==undefined || nomeBairro==null){
            errors.push('error')
        }
        if(!cidade || cidade=="" || cidade==undefined || cidade==null){
            errors.push('error')
        }
       
        if(errors.length>=1){
            closeConfirmPopup()
            setMessafeInfoPopup("preencha todos campos obrigatorios!")
            abrirInfoPopup()
            return 
        }
    }


    function eventCadastrarBairro(){
        openConfirmPopup()
        setMessageConfirmPopup('DESEJA CADASTRAR ESte bairro')
        setEvento('cadastrarBairro')
       validarDados()
    }
    function eventEditarDadosBairro(){
        openConfirmPopup()
        setMessageConfirmPopup('DESEJA editar dados deste bairro')
        setEvento('editarBairro')
        validarDados()
        
    }
  
    function chooseOptionFunction(){
        if(evento=="cadastrarBairro"){
           return cadastrarBairro()
        }

        if(evento=="editarBairro"){
            return editarBairro()
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
                        namepage='tela de cadastro de bairros'
                         padding={6} 
                         background='#fff'
                         borderColor='#0c0ce94d'
                         />
                   </div>
                    
                </div>
                <div className={styles.tabela}>
                     <Tabelageral 
                     list={tabelaHeader} 
                     listBody={bairros}
                     width='100%' height={200}
                     
                     tbody={bairros.map((bairro)=>{
                         return(
                             <tr onClick={()=>{preencherDadosBairro(bairro._id)}} key={bairro._id}>
                                 <td>{bairro.nomeBairro}</td>
                                 <td>{bairro.cidade}</td>
                                 <td>{bairro._id}</td>
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
                                    <InputGeral width={250} padding={7.3} inputName='nome do bairro'
                                     setValue={setNomeBairro}
                                     value={nomeBairro}

                                    />
                                </div>
                                <div className={styles.input}>
                                    <InputGeral width={250} padding={7.3} inputName='cidade'
                                    setValue={setCidade}
                                    value={cidade}
                                    />
                                </div>
                            </div>
                            <div className={styles.button_group}>
                                <div className={styles.button_content}>
                                        <div className={styles.button}>
                                            <ButtaoComponent width={260} padding={8} text='cadastrar bairro'
                                            
                                            event={eventCadastrarBairro}
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
                                            <ButtaoComponent width={260} padding={8} text='ediatr bairro'  
                                            event={eventEditarDadosBairro}
                                            />
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