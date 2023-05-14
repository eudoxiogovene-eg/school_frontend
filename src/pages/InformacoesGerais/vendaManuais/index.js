import React ,{useState,useEffect} from "react";
import styles from './style.module.css'
import avatar from '../../../assents/avatar/avatar-16.svg'
import Tabelageral from "../../../components/Tabelas/Tabelageral";

import api from "../../../services/api";

const tabelaHeader2=['nome estudante','codigo estudante','quantidade comprada','valor unitario','valor  pago','stutus compra','f pagamento','nome manual']


export default function InfoVendaManual(){
    const [vendas,setVendas]=useState([])
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
     const [formaPagamento, setFormaPagamento]=useState('')
     const [taxaInscricao, settaxaInscricao]=useState('')
     const [multaCurso, setMultaCurso]=useState('')
     const [descontoCurso, setDescontoCurso]=useState('')
     const [codigoEstudante, setCodigoEstudante]=useState('')
     const [estadoUsuario, setEstadoUsuario]=useState('')
     const [fotoEstudante, setFotoEstudante]=useState('')

     const [nomeUsuario, setNomeUsuario]=useState('')
     const [dataPagamento, setDataPagamento]=useState('')
     const [valorManual, setValorManual]=useState('')
     const [nivelManual, setNivelManual]=useState('')
     const [valorTotalPago, setValorTotalPago]=useState('')
     const [nomeManual, setNomeManual]=useState('')
     const [estadoEntega, setEstadoEntregue]=useState('')
     const [quantidadeComprada, setQuantidadeComprada]=useState('')




     const fotoAvatar=fotoEstudante || avatar
    useEffect(()=>{

        async function listarVendas(){
            try {
                const response= await api.get('/listarvendas')
                    const data= await response.data.data
                    console.log(data)
                    setVendas(data)
            } catch (error) {
                console.log(error)
            }
        }
        listarVendas()
    },[])

    async  function pesquisarVenda(id){
       // alert('clicou em preencher')
        //alert(id)
        try {
            const response= await api.get(`/pesquisarvendas/${id}`)
                    const data= await response.data.data
                    console.log(data)
                    setNomeEstudante(data.codigoInscricao.nome)
                    setApelido(data.codigoInscricao.apelido)
                    settelefone(data.codigoInscricao.contactos.contactoPrincipal)           
                    setEscola(data.schoolname.nomeEscola)
                    setCurso(data.curso.nomeCurso)
                    setHorario(data.codigoCadastro.horario)
                    setNivel(data.codigoCadastro.nivel)
                    setEstadoEstudante(data.codigoCadastro.estado)
                    setdesconto(data.codigoCadastro.desconto)
                    setdataCadastro(data.codigoCadastro.dataInscricao)
                    
                    setCodigoEstudante(data.codigoCadastro.codigoEstudante)
                    
                    setFotoEstudante(data.codigoInscricao.url)
                    setNomeUsuario(data.usuario.username)

                    setDataPagamento(data.dataPagamento)
                    setValorManual(data.codigoManualId.valorManual)
                    setValorTotalPago(data.valorTotalPago)
                    setNivelManual(data.codigoManualId.nivelManual)
                    setNomeManual(data.codigoManualId.nomeManual)
                    setFormaPagamento(data.formPagamento)
                    setEstadoEntregue(data.statusEntrega)
                    setQuantidadeComprada(data.quantidade)
                    setValorManual(data.codigoManualId.valorManual)



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
                                                <h2>data cadastro</h2>
                                                <span>{dataCadastro}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>codigo do estudante</h2>
                                                <span>{codigoEstudante}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>usuario do cadastro</h2>
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
                                                <h2>valor manual</h2>
                                                <span>{valorManual}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>valor total pago</h2>
                                                <span>{valorTotalPago}</span>
                                            </div>
                                        </div>
                                        <div className={styles.info}>
                                           
                                            <div className={styles.info_content}>
                                                <h2>quantidade comprada</h2>
                                                <span>{quantidadeComprada}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>estado da entrega</h2>
                                                <span>{estadoEntega}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>forma de pagamento</h2>
                                                <span>{formaPagamento}</span>
                                            </div>
                                          
                                           
                                            <div className={styles.info_content}>
                                                <h2>nome manual</h2>
                                                <span>{nomeManual}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>nivel manual</h2>
                                                <span>{nivelManual}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>data pagamento</h2>
                                                <span>{dataPagamento}</span>
                                            </div>
                                            <div className={styles.info_content}>
                                                <h2>usuario da venda</h2>
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
                            list={tabelaHeader2}
                            tbody={vendas.map((venda)=>{
                                return(
                                    <tr onClick={()=>{pesquisarVenda(venda._id)}}  key={venda._id}>
                                        <td>{venda.codigoInscricao.nome}</td>
                                        <td>{venda.codigoCadastro.codigoEstudante}</td>
                                        <td>{venda.quantidade}</td>
                                        <td>{venda.codigoManualId.valorManual}</td>
                                        <td>{venda.valorTotalPago}</td>
                                        <td>{venda.statusEntrega}</td>
                                        <td>{venda.formPagamento}</td>
                                        <td>{venda.codigoManualId.nomeManual}</td>
                                    </tr>
                                )
                               
                                   })}
                            />
                    </div>
            </div>
       </>
    )
}