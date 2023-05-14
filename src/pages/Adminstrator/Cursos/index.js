import React ,{useState,useEffect}from "react";
import styles from './style.module.css'

import HeaderComponenr from "../../../components/HeaderComponent";

import NammePage from "../../../components/NamePage";
import FilterInput from "../../../components/Input/FilterInput";
import Tabelageral from "../../../components/Tabelas/Tabelageral";
import ImageStudent from "../../../components/ImageStudent";
import ButtaoComponent from "../../../components/Butao";
import Select from "../../../components/Selects/Select";
import InputGeral from "../../../components/Input/InputGeral";
import TextArea from "../../../components/TextArea";
import EstadoComponent from "../../../components/Selects/Estado";
import Taxas from "../../../components/Selects/Taxas";
import validacao from "./validacao";
import PopupMessage from "../../../components/Popups/PopupMessage";
import Popup from "../../../components/Popups/Popup";

import api from "../../../services/api";

const tabelaHeader=['nome curso','valor adulto','valor crianca','duracao','desconto',]

export default function Curso(){
   const [cursos,setCursos]=useState([])
    const [nomeCurso,setNomeCurso]=useState('')
    const [valorCursoAdulto,setValorCursoAdulto]=useState('')
    const [valorCursoCrianca,setValorCursoCrianca]=useState('')
    const [duracaoCurso,setDuracaoCurso]=useState('')
    const [valorCursoAdultoDesconto,setValorCursoAdultoDesconto]=useState('')
    const [valorCursoCriancaDesconto,setValorCursoCriancaDesconto]=useState('')
    const [descontoCurso,setDescontoCurso]=useState('')
    const [statusMulta,setStatusMulta]=useState('')
    const [taxaMultaCurso,setTaxaMultaCurso]=useState('')
    const [descricaoCurso,setDescricaoCurso]=useState('')

    const [cursosCadastrados,setCursosCadastrados]=useState('')
    const [cursosComMulta,setCursosComMulta]=useState('')
    const [cursosSemMulta,setCursosSemMulta]=useState('')

    const [evento, setEvento]=useState(null)


   const [corNomeCurso, setCorNomeCurso]=useState("")
   const [corValorCursoAdulto, setCorCursoValorAdulto]=useState("")
   const [corCursoValorCrianca, setCorValorCursoCrianca]=useState("")
   const [corDuracaoCurso, setCorDuracaoCurso]=useState("")
   const [corValorCursoAdultoDescontado, setValorCursoAdultoDescontado]=useState("")
   const [corValorCursoCriancaDescontado, setValorCursoCriancaDescontado]=useState("")
   const [corDesconto, setCorDesconto]=useState("")
   const [corMulta, setCorMulta]=useState("")
   const [cortaxaMulta, setCortaxaMulta]=useState("")
   const [idCurso, setIdCurso]=useState("")


   const [errorCor,setErrorCor]=useState("yellow")

   const[displayPopup,setDisplayPopup]=useState('none')
   const[displayContainer,setDisplayContainer]=useState('block')
   const [confirmPopup,setConfirmPopup]=useState('none')
   const [messageConfirmPopup,setMessageConfirmPopup]=useState('none')
   const [infoPopup,setInfoPopup]=useState('none')
   const [messageInfoPopup,setMessafeInfoPopup]=useState('')

    const user=localStorage.getItem('user')
    const userData=JSON.parse(user)

    const token=userData.token
    console.log(token)

    async function cadastrarCurso(){

        validarDados()
        closeConfirmPopup()
        const dados={
            nomeCurso,valorCursoAdulto,valorCursoCrianca,
            duracaoCurso,valorCursoAdultoDesconto,valorCursoCriancaDesconto,
            descontoCurso,statusMulta,taxaMultaCurso,descricaoCurso
        }

        const resultado=validacao(dados)
        console.log(resultado)

        try {
            

            const response= await api.post('/cadastrarcurso',
              dados,{
                headers:{
                    Authorization:token
                }
              

            })
            const data= await response.data.data
            console.log(data)
            alert("curso cadastrado com sucesso")
         
            
            } catch (error) {
                
                console.log(error)
                
            }
      
    }


    useEffect(()=>{
        async function listarCursos(){
            try {
                const response= await api.get('/listarCursos')
                    const data= await response.data.data
                    console.log(data)
                    setCursos(data)
                    setCursosCadastrados(data.length)


                    let cursosComMulta2
                    console.log(cursos)
                    cursosComMulta2= await data.filter((curso)=>{
          
          
                        return curso.statusMulta =='activo'
                        
                        
                      })
                    console.log(cursosComMulta2.length)
                    setCursosComMulta(cursosComMulta2.length)


                    let cursosSemMulta2
                    console.log(cursos)
                    cursosSemMulta2= await data.filter((curso)=>{
          
          
                        return curso.statusMulta =='inactivo'
                         
                        
                      })
                    console.log(cursosSemMulta2.length)
                    setCursosSemMulta(cursosSemMulta2.length)
                   
            } catch (error) {
                console.log(error)
            }
        }
        listarCursos()
    },[])

    async  function preencherCursos(id){
         //alert('clicou em preencher')
         //alert(id)
         fecharPopup()
         let id_curso=id
         try {
             const response= await api.get(`/pesquisarCurso/${id_curso}`)
                     const data= await response.data.data
                     console.log(data)
                   setNomeCurso(data.nomeCurso)
                   setValorCursoAdulto(data.valorCursoAdulto)
                   setValorCursoCrianca(data.valorCursoCrianca)
                   setDuracaoCurso(data.duracaoCurso)
                   setValorCursoAdultoDesconto(data.valorCursoAdultoDesconto)
                   setValorCursoCriancaDesconto(data.valorCursoCriancaDesconto)
                   setStatusMulta(data.statusMulta)
                   setTaxaMultaCurso(data.taxaMultaCurso)
                   setDescricaoCurso(data.descricaoCurso)
                   setDescontoCurso(data.descontoCurso)
                   setIdCurso(data._id)
                    //fecharPopup()
                     
         } catch (error) { 
             console.log(error)
         }
    }

    async function editarDadosCurso(){
        closeConfirmPopup()
        validarDados()
        if(!idCurso || idCurso=="" || idCurso==undefined || idCurso==null){
            return alert("selecione um curso")
        }
        const id=idCurso
        const dados={
            nomeCurso,valorCursoAdulto,valorCursoCrianca,
            duracaoCurso,valorCursoAdultoDesconto,valorCursoCriancaDesconto,
            descontoCurso,statusMulta,taxaMultaCurso,descricaoCurso
        }
        try {
            const response= await api.put('/editarcurso/'+id,
              dados,{
                headers:{
                    Authorization:token
                }
            })
            const data= await response.data.data
            console.log(data)
         
            
            } catch (error) {
                
                console.log(error)
                
            }

    }
    async function deletarCurso(){
        
        closeConfirmPopup()
        if(!idCurso || idCurso=="" || idCurso==undefined || idCurso==null){
            return alert("selecione um curso")
        }
        const id=idCurso
        
        try {
            const response= await api.delete('/deletarcurso/'+id)
            const data= await response.data.data
            console.log(data) 
            } catch (error) {   
                console.log(error)  
            }
    }

    function validarDados(){
        let errors=[]
        if(!nomeCurso || nomeCurso=="" || nomeCurso==undefined || nomeCurso==null){
            setCorNomeCurso(errorCor)
            errors.push('error')
        }
        if(!valorCursoAdulto || valorCursoAdulto=="" || valorCursoAdulto==undefined || valorCursoAdulto==null){
            setCorCursoValorAdulto(errorCor)
            errors.push('error')
        }
        if(!valorCursoCrianca || valorCursoCrianca=="" || valorCursoCrianca==undefined || valorCursoCrianca==null){
            setCorValorCursoCrianca(errorCor)
            errors.push('error')
        }
        if(!duracaoCurso || duracaoCurso=="" || duracaoCurso==undefined || duracaoCurso==null){
            setCorDuracaoCurso(errorCor)
            errors.push('error')
        }
        if(!valorCursoAdultoDesconto || valorCursoAdultoDesconto=="" || valorCursoAdultoDesconto==undefined || valorCursoAdultoDesconto==null){
            setValorCursoAdultoDescontado(errorCor)
            errors.push('error')
        }
        if(!valorCursoCriancaDesconto || valorCursoCriancaDesconto=="" || valorCursoCriancaDesconto==undefined || valorCursoCriancaDesconto==null){
            setValorCursoCriancaDescontado(errorCor)
            errors.push('error')
        }
        if(!descontoCurso || descontoCurso=="" || descontoCurso==undefined || descontoCurso==null){
            setCorDesconto(errorCor)
            errors.push('error')
        }
        if(!statusMulta || statusMulta=="" || statusMulta==undefined || statusMulta==null){
            setCorMulta(errorCor)
            errors.push('error')
        }
        if(!taxaMultaCurso || taxaMultaCurso=="" || taxaMultaCurso==undefined || taxaMultaCurso==null){
            setCortaxaMulta(errorCor)
            errors.push('error')
        }
        if(errors.length>=1){
            closeConfirmPopup()
            setMessafeInfoPopup("preencha todos campos obrigatorios!")
            abrirInfoPopup()
            return 
        }
   
    }

    function eventCadastrarCurso(){
        openConfirmPopup()
        setMessageConfirmPopup('DESEJA CADASTRAR ESTE curso')
        setEvento('cadastrarcurso')
    }
    function eventEditarDadosCurso(){
        openConfirmPopup()
        setMessageConfirmPopup('DESEJA editar dados deste curso')
        setEvento('editarcurso')
    }
    function eventDeletarCurso(){
        openConfirmPopup()
        setMessageConfirmPopup('DESEJA deletar este curso')
        setEvento('deletarCurso')
    }
    function chooseOptionFunction(){
        if(evento=="cadastrarcurso"){
           return cadastrarCurso()
        }

        if(evento=="editarcurso"){
            return editarDadosCurso()
         }
         if(evento=="deletarCurso"){
            return deletarCurso()
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
        setCorNomeCurso('')
    },[nomeCurso])
    useEffect(()=>{
        setCorCursoValorAdulto('')
    },[valorCursoAdulto])
    useEffect(()=>{
        setCorValorCursoCrianca('')
    },[valorCursoCrianca])
    useEffect(()=>{
        setCorDuracaoCurso('')
    },[duracaoCurso])
    useEffect(()=>{
        setValorCursoAdultoDescontado('')
    },[valorCursoAdultoDesconto])
    useEffect(()=>{
        setValorCursoCriancaDescontado('')
    },[valorCursoCriancaDesconto])
    useEffect(()=>{
        setCorDesconto('')
    },[descontoCurso])
    useEffect(()=>{
        setCorMulta('')
    },[statusMulta])
    useEffect(()=>{
        setCortaxaMulta('')
    },[taxaMultaCurso])

    return(

        <div className={styles.contain}>
            <div className={styles.container} style={{display:displayContainer}} >
                
                <div className={styles.content}>
                    <div className={styles.user_header}>
                        <HeaderComponenr 
                        title1='cursos cadastrados' 
                        title2='cursos com multa' 
                        title3='cursos sem multa' 
                        number={10}
                        
                        dados1={cursosCadastrados}
                        dados2={cursosComMulta}
                        dados3={cursosSemMulta}
                        />
                    </div>
                    <div className={styles.bottom_container}>
                        <div className={styles.form_container}>
                                <div className={styles.content_form}>
                                    <div className={styles.form}>
                                        <div className={styles.form_Contain}>
                                            <InputGeral width='95%' padding={7.3} inputName='nome do curso'
                                            setValue={setNomeCurso}
                                            value={nomeCurso}
                                            corValidade={corNomeCurso}
                                            />
                                            <InputGeral width='95%' padding={7.3} inputName='valor do curso pra adultos'
                                            setValue={setValorCursoAdulto}
                                            value={valorCursoAdulto}
                                            corValidade={corValorCursoAdulto}
                                            />
                                            <InputGeral width='95%' padding={7.3} inputName='valor do curso pra criancas'
                                            setValue={setValorCursoCrianca}
                                            value={valorCursoCrianca}
                                            corValidade={corCursoValorCrianca}
                                            />
                                            
                                        </div>
                                        <div className={styles.form_Contain}>
                                            <InputGeral width='95%' 
                                            padding={7.3} 
                                            inputName='duracao do curso'
                                            setValue={setDuracaoCurso}
                                            value={duracaoCurso}
                                            corValidade={corDuracaoCurso}
                                            />
                                            <InputGeral width='95%' 
                                            padding={7.3} 
                                            inputName='valor do curso pra adultos descontado'
                                            setValue={setValorCursoAdultoDesconto}
                                            value={valorCursoAdultoDesconto}
                                            corValidade={corValorCursoAdultoDescontado}
                                            />
                                            <InputGeral 
                                            width='95%' 
                                            padding={7.3} 
                                            inputName='valor do curso pra criancas descontado'
                                            setValue={setValorCursoCriancaDesconto}
                                            value={valorCursoCriancaDesconto}
                                            corValidade={corValorCursoCriancaDescontado}
                                            />
                                        </div>
                                        <div className={styles.form_Contain}>
                                            <div className={styles.select_margin}>
                                                <EstadoComponent
                                                        width='95%' padding={7.3} 
                                                        inputName=''
                                                        setValue={setDescontoCurso}
                                                        LocalSelecionado={descontoCurso}
                                                        display='block'
                                                        labelName='desconto'
                                                        corValidade={corDesconto}
                                                        
                                                />
                                            </div>

                                            <div className={styles.select_margin}>
                                            <EstadoComponent
                                                    width='95%' padding={7.3} 
                                                    inputName=''
                                                    setValue={setStatusMulta}
                                                    LocalSelecionado={statusMulta}
                                                    display='block'
                                                    labelName='multa'
                                                    corValidade={corMulta}
                                                    
                                            />
                                            </div>
                                            
                                            
                                            <div className={styles.select_button}>
                                            <Taxas width='95%' padding={ 7.3} inputName='taxa de multa'
                                                    setValue={setTaxaMultaCurso}
                                                    taxaSelecionada={taxaMultaCurso}
                                                    LocalSelecionado={taxaMultaCurso}
                                                    corValidade={cortaxaMulta}
                                            />
                                            </div>
                                        </div>
                                        <div className={styles.form_Contain}>
                                        <div className={styles.select_text_area}>
                                            
                                                <div className={styles.text_area}>
                                                    <TextArea name='descricao do cuso' width='95%' height={175} placeholder='descricao' 
                                                    setValue={setDescricaoCurso}
                                                    value={descricaoCurso}
                                                    
                                                    />
                                                </div>
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
                                            <ButtaoComponent 
                                            width={270}
                                            text='cadastrar curso'
                                            padding={10}
                                            event={eventCadastrarCurso}
                                            />
                                    </div>
                                    <div className={styles.button_area_click}>
                                            <ButtaoComponent width={270} text='pesquisar curso curso' padding={10}   event={fecharPopup}/>
                                    </div>
                                </div>
                                <div className={styles.button_area}>
                                    <div className={styles.button_area_click}>
                                            <ButtaoComponent width={270} text='editar curso' padding={10}   event={eventEditarDadosCurso} />
                                    </div>
                                    <div className={styles.button_area_click}>
                                            <ButtaoComponent width={270} text='deletar curso ' padding={10} event={eventDeletarCurso} />
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
            <div className={styles.popup} style={{
                display:displayPopup
            }}>
                <div className={styles.close_button_and_search_area}>
                    <div className={styles.search_area}>
                            <FilterInput width='60%' padding={8}/>
                    </div>    
                    <div className={styles.close_button}>
                        <span  onClick={fecharPopup}>fechar</span>
                    </div>
                </div>

                <div className={styles.table}>
                <Tabelageral width='100%' height='100%'
                                        list={tabelaHeader}
                                        tbody={cursos.map((curso)=>{
                                            return(
                                                <tr onClick={()=>{preencherCursos(curso._id)}}  key={curso._id}>
                                                    <td>{curso.nomeCurso}</td>
                                                    <td>{curso.valorCursoAdulto}</td>
                                                    <td>{curso.valorCursoCrianca}</td>
                                                    <td>{curso.duracaoCurso}</td>
                                                    <td>{curso.descontoCurso}</td>
                                                    
                                                   
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