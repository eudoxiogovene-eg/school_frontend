
import React from "react";
import styles from './style.module.css'


export default function MaisOpcoes(){
    return(
        <div className={styles.container}>
            <div className={styles.content}>
                <button>
                    editar estudante
                </button>
            </div>
            <div className={styles.content}>
                <button>
                    actualizar foto
                </button>
            </div>
            <div className={styles.content}>
                <button>
                    excluir estudante
                </button>
            </div>
            <div className={styles.content}>
                <button>
                    fechar janela
                </button>
            </div>
        </div>
    )
}