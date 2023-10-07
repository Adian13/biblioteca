import React from 'react';
import { useState } from 'react';
import { MDBAccordion, MDBAccordionItem, MDBContainer } from 'mdb-react-ui-kit';
import NavBar from "../../components/NavBar"
import RegistrazioneEsperto from './RegistrazioneEsperto';
import RegistrazioneLettore from './RegistrazioneLettore';
import RegistrazioneBiblioteca from './RegistrazioneBiblioteca';



function Registration() {
  const [active, setActive] = useState(0);
  
  return (
    <>
    <NavBar className="m-0"/>
    <MDBContainer className='mt-0'fluid style={{backgroundColor:"#E3F2FD", height:"150vh"}}>

    <MDBAccordion  flush active={active}  className=' p-5' onChange={(itemId) => setActive(itemId)}>
      <MDBAccordionItem className='P-0' collapseId={1} headerTitle='REGISTRATI COME ESPERTO'>
        <RegistrazioneEsperto/>
      </MDBAccordionItem>
      <MDBAccordionItem collapseId={2} headerTitle='REGISTRATI COME LETTORE'>
        <RegistrazioneLettore/>   
      </MDBAccordionItem>
      <MDBAccordionItem collapseId={3} headerTitle='REGISTRA LA TUA BIBLIOTECA'>
        <RegistrazioneBiblioteca/>
       
      </MDBAccordionItem>
    </MDBAccordion>
    </MDBContainer>
    </>
    
    
  );
}

export default Registration;