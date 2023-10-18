export function ValidatePost(post){
    const{titolo,content}=post;
    var error={titoloErr:false,contentErr:false};
    var state=false;


    if((titolo.length<3)||(titolo.length>30)){
        error={...error,"titoloErr":true};
        state=true;
   }

   if((content.length<3)||(content.length>255)){
    error={...error,"contentErr":true};
    state=true;
    }

    return {"state":state,"error":error};

}