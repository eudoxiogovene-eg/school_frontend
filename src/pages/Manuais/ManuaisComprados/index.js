import React ,{useState,useEffect} from "react";
import styles from './style.module.css'

import NammePage from "../../../components/NamePage";
import FilterInput from "../../../components/Input/FilterInput";
import Tabelageral from "../../../components/Tabelas/Tabelageral";
import ImageStudent from "../../../components/ImageStudent";
import ButtaoComponent from "../../../components/Butao";
import Select from "../../../components/Selects/Select";
import InputGeral from "../../../components/Input/InputGeral";
import EstadoDEEntrega from "../../../components/Selects/EstadoDeEntrega";
import FormaPagamentoComponent from "../../../components/Selects/Formapagamento";
import api from "../../../services/api";
import Popup from "../../../components/Popups/Popup";
import PopupMessage from "../../../components/Popups/PopupMessage";


const tabelaHeader2=['nome estudante','codigo estudante','quantidade comprada','valor unitario','valor  pago','stutus compra','f pagamento','nome manual']

export default function ManuaisComprados(){

    const [estudantes,setEstudantes]=useState([])
    const [nomeEstudante,setNomeEstudante]=useState('')
    const [apelido,setApelido]=useState('')
    const [codigoEstudante,setCodigoEstudante]=useState('')
    const [nomeCurso,setNomeCurso]=useState('')
    const [manuais,setManuais]=useState([])
    const [formaPagamento,setFormaPagamento]=useState('')
    const [nomeManual,setNomeManual]=useState('')
    const [quantidadeDisponivel,setQuantidadeDisponivel]=useState('')
    const [nomeCursoManual,setNomeCursoManual]=useState('')
    const [quantidadeDesejada,setQuantidadeDesejada]=useState('')
    const [valorUnitario,setValorUnitario]=useState('')
    const [statusEntrega,setStatusEntrega]=useState('')
    const [codigoCadastro,setCodigoCadastro]=useState('')
    const [codigoManualId,setCodigoManualId]=useState('')
    const [valorTotalPago,setValorTotalPago]=useState('')
    const [idVenda,setIdvenda]=useState('')
    

    const[displayPopup,setDisplayPopup]=useState('none')
    const[displayContainer,setDisplayContainer]=useState('block')
    const [confirmPopup,setConfirmPopup]=useState('none')
    const [messageConfirmPopup,setMessageConfirmPopup]=useState('none')
    const [infoPopup,setInfoPopup]=useState('none')
    const [messageInfoPopup,setMessafeInfoPopup]=useState('')

    const [evento, setEvento]=useState(null)

    const [corFormaPagamento, setCorFormaPagamento]=useState('')
    const [corStatusEntrega, setCorStatusEntrega]=useState('')
    const [corQuantidadeDesejada, setCorQuantidadeDesejada]=useState('')





    const user=localStorage.getItem('user')
    const userData=JSON.parse(user)
    const token=userData.token

    const [vendaManuais,setVendaManuais]=useState([])
    useEffect(()=>{

        async function listarmanuais(){
            try {
                const response= await api.get('/listarvendas')
                    const data= await response.data.data
                    console.log(data)
                    setVendaManuais(data)
            } catch (error) {
                console.log(error)
            }
        }
        listarmanuais()
    },[])

    async function pesquisarVenda(id){
        alert('clicou em pesquisar estudante')
        try {
            const response= await api.get(`/pesquisarvendas/${id}`)
                    const data= await response.data.data
                    console.log(data)
                    
                    setNomeEstudante(data.codigoInscricao.nome)
                    setApelido(data.codigoInscricao.apelido)
                    setCodigoEstudante(data.codigoCadastro.codigoEstudante)
                    setNomeCurso(data.curso.nomeCurso)
                    setNomeManual(data.codigoManualId.nomeManual)
                    setQuantidadeDisponivel(data.codigoManualId.quantidadeManual)
                    setNomeCursoManual(data.curso.nomeCurso)
                    setQuantidadeDesejada(data.quantidade)
                    setStatusEntrega(data.statusEntrega)
                    setValorUnitario(data.codigoManualId.valorManual)
                    setFormaPagamento(data.formPagamento)
                    setValorTotalPago(data.valorTotalPago)
                    setIdvenda(id)
                   
        } catch (error) {
            console.log(error)
        }
    }

async function editarvenda(){
    const id= idVenda
    const dados={
        quantidade:quantidadeDesejada,
        statusEntrega,
        formPagamento:formaPagamento,
    }
    const response= await api.put(`/editarvendamanual/${id}`,
    dados,{
        headers:{
            Authorization:`Bearer ${token}`
        } 

    })
    const data= await response.data.data
    console.log(data)
}

function validarDados(){
    // closeConfirmPopup()
      let errors=[]
      
      if(!formaPagamento || formaPagamento==undefined || formaPagamento==null){
          setCorFormaPagamento('blue')
          errors.push('error') 
      } 
      if(!statusEntrega || statusEntrega==undefined || statusEntrega==null){
         setCorStatusEntrega('blue')
         errors.push('error') 
     } 
     if(!quantidadeDesejada || quantidadeDesejada==undefined || quantidadeDesejada==null){
         setCorQuantidadeDesejada('blue')
         errors.push('error') 
     } 

   
      if(!codigoManualId || codigoManualId==undefined || codigoManualId==null){
         closeConfirmPopup()
         setMessafeInfoPopup("por favor selecione um manual!")
         abrirInfoPopup()
         return 
     } 
      
       if(errors.length>=1){
           closeConfirmPopup()
           setMessafeInfoPopup("preencha todos campos obrigatorios!")
           abrirInfoPopup()
           return 
       }

       if(quantidadeDesejada<=0){
         closeConfirmPopup()
         setCorQuantidadeDesejada('blue')
         setMessafeInfoPopup("quantidade desejada invalida!")
         abrirInfoPopup()
       }
      
    
}

function eventEditarCompraManual(){
        
    openConfirmPopup()
    setMessageConfirmPopup('DESEJA efectuar edicao deste pagamento')
    setEvento('editarPagamentoManual')
    validarDados()
    
}

function chooseOptionFunction(){
    if(evento=="editarPagamentoManual"){
       return editarvenda()
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
            <div className={styles.container}>
                <div className={styles.container_geral}>
                    <div className={styles.top_container}>
                        <div className={styles.filter_and_namepage_container}>
                                <div className={styles.filtro}>
                                    <FilterInput width='100%' padding={8}/>
                                </div>
                            <div className={styles.namepage}>
                                    <NammePage width='100%' padding={6} namepage='tela de manuais comprados' />
                            </div>
                                
                        </div>
                        <div className={styles.table_and_image_container}>
                            <div className={styles.tabela}>
                            <Tabelageral width='100%' height='100%'
                                list={tabelaHeader2}
                                tbody={vendaManuais.map((venda)=>{
                                    return(
                                        <tr onClick={()=>{pesquisarVenda(venda._id)}}  key={venda._id}>
                                            <td>{venda.codigoInscricao.nome}</td>
                                            <td>{venda.codigoCadastro.codigoEstudante}</td>
                                            <td>{venda.quantidade}</td>
                                            <td>{venda.codigoManualId.valorManual}</td>
                                            <td>{venda.valorTotalPago}</td>
                                            <td>{venda.statusEntrega}</td>
                                            <td>{venda.formPagamento}</td>
                                            <td>{venda.codigoManualId.nomeManual}</td>
                                        </tr>
                                    )
                                
                                    })}
                                />
                            </div>
                            <div className={styles.image}>
                            <ImageStudent width='100%' height='100%' />
                            </div>
                        </div>
                    </div>
                    <div className={styles.bottom_container}>
                    <div className={styles.form_container}>
                            <div className={styles.content_form}>
                                <div className={styles.form}>
                                    <div className={styles.form_left}>
                                        <InputGeral width='80%' padding={7.3} inputName='nome do estudante' value={nomeEstudante} />
                                        <InputGeral width='80%' padding={7.3} inputName='apelido do estudante' value={apelido}  />
                                        <InputGeral width='80%' padding={7.3} inputName='codigo do estudante'  value={codigoEstudante} />
                                        <InputGeral width='80%' padding={7.3} inputName='curso' value={nomeCurso} />
                                    </div>
                                    <div className={styles.form_center}>
                                        <InputGeral width='80%' padding={7.3} inputName='nome do manual' value={nomeManual}  setValue={setNomeManual} />
                                        <InputGeral width='80%' padding={7.3} inputName='quantidade disponivel' value={quantidadeDisponivel} setValue={setQuantidadeDisponivel} />
                                        <InputGeral width='80%' padding={7.3} inputName='nome do curso do manual' value={nomeCursoManual} setValue={setNomeCursoManual} />
                                        <div className={styles.select_button}>
                                            <EstadoDEEntrega width={270}
                                            padding={7.3} 
                                            display='block'
                                            labelName='estado'
                                            marginTopContainer={0}
                                            setValue={setStatusEntrega}
                                            estadoSelecionado={statusEntrega}
                                            corValidade={corStatusEntrega}
                                            LocalSelecionado={formaPagamento}
                                            />
                                    </div>
                                    </div>
                                    <div className={styles.form_right}>
                                            <InputGeral width='80%' padding={7.3} inputName='quantidade desejada de manuais' 
                                            value={quantidadeDesejada} 
                                            setValue={setQuantidadeDesejada} 
                                            corValidade={corQuantidadeDesejada}
                                            type="number"
                                            />
                                            <InputGeral width='80%' padding={7.3} inputName='valor unitario' value={valorUnitario} setValue={setValorUnitario}  />
                                            <InputGeral width='80%' padding={7.3} inputName='valor total pago' value={valorTotalPago} setValue={setValorTotalPago} />
                                            <div className={styles.select_button}>
                                                <FormaPagamentoComponent width={270}
                                                    padding={7.3} 
                                                    display='block'
                                                    labelName='forma de pagamento'
                                                    marginTopContainer={0}
                                                    setValue={setFormaPagamento}
                                                    estadoSelecionado={formaPagamento}
                                                    corValidade={corStatusEntrega}
                                                    LocalSelecionado={formaPagamento}
                                                />
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.form_action}>
                                <div className={styles.action_button}>
                                    <ButtaoComponent width={185} padding={10.3} text='editar venda' 
                                    event={eventEditarCompraManual}
                                    />
                                </div>
                                <div className={styles.action_button}>
                                    <ButtaoComponent width={185} padding={10.3} text='cadastrar' />
                                </div>
                                <div className={styles.action_button}>
                                    <ButtaoComponent width={185} padding={10.3} text='cadastrar' />
                                </div>
                                <div className={styles.action_button}>
                                    <ButtaoComponent width={185} padding={10.3} text='cadastrar' />
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