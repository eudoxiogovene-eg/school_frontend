import react,{  useEffect, useState,useMemo} from 'react'
import { render } from 'react-dom'
import  socketio  from 'socket.io-client'
import './App.css'

import api from './services/api';
 
 const id= Math.random()
function App() {
  const [nome, setNome]=useState('eudoxio govene')
  useEffect(()=>{
    const socket=socketio('http://localhost:3333',{
      query:{id}
    })
    socket.on('hello',data=>{
      alert(data)
    })

    socket.emit('omni','ola mundo')
  },[])

 async function enviarMensagem(event){
  event.preventDefault()
  alert(nome)
  const response= await api.post('/chat',nome, {
    

  })
  console.log(response)
 }
 function handleSubmit(event){
   event.preventDefault()
   alert(nome)
 }

 return(
  <div>
  <form onSubmit={enviarMensagem}>
    <input text="" placeholder='' />
    <button type='submit'>enviar mensagem</button>
  </form>
  </div>
 )

}

export default App
  
  
  
  // const preview=useMemo(()=>{
    //     return imagemEstudante ? URL.createObjectURL(imagemEstudante):nill
    // },[imagemEstudante])
  //import imageDeFundo from '../../../assents/avatar/avatar-16.svg'


  function openConfirmPopup(){
    setConfirmPopup('block')
}

function closeConfirmPopup(){
    setConfirmPopup('none')
}
const [confirmPopup,setConfirmPopup]=useState('none')