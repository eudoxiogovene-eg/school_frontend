

import React, {useState,useContext} from 'react'
import styles from './style.module.css'
import logo from '../../assents/user/user-161.svg'
import { AuthContext } from '../../context/auth.js'

import api from '../../services/api'
export default function Login(){

    const [username, setUsername]=useState('')
    const [password, setPassword]=useState('')

   const {logar}=useContext(AuthContext)

    async function autenticar(){
      if(!username || !password){
        return alert("preencha todos campos")
      }
      logar(username,password)
    //  const userLogin= await logar
  
    }
    return(
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.login_content}>
                    <div className={styles.login_top}>
                        <div className={styles.img}>
                            <img src={logo} alt='' />
                        </div>
                        <div className={styles.login_text}>
                            digite suas credencias 
                        </div>
                    </div>
                    
                </div>
                <div className={styles.container_input}>
                    <div className={styles.input_group}>
                        <label>username</label>
                        <input type='text' placeholder='nome do usuario'
                          onChange={(e)=>setUsername(e.target.value)}
                        />
                    </div>

                    <div className={styles.input_group}>
                        <label>password</label>
                        <input type='password' placeholder='codigo'
                         onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.action}>
                    <button type='button' onClick={autenticar} >
                        entrar
                    </button>
                </div>
            </div>
        </div>
    )
}