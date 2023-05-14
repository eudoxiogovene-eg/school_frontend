import react, {useState,useContext} from 'react'
import { BrowserRouter as Router,  Route, Link, Routes} from 'react-router-dom'


import LayoutComponent from './components/Layout/index.js'
import HomePage from './pages/HomePage/index.js'
import CadastroEstudanteCurso from './pages/Cadastros/estudanteCurso/index.js'
import CadastroEstudante from './pages/Cadastros/estudantes/index.js'
import MultasPagas from './pages/Pagamentos/MultasPagas/index.js'
import PagamentosEspeciais from './pages/Pagamentos/PagamentosEspeciais/index.js'
import PagamentosMensalidades from './pages/Pagamentos/PagamentosMensalidades/index.js'
import MensalidadesPagas from './pages/Pagamentos/Mensalidadespagas/index.js'
import PagamentosMultas from './pages/Pagamentos/PagamentosMultas/index.js'
import ComprarManuais from './pages/Manuais/ComprarManual/index.js'
import ManuaisComprados from './pages/Manuais/ManuaisComprados/index.js'
import Curso from './pages/Adminstrator/Cursos/index.js'
import Bairros from './pages/Adminstrator/Bairros/index.js'
import Escolas from './pages/Adminstrator/Escolas/index.js'
import Manuais from './pages/Adminstrator/Manuais/index.js'
import Meses from './pages/Adminstrator/Meses/index.js'
import Notas from './pages/Adminstrator/Notas/index.js'
import Usuarios from './pages/Adminstrator/Usuarios/index.js'
import Login from './pages/Login/index.js'

import InfoEstudante from './pages/InformacoesGerais/Estudante/index.js'
import InfoCurso from './pages/InformacoesGerais/Curso/index.js'
import InfoManual from './pages/InformacoesGerais/Manuais/index.js'
import InfoVendaManual from './pages/InformacoesGerais/vendaManuais/index.js'
import InfoMultasPagas from './pages/InformacoesGerais/MultasPagas/index.js'
import InfoMultas from './pages/InformacoesGerais/Multas/index.js'
import InfoMensalidades from './pages/InformacoesGerais/Mensalidades/index.js'

import RelatorioEstudantesSidebar from './pages/Relatorios/RelatorioEstudantes/index.js'

import RoutesRelatorioEstudantes from './Routes/RelatorioEstudantes.js'
import EstudantesActivos from './pages/Relatorios/RelatorioEstudantes/EstudantesActivos/index.js'
import EstudantesInactivos from './pages/Relatorios/RelatorioEstudantes/EstudantesInactivos/index.js'
import TodosEstudantes from './pages/Relatorios/RelatorioEstudantes/TodosEstudantes/index.js'
import EstudantesFiltro from './pages/Relatorios/RelatorioEstudantes/EstudanteFiltro/index.js'


import RelatorioManuaisSidebar from './pages/Relatorios/Manuais/index.js'
import TodosManuaisComprados from './pages/Relatorios/Manuais/TodosComprados/index.js'
import ManuaisPendentes from './pages/Relatorios/Manuais/Pendentes/index.js'
import FiltroManuais from './pages/Relatorios/Manuais/FiltroManuais/index.js'
import ManuaisEntregues from './pages/Relatorios/Manuais/Entregues/index.js'


import RelatorioMensalidadesSidebar from './pages/Relatorios/Relatoriomensalidades/index.js'
import MensalidadesPagasSemMulta from './pages/Relatorios/Relatoriomensalidades/MensalidadesPagasSemMultas/index.js'
import TodasMensalidades from './pages/Relatorios/Relatoriomensalidades/TodasMensalidades/index.js'
import MensalidadespagasCommulta from './pages/Relatorios/Relatoriomensalidades/MensalidadesPagasComMultas/index.js'
import MensalidadesFiltro from './pages/Relatorios/Relatoriomensalidades/MensalidadeFiltro/index.js'


import RelatorioMultasSidebar from './pages/Relatorios/RelatorioMultasPagas/index.js'
import MultasPagasSemMensalidades from './pages/Relatorios/RelatorioMultasPagas/PagasSemMensalidade/index.js'
import MultasPagasComMensalidades from './pages/Relatorios/RelatorioMultasPagas/PagasComMensalidades/index.js'
import TodasMultas from './pages/Relatorios/RelatorioMultasPagas/TodasMultas/index.js'
import MultasFiltro from './pages/Relatorios/RelatorioMultasPagas/MultasFiltro/index.js'

