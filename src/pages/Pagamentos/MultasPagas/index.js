import React , {useState,useEffect} from "react";
import styles from './style.module.css'

import NammePage from "../../../components/NamePage";
import FilterInput from "../../../components/Input/FilterInput";
import Tabelageral from "../../../components/Tabelas/Tabelageral";
import ImageStudent from "../../../components/ImageStudent";
import ButtaoComponent from "../../../components/Butao";
import Select from "../../../components/Selects/Select";
import InputGeral from "../../../components/Input/InputGeral";
import FormaPagamentoComponent from "../../../components/Selects/Formapagamento";
import Popup from "../../../components/Popups/Popup";
import PopupMessage from "../../../components/Popups/PopupMessage";


import api from "../../../services/api";

const tabelaHeader=['nome','apelido','codigo estudante','curso','mes da multa','valor da multa','forma de pagamento']

export default function MultasPagas(){
   

    const [multasPagas,setMultasPagas]=useState([])

    const [nomeEstudante,setNomeEstudante]=useState('')
    const [apelido,setApelido]=useState('')
    const [nivel,setNivel]=useState('')
    const [horario,setHorario]=useState('')
    const [dataPagamento,setDataPagamento]=useState('')
    const [mesMulta,setMesMulta]=useState('')
    const [valorMulta,setValorMulta]=useState('')
    const [formaPagamento,setFormaPagamento]=useState('')
    const [idPagamento,setIdPagamento]=useState('')
    const [fotoEstudante,setFotoEstudante]=useState('')

        
    const[displayPopup,setDisplayPopup]=useState('none')
    const[displayContainer,setDisplayContainer]=useState('block')
    const [confirmPopup,setConfirmPopup]=useState('none')
    const [messageConfirmPopup,setMessageConfirmPopup]=useState('none')
    const [infoPopup,setInfoPopup]=useState('none')
    const [messageInfoPopup,setMessafeInfoPopup]=useState('')
    const [evento, setEvento]=useState(null)
    const [popupMulta, setPopupMulta]=useState('none')
    const [popupMultaMessage, setPopupMultaMessage]=useState('')
    const [infoMultaPopup, setInfoMultaPopup]=useState('')

    const [corFormaPagamento, setCorFormaPagamento]=useState('') 



    useEffect(()=>{

        async function listarPagamentosMultas(){
            try {
                const response= await api.get('/listarmultaspagas')
                    const data= await response.data.data
                    console.log(data)
                    setMultasPagas(data)
            } catch (error) {
                console.log(error) 
            }
        }
        listarPagamentosMultas()
    },[])

    async function pesquisarMultasPagas(id){
        limparCampos()
        if(!id){
            alert('selecione multa')
        }
        try {
            const response= await api.get(`/pegarpagamentomulta/${id}`)
                    const data= await response.data.data
                    console.log(data)

                    setNomeEstudante(data.codigoInscricao.nome)
                    setApelido(data.codigoInscricao.apelido)
                    setNivel(data.codigoCadastro.nivel)
                    setHorario(data.codigoCadastro.horario)
                    const [datapagamento]=data.createdAt.split("T")
                    setDataPagamento(datapagamento)
                    setMesMulta(data.mensalidade.mes)
                    setValorMulta(data.codigoIdMulta.valorMulta)
                    setFormaPagamento(data.formaPagamento)
                    setFotoEstudante(data.codigoInscricao.url)
                    setIdPagamento(data._id)

                    
        } catch (error) {
            console.log(error)
            const resultError=error.response.data.message
            setMessafeInfoPopup(resultError)
            abrirInfoPopup()
        }
    }

    async function editarPagamentoMulta(){
       closeConfirmPopup()
        const id=idPagamento
       
        const dados={
            formaPagamento
        }
        try {
            const response= await api.put(`/editarpagamentomulta/${id}`,dados)
                    const data= await response.data.data
                    console.log(data)

            if(response.status=="200"){
                setMessafeInfoPopup("pagamento de multa editado com sucesso!")
                abrirInfoPopup()
                limparCampos()
            }

                    
        } catch (error) {
            console.log(error)
            const resultError=error.response.data.message
            setMessafeInfoPopup(resultError)
            abrirInfoPopup()

        }
    }

    
    async function deletarPagamentoMulta(){
        closeConfirmPopup()
        const id=idPagamento
        if(!id){
            alert('selecione multa')
        }

        try {
            const response= await api.delete(`/deletarpagamentomulta/${id}`)
                    const data= await response.data.data
                    console.log(data)
                if(response.status=="200"){
                    
                    setMessafeInfoPopup("pagamento de multa deletado com sucesso")
                    abrirInfoPopup()
                    limparCampos()
                }

                    
        } catch (error) {
            console.log(error)
            const resultError=error.response.data.message
            setMessafeInfoPopup(resultError)
            abrirInfoPopup()
        }
    }

    function validarDados(){
        let errors=[]
        if(evento=="editarPagamentoMulta"){
            if(!formaPagamento || formaPagamento==undefined || formaPagamento==null){
                setCorFormaPagamento('blue')
                errors.push('error')
            } 
            if(errors.length>=1){
                closeConfirmPopup()
                setMessafeInfoPopup("preencha todos campos obrigatorios!")
                abrirInfoPopup()
                return 
            }
        
        }
       
        if(!idPagamento || idPagamento==undefined || idPagamento==null){
           closeConfirmPopup()
           setMessafeInfoPopup("por favor selecione um pagamento!")
           abrirInfoPopup()
           return 
        } 
       
    }

    function limparCampos(){
        setNomeEstudante("")
        setApelido("")
        setNivel("")
        setHorario("")
        setDataPagamento("")
        setMesMulta("")
        setValorMulta("")
        setFormaPagamento("")
        setFotoEstudante("")
        setIdPagamento("")
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


function eventEditarPagamentoMulta(){
    
    openConfirmPopup()
    setMessageConfirmPopup('DESEJA editar dados deste pagamento')
    setEvento('editarPagamentoMulta')
    validarDados()
}
function eventDeletarPagamentoMulta(){
    openConfirmPopup()
    setMessageConfirmPopup('DESEJA excluir este pagamento')
    setEvento('excluirPagamentoMulta')
    validarDados()
}
function chooseOptionFunction(){
    if(evento=="editarPagamentoMulta"){
       return editarPagamentoMulta()
    }
    if(evento=="excluirPagamentoMulta"){
        return deletarPagamentoMulta()
     }
}

useEffect(()=>{
    if(formaPagamento){
        setCorFormaPagamento("")
    }
 },[formaPagamento])


    return(

        <>
                <div className={styles.container}>
                        <div className={styles.container_geral}>
                            <div className={styles.top_container}>
                                <div className={styles.filter_and_namepage_container}>
                                        <div className={styles.filtro}>
                                            <FilterInput width='100%' padding={8}/>
                                        </div>
                                    <div className={styles.namepage}>
                                            <NammePage width='100%' padding={6} namepage='tela das multas pagas' />
                                    </div>
                                        
                                </div>
                                <div className={styles.table_and_image_container}>
                                    <div className={styles.tabela}>
                                    <Tabelageral width='100%' height='100%'
                                            list={tabelaHeader}
                                            tbody={multasPagas.map((multaPaga)=>{
                                                return(
                                                    <tr onClick={()=>{pesquisarMultasPagas(multaPaga._id)}}  key={multaPaga._id}>
                                                        <td>{multaPaga.codigoInscricao.nome}</td>
                                                        <td>{multaPaga.codigoInscricao.apelido}</td>
                                                        <td>{multaPaga.codigoCadastro.codigoEstudante}</td>
                                                        <td>{multaPaga.curso.nomeCurso}</td>
                                                        <td>{multaPaga.mensalidade.mes}</td>
                                                        <td>{multaPaga.codigoIdMulta.valorMulta}</td>
                                                        <td>{multaPaga.formaPagamento}</td>
                                                        
                                                    </tr>
                                                )
                                            
                                        })}
                                        />
                                    </div>
                                    
                                </div>
                            </div>
                            <div className={styles.bottom_container}>
                            <div className={styles.form_container}>
                                    <div className={styles.content_form}>
                                        <div className={styles.form}>
                                            <div className={styles.form_left}>
                                                <InputGeral width='95%' padding={7.3} inputName='nome do estudante' value={nomeEstudante}  />
                                                <InputGeral width='95%' padding={7.3} inputName='apelido' value={apelido} />
                                                <InputGeral width='95%' padding={7.3} inputName='nivel'  value={nivel}  />
                                                <InputGeral width='95%' padding={7.3} inputName='horario' value={horario} />
                                            </div>
                                            <div className={styles.form_center}>
                                                <InputGeral width='95%' padding={7.3} inputName='data pagamento' value={dataPagamento} />
                                                <InputGeral width='95%' padding={7.3} inputName='mes multa'  value={mesMulta} />
                                                <InputGeral width='95%' padding={7.3} inputName='valor multa' value={valorMulta} />
                                                <div className={styles.select_button}>
                                                    <FormaPagamentoComponent width={390}
                                                        padding={7.3} 
                                                        display='block'
                                                        labelName='forma de pagamento'
                                                        marginTopContainer={0}
                                                        setValue={setFormaPagamento}
                                                        LocalSelecionado={formaPagamento}
                                                        corValidade={corFormaPagamento}
                                                        
                                                    />
                                            </div>
                                            </div>
                                            <div className={styles.form_right}>
                                            <div className={styles.image_and_action_button}>
                                                <ImageStudent width='80%' height={164} 
                                                fotoDoEstudante={fotoEstudante}
                                                />
                                                <div className={styles.button_action_container}>
                                                    <div className={styles.button_action_container_left}>
                                                            <div className={styles.action_button}>
                                                            <ButtaoComponent width={155} padding={4.3} text='editar pagamento'
                                                            event={eventEditarPagamentoMulta}
                                                            />
                                                            </div>
                                                            <div className={styles.action_button}>
                                                                <ButtaoComponent width={155} padding={4.3} text='deletar multa'
                                                                event={eventDeletarPagamentoMulta}
                                                                />
                                                            </div>
                                                            <div className={styles.action_button}>
                                                                <ButtaoComponent width={155} padding={4.3} text='limpar campos' event={limparCampos} />
                                                            </div>
                                                    </div>
                                                    <div className={styles.button_action_container_right}>
                                                            <div className={styles.action_button}>
                                                            <ButtaoComponent width={155} padding={4.3} text='cadastrar' />
                                                            </div>
                                                            <div className={styles.action_button}>
                                                                <ButtaoComponent width={155} padding={4.3} text='cadastrar' />
                                                            </div>
                                                            <div className={styles.action_button}>
                                                                <ButtaoComponent width={155} padding={4.3} text='cadastrar' />
                                                            </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>
                            </div>
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