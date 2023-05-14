import React ,{useState,useEffect} from "react";
import styles from './style.module.css'
import avatar from '../../../assents/avatar/avatar-16.svg'
import Tabelageral from "../../../components/Tabelas/Tabelageral";

import api from "../../../services/api";

const tabelaHeader=['nome','apelido','telefone','ano nascimeno','escola','sexo','curso','codigo estudante']


export default function InfoEstudante(){
    const [estudantes,setEstudantes]=useState([])
     const[displayPopup,setDisplayPopup]=useState('block')
     const[displayContainer,setDisplayContainer]=useState('none')
     const [nomeEstudante, setNomeEstudante]=useState('')
     const [apelido, setApelido]=useState('')
     const [telefone, settelefone]=useState('')
     const [telefone2, settelefone2]=useState('')
     const [telefoneEncarregado, settelefoneEncarregado]=useState('')
     const [telefoneEncarregado2, settelefoneEncarregado2]=useState('')
     const [nacionalidade, setNacionalidade]=useState('')
     const [sexo, setsexo]=useState('')
     const [dataNascimento, setdataNascimento]=useState('')
     const [bairro, setBairro]=useState('')
     const [tipoDocumento, setTipoDocumento]=useState('')
     const [dataEmissao, setDataEmissao]=useState('')
     const [dataValidade, setdataValidade]=useState('')
     const [localEmissao, setLocalEmissao]=useState('')
     const [escola, setEscola]=useState('')
     const [curso, setCurso]=useState('')
     const [horario, setHorario]=useState('')
     const [nivel, setNivel]=useState('')
     const [estadoEstudante, setEstadoEstudante]=useState('')
     const [desconto, setdesconto]=useState('')
     const [dataCadastro, setdataCadastro]=useState('')
     const [formaPagamento, setFormaPagamento]=useState('')
     const [taxaInscricao, settaxaInscricao]=useState('')
     const [multaCurso, setMultaCurso]=useState('')
     const [descontoCurso, setDescontoCurso]=useState('')
     const [codigoEstudante, setCodigoEstudante]=useState('')
     const [estadoUsuario, setEstadoUsuario]=useState('')
     const [nomeUsuario, setNomeUsuario]=useState('')
     const [numeroDocumento, setNumeroDucumento]=useState('')
     const [fotoEstudante, setFotoEstudante]=useState('')

     const fotoAvatar=fotoEstudante || avatar
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
       // alert('clicou em preencher')
        //alert(id)
        try {
            const response= await api.get(`/pesquisarcadastro/${id}`)
                    const data= await response.data.data
                    console.log(data)
                    setNomeEstudante(data.codigoInscricao.nome)
                    setApelido(data.codigoInscricao.apelido)
                    settelefone(data.codigoInscricao.contactos.contactoPrincipal)
                    settelefone2(data.codigoInscricao.contactos.contactoAlternativo)
                    settelefoneEncarregado(data.codigoInscricao.contactos.contactoEncarregado)
                    settelefoneEncarregado2(data.codigoInscricao.contactos.contactoAlternativoEncarregado)
                    setNacionalidade(data.codigoInscricao.nacionalidade)
                    setsexo(data.codigoInscricao.sexo)
                    setdataNascimento(data.codigoInscricao.dataNascimento)
                    setBairro(data.bairro.nomeBairro)
                    setTipoDocumento(data.codigoInscricao.documentos.tipoDocumento)
                    setDataEmissao(data.codigoInscricao.documentos.dataEmissao)
                    setdataValidade(data.codigoInscricao.documentos.dataValidade)
                    setNumeroDucumento(data.codigoInscricao.documentos.numeroDocumento)
                    setLocalEmissao(data.codigoInscricao.documentos.localEmissao)
                    setEscola(data.schoolname.nomeEscola)
                    setCurso(data.curso.nomeCurso)
                    setHorario(data.horario)
                    setNivel(data.nivel)
                    setEstadoEstudante(data.estado)
                    setdesconto(data.desconto)
                    setdataCadastro(data.dataInscricao)
                    setFormaPagamento(data.formaPagamento)
                    settaxaInscricao(data.taxaInscricao)
                    setMultaCurso(data.curso.statusMulta)
                    setDescontoCurso(data.curso.descontoCurso)
                    setCodigoEstudante(data.codigoEstudante)
                    setNomeUsuario(data.usuario.username)
                    setEstadoUsuario(data.usuario.estado)
                    setFotoEstudante(data.codigoInscricao.url)
                   fecharPopup()
                    
        } catch (error) { 
            console.log(error)
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

    return(

     
        <>
            <div className={styles.container}
            style={{
                display:displayContainer
            }}
            >
               <div className={styles.container_info}>
                        <div className={styles.content}>
                                    <div className={styles.info_geral}>
                                        <div className={styles.top_info_geral}>
                                        <div className={styles.info}>
                                            <div className={styles.info_content}>
                                                <h2>nome do estudante</h2>
                                                <span>{nomeEstudante}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>apelido do estudante</h2>
                                                <span>{apelido}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>telefone do estudante</h2>
                                                <span>{telefone}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>telefone alternativo</h2>
                                                <span>{telefone2}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>telefone encarregado</h2>
                                                <span>{telefoneEncarregado}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>telefone encarregad2</h2>
                                                <span>{telefoneEncarregado2}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>nacionalidade</h2>
                                                <span>{nacionalidade}</span>
                                            </div>
                                           
                                        </div>
                                        <div className={styles.info}>
                                        <div className={styles.info_content}>
                                                <h2>sexo do estudante</h2>
                                                <span>{sexo}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>data nascimento</h2>
                                                <span>{dataNascimento}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>bairro do estudante</h2>
                                                <span>{bairro}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>tipo de documento</h2>
                                                <span>{tipoDocumento}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>data de emissao</h2>
                                                <span>{dataEmissao}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>data de validade</h2>
                                                <span>{dataValidade}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>local de emissao</h2>
                                                <span>{localEmissao}</span>
                                            </div>
                                           
                                        </div>
                                    </div>

                                    <div className={styles.bottom_info_geral}>
                                        <div className={styles.info}>
                                        <div className={styles.info_content}>
                                                <h2>nr do documento</h2>
                                                <span>{numeroDocumento}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>escola do estudante</h2>
                                                <span>{escola}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>curso do estudante</h2>
                                                <span>{curso}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>horario do estudante</h2>
                                                <span>{horario}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>nivel do estudante</h2>
                                                <span>{nivel}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>estado do estudante</h2>
                                                <span>{estadoEstudante}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>desconto  estudante</h2>
                                                <span>{desconto}</span>
                                            </div>
                                           
                                        </div>
                                        <div className={styles.info}>

                                            <div className={styles.info_content}>
                                                <h2>data do cadastro</h2>
                                                <span>{dataCadastro}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>forma de pagamento</h2>
                                                <span>{formaPagamento}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>taxa de inscricao</h2>
                                                <span>{taxaInscricao}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>multa do curso</h2>
                                                <span>{multaCurso}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>desconto do curso</h2>
                                                <span>{descontoCurso}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>codigo do estudante</h2>
                                                <span>{codigoEstudante}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>usuario do cadastro</h2>
                                                <span>{nomeUsuario}</span>
                                            </div>
                                            
                                        </div>
                                    </div>
                                        
                                        
                                    </div>
                                    <div className={styles.image}>
                                        <img src={fotoAvatar} alt='foto do estudante' />
                                        <div className={styles.search_button}>
                                          <button onClick={fecharPopup} type="button">pesquisar estudante</button>
                                        </div>
                                    </div>
                                    
                        </div>


                      
               </div>
                    
            </div>

           
            <div className={styles.popup_container}
            style={{
                display:displayPopup
            }}
            >
                    <div className={styles.tabela}>
                        <div className={styles.search_container}>
                            <input type='search' placeholder="pesquisar estudante" />
                            <div className={styles.close_button}>
                                <button onClick={fecharPopup} type='button'>fechar</button>
                            </div>
                        </div>
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
                                                    <td>{estudante.codigoEstudante}</td>
                                                </tr>
                                            )
                                        
                                        })}
                                    />
                    </div>
            </div>
       </>
    )
}