import React, {useEffect, useState} from 'react'
import useAuth from"../../contexts/useAuth";
import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBInput
  } from 'mdb-react-ui-kit';
import NavBar from "../../components/NavBar"
import { MDBCardHeader } from 'mdbreact';
import config from '../../config';
import axios from 'axios';

const ModificaBiblioteca = () => {
    const { state: {token,email} } = useAuth();
    const [datiUtente,setDatiUtente]=useState({vecchia_password:"",conferma_password:"",nuova_password:""});

    useEffect(() => {
        async function getData(){
            const AuthStr = 'Bearer '.concat(token);
            var response =  await axios.get("http://"+config.ip+":"+config.port+'/biblioteca/'+email, { headers: { Authorization: AuthStr } });
            const {password,...newItem}=response.data;
            
            setDatiUtente(newItem);
            
        }      

        getData();

    }, []);

    const handleInputChange=(e)=>{
        const {name,value}=e.target;
  
        setDatiUtente({...datiUtente,[name]:value})
    }

    const handleSubmit=async(e)=>{
        //todo: eseguire i check
        console.log("dati utente",datiUtente);
        var formData = new FormData();
        formData=datiUtente
        console.log("formData",formData)
        const AuthStr = 'Bearer '.concat(token);
        const response =  await axios.post("http://"+config.ip+":"+config.port+'/area-utente/modifica-biblioteca',formData, { headers: { Authorization: AuthStr } });
        console.log("response",response)
        
    }

  return (
    <>
    <NavBar/>
    <MDBRow className='m-5'>
        <MDBCard className='p-0 shadow'>
            <MDBCardHeader className='text-primary fs-5 ' style={{backgroundColor:"#ECEFF1"}}><b> Dati di base</b></MDBCardHeader>
            <MDBCardBody>
                <MDBRow>
                    <MDBCol size="8">
                        <MDBInput  type="text" wrapperClass='mb-3' label='Indirizzo email' name="email" value={datiUtente.email} onChange={handleInputChange}/>
                        <MDBInput type="text" wrapperClass='mb-3' label='Nome Biblioteca' name="nomeBiblioteca" value={datiUtente.nomeBiblioteca} onChange={handleInputChange}/>
                        <MDBInput type="text" wrapperClass='mb-3' label='Provincia' name="provincia" value={datiUtente.provincia} onChange={handleInputChange}/> 
                        <MDBInput type="text" wrapperClass='mb-3' label='Città' name="citta" value={datiUtente.citta} onChange={handleInputChange}/> 
                        <MDBInput type="text" wrapperClass='mb-3' label='Via' name="via" value={datiUtente.via} onChange={handleInputChange}/> 
                        <MDBInput type="text" wrapperClass='mb-3' label='Recapito telefonico' name="recapitoTelefonico" value={datiUtente.recapitoTelefonico} onChange={handleInputChange}/>
                    </MDBCol>
                </MDBRow>
            </MDBCardBody>
        </MDBCard>
    </MDBRow>
    <MDBRow className='m-5'>
        <MDBCard className='p-0 shadow'>
            <MDBCardHeader className='text-primary fs-5 ' style={{backgroundColor:"#ECEFF1"}}><b> Password</b></MDBCardHeader>
            <MDBCardBody>
                <MDBRow>
                    <MDBCol size="8">
                        <MDBInput type="password" wrapperClass='mb-3' label='Vecchia Password' name="vecchia_password" value={datiUtente.vecchia_password} onChange={handleInputChange}/>
                        <MDBInput type="password" wrapperClass='mb-3' label='Conferma Vecchia Password' name="conferma_password" value={datiUtente.conferma_password} onChange={handleInputChange}/>
                        <MDBInput type="password" wrapperClass='mb-3' label='Nuova Password' name="nuova_password" value={datiUtente.nuova_password} onChange={handleInputChange}/>
                    </MDBCol>
                    <MDBCol size="4" className='d-flex align-items-center justify-content-center '>
                        <MDBBtn className='p-5 btn-dark btn-rounded btn-lg ' style={{backgroundColor:"#004AAD"}} type='button' onClick={(e)=>{handleSubmit(e)}} >Modifica Dati</MDBBtn>
                    </MDBCol>
                </MDBRow>
            </MDBCardBody>
        </MDBCard>
    </MDBRow>
    </>
  )
}

export default ModificaBiblioteca