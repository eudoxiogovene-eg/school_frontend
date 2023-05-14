

import React from "react"
import { Link } from "react-router-dom"
import styles from './style.module.css'


export default function EstudanteTabela({list,tbody}){
    return(
        <div >
             
             <div className={styles.tabela}>
                    
                    <table id="tr" border="1" className="table-info">
                         <thead>
                               <tr >
                                 {list.map((lista,index)=>{
                                    return(
                                        <th key={index}>{lista}</th>
                                    )
                                 })}
                               </tr>
                               
                         </thead>
         
                         <tbody id="tbody">
                             {tbody}
                          </tbody>
                   </table>
               </div>
        </div>
    )
}