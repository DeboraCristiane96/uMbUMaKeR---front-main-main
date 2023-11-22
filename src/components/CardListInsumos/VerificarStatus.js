function verificar (){
    const statusElement = document.getElementById("status");
    //Simulando uma mudança de status

    const statusR = "REGULAR";
    const statusAB = "ABAIXO_MINIMO";
    const statusZ = "ZERADO";

    const novoStatus = "ZERADO";

    statusElement.classList.remove("regular","baixo","zerado");

    // Alterando o css

    if(novoStatus === statusR){
        statusElement.classList.add("regular");
    }else if (novoStatus === statusAB ){
        statusElement.classList.add("baixo");
    }else if (novoStatus === statusZ){
        statusElement.classList.add("zerado")
    }
}







