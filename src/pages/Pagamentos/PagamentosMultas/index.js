


import React, {useState,useEffect} from "react";
import styles from './style.module.css'


import NammePage from "../../../components/NamePage";
import FilterInput from "../../../components/Input/FilterInput";
import Tabelageral from "../../../components/Tabelas/Tabelageral";
import ImageStudent from "../../../components/ImageStudent";
import ButtaoComponent from "../../../components/Butao";
import FormaPagamentoComponent from "../../../components/Selects/Formapagamento";
import InputGeral from "../../../components/Input/InputGeral";
import Select from "../../../components/Selects/Select";
import Popup from "../../../components/Popups/Popup";
import PopupMessage  from "../../../components/Popups/PopupMessage";


import api from "../../../services/api";

const tabelaHeader=['nome','apelido','curso','codigo estudante']
const tabelaHeader2=['nome','curso','data multa','mes multa','valor multa']
export default function PagamentosMultas(){

    const [estudantes,setEstudantes]=useState([])
    const [nomeEstudante,setNomeEstudante]=useState('')
    const [codigoEstudante,setCodigoEstudante]=useState('')
    const [nomeCurso,setNomeCurso]=useState('')
    const [horario,setHorario]=useState('')
    const [dataMulta,setDataMulta]=useState('')
    const [mensalidade,setMensalidade]=useState('')
    const [valorMulta,setValorMulta]=useState('')
    const [multas,setMultas]=useState([])
    const [formaPagamento,setFormaPagamento]=useState('')
    const [idMulta,setIdMulta]=useState('')
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

        async function listarEstudantes(){
            try {
                const response= await api.get('/listarcadastrados')
                    const data= await response.data.data
                    console.log(data)
                    setEstudantes(data)
            } catch (error) {
                console.log(error) 
            }
        }
        listarEstudantes()
    },[])

async function pesquisarMultas(id){

   const codigoCadastro=id
    try {
        const response= await api.get(`/listarmultasestudante/${codigoCadastro}`)
        const data= await response.data.data
        console.log(data)
        setMultas(data)
      
        
    } catch (error) {
        console.log(error)
        const resultError=error.response.data.message
        setMessafeInfoPopup(resultError)
        abrirInfoPopup()
    }
}

async function preencherCampos(id){

    try {
        const response= await api.get(`/pesquisarmulta/${id}`)
        const data= await response.data.data
        console.log(data)
        setNomeEstudante(data.codigoInscricao.nome)
        setCodigoEstudante(data.codigoCadastro.codigoEstudante)
        setNomeCurso(data.curso.nomeCurso)
        setHorario(data.codigoCadastro.horario)
        setDataMulta(data.createdAt)
        setMensalidade(data.mensalidade.mes)
        setValorMulta(data.valorMulta)
        setIdMulta(data._id)
        setFotoEstudante(data.codigoInscricao.url)
    } catch (error) {
        console.log(error)
    }
}

