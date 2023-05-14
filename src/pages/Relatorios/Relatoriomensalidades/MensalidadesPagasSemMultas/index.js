
import React ,{useState,useEffect} from "react";
import styles from './style.module.css'
import api from "../../../../services/api";
import LayoutComponentRelatorioEstudantes from "../../../../components/LayoutRelatorioEstudantes";
import BotaoPaginacao from "../../../../components/BotaoPaginacao";
import avatar from '../../../../assents/avatar/avatar-16.svg'

import ComponentEstudante from "../../../../components/Relatorios/Estudante";


export default function MensalidadesPagasSemMulta(){


 
    return(
        <div className={styles.container}>
            <ComponentEstudante />
        </div>
    )
}