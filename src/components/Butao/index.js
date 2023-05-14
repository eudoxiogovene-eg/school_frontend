
import React from "react";
import styles from './style.module.css'

export default function ButtaoComponent({text, width,height,padding,event}){
   return(
     <div className={styles.container}>
         <button style={{width:width,height:height,padding:padding}} type="button"
         onClick={event}
         >
            {text}
          
         </button>
     </div>
   )
}