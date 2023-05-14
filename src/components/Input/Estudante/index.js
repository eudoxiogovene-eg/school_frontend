import React from 'react'
import styles from './style.module.css'

export default function InputEstudante({name,setValue,corValidade,value}){
    let cor= corValidade || '#272262'
    function mudarCor(){
        alert('mudou')
         cor='#272262'
    }
    return(
        <div className={styles.container}>
            <div className={styles.label_float}>
                <input
                 style={{
                    borderBottom:`2px solid ${cor}`,
            
                 }}
                type="text"  required
                onChange={(e)=>setValue(e.target.value)}
               
                value={value}
                />
                <label style={{
                    color:cor
                }} >{name}</label>
            </div>
        </div>
    )
}