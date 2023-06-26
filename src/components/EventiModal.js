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


const IscrittiModal = ({modalEventiData,showEventi,setShowEventi}) => {
  return (
    <MDBModal show={showEventi} setShow={setShowEventi} tabIndex='-1'>
        <MDBModalDialog size='xl'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle> <MDBIcon fas icon="info-circle" size="lg" /><b className='ms-3'>Gli eventi del club...</b></MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={()=>{setShowEventi(false)}}></MDBBtn>
            </MDBModalHeader>
            {/* <MDBModalBody style={{backgroundColor:"#E3F2FD"}}> */}
            <MDBModalBody className='mt-4'>
                <MDBTable striped hover borderColor="primary">
                    <MDBTableHead style={{ backgroundColor: '#38B6FF' }}>
                        <tr className="text-uppercase fs-5 fw-bold font-monospace">
                            <th scope='col'>Nome</th>
                            <th scope='col'>Descrizione</th>
                            <th scope='col'>Data</th>
                            <th scope='col'>Ora</th>
                            <th scope='col' className='text-center'>Azioni</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody >
                        {modalEventiData.length===0 &&
                            <tr >
                                <td colSpan={5} className='text-center'>Nessun evento</td>
                            </tr>
                        }
                        {
                            modalEventiData.map((evento) => {
                            return (
                                <tr>
                                    <th scope='row'>{evento.nome}</th>
                                    <td>{evento.descrizione}</td>
                                    <td>{evento.data}</td>
                                    <td>{evento.ora}</td>
                                    <td className='text-center'>
                                        <MDBBtn  id={evento.nome} floating style={{ backgroundColor: '#004AAD' }} >
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