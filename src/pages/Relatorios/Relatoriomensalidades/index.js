

import React ,{useState,useEffect} from "react";
import { Link } from "react-router-dom"

import styles from './style.module.css'
import icon from '../../../assents/icons/outline_home_black_24dp.png'

import RoutesRelatorioEstudantes from "../../../Routes/RelatorioEstudantes";

export default function RelatorioMensalidadesSidebar(){
    return(
        <div className={styles.container}>
            <h2>relatorio de mensalidades</h2>
           
            <Link to="/todasmensalidades">
                <div className={styles.sidebar}>
                    <img src={icon} />
                    <span> todas mensalidades</span>
                </div>
            </Link>
            <Link to="/mensadadespagascommultas">
                <div className={styles.sidebar}>
                    <img src={icon} />
                    <span>pagas com multa</span>
                </div>
            </Link>
            
            <Link to="/mensalidadespagassemmultas">
                <div className={styles.sidebar}>
                    <img src={icon} />
                    <span>pagas sem multa</span>
                </div>
            </Link>
            <Link to="/filtromensalidades">
                <div className={styles.sidebar}>
                    <img src={icon} />
                    <span>filtrar mensalidades </span>
                </div>
            </Link>
            <div className={styles.sidebar}>
                <img src={icon} />
                <span>fazer filtros</span>
            </div>
            <div className={styles.sidebar}>
                <img src={icon} />
                <span>estudantes</span>
            </div>
        </div>
    )
}