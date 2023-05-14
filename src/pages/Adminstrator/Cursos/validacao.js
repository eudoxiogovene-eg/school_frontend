

export default function validacao(dados){
  

    const erros=[]

 
    const {
        nomeCurso,valorCursoAdulto,valorCursoCrianca,
            duracaoCurso,valorCursoAdultoDesconto,valorCursoCriancaDesconto,
            descontoCurso,statusMulta,taxaMultaCurso,descricaoCurso
    }=dados
    console.log(nomeCurso)
    console.log(valorCursoAdulto)
    console.log(valorCursoCrianca)
    console.log(duracaoCurso)
    console.log(valorCursoAdultoDesconto)
    console.log(valorCursoCriancaDesconto)
    console.log(descontoCurso)
    console.log(statusMulta)
    console.log(taxaMultaCurso)
    console.log(descricaoCurso)
    if(!nomeCurso || nomeCurso==undefined || nomeCurso==null){
        erros.push('o nome do curso e obrigatorio')
    }

    if(!valorCursoAdulto || valorCursoAdulto==undefined || valorCursoAdulto==null){
        erros.push('o valorCursoAdulto  do curso e obrigatorio')
    }
    if(!valorCursoCrianca || valorCursoCrianca==undefined || valorCursoCrianca==null){
        erros.push('o valorCursoCrianca do curso e obrigatorio')
    }
    if(!duracaoCurso || duracaoCurso==undefined || duracaoCurso==null){
        erros.push('a duracaoCurso do curso e obrigatorio')
    }
    if(!valorCursoAdultoDesconto || valorCursoAdultoDesconto==undefined || valorCursoAdultoDesconto==null){
        erros.push('o valorCursoAdultoDesconto do curso e obrigatorio')
    }
    if(!valorCursoCriancaDesconto || valorCursoCriancaDesconto==undefined || valorCursoCriancaDesconto==null){
        erros.push('o valorCursoCriancaDesconto do curso e obrigatorio')
    }
    if(!descontoCurso || descontoCurso==undefined || descontoCurso==null){
        erros.push('o descontoCurso do curso e obrigatorio')
    }
    if(!statusMulta || statusMulta==undefined || statusMulta==null){
        erros.push('o statusMulta do curso e obrigatorio')
    }
    if(!taxaMultaCurso || taxaMultaCurso==undefined || taxaMultaCurso==null){
        erros.push('o taxaMultaCurso do curso e obrigatorio')
    }

    if(!descricaoCurso || descricaoCurso==undefined || descricaoCurso==null){
        erros.push('o descricaoCurso do curso e obrigatorio')
    }


    if(erros.length>0){
        erros.map((erro)=>{
            console.log(erro)
        })

        return erros
    }
}