import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBRadio,
  MDBBtnGroup,
  MDBInput
}
from 'mdb-react-ui-kit';
import config from '../../config';
import axios from 'axios';


const RegistrazioneBiblioteca = () => {
  const navigate = useNavigate()
  const [datiUtente,setDatiUtente]=useState({nome:"",cognome:"",email:"",username:"",password:"",confermaPassword:"",provincia:"",citta:"",via:"",recapitoTelefonico:""})
  const [toSend,setToSend]=useState({})

  const handleInputChange=(e)=>{
      const {name,value}=e.target;

      setDatiUtente({...datiUtente,[name]:value})
  }

  const handleSubmit=async(e)=>{
      //todo: eseguire i check
      const formData = new FormData();
        console.log("utente ricevuto",datiUtente)
        formData.append("confermaPassword",datiUtente.confermaPassword)
        formData.append("citta",datiUtente.citta)
        formData.append("cognome",datiUtente.cognome)
        formData.append("nomeBiblioteca",datiUtente.nome)
        formData.append("email",datiUtente.email)
        formData.append("username",datiUtente.username)
        formData.append("password",datiUtente.password)
        formData.append("provincia",datiUtente.provincia)
        formData.append("via",datiUtente.via)
        formData.append("recapitoTelefonico",datiUtente.recapitoTelefonico)
        

      const response = await axios.post("http://"+config.ip+":"+config.port+"/registrazione/biblioteca",formData)
      console.log("response",response)
      if(response.data.statusOk){
        setDatiUtente({nome:"",cognome:"",email:"",username:"",password:"",confermaPassword:"",provincia:"",citta:"",via:"",recapitoTelefonico:""})
        alert("registrazione effettuata con successo")
      }
      
  }


return (
  <MDBContainer fluid>
    <MDBRow > 
      <MDBCardGroup >
        <MDBCard className=' bg-glass'>
          <MDBCardBody>
              <div className='text-start '>
                  <p className="fw-bold ">INFO REGISTRAZIONE:</p>
              </div>
              <MDBInput type="text" wrapperClass='mb-4' label='Indirizzo email' name="email" value={datiUtente.email} onChange={handleInputChange}/>
              <MDBInput type="text" wrapperClass='mb-4' label="Usename" name="username"value={datiUtente.username} onChange={handleInputChange}/>
              <MDBInput type="text" wrapperClass='mb-4' label='Password' name="password" value={datiUtente.password} onChange={handleInputChange}/>
              <MDBInput type="text" wrapperClass='mb-4' label='Conferma password' name="confermaPassword" value={datiUtente.confermaPassword} onChange={handleInputChange}/>
          </MDBCardBody>
        </MDBCard>
        <MDBCard className=' bg-glass'>
          <MDBCardBody>
            <div className='text-start '>
              <p className="fw-bold ">DATI ANAGRAFICI:</p>
            </div>
            <hr/>
              <MDBInput type="text" wrapperClass='mb-4' label='Nome Biblioteca' name="nome" value={datiUtente.nome} onChange={handleInputChange}/>
              <MDBInput type="text" wrapperClass='mb-4' label='Provincia' name="provincia" value={datiUtente.provincia} onChange={handleInputChange}/>
              <MDBInput type="text" wrapperClass='mb-4' label='Città' name="citta" value={datiUtente.citta} onChange={handleInputChange}/>
              <MDBInput type="text" wrapperClass='mb-4' label='Via' name="via" value={datiUtente.via} onChange={handleInputChange}/>
              <MDBInput type="text" wrapperClass='mb-4' label='Recapito telefonico' name="recapitoTelefonico" value={datiUtente.recapitoTelefonico} onChange={handleInputChange}/>
              <MDBBtn className='btn-dark btn-rounded btn-lg ' style={{backgroundColor:"#004AAD"}} type='button' onClick={(e)=>{handleSubmit(e)}} >Registrati</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCardGroup>
    </MDBRow>
  </MDBContainer>
)
}

export default RegistrazioneBiblioteca