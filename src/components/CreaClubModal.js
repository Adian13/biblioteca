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

const CreaClubModal = ({modalData,show,setShow}) => {
    
  return (
    <MDBModal show={show} setShow={setShow} tabIndex='-1'>
        <MDBModalDialog size='xl'>
            <MDBModalContent>
            <MDBModalHeader>
                <MDBModalTitle> <MDBIcon fas icon="info-circle" size="lg" /><b className='ms-2'>{modalData?"Modifica del club "+modalData.nome:"Crea un nuovo club..."}</b></MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={()=>{setShow(false)}}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody style={{backgroundColor:"#E3F2FD"}}>
            <div className='container-fluid bd-example-row'>
                <label className='mt-2 mb-2 fs-4'><b>Inserisci i dati relativi al club</b></label>
                <div className='row mt-3'>
                    <div className='col-md-6'>
                        <MDBInput style={{backgroundColor:"#FFFFFF"}} label='Nome' id='1' type='text' value={modalData?modalData.nome:""} />
                        <MDBTextArea style={{backgroundColor:"#FFFFFF"}} className='mt-3' label='Descrizione' id='2' rows={3} value={modalData?modalData.descrizione:""} />
                    </div>
                    <div className='col-md-6 text-center'>
                        <label><b>Generi</b></label>
                        <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" id="3" size="5">
                            <option>Giallo</option>
                            <option>Giallo</option>
                            <option>Giallo</option>
                            <option>Giallo</option>
                            <option>Giallo</option>
                        </select>
                    </div>
                    <div className='row mt-2'>
                        <label><b>Copertina</b></label>
                        <input className='form-control mt-1 ms-2' type='file' id='4' />
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

export default CreaClubModal