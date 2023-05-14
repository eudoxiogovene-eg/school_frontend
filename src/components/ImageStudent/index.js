

import React from 'react'
import styles from './style.module.css'
import avatar from '../../assents/avatar/avatar-16.svg'

export default function ImageStudent({width,height,larguraImage,alturaImagem,fotoDoEstudante}){
    const imageDoEstudante=fotoDoEstudante|| avatar
    return(
        <div className={styles.container} 
        style={{width:width,height:height}}>
            <label id="right_label" >
              <img src={imageDoEstudante}  id="foto" alt="" 
              style={{
                width:larguraImage,
                height:alturaImagem
              }}
              />                               
            </label>
        </div>
    )
}