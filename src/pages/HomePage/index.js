import React, {useState,useEffect} from "react";

import styles from './style.module.css'

import socketio from 'socket.io-client'

export default function HomePage(){
    useEffect(()=>{
        const socket=socketio('http://localhost:8080 ')
    },[])
    return(
        <div className={styles.container} >
            pagina home
        </div>
    )
}