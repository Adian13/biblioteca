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
import NavBar from '../../components/NavBar';
import config from '../../config';
import axios from 'axios';
import {ValidateBiblioteca} from "./Validate"


const RegistrazioneBiblioteca = () => {
  const navigate = useNavigate()
  const [datiUtente,setDatiUtente]=useState({nomeBiblioteca:"",email:"",username:"",password:"",confermaPassword:"",provincia:"",citta:"",via:"",recapitoTelefonico:""})
  const [toSend,setToSend]=useState({})
  const[error,setError]=useState({nomeBibliotecaErr:false,emailErr:false,passwordErr:false,confermaPasswordErr:false,viaErr:false,recapitoTelefonicoErr:false,emailBibliotecaErr:false})


  const handleInputChange=(e)=>{
      const {name,value}=e.target;

      setDatiUtente({...datiUtente,[name]:value})
  }

  const handleSubmit=async(e)=>{
    const{state,error}=ValidateBiblioteca(datiUtente)
    if(!error){

      const formData = new FormData();
        console.log("utente ricevuto",datiUtente)
        formData.append("confermaPassword",datiUtente.confermaPassword)
        formData.append("citta",datiUtente.citta)
        formData.append("nomeBiblioteca",datiUtente.nomeBiblioteca)
        formData.append("email",datiUtente.email)
        formData.append("password",datiUtente.password)
        formData.append("provincia",datiUtente.provincia)
        formData.append("via",datiUtente.via)
        formData.append("recapitoTelefonico",datiUtente.recapitoTelefonico)
        

      const response = await axios.post("http://"+config.ip+":"+config.port+"/registrazione/biblioteca",formData)
      console.log("response",response)
      if(response.data.statusOk){
        setDatiUtente({nomeBiblioteca:"",email:"",username:"",password:"",confermaPassword:"",provincia:"",citta:"",via:"",recapitoTelefonico:""})
        alert("registrazione effettuata con successo")
      }
    }else{
      setError(error)
    }
      
  }


return (
  <MDBContainer fluid className='background-radial-gradient p-0'>
      <NavBar className="m-0" />
      <MDBRow className='m-4 mb-0'> 
        <MDBCardGroup className='mt-3 mb-5'>
        <MDBCard className=' bg-glass'>
          <MDBCardBody>
              <div className='text-start '>
                  <p className="fw-bold ">INFO REGISTRAZIONE:</p>
              </div>
              {error.emailErr&&<label className='fs-10 mb-2 text-danger'>Indirizzo email non valido</label>}
              <MDBInput type="text" wrapperClass='mb-4' label='Indirizzo email' name="email" value={datiUtente.email} onChange={handleInputChange}/>
              {error.passwordErr&&<label className='fs-10 mb-2 text-danger'>Password non valida</label>}
              <MDBInput type="text" wrapperClass='mb-4' label='Password' name="password" value={datiUtente.password} onChange={handleInputChange}/>
              {error.confermaPasswordErr&&<label className='fs-10 mb-2 text-danger'>le password non coincidono</label>}
              <MDBInput type="text" wrapperClass='mb-4' label='Conferma password' name="confermaPassword" value={datiUtente.confermaPassword} onChange={handleInputChange}/>
          </MDBCardBody>
        </MDBCard>
        <MDBCard className=' bg-glass'>
          <MDBCardBody>
            <div className='text-start '>
              <p className="fw-bold ">DATI ANAGRAFICI:</p>
            </div>
            <hr/>
              {error.nomeBibliotecaErr&&<label className='fs-10 mb-2 text-danger'>Nome non valido</label>}
              <MDBInput type="text" wrapperClass='mb-4' label='Nome Biblioteca' name="nomeBiblioteca" value={datiUtente.nomeBiblioteca} onChange={handleInputChange}/>
              <MDBInput type="text" wrapperClass='mb-4' label='Provincia' name="provincia" value={datiUtente.provincia} onChange={handleInputChange}/>
              <MDBInput type="text" wrapperClass='mb-4' label='Città' name="citta" value={datiUtente.citta} onChange={handleInputChange}/>
              {error.viaErr&&<label className='fs-10 mb-2 text-danger'>Via non valida</label>}
              <MDBInput type="text" wrapperClass='mb-4' label='Via' name="via" value={datiUtente.via} onChange={handleInputChange}/>
              {error.recapitoTelefonicoErr&&<label className='fs-10 mb-2 text-danger'>Recapito telefonico non valido</label>}
              <MDBInput type="text" wrapperClass='mb-4' label='Recapito telefonico' name="recapitoTelefonico" value={datiUtente.recapitoTelefonico} onChange={handleInputChange}/>
              <div className='text-end'>
                <MDBBtn className='btn-dark btn-rounded btn-lg ' style={{backgroundColor:"#004AAD"}} type='button' onClick={(e)=>{handleSubmit(e)}} >Registrati</MDBBtn>
              </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCardGroup>
    </MDBRow>
  </MDBContainer>
)
}

export default RegistrazioneBiblioteca