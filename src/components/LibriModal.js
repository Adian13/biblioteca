import React from 'react'
import useAuth from"../contexts/useAuth";
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
    MDBIcon,
    MDBBtn
 } from 'mdb-react-ui-kit';

const LibriModal = ({titolo,descrizione,isbn,autore,casaEditrice,generi,show,setShow,listaBiblioteche }) => {

    const {state: { token } } = useAuth();

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
                            <MDBCardBody>
                                {/*inserire immagine qui*/}
                                <div className='text-center p-3' style={{backgroundColor:"#004AAD"}}>
                                    <MDBCardTitle><h2><b class="text-white align-middle"> {titolo}</b></h2></MDBCardTitle>
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
                                                    {token?
                                                    <MDBBtn className=' btn-dark btn-rounded btn-lg' style={{backgroundColor:"#004AAD"}} type='button'>
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