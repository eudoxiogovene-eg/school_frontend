
import React from "react"
import { Link } from "react-router-dom"
import styles from './style.module.css'
export default function Header(){
    return(
       <div className={styles.container}>
            <ul>
               <li>
                    <div className={styles.page}>
                    <Link to="/home">
                                home
                     </Link> 
                    </div>
                   
                    
                </li>
                <li>
                    <div className={styles.page}>
                    cadastros
                    </div>
                    
                    <div className={styles.menu}>
                        <ul>
                          <Link to="cadastroestudante">
                                <li>estudantes</li>
                            </Link>  
                            <Link to="cadastroestudantecurso">
                                <li>curso estudante</li>
                            </Link> 
                        </ul>
                    </div>
                </li>
                <li>
                    <div className={styles.page}>
                    pagamentos
                    </div>
                    
                    <div className={styles.menu}>
                        <ul>
                            <Link to="pagamentosespeciais">
                                <li>mensaldades especiais</li>
                            </Link>  
                            <Link to="pagamentosmensalidades">
                                <li>pagar mensalidades</li>
                            </Link> 
                            <Link to="mensalidadespagas">
                                <li> mensalidades pagas</li>
                            </Link> 
                            
                            
                            <Link to="pagamentosmultas">
                                <li>pagar multas</li>
                            </Link> 
                            <Link to="multaspagas">
                                <li>multas pagas</li>
                            </Link>  
                           
                        </ul>
                    </div>
                </li>
                <li>
                    <div className={styles.page}>
                    manuais
                    </div>
                    <div className={styles.menu}>
                        <ul>
                            <Link to="comprarmanuais">
                                <li>comprar manual</li>
                            </Link>
                            <Link to="manuaiscomprados">
                                <li>manuais comprados</li>
                            </Link>
                            
                        </ul>
                    </div>
                </li>
                <li>
                    <div className={styles.page}>
                    relatorios
                    </div>
                    
                    <div className={styles.menu}>
                        <ul>
                           
                            <Link to="relatorioestudante">
                                <li>relario estudantes</li>
                            </Link>
                            <Link to="relatoriomensalidades">
                                <li>relario mensaldades</li>
                            </Link>
                            <Link to="relatoriomanuais">
                                <li>relario manuais</li>
                            </Link>

                            <Link to="relatoriomultas">
                                <li>relario multas</li>
                            </Link>
                            
                        </ul>
                    </div>
                </li>
                <li>
                    <div className={styles.page}>
                    info gerais
                    </div>
                    
                    <div className={styles.menu}>
                        <ul>
                           
                            <Link to="infoestudante">
                                <li>estudantes</li>
                            </Link>  
                            <Link to="infocurso">
                                <li>cursos</li>
                            </Link>  
                            <Link to="infomanual">
                                <li>manuais</li>
                            </Link>
                            
                            <Link to="infovendamanual">
                                 <li>venda manuais</li>
                            </Link>
                            
                        
                            <Link to="infomulta">
                                 <li>multas pendentes</li>
                            </Link>
                         
                            <Link to="multaspagasinfo">
                                 <li>multas pagas</li>
                            </Link>
                            <Link to="infomensalidade">
                                 <li>mensaldades</li>
                            </Link>
                          
                            
                        </ul>
                    </div>
                </li>
                <li>
                    <div className={styles.page}>  
                    dashboard
                    </div>
                    
                    <div className={styles.menu}>
                        <ul>
                            
                            <li>estudantes</li>
                            <li>cursos</li>
                            <li>manuais</li>
                            <li>mensaldades</li>
                            <li>multas</li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div className={styles.page}>
                    administrador
                    </div>
                    
                    <div className={styles.menu}>
                        <ul>
                            <Link to="cadastrarcursos">
                                <li>cursos</li>
                            </Link>
                            <Link to="cadastrarusuarios">
                                <li>usuarios</li>
                            </Link>
                            <Link to="manuais">
                                <li>manuais</li>
                            </Link>
                            <Link to="notas">
                                <li>notas</li>
                            </Link>
                            <Link to="escolas">
                                <li>escolas</li>
                            </Link>
                            <Link to="bairros">
                                <li>bairros</li>
                            </Link>   
                            <Link to="pagamentoestudanteinactivo">
                                <li>mensaldades pra inactivos</li>
                            </Link> 
                            
                        </ul>
                    </div>
                </li>
                <li>
                    <div className={styles.page}>
                    configuracoes
                    </div>
                    
                    <div className={styles.menu}>
                        <ul>
                            <li>estudantes</li>
                            <li>cursos</li>
                            <li>manuais</li>
                            <li>mensaldades</li>
                            <li>multas</li>
                        </ul>
                    </div>
                </li>
            </ul>
       </div>
    )
}

