import React ,{useState,useEffect} from "react";
import styles from './style.module.css'
import avatar from '../../../assents/avatar/avatar-16.svg'
import Tabelageral from "../../../components/Tabelas/Tabelageral";

import api from "../../../services/api";

const tabelaHeader=['nome','apelido','codigo estudante','mensalidade','valor mensalidade','data pagamento','forma pagamento',]


export default function InfoMensalidades(){
    const [mensalidades,setMensalidades]=useState([])
    const [estudantes,setEstudantes]=useState([])
     const[displayPopup,setDisplayPopup]=useState('block')
     const[displayContainer,setDisplayContainer]=useState('none')
     const [nomeEstudante, setNomeEstudante]=useState('')
     const [apelido, setApelido]=useState('')
     const [telefone, settelefone]=useState('')
     const [telefone2, settelefone2]=useState('')
     const [telefone3, settelefone3]=useState('')
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

     const [taxaInscricao, settaxaInscricao]=useState('')
     const [multaCurso, setMultaCurso]=useState('')
     const [descontoCurso, setDescontoCurso]=useState('')
     const [codigoEstudante, setCodigoEstudante]=useState('')
     const [estadoUsuario, setEstadoUsuario]=useState('')
     const [nomeUsuario, setNomeUsuario]=useState('')
     const [numeroDocumento, setNumeroDucumento]=useState('')
     const [fotoEstudante, setFotoEstudante]=useState('')

     const [dataPagamento, setDataPagamento]=useState('')
     const [formaPagamento, setFormaPagamento]=useState('')
     const [valorMensalidade, setValorMensalidade]=useState('')
     const [mensalidade, setMensalidade]=useState('')
     const [estadoMulta, setEstadoMulta]=useState('')
     const [valorMulta, setValorMulta]=useState('')
     const [valorTotalPago, setvalorTotalPago]=useState('')
     const [anoApagar, setAnoApagar]=useState('')

     const fotoAvatar=fotoEstudante || avatar
    useEffect(()=>{

        async function listarEstudantes(){
            try {
                const response= await api.get('/listarmensalidades')
                    const data= await response.data.data
                    console.log(data)
                    setMensalidades(data)
            } catch (error) {
                console.log(error)
            }
        }
        listarEstudantes()
    },[])

    async  function preecherDadosMensalidade(id){
       // alert('clicou em preencher')
        //alert(id)
        try {
            const response= await api.get(`/pesquisarmensalidade/${id}`)
                    const data= await response.data.data
                    console.log(data)
                    setNomeEstudante(data.codigoInscricao.nome)
                    setApelido(data.codigoInscricao.apelido)
                    settelefone(data.codigoInscricao.contactos.contactoPrincipal)
                    setdataCadastro(data.codigoCadastro.dataInscricao)
                  
                   
                    setCurso(data.curso.nomeCurso)
                    setHorario(data.codigoCadastro.horario)
                    setNivel(data.codigoCadastro.nivel)
                    setEstadoEstudante(data.codigoCadastro.estado)
                    setdesconto(data.codigoCadastro.desconto)
                    
                    setFormaPagamento(data.formPagamento)
                    setDescontoCurso(data.curso.descontoCurso)
                    setCodigoEstudante(data.codigoCadastro.codigoEstudante)
                    setNomeUsuario(data.usuario.username)
                    setEstadoUsuario(data.usuario.estado)
                    setFotoEstudante(data.codigoInscricao.url)

                    setDataPagamento(data.dataPagamento)
                    setValorMensalidade(data.valor_mensalidade)
                    setMensalidade(data.mensalidade.mes)
                    let mensalidadePagaComMulta=data.pagaComMulta
                    if(mensalidadePagaComMulta){
                        setEstadoMulta("paga")
                        setValorMulta(data.codigoIdMulta.valorMulta)
                    }else{
                        if(data.codigoIdMulta){
                            if(!mensalidadePagaComMulta){
                                setEstadoMulta("pendente")
                                setValorMulta(data.codigoIdMulta.valorMulta)
                            }
                        }else{
                            setEstadoMulta("sem multa")
                            setValorMulta(0)
                        }
                    }

                    setvalorTotalPago(data.valorTotalPago)
                    setAnoApagar(data.anoPagamento)
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
                                                <h2>nome </h2>
                                                <span>{nomeEstudante}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>apelido </h2>
                                                <span>{apelido}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>telefone </h2>
                                                <span>{telefone}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>codigo estudante</h2>
                                                <span>{codigoEstudante}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>estado estudante</h2>
                                                <span>{estadoEstudante}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>desconto estudante</h2>
                                                <span>{desconto}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>curso</h2>
                                                <span>{curso}</span>
                                            </div>
                                        </div>
                                        <div className={styles.info}>
                                            <div className={styles.info_content}>
                                                <h2>desconto curso</h2>
                                                <span>{descontoCurso}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>data cadastro</h2>
                                                <span>{dataCadastro}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>horaio</h2>
                                                <span>{horario}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>nivel</h2>
                                                <span>{nivel}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>data pagamento</h2>
                                                <span>{dataPagamento}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>forma pagamento</h2>
                                                <span>{formaPagamento}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>valor mensaldades</h2>
                                                <span>{valorMensalidade}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.bottom_info_geral}>
                                        <div className={styles.info}>
                                            <div className={styles.info_content}>
                                                <h2>mensalidade</h2>
                                                <span>{mensalidade}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>estado multa</h2>
                                                <span>{estadoMulta}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>valor multa</h2>
                                                <span>{valorMulta}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>valor total pago</h2>
                                                <span>{valorTotalPago}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>ano apagar</h2>
                                                <span>{anoApagar}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>usuario</h2>
                                                <span>{nomeUsuario}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>estado usuario</h2>
                                                <span>{estadoUsuario}</span>
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
                                        tbody={mensalidades.map((mensalidade)=>{
                                            return(
                                                <tr onClick={()=>{preecherDadosMensalidade(mensalidade._id)}}  key={mensalidade._id}>
                                                    <td>{mensalidade.codigoInscricao.nome}</td>
                                                    <td>{mensalidade.codigoInscricao.apelido}</td>
                                                    <td>{mensalidade.codigoCadastro.codigoEstudante}</td>
                                                    <td>{mensalidade.mensalidade.mes}</td>
                                                    <td>{mensalidade.valor_mensalidade}</td>
                                                    <td>{mensalidade.dataPagamento}</td>
                                                    <td>{mensalidade.formPagamento}</td>
                                                    
                                                </tr>
                                            )
                                        
                                        })}
                                    />
                    </div>
            </div>
       </>
    )
}