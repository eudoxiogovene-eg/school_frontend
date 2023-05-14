

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
import Popup from "../../../components/Popups/Popup";
import PopupMessage from "../../../components/Popups/PopupMessage";
import api from "../../../services/api";
import Meses from "../../../components/Selects/Mensalidades";
import Ano from "../../../components/Selects/Ano";

const tabelaHeader=['nome','apelido','telefone','ano nascimeno','escola','sexo','curso']


export default function PagamentosPraInactivos(){
    
    const [estudantes,setEstudantes]=useState([])
    const [nomeEstudante,setNomeEstudante]=useState('')
    const [apelido,setApelido]=useState('')
    const [codigoEstudante,setCodigoEstudante]=useState('')
    const [nomeCurso,setNomeCurso]=useState('')

    const [horario,setHorario]=useState('')
    const [dataCadastro,setDataCadastro]=useState('')
    const [desconto,setDesconto]=useState('')
    const [nivel,setNivel]=useState('')
    const [valorApagar,setValorApagar]=useState('')
    const [formaPagamento,setFormaPagamento]=useState('')
    const [fotoDoEstudante,setFotoDoEstudante]=useState('')
    const [idMensalidade,setIdMensalidade]=useState('')
    const [codigoCadastro,setCodigoCadastro]=useState('')
    const [estadoEstudante,setEstadoEstudante]=useState('')
    const [anoApagar,setAnoApagar]=useState('')
    const [permissaopagamentoParaEstudanteInactivo,setPermissaopagamentoParaEstudanteInactivo]=useState(true)


    
    const[displayPopup,setDisplayPopup]=useState('none')
    const[displayContainer,setDisplayContainer]=useState('block')
    const [confirmPopup,setConfirmPopup]=useState('none')
    const [messageConfirmPopup,setMessageConfirmPopup]=useState('none')
    const [infoPopup,setInfoPopup]=useState('none')
    const [messageInfoPopup,setMessafeInfoPopup]=useState('')

    const [evento, setEvento]=useState(null)

    const [corFormaPagamento, setCorFormaPagamento]=useState('')
    const [corAnoApagar, setCorAnoApagar]=useState('')
    const [corMensalidadeApagar, setCorMensalidade]=useState('')


    const user=localStorage.getItem('user')
    const userData=JSON.parse(user)
    const token=userData.token
    const usuario=userData.user.username
  //  console.log(token)
 //   console.log(userData)
    
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


    async  function preencherdadosEstudante(id){
        //alert('clicou em preencher')
        
        try {
            const response= await api.get(`/pagamentosvalores/${id}`)
                    const data= await response.data.dados
                    console.log(data)
                   
                    setNomeEstudante(data.estudanteCurso.codigoInscricao.nome)
                    setApelido(data.estudanteCurso.codigoInscricao.apelido)
                    setCodigoEstudante(data.estudanteCurso.codigoEstudante)
                    setNomeCurso(data.estudanteCurso.curso.nomeCurso)
                    setFotoDoEstudante(data.estudanteCurso.codigoInscricao.url)
                    setHorario(data.estudanteCurso.horario)
                    setDataCadastro(data.estudanteCurso.dataInscricao)
                    setDesconto(data.estudanteCurso.desconto)
                    setNivel(data.estudanteCurso.nivel)
                    setValorApagar(data.valorMensalidadeIdade)
                    //setMesApagar(data.mensalidadeApagar.mes)
                    setFotoDoEstudante(data.estudanteCurso.codigoInscricao.url)
                    setCodigoCadastro(data.estudanteCurso._id)
                    setEstadoEstudante(data.estudanteCurso.estado)
                  
                    
        } catch (error) {
            console.log(error)
            console.log(error.response.data.message)
            const resultError=error.response.data.message
            setMessafeInfoPopup(resultError)
            abrirInfoPopup()
            return 
        }
    }


    async function pagarMensalidade(){
       // alert("clicou em pagar")
       closeConfirmPopup()
        const dados={
            codigoCadastro,
            formPagamento: formaPagamento,
            mensalidade:idMensalidade,
            valor_mensalidade:valorApagar,
            anoPagamento:anoApagar,
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
          if(response.status==200){
            
            setMessafeInfoPopup("mensalidade paga com sucesso")
            abrirInfoPopup()
            limparCampos()
          }
       console.log(data)
      
       
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
        if(!codigoCadastro || codigoCadastro==undefined || codigoCadastro==null){
            closeConfirmPopup()
            setMessafeInfoPopup("por favor selecione um estudante!")
            abrirInfoPopup()
            return 
        } 
        
        if(!formaPagamento || formaPagamento==undefined || formaPagamento==null){
            setCorFormaPagamento('blue')
            errors.push('error')
           
        } 
        if(!idMensalidade || idMensalidade==undefined || idMensalidade==null){
            closeConfirmPopup()
            setCorMensalidade('blue')
            errors.push('error')
             
        } 
        if(!anoApagar || anoApagar==undefined || anoApagar==null){
            closeConfirmPopup()
            setCorAnoApagar('blue')
            errors.push('error')
             
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
        setApelido("")
        setCodigoEstudante("")
        setNomeCurso("")
        setFotoDoEstudante("")
        setHorario("")
        setDataCadastro("")
        setDesconto("")
        setNivel("")
        setValorApagar("")
        //setMesApagar("")
        setIdMensalidade("")
        setFotoDoEstudante("")
        setCodigoCadastro("")
        setFormaPagamento("")
    }

    function eventPagarMensalidade(){
        openConfirmPopup()
        setMessageConfirmPopup('DESEJA efectuar este pagamento')
        setEvento('pagarMensalidade')
        validarDados()
        
    }
  
    function chooseOptionFunction(){
        if(evento=="pagarMensalidade"){
           return pagarMensalidade()
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
                                <NammePage width='100%' padding={6} namepage='tela de pagamentos especiais' />
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
                        width={265} 
                        height={160}
                        larguraImage
                        alturaImagem
                        fotoDoEstudante={fotoDoEstudante}
                        />
                        </div>
                    </div>
                </div>
                <div className={styles.bottom_container}>
                <div className={styles.form_container}>
                        <div className={styles.content_form}>
                            <div className={styles.form}>
                                <div className={styles.form_left}>
                                    <InputGeral width='80%' padding={7.3} inputName='nome do estudante' value={nomeEstudante} />
                                    <InputGeral width='80%' padding={7.3} inputName='apelido do estudante' value={apelido} />
                                    <InputGeral width='80%' padding={7.3} inputName='codigo do estudante' value={codigoEstudante} />
                                    <InputGeral width='80%' padding={7.3} inputName='curso' value={nomeCurso} />
                                </div>
                                <div className={styles.form_center}>
                                    <InputGeral width='80%' padding={7.3} inputName='horario' value={horario}  />
                                    <InputGeral width='80%' padding={7.3} inputName='usuario' value={usuario} />
                                    <InputGeral width='80%' padding={7.3} inputName='estado estudante' value={estadoEstudante} /> 
                                    <InputGeral width='80%' padding={7.3} inputName='desconto' value={desconto}  />
                                   
                                </div>
                                <div className={styles.form_right}>
                                
                                <InputGeral width='80%' padding={7.3} inputName='valor a pagar' value={valorApagar} />
                                <div className={styles.select_button}>
                                <Ano width={265}
                                     padding={7.3} 
                                     display='block'
                                     labelName='mensalidade' 
                                     marginTopContainer={0}
                                     setValue={setAnoApagar}
                                     LocalSelecionado={anoApagar}
                                     corValidade={corAnoApagar}
                                />
                                </div>

                                <div className={styles.select_button}>
                                <Meses width={265}
                                     padding={7.3} 
                                     display='block'
                                     labelName='mensalidade'
                                     marginTopContainer={0}
                                     setValue={setIdMensalidade}
                                     LocalSelecionado={idMensalidade}
                                     corValidade={corMensalidadeApagar}
                                />
                                </div>

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
                                 <ButtaoComponent width={185} padding={10.3} text='pagar mensalidade' 
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
        </>
        
    )
}