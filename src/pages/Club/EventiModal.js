import React, {useState,useEffect} from 'react'
import useAuth from"../../contexts/useAuth";
import Modal from "./CreaEventoModal"
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
 import config from '../../config';
 import axios from 'axios';



const EventiModal = ({modalEventiData,showEventi,setShowEventi,amministratore,idClub}) => {
    
    const {state: { token } } = useAuth();
    const [modalData, setModalData] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(()=>{
        if(showEventi){
            document.title="Eventi"
        }

    },[showEventi])

    const showModal= async(modalData)=>{

        setModalData(modalData);
        setShowEventi(false);
        setShow(true);
    }

    const deleteEvent= async(idEvento)=>{
        const formData = new FormData();
        formData.append("idClub",idClub);
        formData.append("idEvento",idEvento);
        const AuthStr = 'Bearer '.concat(token);

        const response= await axios.post("http://"+config.ip+":"+config.port+"/gestione-eventi/elimina-evento",formData,{ headers:{"Content-Type":"multipart/form-data", Authorization: AuthStr}})
        console.log("response",response.data)
    }
    
    return (
    <>
    <Modal modalData={modalData} show={show} setShow={setShow} idClub={idClub}/> 
    <MDBModal show={showEventi} setShow={setShowEventi} tabIndex='-1'>
        <MDBModalDialog size='xl'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle> <MDBIcon fas icon="info-circle" size="lg" /><b className='ms-3'>Gli eventi del club...</b></MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={()=>{setShowEventi(false)}}></MDBBtn>
            </MDBModalHeader>
            {/* <MDBModalBody style={{backgroundColor:"#E3F2FD"}}> */}
            <MDBModalBody>
                {amministratore&&<MDBBtn id="CreaEModalBtn" className='btn-dark btn-rounded btn-lg mt-3 d-flex align-items-center' style={{backgroundColor:"#004AAD"}} type='button' onClick={()=>{showModal(null)}} > <MDBIcon className='me-2 shadow' size="2x" fas icon="plus-circle" />Crea un nuovo evento</MDBBtn>}
                <MDBTable striped hover borderColor="primary" className='mt-4'>
                    <MDBTableHead style={{ backgroundColor: '#38B6FF' }}>
                        <tr className="text-uppercase fs-5 fw-bold font-monospace">
                            <th scope='col'>Nome</th>
                            <th scope='col'>Descrizione</th>
                            <th scope='col'>Libro</th>
                            <th scope='col'>Data</th>
                            <th scope='col'>Ora</th>
                            {amministratore&&<th scope='col' className='text-center'>Azioni</th>}
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody >
                        {modalEventiData.length===0 &&
                            <tr >
                                <td colSpan={5} className='text-center'>Nessun evento</td>
                            </tr>
                        }
                        {
                            modalEventiData.map((evento,id) => {
                            return (
                                <tr>
                                    <th scope='row'>{evento.nome}</th>
                                    <td>{evento.descrizione}</td>
                                    <td>{evento.libro}</td>
                                    <td>{evento.data}</td>
                                    <td>{evento.ora.substring(0,5)}</td>
                                    {amministratore&&<td className='text-center'>
                                        <MDBBtn  id={"EliminaEventoIBtn"+id} floating style={{ backgroundColor: '#004AAD' }} >
                                            <MDBIcon far icon="trash-alt" onClick={()=>{deleteEvent(evento.idEvento)}}/>
                                        </MDBBtn>
                                        <MDBBtn  id={"VisualizzaEventoIBtn"+id} floating style={{ backgroundColor: '#004AAD' }} className='ms-2 text-center' onClick={()=>showModal(evento)}>
                                            <MDBIcon far icon="edit" />
                                        </MDBBtn>
                                    </td>}
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
    </>
  )
}

export default EventiModal