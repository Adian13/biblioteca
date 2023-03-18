import React from 'react';
import ReactDOM from 'react-dom/client';


function Welcome(){

return(
    <div>
        <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 95%)'}}>
            BiblioNet
        </h1>

        <p className='px-3' style={{color: 'hsl(218, 81%, 85%)'}}>
            Effettua il login per accedere al sito !
        </p>
    </div>
        );
}

export default Welcome;