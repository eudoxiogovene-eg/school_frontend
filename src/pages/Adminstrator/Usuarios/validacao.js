

import React from "react";

export default function Validar(dados){
        
  const erros=[]
   let username=dados.username
   let sobreNome=dados.sobreNome
   let escola=dados.escola
   let telefone=dados.telefone
   let telefoneAlternativo=dados.telefoneAlternativo
   let estado=dados.estado
   let password=dados.password
   let confirmPassword= dados.confirmPassword
   let perfil= dados.perfil

   if(!username ){
    erros.push('o campo nome e obrigatorio')
   }

   if(!sobreNome){
    erros.push('o campo sobrenome e obrigatorio')
   }

   if(!escola){
    erros.push('o campo escola e obrigatorio')
   }
   if(!telefone){
    erros.push('o campo telefone e obrigatorio')
   }
   if(!telefoneAlternativo){
    erros.push('o campo telefoneAlternativo e obrigatorio')
   }
   if(!estado){
    erros.push('o campo estado e obrigatorio')
   }
   if(!password){
    erros.push('o campo password e obrigatorio')
   }
   if(!confirmPassword){
    erros.push('o campo confirmPassword e obrigatorio')
   }
   if(confirmPassword != password){
    erros.push('as senhas nao batem')
   }

   if(!estado){
    erros.push('o campo estado e obrigatorio')
   }

   if(erros.length>0){
    erros.map((erro)=>{
        console.log(erro)
    })
    
    return erros
   }

}