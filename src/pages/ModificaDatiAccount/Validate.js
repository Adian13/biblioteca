
export function ValidatePassword(password){
    const{vecchiaPassword,nuovaPassword,confermaPassword}=password;
    var error={passwordErr:false,confermaPasswordErr:false};
    var state=false;


    if(nuovaPassword.length<8){
        error={...error,"passwordErr":true};
        state=true;
   }

   if(confermaPassword!==nuovaPassword){
    error={...error,"confermaPasswordErr":true};
    state=true;
    }

    return {"state":state,"error":error};

}
export  function ValidateEsperto(esperto){
    
    var error={nomeErr:false,cognomeErr:false,emailErr:false,usernameErr:false,viaErr:false,recapitoTelefonicoErr:false,emailBibliotecaErr:false};
    var state=false;
    const {nome,cognome,username,email,via,recapitoTelefonico,emailBiblioteca}=esperto;
   
    //REGEX
   var rexnome = /^[A-zÀ-ù ‘-]{2,}$/;
   var rextel = /^\d+$/;
   var rexvia = /^[0-9A-zÀ-ù ‘-]{2,30}$/;
   var rexemail=/^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,10}$/;
   
   if(username.length>30){
        error={...error,"usernameErr":true};
        state=true;
   }

   if(!rexnome.test(nome)){
        error={...error,"nomeErr":true};
        state=true;
   }

   if(!rexemail.test(email)){
        error={...error,"emailErr":true};
        state=true;
   }

   if(!rexnome.test(cognome)){
        error={...error,"cognomeErr":true};
        state=true;
   }

   if(!rextel.test(recapitoTelefonico)){
        error={...error,"recapitoTelefonicoErr":true};
        state=true;
   }

   if(!rexvia.test(via)){
        error={...error,"viaErr":true};
        state=true;
   }

   if(!rexemail.test(emailBiblioteca)){
        error={...error,"emailBibliotecaErr":true};
        state=true;
   }

    return {"state":state,"error":error};

}
export  function ValidateBiblioteca(biblioteca){
    
    var error={nomeBibliotecaErr:false,emailErr:false,viaErr:false,recapitoTelefonicoErr:false,emailBibliotecaErr:false};
    var state=false;
    const {nomeBiblioteca,email,via,recapitoTelefonico}=biblioteca;

    var rexnomeBiblioteca = /^[A-zÀ-ù “‘-]{2,}$/;
    var rextel = /^\d+$/;
    var rexvia = /^[0-9A-zÀ-ù ‘-]{2,30}$/;
    var rexemail=/^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,10}$/;
    

    if(!rexnomeBiblioteca.test(nomeBiblioteca)){
        error={...error,"nomeBibliotecaErr":true};
        state=true;
    }

    if(!rextel.test(recapitoTelefonico)){
        error={...error,"recapitoTelefonicoErr":true};
        state=true;
    }

    if(!rexvia.test(via)){
        error={...error,"viaErr":true};
        state=true;
    }

    if(!rexemail.test(email)){
        error={...error,"emailErr":true};
        state=true;
    }


    return {"state":state,"error":error};

}
export function ValidateLettore(lettore){
    var error={nomeErr:false,cognomeErr:false,usernameErr:false,emailErr:false,viaErr:false,recapitoTelefonicoErr:false};
    var state=false;
    const {nome,cognome,username,email,via,recapitoTelefonico}=lettore;

    var rexnome=/^[A-zÀ-ù ‘-]{2,}$/;
    var rexemail=/^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,10}$/;
    var rextel=/^\d+$/;
    var rexvia=/^[0-9A-zÀ-ù ‘-]{2,30}$/;
    
    if(username.length>30){
        error={...error,"usernameErr":true};
        state=true;
    }

    if(!rexnome.test(nome)){
        error={...error,"nomeErr":true};
        state=true;
    }

    if(!rexemail.test(email)){
        error={...error,"emailErr":true};
        state=true;
    }

    if(!rexnome.test(cognome)){
        error={...error,"cognomeErr":true};
        state=true;
    }

    if(!rextel.test(recapitoTelefonico)){
        error={...error,"recapitoTelefonicoErr":true};
        state=true;
    }

    if(!rexvia.test(via)){
        error={...error,"viaErr":true};
        state=true;
    }

    return {"state":state,"error":error};

}