async function deletarMulta(){
    closeConfirmPopup()
    let id=idMulta
   
    try {
        const response= await api.delete(`/deletarmulta/${id}`)
        const data= await response.data.data
        console.log(data)
        
        if(response.status=="200"){
            setMessafeInfoPopup("multa deletada com sucesso!")
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

async function pagarMulta(){
  closeConfirmPopup()
    const dados={
        formaPagamento:formaPagamento,
        codigoIdMulta:idMulta,
    }
    
    try {
        const response= await api.post(`/pagarmulta`,dados)
        const data= await response.data.data
        console.log(data)
        if(response.status=="200"){
            setMessafeInfoPopup("multa paga com sucesso!")
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
    if(evento=="pagarMulta"){
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
   
    if(!idMulta || idMulta==undefined || idMulta==null){
       closeConfirmPopup()
       setMessafeInfoPopup("por favor selecione uma multa!")
       abrirInfoPopup()
       return 
    } 
   
    
    
}
 
function limparCampos(){
    setNomeEstudante("")
    setCodigoEstudante("")
    setNomeCurso("")
    setHorario("")
    setDataMulta("")
    setMensalidade("")
    setValorMulta("")
    setIdMulta("")
    setFotoEstudante("")
    setFormaPagamento("")
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


function eventPagarMUlta(){
    
    openConfirmPopup()
    setMessageConfirmPopup('DESEJA pagar esta multa')
    setEvento('pagarMulta')
    validarDados()
}
function eventDeletarMulta(){
    openConfirmPopup()
    setMessageConfirmPopup('DESEJA excluir esta multa')
    setEvento('excluirMulta')
    validarDados()
}
function chooseOptionFunction(){
    if(evento=="pagarMulta"){
       return pagarMulta()
    }
    if(evento=="excluirMulta"){
        return deletarMulta()
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
                                            <NammePage width='100%' padding={6} namepage='tela de pagamentos de multas' />
                                    </div>
                                        
                                </div>
                                <div className={styles.table_and_image_container}>
                                    <div className={styles.tabela}>
                                        <Tabelageral width='100%' height='100%'
                                            list={tabelaHeader}
                                            tbody={estudantes.map((estudante)=>{
                                                return(
                                                    <tr onClick={()=>{pesquisarMultas(estudante._id)}}  key={estudante._id}>
                                                        <td>{estudante.codigoInscricao.nome}</td>
                                                        <td>{estudante.codigoInscricao.apelido}</td>
                                                        <td>{estudante.curso.nomeCurso}</td>
                                                        <td>{estudante.codigoEstudante}</td>
                                                        
                                                    </tr>
                                                )
                                            
                                        })}
                                
                                        />
                                    </div>
                                    <div className={styles.tabela}>
                                        <Tabelageral width='100%' height='100%'
                                    list={tabelaHeader2}
                                    tbody={multas.map((multa)=>{
                                        return(
                                            <tr onClick={()=>{preencherCampos(multa._id)}}   key={multa._id}>
                                                <td>{multa.codigoInscricao.nome}</td>
                                                <td>{multa.curso.nomeCurso}</td>
                                                <td>{multa.createdAt}</td>
                                                <td>{multa.mensalidade.mes}</td>
                                                <td>{multa.valorMulta}</td>
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
                                                <InputGeral width='95%' padding={7.3} inputName='nome do estudante'
                                                value={nomeEstudante}
                                                />
                                                <InputGeral width='95%' padding={7.3} inputName='codigo do estudante'
                                                value={codigoEstudante}
                                                />
                                                <InputGeral width='95%' padding={7.3} inputName='curso'
                                                value={nomeCurso}
                                                />
                                                <InputGeral width='95%' padding={7.3} inputName='horario'
                                                value={horario}
                                                />
                                            </div>
                                            <div className={styles.form_center}>
                                                <InputGeral width='95%' padding={7.3} inputName='data da multa' value={dataMulta}  />
                                                <InputGeral width='95%' padding={7.3} inputName='mensalidade' value={mensalidade}  />
                                                <InputGeral width='95%' padding={7.3} inputName='valor da multa' value={valorMulta} />
                                                <div className={styles.select_button}>
                                                <FormaPagamentoComponent
                                                    width={385}
                                                    padding={7.3} 
                                                    display='block'
                                                    labelName='forma de pagamento'
                                                    marginTopContainer={0}
                                                    setValue={setFormaPagamento}
                                                    corValidade={corFormaPagamento}
                                                    LocalSelecionado={formaPagamento}
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
                                                            <ButtaoComponent width={155} padding={4.3} text='pagar multa' 
                                                            event={eventPagarMUlta}
                                                            />
                                                            </div>
                                                            <div className={styles.action_button}>
                                                                <ButtaoComponent width={155} padding={4.3} text='deletar multa' 
                                                                event={eventDeletarMulta}
                                                                />
                                                            </div>
                                                            <div className={styles.action_button}>
                                                                <ButtaoComponent width={155} padding={4.3} text='limpar campos' event={limparCampos} />
                                                            </div>
                                                    </div>
                                                    <div className={styles.button_action_container_right}>
                                                            <div className={styles.action_button}>
                                                            <ButtaoComponent width={155} padding={4.3} text='imprimir multa' />
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