import React, {useState,useEffect} from "react";
import styles from './style.module.css'
import HeaderComponenr from "../../../components/HeaderComponent";

import NammePage from "../../../components/NamePage";
import FilterInput from "../../../components/Input/FilterInput";
import Tabelageral from "../../../components/Tabelas/Tabelageral";
import ImageStudent from "../../../components/ImageStudent";
import ButtaoComponent from "../../../components/Butao";
import Select from "../../../components/Selects/Select";
import InputGeral from "../../../components/Input/InputGeral";
import Escola from "../../../components/Selects/Escola";
import EstadoComponent from "../../../components/Selects/Estado";
import PerfilComponent from "../../../components/Selects/Perfil";

import PopupMessage from "../../../components/Popups/PopupMessage";
import Popup from "../../../components/Popups/Popup";
import Validar from "./validacao";

import api from "../../../services/api";
const profile=['administrador','usuario']
const tabelaHeader=['nome usuario','sobrenome','perfil','estado',]


export default function Usuarios(){

    const [usuarios, setUsuarios]=useState([])
    const [username, setUsername]=useState('')
    const [sobreNome, setSobreNome]=useState('')
    const [estado, setEstado]=useState('')
    const [schoolname, setSchoolName]=useState('')
    const [profile ,setProfile]=useState('')
    const [password ,setPassword]=useState('')
    const [confirmPassword, setConfirmPasswordd]=useState('')
    const [telefone,setTelefone]=useState('')
    const [telefoneAlternativo, setTelefoneAlternativo]=useState('')
    const [escola, setEscola]=useState('')
    const [idUsuario, setIdUsuario]=useState('')

    const [usuariosCadastrados, setUsuariosCadastrados]=useState(0)
    const [usuariosAdmin, setUsuariosAdmin]=useState(0)
    const [usuariosNormais, setUsuariosNormais]=useState(0)



    const[displayPopup,setDisplayPopup]=useState('none')
    const[displayContainer,setDisplayContainer]=useState('block')
    const [confirmPopup,setConfirmPopup]=useState('none')
    const [messageConfirmPopup,setMessageConfirmPopup]=useState('none')
    const [infoPopup,setInfoPopup]=useState('none')
    const [messageInfoPopup,setMessafeInfoPopup]=useState('')
   

    const [evento, setEvento]=useState(null)

    const [corNomeUsuario, setCorNomeUsuario]=useState('')
    const [corApelido, setCorApelido]=useState('')
    const [corEscola, setCorEscola]=useState('')
    const [corPerfil, setCorPerfil]=useState('')
    const [corSenha, setCorSenha]=useState('')
    const [corConfirmSenha, setCorConfirmSenha]=useState('')
    const [corEstado, setCorEstado]=useState('')


    const [errorCor,setErrorCor]=useState("yellow")

useEffect(()=>{
        async function listarUsuarios(){
            try {
                const response= await api.get('/listarusuarios')
                    const data= await response.data.data
                    console.log(data)
                    setUsuarios(data)
                    setUsuariosCadastrados(data.length)
                    
                    let usuariosadmin2
                   
                    usuariosadmin2= await data.filter((usuario)=>{
                         return usuario.perfil =='administrador'
                        
                    })
                    
                    setUsuariosAdmin(usuariosadmin2.length)

                    let usuariosComum
                    usuariosComum= await data.filter((usuario)=>{
                        return usuario.perfil =='usuario'
                    })
                    setUsuariosNormais(usuariosComum.length)

            } catch (error) {
                console.log(error)
            }
        }
        listarUsuarios()
},[])
async function cadastrarUsuario(){
        closeConfirmPopup()
        validadarDados()
        const dados={
            username,sobreNome,estado,escola,profile,password,confirmPassword,telefone,telefoneAlternativo
        }
       const dadosValidadeos= Validar(dados)
       console.log(dadosValidadeos)
       console.log(username)
       console.log(sobreNome)
       console.log(escola)
       console.log(telefone)
       console.log(telefoneAlternativo)
       console.log(profile)
       console.log(password)
       console.log(confirmPassword)
       console.log(estado)

       try {
        const response= await api.post('/cadastrar',{
            username,
            sobreNome,
            estado,
            schoolname,
            perfil:profile,
            password,
            confirmPassword,
            telefone,
            telefoneAlternativo
        })
        const data= await response.data.data
        console.log(data)
        if(response.status==200){
            setMessafeInfoPopup("usuario cadastrado com sucesso")
            abrirInfoPopup()
        }
        
        } catch (error) {
            console.log(error)
            const resultError=error.response.data.message
            setMessafeInfoPopup(resultError)
            abrirInfoPopup()
        }
        
}
async function preencherUsuarios(id){
        fecharPopup()
        try {
            const response= await api.get(`/pesquisar/${id}`)
                const data= await response.data.data
                console.log(data)
                setUsername(data.username)
                setSobreNome(data.sobreNome)
                setIdUsuario(data._id)
                setSchoolName(data.schoolname._id || '')
                setTelefone(data.telefone || '')
                setProfile(data.perfil)
                setEstado(data.estado)
                setTelefoneAlternativo(data.telefoneAlternativo || '')
               
                alert(idUsuario)
            
        } catch (error) {
            console.log(error)
        }
}
     
async function editarUsurio(){
        try {
            let id=idUsuario
            if(!id){
                return alert('selecione um estudante')
            }
            const dados={
                username,sobreNome,schoolname,telefone,telefoneAlternativo,
                perfil:profile,estado
            }
            const response= await api.put(`/editarusuario/${id}`,
            dados
            )
                const data= await response.data.data
                console.log(data)
                alert(' dados editados com sucesso')
               
        } catch (error) {
      
            console.log(error)
        }
}
async function deletarUsuario(){
        closeConfirmPopup()
        try {
            let id=idUsuario
            if(!id){
                setMessafeInfoPopup("selecione um usuario")
                abrirInfoPopup()
                return 
              
            }
            
            const response= await api.delete(`/deletarusuario/${id}`)
                const data= await response.data.data

                if(response.status==200){
                    console.log(data)
                    setMessafeInfoPopup("usuario deletado com sucesso ")
                    abrirInfoPopup()
                }
               
        } catch (error) {
            console.log(error.response.data)
            const resultError=error.response.data.message
            setMessafeInfoPopup(resultError)
            abrirInfoPopup()
        }
}

function validadarDados(){
    let errors=[]
    if(!username || username=="" || username==undefined || username==null){
        setCorNomeUsuario(errorCor)
        errors.push('error')
    }
    if(!sobreNome || sobreNome=="" || sobreNome==undefined || sobreNome==null){
        setCorApelido(errorCor)
        errors.push('error')
    }
    if(!schoolname || schoolname=="" || schoolname==undefined || schoolname==null){
        setCorEscola(errorCor)
        errors.push('error')
    }
    if(!profile || profile=="" || profile==undefined || profile==null){
        setCorPerfil(errorCor)
        errors.push('error')
    }
    if(!password || password=="" || password==undefined || password==null){
        setCorSenha(errorCor)
        errors.push('error')
    }
    if(!confirmPassword || confirmPassword=="" || confirmPassword==undefined || confirmPassword==null){
        setCorConfirmSenha(errorCor)
        errors.push('error')
    }
    if(!estado || estado=="" || estado==undefined || estado==null){
        setCorEstado(errorCor)
        errors.push('error')
    }





    if(errors.length>=1){
        closeConfirmPopup()
        setMessafeInfoPopup("preencha todos campos obrigatorios!")
        abrirInfoPopup()
        return 
    }
}

function eventEditarUsuario(){
    openConfirmPopup()
    setMessageConfirmPopup('DESEJA editar dados deste usuario')
    setEvento('editarUsuario')
}
function eventCadastrarUsuario(){
    openConfirmPopup()
    setMessageConfirmPopup('DESEJA cadastrar este usuario')
    setEvento('cadastrarUsuario')
}
function eventDeletarUsuario(){
    openConfirmPopup()
    setMessageConfirmPopup('DESEJA deletar este usuario')
    setEvento('deletarUsuario')
}
function chooseOptionFunction(){
    if(evento=="cadastrarUsuario"){
       return cadastrarUsuario()
    }

    if(evento=="editarUsuario"){
        return editarUsurio()
     }
     if(evento=="deletarUsuario"){
        return deletarUsuario()
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
        setCorNomeUsuario('')
    },[username])
    useEffect(()=>{
        setCorApelido('')
    },[sobreNome])
    useEffect(()=>{
        setCorEscola('')
    },[schoolname])
    useEffect(()=>{
        setCorPerfil('')
    },[profile])
    useEffect(()=>{
        setCorSenha('')
    },[password])
    useEffect(()=>{
        setCorConfirmSenha('')
    },[confirmPassword])
    useEffect(()=>{
        setCorEstado('')
    },[estado])








    return(
        <div className={styles.contain}>
            <div className={styles.container} style={{display:displayContainer}} >
                
                <div className={styles.content}>
                    <div className={styles.user_header}>
                        <HeaderComponenr 
                         title1='usuarios cadastrados' 
                         title2='usuarios  adminitradores' 
                         title3='usuarios comuns' 
                         dados1={usuariosCadastrados}
                         dados2={usuariosNormais}
                         dados3={usuariosAdmin}
                         
                         />
                    </div>
                    
                    <div className={styles.bottom_container}>
                        <div className={styles.form_container}>
                                <div className={styles.content_form}>
                                    <div className={styles.form}>
                                        <div className={styles.form_left}>
                                            <InputGeral width='95%' padding={7.3} inputName='nome do usuario'
                                            value={username}
                                            setValue={setUsername}
                                            corValidade={corNomeUsuario}
                                            />
                                            
                                            <InputGeral width='95%' padding={7.3} inputName='sobrenome  do usuario'
                                            value={sobreNome}
                                            setValue={setSobreNome}
                                            corValidade={corApelido}
                                            />
                                            <div className={styles.select_button}>
                                                <Escola 
                                                width={370} padding={7.3} 
                                                inputName='nome do estudante'
                                                setValue={setSchoolName}
                                                LocalSelecionado={schoolname}
                                                display='block'
                                                corValidade={corEscola}
                                                
                                                />
                                                
                                            </div>
                                        </div>
                                        <div className={styles.form_center}>
                                            <InputGeral width='95%' padding={7.3} inputName='telefone'
                                            value={telefone}
                                            setValue={setTelefone}
                                            
                                            />
                                            <InputGeral width='95%' padding={7.3} inputName='telefone alternativo'
                                            value={telefoneAlternativo}
                                            setValue={setTelefoneAlternativo}
                                            />
                                            <div className={styles.select_button}>
                                            <PerfilComponent
                                                width={370} padding={7.3} 
                                                inputName=''
                                                setValue={setProfile}
                                                LocalSelecionado={profile}
                                                display='block'
                                                corValidade={corPerfil}
                                                
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className={styles.form_right}>
                                            <InputGeral width='95%' padding={7.3} inputName=' senha'
                                            value={password}
                                            setValue={setPassword}
                                            corValidade={corSenha}
                                            />
                                            <InputGeral width='95%' padding={7.3} inputName='confirm senha'
                                            value={confirmPassword}
                                            setValue={setConfirmPasswordd}
                                            corValidade={corConfirmSenha}

                                            />
                                            <div className={styles.select_button}>
                                            <EstadoComponent
                                                width={370} padding={7.3} 
                                                inputName=''
                                                setValue={setEstado}
                                                LocalSelecionado={estado}
                                                display='block'
                                                labelName='estado'
                                                corValidade={corEstado}
                                                />
                                            </div>
                                        </div>
                                        
                                    </div>
                                
                                </div>
                            </div>
                    </div>
                    <div className={styles.action_button_container}>
                        <div className={styles.action_button_action_content}>
                            <div className={styles.button_contain}>
                                <div className={styles.button_area}>
                                    <div className={styles.button_area_click}>
                                            <ButtaoComponent width={270} text='cadastrar usuario' padding={10} 
                                            event={eventCadastrarUsuario}
                                            />
                                    </div>
                                    <div className={styles.button_area_click}>
                                            <ButtaoComponent width={270} text='editar usuario' padding={10}
                                            event={eventEditarUsuario}
                                            />
                                    </div>
                                </div>
                                <div className={styles.button_area}>
                                    <div className={styles.button_area_click}>
                                            <ButtaoComponent width={270} text='pesquisar usuario' padding={10} event={fecharPopup} />
                                    </div>
                                    <div className={styles.button_area_click}>
                                            <ButtaoComponent width={270} text='deletar usuario' padding={10} event={eventDeletarUsuario} />
                                    </div>
                                </div>
                                <div className={styles.button_area}>
                                    <div className={styles.button_area_click}>
                                            <ButtaoComponent width={270} text='cadastrar usuario' padding={10}/>
                                    </div>
                                    <div className={styles.button_area_click}>
                                            <ButtaoComponent width={270} text='cadastrar usuario' padding={10}/>
                                    </div>
                                </div>
                                <div className={styles.button_area}>
                                    <div className={styles.button_area_click}>
                                            <ButtaoComponent width={270} text='cadastrar usuario' padding={10}/>
                                    </div>
                                    <div className={styles.button_area_click}>
                                            <ButtaoComponent width={270} text='cadastrar usuario' padding={10}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                </div>
                </div>
                <div className={styles.popup} style={{display:displayPopup}}>
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
                                            list={tabelaHeader}
                                            tbody={usuarios.map((usuario)=>{
                                                return(
                                                    <tr onClick={()=>{preencherUsuarios(usuario._id)}}  key={usuario._id}>
                                                        <td>{usuario.username}</td>
                                                        <td>{usuario.sobreNome}</td>

                                                        <td>{usuario.perfil}</td>
                                                        <td>{usuario.estado}</td>
                                                        
                                                        
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