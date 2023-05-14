import React,{useState,useEffect,useContext} from "react";
import styles from './styles.module.css'





import Popup from "../../../components/Popups/Popup";
import PopupMessage from "../../../components/Popups/PopupMessage";
import MaisOpcoes from "../../../components/MaisOpcoes";
import EstudanteTabela from "../../../components/Tabelas/Estudantes";
import Tabelageral from "../../../components/Tabelas/Tabelageral";
import InputGeral from "../../../components/Input/InputGeral";
import FilterInput from "../../../components/Input/FilterInput";
import NammePage from "../../../components/NamePage";
import Foto from "../../../components/Foto";
import ImageStudent from "../../../components/ImageStudent";
import Select from "../../../components/Selects/Select";
import ButtaoComponent from "../../../components/Butao";

import CursoSelect from "../../../components/Selects/Cursos";
import HorarioComponent from "../../../components/Selects/Horario";
import NiveisComponent from "../../../components/Selects/Niveis";
import EstadoComponent from "../../../components/Selects/Estado";
import TaxaInscricaoComponent from "../../../components/Selects/TaxaInscricao";
import FormaPagamentoComponent from "../../../components/Selects/Formapagamento";
import InputCalendario from "../../../components/Input/InputCalendario";
import api from "../../../services/api";
import { AuthContext } from "../../../context/auth.js";




const tds=['nome','apelido','bairro','nome','apelido','bairro','nome','apelido','bairro','nome','apelido','bairro']

const tabelaHeader=['nome','apelido','telefone','ano nascimeno','escola','sexo']
const tabelaHeader2=['nome','apelido','telefone',' horario','nivel','curso','codigo estudante']
//   <EstudanteTabela list={tds}/>

