

import React from "react"
import { Link } from "react-router-dom"
import styles from './style.module.css'


export default function FilterInput({width,padding,setValue}){
    return(
        <div className={styles.conatainer}>
                  
               <input 
               style={{width:width,padding:padding}}
               type="search" name="" id="" placeholder="pesquisar" required
               onChange={(e)=>setValue(e.target.value)}
                /> 
         </div>
    )
}
