
  
  
  
import react,{  useEffect, useState,useMemo} from 'react'
import { render } from 'react-dom'

import './App.css'


import api from './services/api';

import Routess from './routes'
import RoutesRelatorioEstudantes from './Routes/RelatorioEstudantes';
import AuthProvider from './context/auth.js';
// <Routess />
//   <ReactGrid />

import Header from './components/Header';
function App() {
        return(
           <div>
            <AuthProvider>
              <Routess />
             </AuthProvider>
           
           </div>
        )

}

export default App
  
  
  
  
  