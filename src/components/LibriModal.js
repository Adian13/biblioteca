import React from 'react'
import useAuth from"../contexts/useAuth";
import axios from "axios";
import config from '../config';

import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalBody,
    MDBCard,
    MDBCardBody,
    MDBCardTitle, 
    MDBListGroup, 
    MDBListGroupItem,
    MDBModalTitle,
    MDBCardImage,
    MDBIcon,
    MDBBtn
 } from 'mdb-react-ui-kit';

const LibriModal = ({id,titolo,descrizione,isbn,autore,casaEditrice,generi,show,setShow,listaBiblioteche,immagineLibro }) => {

    const {state: { utente,token } } = useAuth();

    const prenotaLibri = async(idBiblio)=>{

        const formData = new FormData();
        formData.append("idLibro",id);
        formData.append("emailBiblioteca",idBiblio);
        const AuthStr = 'Bearer '.concat(token);
        const result = await axios.post("http://"+config.ip+":"+config.port+"/prenotazione-libri/conferma-prenotazione/",formData,{ headers: { Authorization: AuthStr } });
        
        if(result.data.statusOk){
            alert("Libro prenotato")
        }else{
            alert("Impossibile prenotare libro")

        }
    }

    return (
        <MDBModal show={show} setShow={setShow} tabIndex='-1'>
            <MDBModalDialog size='xl'>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle> <MDBIcon fas icon="info-circle" size="lg" /><b className='ms-3'>Esplora il tuo libro...</b></MDBModalTitle>
                  <MDBBtn className='btn-close' color='none' onClick={()=>{setShow(false)}}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody style={{backgroundColor:"#E3F2FD"}}>
                <div className='container-fluid bd-example-row'>
                    <div className='row'>
                        <div className='col-md-5'>
                            <MDBCard className="shadow bg-opacity-100"> 
                            <MDBCardBody >
                                <div className="text-center">
                                    <MDBCardImage  style={{objectFit:"cover"}} height="400" width="350" src={`data:image/png;base64,${immagineLibro}`} />
                                </div>
                                <div className='text-center p-3 mt-2' style={{backgroundColor:"#004AAD"}}>
                                    <MDBCardTitle><h2><b className="text-white align-middle"> {titolo}</b></h2></MDBCardTitle>
                                </div>
                                <MDBListGroup className='mt-4'>
                                    <MDBListGroupItem noBorders><b className='ms-1'>Descrizione: </b> <h5> {descrizione}</h5></MDBListGroupItem>
                                    <MDBListGroupItem noBorders><b className='ms-1'>ISBN: </b><h5>{isbn}</h5></MDBListGroupItem>
                                    <MDBListGroupItem noBorders><b className='ms-1'>Autore: </b><h5>{autore}</h5></MDBListGroupItem>
                                    <MDBListGroupItem noBorders><b className='ms-1'>Casa editrice: </b><h5>{casaEditrice}</h5></MDBListGroupItem>
                                    <MDBListGroupItem noBorders><b className='ms-1'>Generi: </b><h5>{generi}</h5></MDBListGroupItem> 
                                </MDBListGroup>
                            </MDBCardBody>
                            </MDBCard>
                        </div>
                        <div className='col-md-7'>
                            <MDBListGroup className='mt-4' flush>
                                <MDBListGroupItem noBorders className='d-flex align-items-center justify-content-center p-2 shadow'> <h4><b> Scegli la biblioteca che preferisci... </b></h4></MDBListGroupItem>
                                <div className='mt-4'>
                                {
                                    listaBiblioteche.map((biblioteca) => {
                                            return (
                                                <>
                                                <MDBListGroupItem className='d-flex justify-content-between align-items-start align-items-center'>
                                                    <div className='ms-2 me-auto'>
                                                    <div className='fw-bold fs-3'>Biblioteca {biblioteca.nomeBiblioteca}</div>{biblioteca.via}, {biblioteca.citta}
                                                    </div>
                                                    {utente==="Lettore"?
                                                    <MDBBtn className=' btn-dark btn-rounded btn-lg' style={{backgroundColor:"#004AAD"}} type='button' onClick={()=>{prenotaLibri(biblioteca.email)}}>
                                                    Prenota
                                                    </MDBBtn>:
                                                    <MDBBtn disabled className=' btn-dark btn-rounded btn-lg' style={{backgroundColor:"#004AAD"}} type='button'>
                                                    Prenota
                                                    </MDBBtn>
                                                    }
                                                </MDBListGroupItem>
                                                </>
                                            )
                                        }) 
                                    }
                                </div>
                            </MDBListGroup>
                        </div>
                    </div>
                </div>
                </MDBModalBody>
              </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
      )
}

export default LibriModal