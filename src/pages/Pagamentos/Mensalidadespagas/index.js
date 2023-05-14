import React, {useState,useEffect} from "react";
import styles from './style.module.css'

import NammePage from "../../../components/NamePage";
import FilterInput from "../../../components/Input/FilterInput";
import Tabelageral from "../../../components/Tabelas/Tabelageral";
import ImageStudent from "../../../components/ImageStudent";
import ButtaoComponent from "../../../components/Butao";
import Select from "../../../components/Selects/Select";
import InputGeral from "../../../components/Input/InputGeral";
import FormaPagamentoComponent from "../../../components/Selects/Formapagamento";
import api from "../../../services/api";
import Popup from "../../../components/Popups/Popup";
import PopupMessage from "../../../components/Popups/PopupMessage";


const tabelaHeader=['nome','apelido','telefone','ano nascimeno','escola','sexo','curso']
const tabelaHeader2=['nome','apelido','telefone','curso','data pagmento','mensalidade','valor mensalidade','coigo estudante']



export default function MensalidadesPagas(){
    const [estudantes,setEstudantes]=useState([])
    const [pagamentos,setPagamentos]=useState([])
    const [nomeEstudante,setNomeEstudante]=useState('')
    const [codigoEstudante,setCodigoEstudante]=useState('')
    const [nomeCurso,setNomeCurso]=useState('')
    const [usuarioPagamento,SetUsuarioPagamento]=useState('')
    
    const [dataPagamento,setDataPagamento]=useState('')
    const [mensalidade,setmensalidade]=useState('')
    const [desconto,setDesconto]=useState('')
    const [valorMensalidade,setValormensalidade]=useState('')

    const [pagaComMulta,setPagaComMulta]=useState('')
    const [valorMulta,setValorMulta]=useState('')
    const [valorTotalPago,setValorTotalPagao]=useState('')
    const [anoApagar,setAnoApagar]=useState('')
    const [formaPagamento,setFormaPagamento]=useState('')
    const [fotoDoEstudante,setFotoDoEstudante]=useState('')
    const [idMensalidade,setIdMensalidade]=useState('')
    
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


    const user=localStorage.getItem('user')
    const userData=JSON.parse(user)
    const token=userData.token
    const usuario=userData.user.username



   

    useEffect(()=>{

        async function listarMensalidades(){
            try {
                const response= await api.get('/listarmensalidades')
                    const data= await response.data.data
                    console.log(data)
                    setPagamentos(data)
            } catch (error) {
                console.log(error)
                console.log(error)
        const resultError=error.response.data.message
        setMessafeInfoPopup(resultError)
            abrirInfoPopup()
            }
        }
        listarMensalidades()
    },[])

  
   async function preencherPagamento(id){
    limparCampos()
        try {
            const response= await api.get(`/pesquisarmensalidade/${id}`)
                    const data= await response.data.data
                    console.log(data)
                
                    setNomeEstudante(data.codigoInscricao.nome)
                    setCodigoEstudante(data.codigoCadastro.codigoEstudante)
                    setNomeCurso(data.curso.nomeCurso)
                    SetUsuarioPagamento(data.usuario.username)
                    setDataPagamento(data.dataPagamento)
                    setmensalidade(data.mensalidade.mes)
                    setValormensalidade(data.valor_mensalidade)
                    setPagaComMulta(data.pagaComMulta)
                    
                    if(pagaComMulta){
                        setValorMulta(data.codigoIdMulta.valorMulta)
                    }else{
                        setValorMulta('sem multa')
                    }
                    
                    setValorTotalPagao(data.valorTotalPago)
                    
                    setFotoDoEstudante(data.codigoInscricao.url)
                    setDesconto(data.codigoCadastro.desconto)
                    setAnoApagar(data.anoPagamento)
                    setFormaPagamento(data.formPagamento)
                    setIdMensalidade(data._id)

                    
        } catch (error) { 
            console.log(error)
            console.log(error)
        const resultError=error.response.data.message
        setMessafeInfoPopup(resultError)
            abrirInfoPopup()
        }
   }

   async function editarPagamento(){
    closeConfirmPopup()
    const id= idMensalidade
    const dados={
        formPagamento:formaPagamento
    }
    try {
        const response= await api.put(`/editarmensalidade/${id}`,
            dados,{
                headers:{
                    Authorization:token
                }
            }
        )
        const data= await response.data.data
        console.log(data)

        if(response.status=="200"){
            setMessafeInfoPopup("pagamento editado com sucesso")
            abrirInfoPopup()
            limparCampos()
            return
        }
    } catch (error) {
        console.log(error)
        const resultError=error.response.data.message
        setMessafeInfoPopup(resultError)
            abrirInfoPopup()
        
    }
   }
  async function excluirPagamento(){
    closeConfirmPopup()
    const id=idMensalidade
    try {
        const response= await api.delete(`/deletarmensalidade/${id}`)
        const data= await response.data.data
        console.log(data)

        if(response.status=="200"){
            console.log(data.pagaComMulta)
            if(data.pagaComMulta){
            setMessafeInfoPopup("mensalidade e multa excluidas  com sucesso")
            abrirInfoPopup()
            limparCampos()
            }else{
                setMessafeInfoPopup("pagamento excluido com sucesso")
                abrirInfoPopup()
                limparCampos()
            }
           
            return
        }
    } catch (error) {
        console.log(error)
        const resultError=error.response.data.message
        setMessafeInfoPopup(resultError)
            abrirInfoPopup()
    }
    
  }
   function validarDados(){
    // closeConfirmPopup()
     let errors=[]
     
     if(!formaPagamento || formaPagamento==undefined || formaPagamento==null){
         setCorFormaPagamento('blue')
         errors.push('error')
        
     } 
 
     if(!idMensalidade || idMensalidade==undefined || idMensalidade==null){
        closeConfirmPopup()
        setMessafeInfoPopup("por favor selecione um pagamento!")
        abrirInfoPopup()
        return 
    } 
     
     if(errors.length>=1){
         closeConfirmPopup()
         setMessafeInfoPopup("preencha todos campos obrigatorios!")
         abrirInfoPopup()
         return 
     } 
   }

   function limparCampos(){
    setNomeEstudante("")
    setCodigoEstudante("")
    setNomeCurso("")
    SetUsuarioPagamento("")
    setDataPagamento("")
    setmensalidade("")
    setValormensalidade("")
    setPagaComMulta("")
    setValorMulta('')
    setValorTotalPagao("")
    setFotoDoEstudante("")
    setDesconto("")
    setAnoApagar("")
    setFormaPagamento("")
    setIdMensalidade("")
    
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



function eventEditarPagamento(){
    
    openConfirmPopup()
    setMessageConfirmPopup('DESEJA EDITAR DADOS DESTE pagamento')
    setEvento('editarPagamento')
    validarDados()
}


function enventExcluirPagamento(){
    
    openConfirmPopup()
    setMessageConfirmPopup('DESEJA excluir este  pagamento')
    setEvento('excluirPagamento')
    validarDados()
}

function chooseOptionFunction(){
    if(evento=="editarPagamento"){
       return editarPagamento()
    }
    if(evento=="excluirPagamento"){
        return excluirPagamento()
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
                                    <NammePage width='100%' padding={6} namepage='tela de pagamentos de mensalidades pagas' />
                            </div>
                                
                        </div>
                        <div className={styles.table_and_image_container}>
                            <div className={styles.tabela}>
                            <Tabelageral width='100%' height='100%'
                                    list={tabelaHeader2}
                                    tbody={pagamentos.map((pagamento)=>{
                                    return(
                                        <tr onClick={()=>{preencherPagamento(pagamento._id)}}  key={pagamento._id}>
                                            <td>{pagamento.codigoInscricao.nome}</td>
                                            <td>{pagamento.codigoInscricao.apelido}</td>
                                            <td>{pagamento.codigoInscricao.contactos.contactoPrincipal}</td>
                                            <td>{pagamento.curso.nomeCurso}</td>
                                            <td>{pagamento.dataPagamento}</td>
                                            <td>{pagamento.mensalidade.mes}</td>
                                            <td>{pagamento.valor_mensalidade}</td>
                                            <td>{pagamento.codigoCadastro.codigoEstudante}</td>
                                        </tr>
                                      )
                                                
                                })}
                             />
                            </div>
                            <div className={styles.image}>
                            <ImageStudent fotoDoEstudante={fotoDoEstudante} width='100%' height='100%' />
                            </div>
                        </div>
                    </div>
                    <div className={styles.bottom_container}>
                    <div className={styles.form_container}>
                            <div className={styles.content_form}>
                                <div className={styles.form}>
                                    <div className={styles.form_left}>
                                        <InputGeral width='80%' padding={7.3} inputName='nome do estudante' value={nomeEstudante} />
                                        <InputGeral width='80%' padding={7.3} inputName='codigo estudante' value={codigoEstudante} />
                                        <InputGeral width='80%' padding={7.3} inputName='curso' value={nomeCurso}   />
                                        <InputGeral width='80%' padding={7.3} inputName='usuario' value={usuarioPagamento} />
                                    </div> 
                                    <div className={styles.form_center}>
                                        <InputGeral width='80%' padding={7.3} inputName='data pagamento' value={dataPagamento} />
                                        <InputGeral width='80%' padding={7.3} inputName='mensalidade' value={mensalidade} />
                                        <InputGeral width='80%' padding={7.3} inputName='desconto'  value={desconto} />
                                        <InputGeral width='80%' padding={7.3} inputName='valor da mensalidade' value={valorMensalidade} />
                                        
                                    </div>
                                    <div className={styles.form_right}>
                                        <InputGeral width='80%' padding={7.3} inputName='valor da multa' value={valorMulta}  />
                                        <InputGeral width='80%' padding={7.3} inputName='valor total pago'  value={valorTotalPago} />
                                        <InputGeral width='80%' padding={7.3} inputName='ano da mensalidade paga' value={anoApagar}  />
                                    <div className={styles.select_button}>
                                    <FormaPagamentoComponent width={265}
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
                                </div>
                                <div className={styles.form_action}>
                                <div className={styles.action_button}>
                                    <ButtaoComponent width={185} padding={10.3} text='editar pagamento' 
                                    event={eventEditarPagamento}
                                    />
                                </div>
                                <div className={styles.action_button}>
                                    <ButtaoComponent width={185} padding={10.3} text='excluir mensalidade' event={enventExcluirPagamento} />
                                </div>
                                <div className={styles.action_button}>
                                    <ButtaoComponent width={185} padding={10.3} text='limpar campos' event={limparCampos} />
                                </div>
                                <div className={styles.action_button}>
                                    <ButtaoComponent width={185} padding={10.3} text='imprimir' />
                                </div>
                                <div className={styles.action_button}>
                                    <ButtaoComponent width={185} padding={10.3} text='cadastrar' />
                                </div>
                                <div className={styles.action_button}>
                                    <ButtaoComponent width={185} padding={10.3} text='cadastrar' />
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