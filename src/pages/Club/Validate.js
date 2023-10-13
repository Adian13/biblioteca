export  function ValidateEvent(evento){
    
    var error={nomeErr:false,descrizioneErr:false,oraErr:false,immagineErr:false};
    var state=false;
    const {nome,descrizione}=evento;
   
    //REGEX
   var rexnome = /^[A-zÀ-ù ‘-]{3,}$/;

   if(!rexnome.test(nome)){
        error={...error,"nomeErr":true};
        state=true;
   }

   if(nome.length>30){
        error={...error,"nomeErr":true};
        state=true;
   }

   if(descrizione.length>255||descrizione.length<3){
        error={...error,"descrizioneErr":true};
        state=true;
    }

    return {"state":state,"error":error};

}