//
export default function CadastroEstudanteCurso(){

    const [estudantes,setEstudantes]=useState([])
    const [estudantesCadastrados,setEstudantesCadastrados]=useState([])
    const [nomeEstudante,setNomeEstudante]=useState('')
    const [codigoEstudante,setCodigoEstudante]=useState('')
    const [nomeUsuario,setNomeUsuario]=useState('')
    const [codigousuario,setCodigoUsuario]=useState('')
    const [fotoDoEstudante,setFotoDoEstudante]=useState('')
    const [curso,setCurso]=useState('')
    const [codigoInscricao,setCodigoInscricao]=useState('')
    const [nivel,setNivel]=useState('')
    const [horario,setHorario]=useState('')
    const [desconto,setDesconto]=useState('')
    const [estado,setEstado]=useState('')
    const [dataInscricao,setDataInscricao]=useState('')
    const [formaPagamento,setFormaPagamento]=useState('')
    const [taxaInscricao,settaxaInscricao]=useState('')
    const [idEstudante,setIdEstudante]=useState('')



    const [corCurso, setCorCurso]=useState('')
    const [corHorario, setCorHorario]=useState('')
    const [corNivel, setCorNivel]=useState('')
    const [corBairro, setCorBairro]=useState('')
    const [corEstado, setCorEstado]=useState('')
    const [cortaxaInscricao, setCorTaxaIncricao]=useState('')
    const [corDesconto, setCorDesconto]=useState('')
    const [corDataIncricao, setCorDataInscricao]=useState('')
    const [corDataNascimento, setCorDataNascimento]=useState('')
    const [corFormaPagamento, setCorFormaPagamento]=useState('')
    const [lista, setLista]=useState()
    const [filtro, setFiltro]=useState('')






    const[displayPopup,setDisplayPopup]=useState('none')
    const[displayContainer,setDisplayContainer]=useState('block')
    const [confirmPopup,setConfirmPopup]=useState('none')
    const [messageConfirmPopup,setMessageConfirmPopup]=useState('none')
    const [infoPopup,setInfoPopup]=useState('none')
    const [messageInfoPopup,setMessafeInfoPopup]=useState('')

    const [evento, setEvento]=useState(null)

//     const user=localStorage.getItem('user')
//     const userData=JSON.parse(user)
//     const token=userData.token
//    // console.log(token)


    const {autenticado}=useContext(AuthContext)
    console.log(autenticado)

    let data
    useEffect(()=>{

        async function listarEstudantes(){
            try {
                const response= await api.get('/listarestudantes')
                     data= await response.data.data
                    console.log(data)
                    setEstudantes(data)
            } catch (error) {
                console.log(error)
            }
        }
        listarEstudantes()
    },[])


  

async  function preencherdadosInscricao(id){
        try {
            const response= await api.get(`/pesquisarestudante/${id}`)
                    const data= await response.data.data
                    console.log(data)
                   
                    setNomeEstudante(data.nome)
                    setCodigoInscricao(data._id)
                    setNomeUsuario(data.usuario.username)
                    setCodigoUsuario(data.usuario._id)
                    setFotoDoEstudante(data.url)
                    
        } catch (error) {
            console.log(error)
        }
}
async function preencherdadosCadastros(id){
        try {
            const response= await api.get(`/pesquisarcadastro/${id}`)
                    const data= await response.data.data
                    console.log(data)
                    fecharPopup()
                    setNomeEstudante(data.codigoInscricao.nome)
                    setCodigoInscricao(data.codigoInscricao._id)
                    setNomeUsuario(data.usuario.username)
                    setCodigoUsuario(data.usuario._id)
                    setFotoDoEstudante(data.codigoInscricao.url)
                    setCurso(data.curso._id)
                    setHorario(data.horario)
                    setNivel(data.nivel)
                    setEstado(data.estado)
                    settaxaInscricao(data.taxaInscricao)
                    setDesconto(data.desconto)
                    setDataInscricao(data.dataInscricao)
                    setFormaPagamento(data.formaPagamento)
                    setIdEstudante(data._id)
                   
        } catch (error) {
            console.log(error)
        }
}


async function cadastrarEstudante(){
    validarDados()
        const dados={ curso,horario,nivel,estado,taxaInscricao,desconto,dataInscricao,formaPagamento,codigoInscricao}
        console.log(dados)
        try {
            const response= await api.post('/cadastarestudantecurso',
            dados)
          const data= await response.data.data
       console.log(data)
       setConfirmPopup('none')
       if(response.status==200){
            
        setMessafeInfoPopup("estudante cadastrado com sucesso")
        abrirInfoPopup()
        
      }
        } catch (error) {
            console.log(error.data)
            console.log(error.message)
        }
}

function validarDados(){
    closeConfirmPopup()
    let errors=[]
    if(!curso || curso==undefined || curso==null){
        setCorCurso('blue')
        errors.push('error')
    }
    if(!estado || estado==undefined || estado==null){
        setCorEstado('blue')
        errors.push('error')
    }
    if(!horario || horario==undefined || horario==null){
        setCorHorario('blue')
        errors.push('error')
    }
    if(!nivel || nivel==undefined || nivel==null){
        setCorNivel('blue')
        errors.push('error')
    }
    if(!taxaInscricao || taxaInscricao==undefined || taxaInscricao==null){
        setCorTaxaIncricao('blue')
        errors.push('error')
    }
    
    if(!formaPagamento || formaPagamento==undefined || formaPagamento==null){
        setCorFormaPagamento('blue')
        errors.push('error')
    }

    if(!desconto || desconto==undefined || desconto==null || desconto=="selecione"){
        setCorDesconto('blue')
        errors.push('error')
    }
    
    if(errors.length>=1){
        setMessafeInfoPopup("preencha todos campos obrigatorios!")
        abrirInfoPopup()
        return 
    }
    

    if(!codigoInscricao || codigoInscricao==undefined || codigoInscricao==null || codigoInscricao==""){
        setMessafeInfoPopup("selecione um estudante!")
        abrirInfoPopup()
        return
    }
    
    
}

async function listarEstudantesCadastrados(){
    
        try {
            const response= await api.get('/listarcadastrados')
                const data= await response.data.data
                console.log(data)
                setEstudantesCadastrados(data)
                fecharPopup()
              
        } catch (error) {
            console.log(error)
        }
}

async function editarDadosEstudante(){
    const id=idEstudante
    if(!id){
        return alert("selecione um estudante")
    }
    const dados={
        horario,nivel,estado,taxaInscricao,desconto,dataInscricao,formaPagamento
   }
  const response= await api.put(`/editarcadastro/${id}`,
  dados
  )
      const data= await response.data.data
      console.log(data)
      alert(' dados editados com sucesso')
      setConfirmPopup('none')
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


function eventCadastrarEstudante(){
    openConfirmPopup()
    setMessageConfirmPopup('DESEJA CADASTRAR ESTE ESTUDANTE')
    setEvento('cadastrarEstudante')
}

function eventEditarEstudante(){
    
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
    if(evento=="cadastrarEstudante"){
       return cadastrarEstudante()
    }

    if(evento=="editarestudante"){
        return editarDadosEstudante()
     }

    //  if(evento=="excluirestudante"){
    //     return excluirEstudante()
    //  }

    //  if(evento=="exclu"){
    //     return actualizarFoto()
    //  }
}

useEffect(()=>{
    setCorCurso('')
},[curso])


    return(
        <div className={styles.contain}>
            
            <div className={styles.container} style={{display:displayContainer}} >
                <div className={styles.container_geral}>
                    <div className={styles.top_container}>
                        <div className={styles.filter_and_namepage_container}>
                            <div className={styles.filtro}>
                                <FilterInput width='100%' padding={8}     setValue={setFiltro} />
                            </div>
                        <div className={styles.namepage}>
                                <NammePage width='100%' padding={6} namepage='tela de cadastro de  curso do estudante' />
                        </div>
                            
                        </div>
                        <div className={styles.table_and_image_container}>
                            <div className={styles.tabela}>
                                <Tabelageral width='100%' height='100%'
                                list={tabelaHeader}
                                tbody={estudantes.map((estudante)=>{
                                    return(
                                        <tr onClick={()=>preencherdadosInscricao(estudante._id)} key={estudante._id}>
                                            <td>{estudante.nome.toUpperCase()}</td>
                                            <td>{estudante.apelido.toUpperCase()}</td>
                                            <td>{estudante.contactos.contactoPrincipal.toUpperCase()}</td>
                                            <td>{estudante.dataNascimento.toUpperCase()}</td>
                                            <td>{estudante.schoolname.nomeEscola.toUpperCase()}</td>
                                            <td>{estudante.sexo.toUpperCase()}</td>
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
                                        <InputGeral 
                                        width='80%' padding={7.3} inputName='nome do estudante' value={nomeEstudante}/>
                                        <InputGeral 
                                        width='80%' padding={7.3} inputName='codigo de inscricao' 
                                        value={codigoInscricao}
                                        setValue={setCodigoInscricao}
                                        />
                                        <InputGeral width='80%' padding={7.3} inputName='nome do usuario' value={nomeUsuario}/>
                                        <InputGeral width='80%' padding={7.3} inputName='codigo do usuario'value={codigousuario}/>
                                    </div>
                                    <div className={styles.form_center}>
                                        <CursoSelect 
                                        width='80%' padding={7.3}
                                        nome='curso'
                                        display='block'
                                        setValue={setCurso}
                                        LocalSelecionado={curso}
                                        corValidade={corCurso}
                                        />
                                        <HorarioComponent 
                                        width='80%' padding={7.3} 
                                        display='block'
                                        setValue={setHorario}
                                        LocalSelecionado={horario} 
                                        corValidade={corHorario}
                                        />
                                        <NiveisComponent 
                                        width='80%' 
                                        padding={7.3} 
                                        display='block'
                                        setValue={setNivel}
                                        LocalSelecionado={nivel}
                                        corValidade={corNivel}
                                        />
                                        <EstadoComponent width='80%'
                                        padding={7.3} 
                                        display='block'
                                        labelName='estado'
                                        marginTopContainer={15}
                                        setValue={setEstado}
                                        LocalSelecionado={estado}
                                        corValidade={corEstado}
                                        />
                                    </div>
                                    <div className={styles.form_right}>
                                    <TaxaInscricaoComponent 
                                    width='80%' padding={7.3} 
                                    labelName='taxa de inscricao'
                                    setValue={settaxaInscricao}
                                    display='block'
                                    LocalSelecionado={taxaInscricao}
                                    corValidade={cortaxaInscricao}
                                    />
                                    <EstadoComponent width='80%'
                                        padding={7.3} 
                                        display='block'
                                        labelName='desconto'
                                        marginTopContainer={0}
                                        setValue={setDesconto}
                                        LocalSelecionado={desconto}
                                        corValidade={corDesconto}
                                    />
                                    <InputCalendario width='80%'
                                    padding={7.3} 
                                    labelName='data da inscricao'
                                    display='block'
                                    setValue={setDataInscricao}
                                    value={dataInscricao}
                                    corValidade={corFormaPagamento}
                                    />
                                    <FormaPagamentoComponent width='80%'
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
                                <div className={styles.form_action}>
                                <div className={styles.action_button}>
                                    <ButtaoComponent width={185} padding={10.3} text='cadastrar' 
                                    event={eventCadastrarEstudante}
                                    
                                    />
                                </div>
                                <div className={styles.action_button}>
                                    <ButtaoComponent width={185} padding={10.3} text='listar cadastros' 
                                    event={listarEstudantesCadastrados}
                                    />
                                </div>
                                <div className={styles.action_button}>
                                    <ButtaoComponent width={185} padding={10.3} text='editar cadastro'
                                    event={eventEditarEstudante}
                                    />
                                </div>
                                <div className={styles.action_button}>
                                    <ButtaoComponent width={185} padding={10.3} text='excluir estudante' />
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



            <div className={styles.popup}style={{display:displayPopup}}>
            <div className={styles.close_button_and_search_area}>
                <div className={styles.search_area}>
                        <FilterInput width='60%' padding={8}/>
                </div>    
                <div className={styles.close_button}>
                    <span onClick={fecharPopup}>fechar</span>
                </div>
            </div>

             <div className={styles.table}>
           
                       <Tabelageral width='100%' height='100%'
                                list={tabelaHeader2}
                                tbody={estudantesCadastrados.map((estudante)=>{
                                    return(
                                        <tr onClick={()=>preencherdadosCadastros(estudante._id)} key={estudante._id}>
                                            <td>{estudante.codigoInscricao.nome.toUpperCase()}</td>
                                            <td>{estudante.codigoInscricao.apelido.toUpperCase()}</td>
                                            <td>{estudante.codigoInscricao.contactos.contactoPrincipal.toUpperCase()}</td>
                                            <td>{estudante.horario.toUpperCase()}</td>
                                            <td>{estudante.nivel.toUpperCase()}</td>
                                            <td>{estudante.curso.nomeCurso.toUpperCase()}</td>
                                            <td>{estudante.codigoEstudante.toUpperCase()}</td>
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








































  
        </div>
    )
}