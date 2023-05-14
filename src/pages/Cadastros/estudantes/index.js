import React, {useState,useMemo, useEffect} from "react";
import styles from './style.module.css'


import Select from "../../../components/Selects/Select";
import InputEstudante from "../../../components/Input/Estudante";
import Bairro from "../../../components/Selects/Bairro";
import Escola from "../../../components/Selects/Escola";
import Foto from "../../../components/Foto";
import ButtaoComponent from "../../../components/Butao";
import EstudanteTabela from "../../../components/Tabelas/Estudantes";
import imageDeFundo from '../../../assents/avatar/avatar-16.svg'
import Popup from "../../../components/Popups/Popup";
import PopupMessage from "../../../components/Popups/PopupMessage";
import FilterInput from "../../../components/Input/FilterInput";

import api from "../../../services/api";

import {validar} from './validacao'

const tds=['nome','apelido','bairro','nome','apelido','bairro','nome','apelido','bairro','nome','apelido','bairro']



export default function CadastroEstudante(){

     const[displayPopup,setDisplayPopup]=useState('none')
     const[displayContainer,setDisplayContainer]=useState('block')


    const [estudantes, setEstudantes]=useState([])
    const [nome, setNome]=useState('')
    const [apelido, setApelido]=useState('')
    const [telefone, setTelefone]=useState('')
    const [telefoneAlternativo, setTelefoneAlternativo]=useState('')
    const [contactoEncarregado, setContactoEncarregado]=useState('')
    const [contactoAlternativoEncarregado, setContactoAlternativoEncarregado]=useState('')
    const [nacionalidade, setNacionalidade]=useState('')
    const [sexo, setSexo]=useState('')
    const [dataNascimento,setDataNascimento]=useState('')
    const [bairro, setBairro]=useState('')
    const [escola, setEscola]=useState('')
    const [documento, setDocumento]=useState('')
    const [dataEmissao, setDataEmissao]=useState('')
    const [dataValidade, setDataValidade]=useState('')
    const [localEmissao, setLocalEmissao]=useState('')
    const [numeroDocumento, setNumeroDucumento]=useState('')
    const [imagemEstudante,setImagemEstudante]=useState(null)
    const [imagemEstudanteUrl,setImagemEstudanteUrl]=useState(null)
    const [idEstudante,setIdEstudante]=useState('')
    const[novosDados,setNovosdados]=useState([])
    const [filtroEstudante,setFiltroEstudante]=useState('')
  


    const [confirmPopup,setConfirmPopup]=useState('none')
    const [messageConfirmPopup,setMessageConfirmPopup]=useState('none')

    const [infoPopup,setInfoPopup]=useState('none')
    const [messageInfoPopup,setMessafeInfoPopup]=useState('')

    
     
    const [corNome, setCorNome]=useState('') 
    const [corApelido, setCorApelido]=useState('') 
    const [corTelefone, setCorTelefone]=useState('')
    const [corLocalEmissao, setCorLocalEmissao]=useState('')
    const [corNumeroDocumento, setCorNumeroDucumento]=useState('')
    const [corSexo, setCorSexo]=useState('')
    const [corDataNascimento, setCorDataNascimento]=useState('')
    const [corBairro, setCorBairro]=useState('')
    const [corEscola, setCorEscola]=useState('')
    const [corDocumento, setCorDocumento]=useState('')
    const [corDataEmissao, setCorDataEmissao]=useState('')
    const [corDataValidade, setCorDataValidade]=useState('')




    const [evento, setEvento]=useState(null)



    
    
    const preview=useMemo(()=>{
       
        return imagemEstudante ? URL.createObjectURL(imagemEstudante): imageDeFundo
    },[imagemEstudante])
    
async function cadastrarEstudante(){
 
  // validar()
    validarDados()
   const data= new FormData()
   data.append('nome',nome)
   data.append('apelido',apelido)
   data.append('contactoPrincipal',telefone)
   data.append('contactoAlternativo',telefoneAlternativo)
   data.append('contactoEncarregado',contactoEncarregado)
   data.append('contactoAlternativoEncarregado',contactoAlternativoEncarregado)
   data.append('nacionalidade',nacionalidade)
   data.append('sexo',sexo)
   data.append('dataNascimento',dataNascimento)
   data.append('bairro',bairro)
   data.append('schoolname',escola)
   data.append('tipoDocumento',documento)
   data.append('dataEmissao',dataEmissao)
   data.append('dataValidade',dataValidade)
   data.append('localEmissao',localEmissao)
   data.append('numeroDocumento',numeroDocumento)
   data.append('filename',imagemEstudante)
  
     
 try {
    
    const response= await api.post('/cadastrarestudante',
      data)
    const dataResolte= await response.data.data
    console.log(dataResolte)
    setConfirmPopup('none')
  //  alert('estudante cadastrado com sucesso')
    
    if(response.status==200){
            
        setMessafeInfoPopup("estudante cadastrado com sucesso")
        abrirInfoPopup()
        
    }
 } catch (error) {
    console.log(error)
 }
    
   
        
     //   console.log(error)
        
    
        console.log(nome)
        console.log(apelido)
        console.log(telefone)
        console.log(telefoneAlternativo)
        console.log(contactoEncarregado)
        console.log(nacionalidade)
        console.log(sexo)
        console.log(dataNascimento)
        console.log(bairro)
        console.log(escola)
        console.log(documento)
        console.log(dataEmissao)
        console.log(dataValidade)
        console.log(localEmissao)
        console.log(numeroDocumento)
        console.log(imagemEstudante)
        
}

   useEffect(()=>{
    async function listarEstudantes(){
        try {
            const response= await api.get('/listarestudantes')
                const data= await response.data.data
                setNovosdados(data)
                console.log(data)
                setEstudantes(data)
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
                         if((item.nome.toLowerCase().indexOf(filtroEstudante.toLowerCase())>-1)||(item.apelido.toLowerCase().indexOf(filtroEstudante.toLowerCase())>-1) || (item.contactos.contactoPrincipal.toLowerCase().indexOf(filtroEstudante.toLowerCase())>-1)){
                             return true
                         }else{
                             return false
                         }
                     })
                 )
             } 
         
         
    },[filtroEstudante])

       useEffect(()=>{},[])
  


    function validarDados(){
        if(!nome || nome==undefined || nome==null){
           
            setCorNome('red')
            
           
        }
        if(!apelido || apelido==undefined || apelido==null){
            setCorApelido('red')
        }
         if(!telefone || telefone==undefined || telefone==null){
            setCorTelefone('red')
         }
         if(!localEmissao || localEmissao==undefined || localEmissao==null){
           setCorLocalEmissao('red')
        }
        if(!numeroDocumento || numeroDocumento==undefined || numeroDocumento==null){
            setCorNumeroDucumento('red')
        }
        if(!sexo || sexo==undefined || sexo==null){
            setCorSexo('red')
        }
        if(!dataNascimento || dataNascimento==undefined || dataNascimento==null){
            setCorDataNascimento('red')
        }
        if(!bairro || bairro==undefined || bairro==null){
            setCorBairro('red')
        }
        if(!escola || escola==undefined || escola==null){
            setCorEscola('red')
        }
        if(!dataEmissao || dataEmissao==undefined || dataEmissao==null){
            setCorDataEmissao('red')
        }
        if(!dataValidade || dataValidade==undefined || dataValidade==null){
            setCorDataValidade('red')
        }
        
        
        if(!documento || documento==undefined || documento==null){
            setCorDocumento('red')
        }

        
    }


   async function preencherDadosEstudantes(id){
   
        try {
            const response= await api.get(`/pesquisarestudante/${id}`)
                    const data= await response.data.data
                    console.log(data)
                
                    setNome(data.nome)
                    setApelido(data.apelido)
                    setTelefone(data.contactos.contactoPrincipal)
                    setTelefoneAlternativo(data.contactos.contactoAlternativo)
                    setContactoEncarregado(data.contactos.contactoEncarregado)
                    setNacionalidade(data.nacionalidade)
                    setSexo(data.sexo)
                    setDataNascimento(data.dataNascimento)
                    setBairro(data.bairro._id)
                    setEscola(data.schoolname._id)
                    setDocumento(data.documentos.tipoDocumento)
                    setDataEmissao(data.documentos.dataEmissao)
                    setDataValidade(data.documentos.dataValidade)
                    setLocalEmissao(data.documentos.localEmissao)
                    setNumeroDucumento(data.documentos.numeroDocumento)
                    
                    setImagemEstudanteUrl(data.url)
                    setIdEstudante(data._id)
                 
                    fecharPopup()
                    // setNomeUsuario(data.usuario.username)
                    // setCodigoUsuario(data.usuario._id)
                    // setFotoDoEstudante(data.url)
                    
        } catch (error) {
            console.log(error)
        }
    }

   async function editarDadosEstudante(){
        const id=idEstudante
      const dados={
        nome, apelido ,bairro, sexo ,
        dataNascimento ,
         contactoPrincipal:telefone ,
         contactoAlternativo: telefoneAlternativo,
         contactoEncarregado:contactoEncarregado , 
        nacionalidade, 
        numeroDocumento,
        dataEmissao, 
        dataValidade, localEmissao ,
        tipoDocumento:documento,
        schoolname:escola,
      }
      const response= await api.put(`/editarestudante/${id}`,
      dados
      )
          const data= await response.data.data
          console.log(data)
          alert(' dados editados com sucesso')
          setConfirmPopup('none')
    }

    async function actualizarFoto(){
        const data= new FormData()
        data.append('filename',imagemEstudante)
        data.append('estudante_id',idEstudante)
        
        try {
            const response= await api.put(`/actualizarfoto`,
            data
            )
          const dataResolte= await response.data.data
          console.log(dataResolte)
          alert('foto actualizada  com sucesso')
          setConfirmPopup('none')
            
        } catch (error) {
            console.log(error)
        }
    }

    async function excluirEstudante(){
        let id= idEstudante
        try {

     const response= await api.delete(`/excluirestudante/${id}`)
          const data= await response.data.data
          console.log(data)
          alert(' estudante excluido com sucesso')
          setConfirmPopup('none')
            
        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(()=>{
        setCorNome('')
    },[nome])
    useEffect(()=>{
        setCorApelido('')
    },[apelido])
    useEffect(()=>{
        setCorSexo('')
    },[sexo])


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

    function selecionarDocumento(e){
        

        setDocumento(e.target.value)
        
    }

    function selecionarSexo(e){
        setSexo(e.target.value)
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
    function eventActualizarFotoEstudante(){
        
        openConfirmPopup()
        setMessageConfirmPopup('DESEJA actualizar foto do estudante')
        setEvento('actualizarFoto')
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

         if(evento=="excluirestudante"){
            return excluirEstudante()
         }

         if(evento=="exclu"){
            return actualizarFoto()
         }
    }



    return(
        <>
        <div className={styles.container} style={{display:displayContainer }}>
           <div className={styles.form}>
                <div className={styles.form_container}>
                    <div className={styles.left_form}>
                    
                        <InputEstudante 
                        value={nome}
                        setValue={setNome}
                        name='nome'
                        corValidade={corNome}
                      
                        
                        />
                    
                        
                        <InputEstudante
                         name='apelido'
                        setValue={setApelido}
                        value={apelido}
                        corValidade={corApelido}
                        
                          />
                         
                        <InputEstudante name='telefone' 
                          setValue={setTelefone}
                          value={telefone}
                          corValidade={corTelefone}
                        />
                        <InputEstudante name='telefone alternativo '
                          setValue={setTelefoneAlternativo}
                          value={telefoneAlternativo}
                         />
                        <InputEstudante name='telefone  encarregado' 
                          setValue={setContactoEncarregado}
                          value={contactoEncarregado}
                        />
                         <InputEstudante name='telefone  encarregado 2' 
                          setValue={setContactoAlternativoEncarregado}
                          value={contactoAlternativoEncarregado}
                        />
                        <InputEstudante name='nacionalidade' 
                          setValue={setNacionalidade}
                          value={nacionalidade}
                        />
                        <div id="sexo" className={styles.input_group}
                        style={{
                            color:corSexo || "#272262"
                        }}
                        >
                            <div className={styles.label}>
                                <label htmlFor="sexo" id="labelSexo">sexo </label>
                            </div>
                            
                                                    
                                <label htmlFor="m">masculino</label>
                                    <input type="radio" name="genero" id="m" value="masculino"
                                      checked={sexo=="masculino"}
                                    onChange={selecionarSexo}
                                    
                                    />
                                    
                                    <label htmlFor="f">femenino</label>
                                    <input type="radio" name="genero" id="f" value="femenino"
                                      checked={sexo=="femenino"}
                                      onChange={selecionarSexo}
                                    /> 
                        </div>
                        <div className={styles.input_group}
                        style={{
                            color:corDataNascimento || "#272262"
                        }}
                        >
                                        <label  id="labelDatanascimento" h="data_nascimento">data nascimento </label>
                                        <input className={styles.data_nascimento} type="date"  id=""
                                        value={dataNascimento}
                                        onChange={(e)=>setDataNascimento(e.target.value)}
                                        />
                        </div>
                    </div>
                    <div className={styles.center_form}>
                        <div className={styles.input_group_center}
                         style={{
                            color:corBairro || "#272262"
                        }}
                        >
                            <Bairro width="250px"
                            padding={3.5} 
                            setValue={setBairro}
                            value={bairro}
                            display='flex'
                            estadoSelecionado={bairro}
                            />       
                        </div>
                        <div className={styles.input_group_center}
                        style={{
                            color:corEscola || "#272262"
                        }}
                        >
                            <Escola width="250px" 
                            padding={3.5} 
                            setValue={setEscola}
                            value={escola}
                            display='flex'
                            estadoSelecionado={escola}
                            />       
                        </div>

                        <div className={styles.input_group_center}>
                        <div className={styles.label}
                        style={{
                            color:corDocumento || "#272262"
                        }}
                        >
                                <label>documento </label>
                        </div>   
                            <div className={styles.document_group_geral}
                            
                            > 
                                <div className={styles.document_group}>
                                    <label htmlFor="bi">bi</label>
                                    <input type="radio" name="documento" id="bi" value="bi"
                                     onChange={selecionarDocumento}
                                     checked={documento==='bi'}
                                    />
                                   
                                </div>        
                                <div className={styles.document_group}>
                                    <div className={styles.document_space}>
                                        <label htmlFor="cedula">cedula</label>
                                        <input type="radio" name="documento" id="cedula"  value="cedula"
                                         onChange={selecionarDocumento}
                                         checked={documento==='cedula'}
                                         
                                        /> 
                                    </div>
                                    
                                </div>        
                                
                                <div className={styles.document_group}> 
                                <div className={styles.document_space}>
                                        <label htmlFor="passaporte">passaporte</label>
                                        <input type="radio" name="documento" id="passaporte" value="passaporte"
                                          onChange={selecionarDocumento}
                                         checked={documento==='passaporte'}
                                        />
                                </div>
                                    
                                </div> 
                            </div> 
                        </div>
                        <div className={styles.input_group_center}
                        style={{
                            color:corDataEmissao || "#272262"
                        }}
                        >
                                <label >data emissao </label>
                                <input type="date" name="" id="" style={{width:200,marginLeft:12}}
                                 onChange={(e)=>setDataEmissao(e.target.value)}
                                 value={dataEmissao}
                                />
                        </div>
                        <div className={styles.input_group_center}
                        style={{
                            color:corDataValidade || "#272262"
                        }}
                        >
                                <label >data validade </label>
                                <input type="date" name="" id="" style={{width:200,marginLeft:12}}
                                 onChange={(e)=>setDataValidade(e.target.value)}
                                 value={dataValidade}
                                />
                        </div>

                        <div className={styles.input_group_center}>
                            <InputEstudante name='local emissao'
                              setValue={setLocalEmissao}
                              value={localEmissao}
                              corValidade={corLocalEmissao}
                              
                            />
                        </div>
                        <div className={styles.input_group_center}>
                            <InputEstudante name='numero do documento'
                              setValue={setNumeroDucumento}
                              value={numeroDocumento}
                              corValidade={corNumeroDocumento}
                              
                            />
                        </div>
                    </div>
                    <div className={styles.right_form}>
                        <div className={styles.foto}>
                            <Foto width={200} height={200} 
                            setValue={setImagemEstudante}
                            imageDeFundo={preview}
                            imageUrl={imagemEstudanteUrl}
                            />
                        </div>
                        <div className={styles.action_button}>
                                <ButtaoComponent 
                                width={200}
                                text="cadastrar"
                                padding={7}
                                event={eventCadastrarEstudante}
                                />
                        </div>
                        <div className={styles.action_button}>
                                <ButtaoComponent width={200} text="editar estudante"  padding={7}
                                
                                event={eventEditarEstudante}
                                />
                        </div>
                        <div className={styles.action_button}>
                                <ButtaoComponent width={200} text="actualizar foto"  padding={7}
                                event={eventActualizarFotoEstudante}
                                />
                        </div>
                        <div className={styles.action_button}>
                                <ButtaoComponent width={200} text="excluir dados"  padding={7}
                                 event={enventExcluirEstudante}
                                />
                        </div>
                      
                        <div className={styles.action_button}>
                                <ButtaoComponent width={200} text="pesquisar estudantes" padding={7}
                                
                                event={fecharPopup}
                                />
                                
                        </div>
                        
                    </div>
                </div>
         </div>
        </div>

        <div className={styles.popup}
        style={{display:displayPopup}}
        >
            <div className={styles.close_button_and_search_area}>
                <div className={styles.search_area}>
                        <FilterInput width='60%' padding={8}
                        setValue={setFiltroEstudante}
                        />
                </div>    
                <div className={styles.close_button}>
                    <span onClick={fecharPopup}>fechar</span>
                </div>
            </div>

            <div className={styles.table}>
                <EstudanteTabela list={tds}
                    tbody={estudantes.map((estudante)=>{
                        return(
                            <tr onClick={()=>preencherDadosEstudantes(estudante._id)} key={estudante._id}>
                                <td>{estudante.nome}</td>
                                <td>{estudante.apelido}</td>
                                <td>{estudante.contactos.contactoPrincipal}</td>
                                <td>{estudante.dataNascimento}</td>
                                <td>{estudante.schoolname.nomeEscola}</td>
                                <td>{estudante.sexo}</td>
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
        </>
    )
}