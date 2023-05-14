import React, {useState,useEffect} from "react";
import styles from './style.module.css'

import NammePage from "../../../components/NamePage";
import FilterInput from "../../../components/Input/FilterInput";
import Tabelageral from "../../../components/Tabelas/Tabelageral";
import ImageStudent from "../../../components/ImageStudent";
import ButtaoComponent from "../../../components/Butao";
import Select from "../../../components/Selects/Select";
import InputGeral from "../../../components/Input/InputGeral";
import api from "../../../services/api";
import EstadoDEEntrega from "../../../components/Selects/EstadoDeEntrega";
import FormaPagamentoComponent from "../../../components/Selects/Formapagamento";
import Popup from "../../../components/Popups/Popup";
import PopupMessage from "../../../components/Popups/PopupMessage";


const tabelaHeader=['nome','apelido','curso','codigo estudante']
const tabelaHeader2=['nome  manual','quantidade ','nome do curso','valor do manual']

export default function ComprarManuais(){
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
    const [fotoDoEstudante,setFotoDoEstudante]=useState('')



       
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
    useEffect(()=>{

        async function listarmanuais(){
            try {
                const response= await api.get('/listarmanuais')
                    const data= await response.data.data
                    console.log(data)
                    setManuais(data)
            } catch (error) {
                console.log(error)
            }
        }
        listarmanuais()
    },[valorTotalPago])

    async function pesquisarEstudante(id){
        
        try {
            const response= await api.get(`/pesquisarcadastro/${id}`)
                    const data= await response.data.data
                    console.log(data)
                    setNomeEstudante(data.codigoInscricao.nome)
                    setApelido(data.codigoInscricao.apelido)
                    setCodigoEstudante(data.codigoEstudante)
                    setNomeCurso(data.curso.nomeCurso)
                    setCodigoCadastro(data._id)
                    setFotoDoEstudante(data.codigoInscricao.url)
                   
                    
                    
        } catch (error) {
            console.log(error)
            const resultError=error.response.data.message
            setMessafeInfoPopup(resultError)
            abrirInfoPopup()
        }
    }

    async function pesquisarManual(id){
      
        try {
            const response= await api.get(`/pesquisarmanual/${id}`)
                    const data= await response.data.data
                    console.log(data)
                    setNomeManual(data.nomeManual)
                    setQuantidadeDisponivel(data.quantidadeManual)
                    setNomeCursoManual(data.CursoManual.nomeCurso)
                    setValorUnitario(data.valorManual)
                    setCodigoManualId(data._id)
                    
                   
        } catch (error) {
            console.log(error)
            const resultError=error.response.data.message
            setMessafeInfoPopup(resultError)
            abrirInfoPopup()
        }
    }

    async function comprarManual(){
        closeConfirmPopup()
       
        const dados={
            quantidade:quantidadeDesejada,
            statusEntrega,
            formPagamento:formaPagamento,
            codigoCadastro,
            codigoManualId
        }
      
        try {
            
            const response= await api.post('/vendamanuais',
            dados)
                const data= await response.data.data
                 console.log(data)
                 if(response.status=="200"){
                    setMessafeInfoPopup("manual comprado sucesso")
                    abrirInfoPopup()
                    limparCampos()
                 }
                  
                  setValorTotalPago(data.valorTotalPago)
                    
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
         if(!statusEntrega || statusEntrega==undefined || statusEntrega==null){
            setCorStatusEntrega('blue')
            errors.push('error') 
        } 
        if(!quantidadeDesejada || quantidadeDesejada==undefined || quantidadeDesejada==null){
            setCorQuantidadeDesejada('blue')
            errors.push('error') 
        } 
 
         if(!codigoCadastro || codigoCadastro==undefined || codigoCadastro==null){
             closeConfirmPopup()
             setMessafeInfoPopup("por favor selecione um estudante!")
             abrirInfoPopup()
             return 
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
    
    function limparCampos(){
        setNomeEstudante("")
        setApelido("")
        setCodigoEstudante("")
        setNomeCurso("")
        setCodigoCadastro("")
        setNomeManual("")
        setQuantidadeDisponivel("")
        setNomeCursoManual("")
        setValorUnitario("")
        setCodigoManualId("")
        setFotoDoEstudante("")
    }

    function eventComprarManual(){
        
        openConfirmPopup()
        setMessageConfirmPopup('DESEJA efectuar compra deste manual')
        setEvento('comprarManual')
        validarDados()
        
    }
  
    function chooseOptionFunction(){
        if(evento=="comprarManual"){
           return comprarManual()
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
        function mudarCorValidacao(){
            if(statusEntrega){
                setCorStatusEntrega("")
            }
            if(formaPagamento){
                setCorFormaPagamento("")
            }
            if(quantidadeDesejada){
                setCorQuantidadeDesejada("")
            }
        }

        mudarCorValidacao()
    },[formaPagamento,statusEntrega,quantidadeDesejada])

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
                                        <tr onClick={()=>{pesquisarEstudante(estudante._id)}}  key={estudante._id}>
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
                                tbody={manuais.map((manual)=>{
                                    return(
                                        <tr onClick={()=>{pesquisarManual(manual._id)}}  key={manual._id}>
                                            <td>{manual.nomeManual}</td>
                                            <td>{manual.quantidadeManual}</td>
                                            <td>{manual.CursoManual.nomeCurso}</td>
                                            <td>{manual.valorManual}</td>
                                            
                                        </tr>
                                    )
                                
                                    })}
                                />
                                </div>
                                <div className={styles.image}>
                                    <ImageStudent width='100%' height='100%' 
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
                                        <InputGeral width='80%' padding={7.3} inputName='nome do estudante' value={nomeEstudante} setValue={setNomeEstudante} />
                                        <InputGeral width='80%' padding={7.3} inputName=' apelido' value={apelido} setValue={setApelido} />
                                        <InputGeral width='80%' padding={7.3} inputName='codigo do estudante' value={codigoEstudante} setValue={setCodigoEstudante} />
                                        <InputGeral width='80%' padding={7.3} inputName='curso' value={nomeCurso}  setValue={setNomeCurso} />
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
                                                    corValidade={corFormaPagamento}
                                                    LocalSelecionado={formaPagamento}
                                                />
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.form_action}>
                                <div className={styles.action_button}>
                                    <ButtaoComponent width={185} padding={10.3} 
                                    text='comprar manual' event={eventComprarManual} />
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