

import React from 'react'
import styles from './style.module.css'

export default function Foto({width,height,setValue,imageDeFundo,imageUrl}){
   

     let fotoSelecionda=imageUrl || imageDeFundo

    return(
        <div className={styles.container} style={{width:width,height:height}}>
            <label id="right_label" htmlFor="file">
              <img id="foto"  alt="" src={fotoSelecionda}/>
              <input id="file" type="file" name=""
               onChange={(e)=>setValue(e.target.files[0])}
              />                                
            </label>
        </div>
    )
}