
export  function ValidateEsperto(esperto){
    
    var error={nomeErr:false,cognomeErr:false,emailErr:false,usernameErr:false,passwordErr:false,confermaPasswordErr:false,viaErr:false,provinciaErr:false,cittaErr:false,recapitoTelefonicoErr:false,emailBibliotecaErr:false};
    var state=false;
    const {provincia,citta,nome,cognome,username,password,email,confermaPassword,via,recapitoTelefonico,emailBiblioteca}=esperto;
   
    //REGEX
   var rexnome = /^[A-zÀ-ù ‘-]{2,30}$/;
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
   if(!rexnome.test(provincia)){
    error={...error,"provinciaErr":true};
    state=true;
    }

    if(!rexnome.test(citta)){
        error={...error,"cittaErr":true};
        state=true;
        }

   if(password.length<8){
        error={...error,"passwordErr":true};
        state=true;
   }
   if(confermaPassword!==password){
    error={...error,"confermaPasswordErr":true};
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
    
    var error={provinciaErr:false,cittaErr:false,nomeBibliotecaErr:false,emailErr:false,passwordErr:false,confermaPasswordErr:false,viaErr:false,recapitoTelefonicoErr:false,emailBibliotecaErr:false};
    var state=false;
    const {provincia,citta,nomeBiblioteca,password,email,confermaPassword,via,recapitoTelefonico}=biblioteca;

    var rexnomeBiblioteca = /^[A-zÀ-ù “‘-]{2,30}$/;
    var rextel = /^\d+$/;
    var rexvia = /^[0-9A-zÀ-ù ‘-]{2,30}$/;
    var rexemail=/^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,10}$/;

    
    if(!rexnomeBiblioteca.test(provincia)){
        error={...error,"provinciaErr":true};
        state=true;
        }
    
    if(!rexnomeBiblioteca.test(citta)){
        error={...error,"cittaErr":true};
        state=true;
        }
        
    if(!rexnomeBiblioteca.test(nomeBiblioteca)){
        error={...error,"nomeBibliotecaErr":true};
        state=true;
    }

    if(password.length<8){
        error={...error,"passwordErr":true};
        state=true;
    }
    if(confermaPassword!==password){
        error={...error,"confermaPasswordErr":true};
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
    var error={provinciaErr:false,cittaErr:false,nomeErr:false,cognomeErr:false,usernameErr:false,emailErr:false,passwordErr:false,confermaPasswordErr:false,viaErr:false,recapitoTelefonicoErr:false,emailBibliotecaErr:false};
    var state=false;
    const {provincia,citta,nome,cognome,username,password,email,confermaPassword,via,recapitoTelefonico}=lettore;

    var rexnome=/^[A-zÀ-ù ‘-]{2,}$/;
    var rexemail=/^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,10}$/;
    var rextel=/^\d+$/;
    var rexvia=/^[0-9A-zÀ-ù ‘-]{2,30}$/;
    
    if(username.length>30){
        error={...error,"usernameErr":true};
        state=true;
    }

    if(!rexnome.test(provincia)){
        error={...error,"provinciaErr":true};
        state=true;
        }
    
        if(!rexnome.test(citta)){
            error={...error,"cittaErr":true};
            state=true;
            }

    if(!rexnome.test(nome)){
        error={...error,"nomeErr":true};
        state=true;
    }

    if(password.length<8){
        error={...error,"passwordErr":true};
        state=true;
    }
    if(password!==confermaPassword){
        error={...error,"confermaPasswordErr":true};
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





