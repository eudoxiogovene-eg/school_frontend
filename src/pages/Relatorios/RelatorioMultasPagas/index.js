

import React ,{useState,useEffect} from "react";
import { Link } from "react-router-dom"

import styles from './style.module.css'
import icon from '../../../assents/icons/outline_home_black_24dp.png'

import RoutesRelatorioEstudantes from "../../../Routes/RelatorioEstudantes";

export default function RelatorioMultasSidebar(){
    return(
        <div className={styles.container}>
            <h2>relatorio de multas</h2>
           
            <Link to="/todasmultas">
                <div className={styles.sidebar}>
                    <img src={icon} />
                    <span> todas multas</span>
                </div>
            </Link>
            <Link to="/multaspagascommensalidades">
                <div className={styles.sidebar}>
                    <img src={icon} />
                    <span>pagas com mensalidades</span>
                </div>
            </Link>
            
            <Link to="/multaspagassemmensalidades">
                <div className={styles.sidebar}>
                    <img src={icon} />
                    <span>pagas sem mensalidades</span>
                </div>
            </Link>
            <Link to="/multasfiltro">
                <div className={styles.sidebar}>
                    <img src={icon} />
                    <span>filtrar multas </span>
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