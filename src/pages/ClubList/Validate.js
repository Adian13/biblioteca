export  function ValidateClub(club){
    
    var error={nomeErr:false,descrizioneErr:false,immagineErr:false};
    var state=false;
    const {nome,descrizione}=club;
   
    //REGEX
   var rexnome = /^[A-zÀ-ù ‘-]{2,}$/;

   if(!rexnome.test(nome)){
        error={...error,"nomeErr":true};
        state=true;
   }

   if(nome.length>30){
        error={...error,"nomeErr":true};
        state=true;
   }

   if(descrizione.length>255||descrizione.length===0){
        error={...error,"descrizioneErr":true};
        state=true;
    }

    return {"state":state,"error":error};

}