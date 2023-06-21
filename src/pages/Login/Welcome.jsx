import React from 'react';
import ReactDOM from 'react-dom/client';


function Welcome(){

return(
    <div>
        <img
            src='biblionet.png'
            height='100'
            width='100'
            alt='logo'
          />
        <img
            src='logoText.png'
            height='80'
            alt='logoText'
          />
        {/* <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 95%)'}}>
            BiblioNet
        </h1> */}

        <p className='px-3, mt-5' style={{color: 'hsl(218, 81%, 85%)'}}>
            Effettua il login per accedere al sito, visualizzare la lista delle migliori biblioteche, contattare esperti o prenotare comodamente libri da casa tua!
        </p>
    </div>
        );
}

export default Welcome;