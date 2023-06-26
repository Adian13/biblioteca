import React from 'react'

import {
    MDBModal,
    MDBModalTitle,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalBody, 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody,
    MDBBtn,
    MDBIcon,
 } from 'mdb-react-ui-kit';


const IscrittiModal = ({modalData,show,setShow}) => {
  return (
    <MDBModal show={show} setShow={setShow} tabIndex='-1'>
        <MDBModalDialog size='xl'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle> <MDBIcon fas icon="info-circle" size="lg" /><b className='ms-3'>Gli iscritti al club...</b></MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={()=>{setShow(false)}}></MDBBtn>
            </MDBModalHeader>
            {/* <MDBModalBody style={{backgroundColor:"#E3F2FD"}}> */}
            <MDBModalBody className='mt-4'>
                <MDBTable striped hover borderColor="primary">
                    <MDBTableHead style={{ backgroundColor: '#38B6FF' }}>
                        <tr className="text-uppercase fs-5 fw-bold font-monospace">
                            <th scope='col'>Nome</th>
                            <th scope='col'>Cognome</th>
                            <th scope='col'>E-mail</th>
                            <th scope='col' className='text-center'>Contatta</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody >
                        {modalData.length===0 &&
                            <tr >
                                <td colSpan={4} className='text-center'>Nessun iscritto</td>
                            </tr>
                        }
                        {
                            modalData.map((iscritto) => {
                            return (
                                <tr>
                                    <th scope='row'>{iscritto.nome}</th>
                                    <td>{iscritto.cognome}</td>
                                    <td>{iscritto.email}</td>
                                    <td className='text-center'>
                                        <MDBBtn onClick={(e) => window.location = 'mailto:'+ iscritto.email} id={iscritto.nome} floating style={{ backgroundColor: '#004AAD' }} >
                                            <MDBIcon fas icon="envelope-open-text" size="lg" />
                                        </MDBBtn>
                                    </td>
                                </tr>
                            )
                            })
                        }
                    </MDBTableBody>
                </MDBTable>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
    </MDBModal>
  )
}

export default IscrittiModal