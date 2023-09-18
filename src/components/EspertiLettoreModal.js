import React,{useState,useEffect} from 'react'
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
 import axios from 'axios';
 import config from '../config';
 import useAuth from"../contexts/useAuth";


const EspertiLettoreModal = ({show,setShow}) => {
    const [esperti,setEsperti]=useState([]);
    const {state: { token } } = useAuth();

    useEffect(() => {
        async function getData(){
            const AuthStr = 'Bearer '.concat(token);

            const response =  await axios.post("http://"+config.ip+":"+config.port+'/comunicazione-esperto/visualizza-esperti-per-preferenze-lettore',{},{ headers:{ Authorization: AuthStr}});
            console.log("risposta",response.data)
            setEsperti(response.data)
        }

        getData();

      }, []);

  return (
    <MDBModal show={show} setShow={setShow} tabIndex='-1'>
        <MDBModalDialog size='xl'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle> <MDBIcon fas icon="info-circle" size="lg" /><b className='ms-3'>Gli esperti consigliati per te...</b></MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={()=>{setShow(false)}}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
                <MDBTable striped hover borderColor="primary" className='mt-4'>
                    <MDBTableHead style={{ backgroundColor: '#38B6FF' }}>
                        <tr className="text-uppercase fs-5 fw-bold font-monospace">
                            <th scope='col'>Nome</th>
                            <th scope='col'>E-mail</th>
                            <th scope='col'>Generi</th>
                            <th className="text-center"scope='col'>Contatta</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody >
                                {esperti.length===0 &&
                                <tr >
                                    <td colSpan={4} className='text-center'>Nessun esperto da mostrare</td>
                                </tr>
                                }
                                {
                                    esperti.map((esperto) => {
                                        return (
                                            <tr key={esperto}>
                                                <th scope='row'>{esperto.nome}</th>
                                                <td>{esperto.email}</td>
                                                <td>
                                                    <div>
                                                        {
                                                            esperto.generi.map((genere =>{
                                                                return(
                                                                    <p key={genere}>{genere}</p>
                                                                )
                                                            }))
                                                        }
                                                    </div>
                                                </td>
                                                <td className='text-center'>
                                                <MDBBtn onClick={(e) => window.location = 'mailto:'+ esperto.email} id={esperto.nome} floating style={{ backgroundColor: '#004AAD' }} >
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

export default EspertiLettoreModal