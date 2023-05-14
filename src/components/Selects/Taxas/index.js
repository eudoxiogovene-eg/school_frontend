
import React, {useState} from "react";
import styles from './style.module.css'


export default function Taxas({padding,width,inputName,LocalSelecionado,setValue,corValidade}){


  let corBorder= corValidade || '#FF5677'
  let corLetras=corValidade || '#000'
 
    return(
        <div className={styles.container}>
              <label style={{
                color:corLetras
              }} >{inputName}</label>   
                <select
                  style={{
                    width:width,
                    padding:padding,
                    border:`1px solid ${corBorder}`,
                    color:corLetras
                  }}

                  value={LocalSelecionado}
                  onChange={(e)=>setValue(e.target.value)}
                >
                  <option value="">selecione</option>
                  <option value="5">5%</option>
                  <option value="10">10%</option>      
                  <option value="15">15%</option>      
                  <option value="20">20%</option>
                  <option value="25">25%</option>
                  <option value="30">30%</option>
                  <option value="35">35%</option>
                  <option value="40">40%</option>
                  <option value="45">45%</option>
                  <option value="50">50%</option>
                </select>
        </div>
    )
}