import react, {useState} from 'react'
import { BrowserRouter as Router,  Route, Link, Routes} from 'react-router-dom'


import EstudantesActivos from '../pages/Relatorios/RelatorioEstudantes/EstudantesActivos'
import LayoutComponentRelatorioEstudantes from '../components/LayoutRelatorioEstudantes'

export default function RoutesRelatorioEstudantes(){

    return(
        <Router>
            <LayoutComponentRelatorioEstudantes>
                 
                    <Routes>
                         
                            <Route exact path="/estudantesactivos" element={<EstudantesActivos/>}/>
                            
                          
                    </Routes>
               
            </LayoutComponentRelatorioEstudantes>
        </Router>
    )
}

