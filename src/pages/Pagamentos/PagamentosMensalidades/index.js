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
import PopupMulta from "../../../components/Popups/PopupMulta";



const tabelaHeader=['nome','apelido','telefone','ano nascimeno','escola','sexo','curso']
const tabelaHeader2=['nome','apelido','telefone','curso','data pagmento','mensalidade','valor mensalidade','coigo estudante']



export default function PagamentosMensalidades(){
    const [estudantes,setEstudantes]=useState([])
    const [pagamentos,setPagamentos]=useState([])
    const [nomeEstudante,setNomeEstudante]=useState('')
    const [codigoEstudante,setCodigoEstudante]=useState('')
    const [nomeCurso,setNomeCurso]=useState('')

    const [ultimoMesPago,setUltimoMesPago]=useState('')
    const [mesApagar,setMesApagar]=useState('')
    const [desconto,setDesconto]=useState('')
    const [valorMensalidade,setValormensalidade]=useState('')
    const [valorMulta,setValorMulta]=useState('')
    const [valorTotalPago,setValorTotalPagao]=useState('')
    const [anoApagar,setAnoApagar]=useState('')
    const [formaPagamento,setFormaPagamento]=useState('')
    const [fotoDoEstudante,setFotoDoEstudante]=useState('')
    const [idMensalidade,setIdMensalidade]=useState('')
    const [codigoCadastro,setCodigoCadastro]=useState('')
    const [dataUltimoPagamento,setDataUltimoPagamento]=useState('')
    const [codigoIdMulta,setCodigoIdMulta]=useState('')
    const [permissaopagamentoParaEstudanteInactivo,setPermissaopagamentoParaEstudanteInactivo]=useState(false)
    const[novosDados,setNovosdados]=useState([])
    const [filtroEstudante,setFiltroEstudante]=useState('')





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

        async function listarEstudantes(){
            try {
                const response= await api.get('/listarcadastrados')
                    const data= await response.data.data
                    console.log(data)
                    setEstudantes(data)
                    setNovosdados(data)
            } catch (error) {
                console.log(error)
            }
        }
        listarEstudantes()
    },[])

    useEffect(()=>{
        if(filtroEstudante==''){
               
            setEstudantes(novosDados)
        }else{
          console.log(filtroEstudante)
          console.log(novosDados)
            setEstudantes(
                novosDados.filter((item)=>{ 
                  console.log(item.codigoInscricao.nome)
                  if((item.codigoInscricao.nome.toLowerCase().indexOf(filtroEstudante.toLowerCase())>-1)||(item.codigoInscricao.apelido.toLowerCase().indexOf(filtroEstudante.toLowerCase())>-1) || (item.codigoInscricao.contactos.contactoPrincipal.toLowerCase().indexOf(filtroEstudante.toLowerCase())>-1)){
                    return true
                }else{
                    return false
                }
                })
            )
        } 
    },[filtroEstudante])

    useEffect(()=>{

        async function listarMensalidades(){
            try {
                const response= await api.get('/listarmensalidades')
                    const data= await response.data.data
                    console.log(data)
                    setPagamentos(data)
            } catch (error) {
                console.log(error)
            }
        }
        listarMensalidades()
    },[])

    async  function preencherdadosEstudante(id){
       // alert('clicou em preencher')
        //alert(id)
        limparCampos()
        try {
            const response= await api.get(`/pagamentosvalores/${id}`)
                    const data= await response.data.dados
                    console.log(data)
                   
                    setNomeEstudante(data.estudanteCurso.codigoInscricao.nome)
                   
                    setCodigoEstudante(data.estudanteCurso.codigoEstudante)
                    setNomeCurso(data.estudanteCurso.curso.nomeCurso)
                    setFotoDoEstudante(data.estudanteCurso.codigoInscricao.url)
                    
                    setDesconto(data.estudanteCurso.desconto)
                    setValormensalidade(data.valorMensalidadeIdade)
                    //setValorApagar(data.valorPrimeiraMensalidade)
                    setUltimoMesPago(data.ultimoMesPago.mensalidade.mes)
                    setMesApagar(data.mensalidadeApagar.mes)
                    setDataUltimoPagamento(data.ultimoMesPago.dataPagamento)
                    setAnoApagar(data.anoApagar)
                    setIdMensalidade(data.mensalidadeApagar._id)
                    setCodigoCadastro(data.estudanteCurso._id)
                    //alert(codigoCadastro)
                    
        } catch (error) { 
            console.log(error)
            const resultError=error.response.data.message
            setMessafeInfoPopup(resultError)
            abrirInfoPopup()
            return 
        }
    }

    async  function pagarMensalidade(){
      
       
        //alert(id)
        setConfirmPopup('none')
        const dados={
            codigoCadastro,
            formPagamento:formaPagamento,
            mensalidade:idMensalidade,
            anoPagamento:anoApagar,
            valor_mensalidade:valorMensalidade,
            permissaopagamentoParaEstudanteInactivo
        }
        try {
            const response= await api.post('/pagarmensalidade',
            dados,{
              headers:{
                  Authorization:`Bearer ${token}`
              }
          })
          const data= await response.data.data

          let confirmMulta=response.status
          console.log(data)
          if(confirmMulta==207){
            setValorMulta(data.valorMulta)
            setCodigoIdMulta(data._id)
            setInfoMultaPopup('estudante com multa!')
            setPopupMultaMessage('deseja pagar mensalidade e multa?')
            setPopupMulta('block')
          }
          if(response.status==200){
            
            setMessafeInfoPopup("mensalidade paga com sucesso")
            abrirInfoPopup()
            limparCampos()
          }
          console.log(response.status)
          //alert('mensalidade paga com sucesso')
        } catch (error) { 
            console.log(error.response.data)
            const resultError=error.response.data.message
            setMessafeInfoPopup(resultError)
            abrirInfoPopup()
        }
    }
    

    async function pagarmensalidadeComMulta(){
        //alert('clicou em pagar mensalidade com multa')
        setPopupMulta('none')
        const dados={
            codigoCadastro,
            formPagamento:formaPagamento,
            mensalidade:idMensalidade,
            anoPagamento:anoApagar,
            valor_mensalidade:valorMensalidade,
            codigoIdMulta
        }
        try {
            const response= await api.post('/pagarmensalidadecommulta',
            dados
          )
          const data= await response.data.data

          
          console.log(response.status)
          alert('mensalidade e multa pagas com sucesso')
        } catch (error) { 
            console.log(error.response.data)
        }
    }
    async function pagarmensalidadeSemMulta(){
        //alert('clicou em pagar mensalidade sem multa')
        
        setPopupMulta('none')
        const dados={
            codigoCadastro,
            formPagamento:formaPagamento,
            mensalidade:idMensalidade,
            anoPagamento:anoApagar,
            valor_mensalidade:valorMensalidade,
            codigoIdMulta
        }
        try {
            const response= await api.post('/pagarmensalidadesemmulta',
            dados
          )
          const data= await response.data.data

          
          console.log(response.status)
          alert('mensalidade  paga com sucesso')
        } catch (error) { 
            console.log(error.response.data)
        }
    }

    function validarDados(){
        // closeConfirmPopup()
         let errors=[]
         
         if(!formaPagamento || formaPagamento==undefined || formaPagamento==null){
             setCorFormaPagamento('blue')
             errors.push('error')
            
         } 

         if(!codigoCadastro || codigoCadastro==undefined || codigoCadastro==null){
            closeConfirmPopup()
            setMessafeInfoPopup("por favor selecione um estudante!")
            abrirInfoPopup()
            return 
        } 
        
         if(errors.length>=1){
             closeConfirmPopup()
             setMessafeInfoPopup("preencha todos campos obrigatorios!")
             abrirInfoPopup()
             return 
         }
         
     
         // if(!codigoInscricao || codigoInscricao==undefined || codigoInscricao==null || codigoInscricao==""){
         //     setMessafeInfoPopup("selecione um estudante!")
         //     abrirInfoPopup()
         //     return
         // }
         
         
    }

    function limparCampos(){
        setNomeEstudante("")
        setCodigoEstudante("")
        setNomeCurso("")
        setFotoDoEstudante("")
        setDesconto("")
        setValormensalidade("")
        setUltimoMesPago("")
        setMesApagar("")
        setDataUltimoPagamento("")
        setAnoApagar("")
        setIdMensalidade("")
        setCodigoCadastro("")
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


    
function eventPagarMensalidade(){
   
    openConfirmPopup()
    setMessageConfirmPopup('DESEJA pagar esta mensalidade')
    setEvento('pagarmensalidade')
    validarDados()
}

function eventPagarMensalidadeComMulta(){
    
    openConfirmPopup()
    setMessageConfirmPopup('DESEJA EDITAR DADOS DESTE ESTUDANTE')
    setEvento('editarestudante')
}


function enventExcluirEstudante(){
    
    openConfirmPopup()
    setMessageConfirmPopup('DESEJA excluir este  estudante')
    setEvento('excluirestudante')
}

function chooseOptionFunction(){
    if(evento=="pagarmensalidade"){
       return pagarMensalidade()
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
                                        <FilterInput width='100%' padding={8}
                                         setValue={setFiltroEstudante}
                                        />
                                    </div>
                                <div className={styles.namepage}>
                                        <NammePage width='100%' padding={6} namepage='tela de pagamentos de mensalidades normais' />
                                </div>
                                    
                            </div>
                            <div className={styles.table_and_image_container}>
                                <div className={styles.tabela}>
                                <Tabelageral width='100%' height='100%'
                                    list={tabelaHeader}
                                    tbody={estudantes.map((estudante)=>{
                                        return(
                                            <tr onClick={()=>{preencherdadosEstudante(estudante._id)}}  key={estudante._id}>
                                                <td>{estudante.codigoInscricao.nome}</td>
                                                <td>{estudante.codigoInscricao.apelido}</td>
                                                <td>{estudante.codigoInscricao.contactos.contactoPrincipal}</td>
                                                <td>{estudante.codigoInscricao.dataNascimento}</td>
                                                <td>{estudante.schoolname.nomeEscola}</td>
                                                <td>{estudante.codigoInscricao.sexo}</td>
                                                <td>{estudante.curso.nomeCurso}</td>
                                            </tr>
                                        )
                                    
                                    })}
                                />
                                </div>
                                <div className={styles.image}>
                                <ImageStudent 
                                fotoDoEstudante={fotoDoEstudante}
                                width='100%' height='100%' />
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
                                            <InputGeral width='80%' padding={7.3} inputName='data do ultimo pagamento' value={dataUltimoPagamento} />
                                        </div> 
                                        <div className={styles.form_center}>
                                            <InputGeral width='80%' padding={7.3} inputName='ultimo mes pago' value={ultimoMesPago} />
                                            <InputGeral width='80%' padding={7.3} inputName='mes a pagar' value={mesApagar} />
                                            <InputGeral width='80%' padding={7.3} inputName='desconto'  value={desconto} />
                                            <InputGeral width='80%' padding={7.3} inputName='valor da mensalidade' value={valorMensalidade} />
                                            
                                        </div>
                                        <div className={styles.form_right}>
                                        <InputGeral width='80%' padding={7.3} inputName='valor da multa' value={valorMulta} />
                                        <InputGeral width='80%' padding={7.3} inputName='valor total pago'  value={valorTotalPago} />
                                        <InputGeral width='80%' padding={7.3} inputName='ano a pagar' value={anoApagar}  />
                                        <div className={styles.select_button}>
                                        <FormaPagamentoComponent width={265}
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
                                    </div>
                                    <div className={styles.form_action}>
                                    <div className={styles.action_button}>
                                        <ButtaoComponent width={185} padding={10.3} text='efectuar pagamento' 
                                        event={eventPagarMensalidade}
                                        />
                                    </div>
                                    <div className={styles.action_button}>
                                        <ButtaoComponent width={185} padding={10.3} text='limpar campos' event={limparCampos} />
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

                <div className={styles.popupmulta}  style={{display:popupMulta}}>
                    <PopupMulta display={popupMulta}
                    eventClose={closeConfirmPopup}
                    message={infoMultaPopup}
                    messageMulta={popupMultaMessage}
                    event={pagarmensalidadeComMulta}
                    event2={pagarmensalidadeSemMulta}
                    />
                </div>
            </>
    )
}