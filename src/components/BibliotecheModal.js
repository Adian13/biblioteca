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

const Modal = ({email,citta,via,recapitoTelefonico,nomeBiblioteca,show,setShow}) => {

 
  return (
    <MDBModal show={show} setShow={setShow} tabIndex='-1'>
        <MDBModalDialog size='xl'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle> <MDBIcon fas icon="info-circle" size="lg" /><b className='ms-3'>La nostra biblioteca...</b></MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={()=>{setShow(false)}}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody style={{backgroundColor:"#E3F2FD"}}>
              <div className='container-fluid bd-example-row'>
                <div className='row'>
                  <MDBCard className="mt-3 shadow bg-opacity-100"> 
                    <MDBCardBody>
                    <div className='row'>
                      <MDBCardTitle><h2><b>Biblioteca {nomeBiblioteca}</b></h2></MDBCardTitle>
                    </div>
                    <div className='row'>
                    <div className='col-md-7'>

                      <MDBListGroup className='mt-3 shadow '>
                        <MDBListGroupItem><MDBIcon fas icon="map-pin" /><i className='ms-2'>Via: </i><h5> <b>{via}, {citta}</b></h5></MDBListGroupItem>
                        <MDBListGroupItem><MDBIcon fas icon="phone-alt" className='ms-0' /><i className='ms-1'>Tel: </i><h5><b>{recapitoTelefonico}</b></h5></MDBListGroupItem>
                        <MDBListGroupItem><MDBIcon fas icon="at" /><i className='ms-2'>email: </i><h5><b>{email}</b></h5></MDBListGroupItem>
                     </MDBListGroup>
                    </div>
                    <div className='col-md-5 text-center shadow mt-3 rounded'>
                    <MDBIcon fas icon="book" size="8x" className="mt-3"/>
                    <h5 className='mt-3'><b>Prenota un libro presso la nostra biblioteca</b></h5>

                    </div>

                    </div>
                    
                    </MDBCardBody>
                  </MDBCard>
                
                </div>
                <div className='row'>

                </div>
                <div className='row'>

                </div>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
    </MDBModal>
  )
}

export default Modal