import PagamentosPraInactivos from './pages/Adminstrator/pagamentosPraInactivos/index.js'
import { AuthContext } from './context/auth.js/index.js'


export default function Routess(){

const [user, setUser]=useState(null)

const {PriviteRoute}=useContext(AuthContext)
    return(
        
        <Router>
           
                  <LayoutComponent>
                    <Routes>
                         
                            <Route exact path="/" element={<Login/>}/>
                            <Route exact path="/home" element={<PriviteRoute><HomePage/></PriviteRoute>}/>
                            <Route exact path="/cadastroestudante" element={<CadastroEstudante/>}/>
                            <Route exact path="/cadastroestudantecurso" element={<CadastroEstudanteCurso/>}/>
                            <Route exact path="/pagamentosespeciais" element={<PagamentosEspeciais/>}/>
                            <Route exact path="/pagamentosmensalidades" element={<PagamentosMensalidades/>}/>
                            <Route exact path="/mensalidadespagas" element={<MensalidadesPagas/>}/>
                            <Route exact path="/pagamentosmultas" element={<PagamentosMultas/>}/>
                            <Route exact path="/multaspagas" element={<MultasPagas/>}/>
                            <Route exact path="/comprarmanuais" element={<ComprarManuais/>}/>
                            <Route exact path="/manuaiscomprados" element={<ManuaisComprados/>}/>
                            <Route exact path="/cadastrarcursos" element={<Curso/>}/>
                            <Route exact path="/bairros" element={<Bairros/>}/>
                            <Route exact path="/escolas" element={<Escolas/>}/>
                            <Route exact path="/manuais" element={<Manuais/>}/>
                            <Route exact path="/meses" element={<Meses/>}/>
                            <Route exact path="/pagamentoestudanteinactivo" element={<PagamentosPraInactivos/>}/>
                            <Route exact path="/notas" element={<Notas/>}/>
                            <Route exact path="/cadastrarusuarios" element={<Usuarios/>}/>
                            <Route exact path="/infoestudante" element={<InfoEstudante/>}/>
                            <Route exact path="/infocurso" element={<InfoCurso/>}/>
                            <Route exact path="/infomanual" element={<InfoManual/>}/>
                            <Route exact path="/infovendamanual" element={<InfoVendaManual/>}/>
                            <Route exact path="/infomensalidade" element={<InfoMensalidades/>}/>

                            <Route exact path="/relatorioestudante" element={<RelatorioEstudantesSidebar/>}/>
                            <Route exact path="/estudantesactivos" element={<EstudantesActivos/>}/>
                            <Route exact path="/estudantesinactivos" element={<EstudantesInactivos/>}/>
                            <Route exact path="/todosestudantes" element={<TodosEstudantes/>}/>
                            <Route exact path="/filtroestudantes" element={<EstudantesFiltro/>}/>

                            <Route exact path="/relatoriomanuais" element={<RelatorioManuaisSidebar/>}/>
                            <Route exact path="/todosmanuaiscomprados" element={<TodosManuaisComprados/>}/>
                            <Route exact path="/manuaispendentes" element={<ManuaisPendentes/>}/>
                            <Route exact path="/manuaisentregues" element={<ManuaisEntregues/>}/>
                            <Route exact path="/filtromanuais" element={<FiltroManuais/>}/>


                            <Route exact path="/relatoriomensalidades" element={<RelatorioMensalidadesSidebar/>}/>
                            <Route exact path="/filtromensalidades" element={<MensalidadesFiltro/>}/>
                            <Route exact path="/mensadadespagascommultas" element={<MensalidadespagasCommulta/>}/>
                            <Route exact path="/mensalidadespagassemmultas" element={<MensalidadesPagasSemMulta/>}/>
                            <Route exact path="/todasmensalidades" element={<TodasMensalidades/>}/>



                            <Route exact path="/relatoriomultas" element={<RelatorioMultasSidebar/>}/>
                            <Route exact path="/multaspagascommensalidades" element={<MultasPagasComMensalidades/>}/>
                            <Route exact path="/multaspagassemmensalidades" element={<MultasPagasSemMensalidades/>}/>
                            <Route exact path="/multasfiltro" element={<MultasFiltro/>}/>
                            <Route exact path="/todasmultas" element={<TodasMultas/>}/>




                            <Route exact path="/multaspagasinfo" element={<InfoMultasPagas/>}/>
                            <Route exact path="/infomulta" element={<InfoMultas/>}/>


                    </Routes>
               
                    </LayoutComponent>
                    
        </Router>
    )
}

