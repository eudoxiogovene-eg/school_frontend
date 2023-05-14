

import React ,{useState,useEffect} from "react";
import { Link } from "react-router-dom"

import styles from './style.module.css'
import icon from '../../../assents/icons/outline_home_black_24dp.png'

import RoutesRelatorioEstudantes from "../../../Routes/RelatorioEstudantes";

export default function RelatorioManuaisSidebar(){
    return(
        <div className={styles.container}>
            <h2>relatorio de manuais</h2>
           
            <Link to="/todosmanuaiscomprados">
                <div className={styles.sidebar}>
                    <img src={icon} />
                    <span> todos manuais</span>
                </div>
            </Link>
            <Link to="/manuaisentregues">
                <div className={styles.sidebar}>
                    <img src={icon} />
                    <span>manuais entregues</span>
                </div>
            </Link>
            
            <Link to="/manuaispendentes">
                <div className={styles.sidebar}>
                    <img src={icon} />
                    <span>manuais Pendentes</span>
                </div>
            </Link>
            <Link to="/filtromanuais">
                <div className={styles.sidebar}>
                    <img src={icon} />
                    <span>filtrar manuais </span>
                </div>
            </Link>
           
        </div>
    )
}