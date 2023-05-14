

import React ,{useState,useEffect} from "react";
import { Link } from "react-router-dom"

import styles from './style.module.css'
import icon from '../../../assents/icons/outline_home_black_24dp.png'

import RoutesRelatorioEstudantes from "../../../Routes/RelatorioEstudantes";

export default function RelatorioEstudantesSidebar(){
    return(
        <div className={styles.container}>
            <h2>relatorio de estudantes</h2>
           
            <Link to="/todosestudantes">
                <div className={styles.sidebar}>
                    <img src={icon} />
                    <span> todos estudantes</span>
                </div>
            </Link>
            <Link to="/estudantesactivos">
                <div className={styles.sidebar}>
                    <img src={icon} />
                    <span>estudantes activos</span>
                </div>
            </Link>
            
            <Link to="/estudantesinactivos">
                <div className={styles.sidebar}>
                    <img src={icon} />
                    <span>estudantes inactivos</span>
                </div>
            </Link>
            <Link to="/filtroestudantes">
                <div className={styles.sidebar}>
                    <img src={icon} />
                    <span>filtrar estudantes </span>
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