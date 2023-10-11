import React from 'react';
import { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardOverlay,
  MDBCardImage } from 'mdb-react-ui-kit';
import NavBar from "../../components/NavBar"
import RegistrazioneEsperto from './RegistrazioneEsperto';
import RegistrazioneLettore from './RegistrazioneLettore';
import RegistrazioneBiblioteca from './RegistrazioneBiblioteca';
import { useNavigate } from 'react-router-dom';



function Registration() {
  const navigate = useNavigate();
  
  return (
    <>
    <NavBar className="m-0"/>
    <MDBContainer className='m-5'>

      <MDBRow>
        <MDBCol size="6">
          <MDBCard background='dark' className='text-white m-3 text-center bg-image hover-overlay hover-zoom  hover-shadow' onClick={()=>navigate('/registrazione/esperto')}>
            <MDBCardImage width="100" height="250" style={{objectFit:"cover"}} overlay src='/home/RegistrazioneEsperto.jpg' alt='...' />
            <MDBCardOverlay>
            <MDBCardTitle className='mt-5 fs-4' style={{backgroundColor:"black"}}><b>REGISTRATI COME ESPERTO</b></MDBCardTitle>
            </MDBCardOverlay>
          </MDBCard>
        </MDBCol>
        <MDBCol size="6">
          <MDBCard background='dark' className='text-white m-3 text-center bg-image hover-overlay hover-zoom  hover-shadow' onClick={()=>navigate('/registrazione/lettore')}>
            <MDBCardImage width="100" height="250" style={{objectFit:"cover"}} overlay src='/home/registrazioneLettore.jpg' alt='...' />
            <MDBCardOverlay>
              <MDBCardTitle className='mt-5 fs-4' style={{backgroundColor:"black"}}><b>REGISTRATI COME LETTORE</b></MDBCardTitle>
            </MDBCardOverlay>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol size="6">
          <MDBCard background='dark' className='text-white m-3 text-center bg-image hover-overlay hover-zoom  hover-shadow' onClick={()=>navigate('/registrazione/biblioteca')}>
            <MDBCardImage width="100" height="250" style={{objectFit:"cover"}} overlay src='/home/registrazioneBiblioteca.jpg' alt='...' />
            <MDBCardOverlay>
              <MDBCardTitle className='mt-5 fs-4' style={{backgroundColor:"black"}}><b>REGISTRA LA TUA BIBLIOTECA</b></MDBCardTitle>
            </MDBCardOverlay>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </>
    
    
  );
}

export default Registration;