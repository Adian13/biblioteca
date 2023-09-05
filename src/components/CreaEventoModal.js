import React from 'react';
import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalBody,
    MDBModalTitle,
    MDBIcon,
    MDBBtn,
    MDBInput,
    MDBTextArea
 } from 'mdb-react-ui-kit';

const CreaEventoModal = ({modalData,show,setShow}) => {
    
  return (
    <MDBModal show={show} setShow={setShow} tabIndex='-1'>
        <MDBModalDialog size='xl'>
            <MDBModalContent>
            <MDBModalHeader>
                <MDBModalTitle> <MDBIcon fas icon="info-circle" size="lg" /><b className='ms-2'>{modalData?"Modifica i dati dell'evento":"Crea un nuovo evento"}</b></MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={()=>{setShow(false)}}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody style={{backgroundColor:"#E3F2FD"}}>
            <div className='container-fluid bd-example-row'>
                <label className='mt-2 mb-2 fs-4'><b>Inserisci i dati relativi all'evento</b></label>
                <div className='row mt-3'>
                    <div className='col-md-6'>
                        <MDBInput style={{backgroundColor:"#FFFFFF"}} label='Nome' id='1' type='text' value={modalData?modalData.nome:""} />
                        <MDBTextArea style={{backgroundColor:"#FFFFFF"}} className='mt-3' label='Descrizione' id='2' rows={3} value={modalData?modalData.descrizione:""} />
                    </div>
                    <div className='col-md-6 text-center'>
                        <MDBInput style={{backgroundColor:"#FFFFFF"}} label='Data' id='3' type='date' value={modalData?modalData.data:""} />
                        <MDBInput style={{backgroundColor:"#FFFFFF"}} label='Ora' id='4' type='time' className='mt-3' value={modalData?modalData.ora:""} />
                        <MDBInput style={{backgroundColor:"#FFFFFF"}} label='Libro associato' id='1' type='text' className='mt-3' />
                    </div>
                    <div className='row mt-4 mb-3 text-center'>
                        <MDBBtn className='btn-dark btn-rounded btn-lg ms-2' style={{backgroundColor:"#004AAD"}} type='button' >Invia dati</MDBBtn>
                    </div>
                </div>
            </div>
            </MDBModalBody>
            </MDBModalContent>
        </MDBModalDialog>
    </MDBModal>
  )
}


export default CreaEventoModal;