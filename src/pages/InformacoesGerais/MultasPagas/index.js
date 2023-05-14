import React ,{useState,useEffect} from "react";
import styles from './style.module.css'
import avatar from '../../../assents/avatar/avatar-16.svg'
import Tabelageral from "../../../components/Tabelas/Tabelageral";

import api from "../../../services/api";

const tabelaHeader=['nome estudante','apelido','codigo estudante','curso multa','mes multa','valor da multa','forma pagamento']


export default function InfoMultasPagas(){
    const [multasPagas,setMultasPagas]=useState([])
     const[displayPopup,setDisplayPopup]=useState('block')
     const[displayContainer,setDisplayContainer]=useState('none')
     const [nomeEstudante, setNomeEstudante]=useState('')
     const [apelido, setApelido]=useState('')
     const [telefone, settelefone]=useState('')
     const [telefone2, settelefone2]=useState('')
     const [telefone3, settelefone3]=useState('')
     const [nacionalidade, setNacionalidade]=useState('')
     const [sexo, setSexo]=useState('')
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
     const [fotoEstudante, setFotoEstudante]=useState('')
 

     const [dataPagamento,setDataPagamento]=useState('')
     const [mesMulta,setMesMulta]=useState('')
     const [valorMulta,setValorMulta]=useState('')
     const [idPagamento,setIdPagamento]=useState('')
     const [dataMulta,setDataMulta]=useState('')
     const [estadoMulta,setEstadoMulta]=useState('')
    

     const [nomeUsuario, setNomeUsuario]=useState('')





     const fotoAvatar=fotoEstudante || avatar
     useEffect(()=>{

        async function listarPagamentosMultas(){
            try {
                const response= await api.get('/listarmultaspagas')
                    const data= await response.data.data
                    console.log(data)
                    setMultasPagas(data)
            } catch (error) {
                console.log(error) 
            }
        }
        listarPagamentosMultas()
    },[])
    async function pesquisarMultasPagas(id){
        if(!id){
            alert('selecione multa')
        }
        try {
            const response= await api.get(`/pegarpagamentomulta/${id}`)
                    const data= await response.data.data
                    console.log(data)

                    setNomeEstudante(data.codigoInscricao.nome)
                    setApelido(data.codigoInscricao.apelido)
                    setNivel(data.codigoCadastro.nivel)
                    setHorario(data.codigoCadastro.horario)
                    const [datapagamento]=data.createdAt.split("T")
                    setDataPagamento(datapagamento)
                    setMesMulta(data.mensalidade.mes)
                    setValorMulta(data.codigoIdMulta.valorMulta)
                    setFormaPagamento(data.formaPagamento)
                    setFotoEstudante(data.codigoInscricao.url)
                    setIdPagamento(data._id)
                    fecharPopup()
                    settelefone(data.codigoInscricao.contactos.contactoPrincipal)           
                    setEscola(data.schoolname.nomeEscola)
                    setCurso(data.curso.nomeCurso)
                    setEstadoMulta(data.codigoIdMulta.statusMulta)
                    const [datamulta]=data.codigoIdMulta.createdAt.split("T")
                    setDataMulta(datamulta)
                    setEstadoEstudante(data.codigoCadastro.estado)
                    setdesconto(data.codigoCadastro.desconto)
                    setBairro(data.codigoCadastro.bairro.nomeBairro)
                    setSexo(data.codigoInscricao.sexo)
                    setdesconto(data.codigoCadastro.desconto)
                    setdataCadastro(data.codigoCadastro.dataInscricao)
                    setCodigoEstudante(data.codigoCadastro.codigoEstudante)
                    setNomeUsuario(data.usuario.username)
                    setdataNascimento(data.codigoInscricao.dataNascimento)

                    //setAnoMulta(data.)
                    
        } catch (error) {
            console.log(error)
        }
    }

    ///nunca funcionou aqui
    // async  function pesquisarMultasPagas(id){
    //    // alert('clicou em preencher')
    //     //alert(id)
    //     try {
    //         const response= await api.get(`/pesquisarvendas/${id}`)
    //                 const data= await response.data.data
    //                 console.log(data)
    //                 setNomeEstudante(data.codigoInscricao.nome)
    //                 setApelido(data.codigoInscricao.apelido)
    //                 settelefone(data.codigoInscricao.contactos.contactoPrincipal)           
    //                 setEscola(data.schoolname.nomeEscola)
    //                 setCurso(data.curso.nomeCurso)
    //                 setHorario(data.codigoCadastro.horario)
    //                 setNivel(data.codigoCadastro.nivel)
    //                 setEstadoEstudante(data.codigoCadastro.estado)
    //                 setdesconto(data.codigoCadastro.desconto)
    //                 setdataCadastro(data.codigoCadastro.dataInscricao)
                    
    //                 setCodigoEstudante(data.codigoCadastro.codigoEstudante)
                    
    //                 setFotoEstudante(data.codigoInscricao.url)
    //                 setNomeUsuario(data.usuario.username)

    //                 setDataPagamento(data.dataPagamento)
    //                 setValorManual(data.codigoManualId.valorManual)
    //                 setValorTotalPago(data.valorTotalPago)
    //                 setNivelManual(data.codigoManualId.nivelManual)
    //                 setNomeManual(data.codigoManualId.nomeManual)
    //                 setFormaPagamento(data.formPagamento)
    //                 setEstadoEntregue(data.statusEntrega)
    //                 setQuantidadeComprada(data.quantidade)
    //                 setValorManual(data.codigoManualId.valorManual)



    //                fecharPopup()
                    
    //     } catch (error) { 
    //         console.log(error)
    //     }
    // }

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
                                                <h2>data cadastro</h2>
                                                <span>{dataCadastro}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>codigo do estudante</h2>
                                                <span>{codigoEstudante}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>usuario  pagamento</h2>
                                                <span>{nomeUsuario}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>escola do estudante</h2>
                                                <span>{escola}</span>
                                            </div>
                                        </div>
                                        
                                    </div>

                                    <div className={styles.bottom_info_geral}>
                                        <div className={styles.info}>
                                           
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
                                            <div className={styles.info_content}>
                                                <h2>data nascimento</h2>
                                                <span>{dataNascimento}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>sexo estudante</h2>
                                                <span>{sexo}</span>
                                            </div>
                                        </div>
                                        <div className={styles.info}>
                                           
                                            <div className={styles.info_content}>
                                                <h2>data multa</h2>
                                                <span>{dataMulta}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>valor da multa</h2>
                                                <span>{valorMulta}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>forma de pagamento</h2>
                                                <span>{formaPagamento}</span>
                                            </div>
                                          
                                           
                                            <div className={styles.info_content}>
                                                <h2>data pagamento</h2>
                                                <span>{dataPagamento}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>estado multa</h2>
                                                <span>{estadoMulta}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>curso multa</h2>
                                                <span>{curso}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>mes da multa</h2>
                                                <span>{mesMulta}</span>
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
                                    tbody={multasPagas.map((multaPaga)=>{
                                        return(
                                            <tr onClick={()=>{pesquisarMultasPagas(multaPaga._id)}}  key={multaPaga._id}>
                                                <td>{multaPaga.codigoInscricao.nome}</td>
                                                <td>{multaPaga.codigoInscricao.apelido}</td>
                                                <td>{multaPaga.codigoCadastro.codigoEstudante}</td>
                                                <td>{multaPaga.curso.nomeCurso}</td>
                                                <td>{multaPaga.mensalidade.mes}</td>
                                                <td>{multaPaga.codigoIdMulta.valorMulta}</td>
                                                <td>{multaPaga.formaPagamento}</td>
                                                
                                            </tr>
                                        )
                                    
                                   })}
                                />
                    </div>
            </div>
       </>
    )
}