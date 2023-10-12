import React, {useEffect} from 'react'
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
import {ValidateLettore} from "./Validate"


const RegistrazioneLettore = () => {
  const navigate = useNavigate()
  const [datiUtente,setDatiUtente]=useState({nome:"",cognome:"",email:"",username:"",password:"",confermaPassword:"",provincia:"",citta:"",via:"",recapitoTelefonico:""})
  const [toSend,setToSend]=useState({})
  const[error,setError]=useState({nomeErr:false,cognomeErr:false,usernameErr:false,emailErr:false,passwordErr:false,confermaPasswordErr:false,viaErr:false,recapitoTelefonicoErr:false,emailBibliotecaErr:false})

  useEffect(()=>{
    document.title="Registrazione Lettore";
  },[])

  const handleInputChange=(e)=>{
      const {name,value}=e.target;

      setDatiUtente({...datiUtente,[name]:value})
  }

  const handleSubmit=async(e)=>{
      const{state,error}=ValidateLettore(datiUtente)
      if(!state){
        const formData = new FormData();
        console.log("utente ricevuto",datiUtente)
        formData.append("confermaPassword",datiUtente.confermaPassword)
        formData.append("citta",datiUtente.citta)
        formData.append("cognome",datiUtente.cognome)
        formData.append("nome",datiUtente.nome)
        formData.append("email",datiUtente.email)
        formData.append("username",datiUtente.username)
        formData.append("password",datiUtente.password)
        formData.append("provincia",datiUtente.provincia)
        formData.append("via",datiUtente.via)
        formData.append("recapitoTelefonico",datiUtente.recapitoTelefonico)
        

        const response = await axios.post("http://"+config.ip+":"+config.port+"/registrazione/lettore",formData)
        console.log("response",response)
        if(response.data.statusOk){
            setDatiUtente({nome:"",cognome:"",email:"",username:"",password:"",confermaPassword:"",provincia:"",citta:"",via:"",recapitoTelefonico:""})
            navigate('/')
        }
      }else{
        setError(error);
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
              {error.usernameErr&&<label className='fs-10 mb-2 text-danger'>Username non valido</label>}
              <MDBInput type="text" wrapperClass='mb-4' label="Usename" name="username"value={datiUtente.username} onChange={handleInputChange}/>
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
              {error.nomeErr&&<label className='fs-10 mb-2 text-danger'>Nome non valido</label>}
              <MDBInput type="text" wrapperClass='mb-4' label='Nome' name="nome" value={datiUtente.nome} onChange={handleInputChange}/>
              {error.cognomeErr&&<label className='fs-10 mb-2 text-danger'>Cognome non valido</label>}
              <MDBInput type="text" wrapperClass='mb-4' label='Cognome' name="cognome" value={datiUtente.cognome} onChange={handleInputChange}/>
              <MDBInput type="text" wrapperClass='mb-4' label='Provincia' name="provincia" value={datiUtente.provincia} onChange={handleInputChange}/>
              <MDBInput type="text" wrapperClass='mb-4' label='Città' name="citta" value={datiUtente.citta} onChange={handleInputChange}/>
              {error.viaErr&&<label className='fs-10 mb-2 text-danger'>Via non valida</label>}
              <MDBInput type="text" wrapperClass='mb-4' label='Via' name="via" value={datiUtente.via} onChange={handleInputChange}/>
              {error.recapitoTelefonicoErr&&<label className='fs-10 mb-2 text-danger'>recapito telefonico non valido</label>}
              <MDBInput type="text" wrapperClass='mb-4' label='Recapito telefonico' name="recapitoTelefonico" value={datiUtente.recapitoTelefonico} onChange={handleInputChange}/>
              <div className='text-end'>
                <MDBBtn className='btn-dark btn-rounded btn-lg ' style={{backgroundColor:"#004AAD"}} type='button' onClick={(e)=>{handleSubmit(e)}} id="Registratibtn3" >Registrati</MDBBtn>
              </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCardGroup>
    </MDBRow>
  </MDBContainer>
)
}

export default RegistrazioneLettore