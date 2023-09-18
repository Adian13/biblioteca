import React, {useEffect, useState} from 'react';
import NavBar from '../../components/NavBar';
import useAuth from"../../contexts/useAuth";
import axios from "axios";
import config from '../../config';
import {
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBCard,
    MDBBadge,
    MDBCardBody
  } from 'mdb-react-ui-kit';

const RichiestePage = () => {
    
    const [ticket,setTicket]=useState([]);
    const { state: {token} } = useAuth();
    const status={IN_ATTESA_DI_CONFERMA:{color:"warning",info:"Da confermare"}}

    useEffect(() => {
        async function getData(){
            const AuthStr = 'Bearer '.concat(token);
            const response =  await axios.get("http://"+config.ip+":"+config.port+"/prenotazione-libri/visualizza-prenotazioni/", {  headers: {  Authorization: AuthStr } });
            console.log("lista ticket lettore: ",response.data)
            setTicket(response.data)
        }

        getData();

      },[]);

  return (

    <>
    <NavBar/>
    <MDBCard className='mt-4 ms-4 me-4' style={{backgroundColor:"#E3F2FD"}}>
      <MDBCardBody>
          <MDBTable  striped hover borderColor="primary">
            <MDBTableHead style={{ backgroundColor: '#38B6FF' }}>
                <tr className="text-uppercase fs-5 fw-bold font-monospace">
                    <th scope='col'>Copertina:</th>
                    <th scope='col' style={{width:"30%"}}>Info libro</th>
                    <th scope='col'>Date</th>
                    <th className="text-center"scope='col'>Stato</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody >
            {ticket.length===0 &&
                <tr >
                    <td colSpan={4} className='text-center'>Nessun ticket da mostrare</td>
                </tr>
                }
                {
                    ticket.map((item) => {
                        return (
                            <tr>
                                <th scope='row'>{item.libro.immagineLibro ? <img width="100" height="150" style={{objectFit:"cover"}}  src={`data:image/png;base64,${item.libro.immagineLibro}`}/>: 'Immagine non disponibile'}</th>
                                <td>
                                  <p className='fw-bold mb-1 fs-2'>{item.libro.titolo}</p>
                                  <p className='text-muted mb-0 fs-6'>Biblioteca: {item.biblioteca}</p>
                                </td>
                                <td>
                                  <p className=' mb-1 fs-5 text-break'>Data richiesta: {item.dataRichiesta}</p>
                                  <p className=' mb-0 fs-5 text-break'>Data restituzione: {item.dataRestituzione}</p>
                                </td>
                                <td className=' text-center'>
                                  <MDBBadge color={status[item.stato].color} pill>
                                      {status[item.stato].info}
                                  </MDBBadge> 
                                </td>
                            </tr>
                        )
                    })
                } 
            </MDBTableBody>
          </MDBTable>
      </MDBCardBody>
      </MDBCard>
    </>
  )
}

export default RichiestePage