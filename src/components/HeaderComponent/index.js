


import React from 'react'
import styles from './style.module.css'

export default function HeaderComponenr({
    title,number,cursos,
    title1,title2,title3,
    dados1,dados2,dados3
}){
   
    return(
        <div className={styles.container}>
                  <div className={styles.user_header}>
                        <div className={styles.title_container}>
                           {title1}
                        </div>
                        <div className={styles.header_number}>
                            <span>{dados1}</span>
                        </div>
                  </div>
                  <div className={styles.user_header}>
                        <div className={styles.title_container}>
                            {title2}
                        </div>
                        <div className={styles.header_number}>
                            <span>{dados2}</span>
                        </div>
                  </div>
                  <div className={styles.user_header}>
                        <div className={styles.title_container}>
                            {title3}
                        </div>
                        <div className={styles.header_number}>
                            <span>{dados3}</span>
                        </div>
                  </div>
                    
        </div>
    )
}