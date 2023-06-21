import React from 'react'

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

const LibiModal = (idLibro,titolo,descrizione,isbn,autore,show,setShow) => {
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
                                <div >
                                    <MDBCardTitle><h2><b> {titolo}</b></h2></MDBCardTitle>
                                </div>
                                <MDBListGroup className='mt-2'>
                                    <MDBListGroupItem><b className='ms-1'>Descrizione: </b> <h5> {descrizione}</h5></MDBListGroupItem>
                                    <MDBListGroupItem><b className='ms-1'>ISBN: </b><h5>{isbn}</h5></MDBListGroupItem>
                                    <MDBListGroupItem><b className='ms-1'>Autore: </b><h5>{autore}</h5></MDBListGroupItem>
                                    {/* <MDBListGroupItem><b className='ms-1'>Casa editrice: </b><h5>{casaEditrice}</h5></MDBListGroupItem> */}
                                    {/* <MDBListGroupItem><b className='ms-1'>Generi: </b><h5>{generi[0]}</h5></MDBListGroupItem> */}
                                </MDBListGroup>
                            </MDBCardBody>
                            </MDBCard>
                        </div>
                        <div className='col-md-7'>

                        </div>

                    </div>
                </div>
                </MDBModalBody>
              </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
      )
}

export default LibiModal