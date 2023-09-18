import React, {useEffect,useState} from 'react';
import NavBar from '../../components/NavBar';
import useAuth from"../../contexts/useAuth";
import axios from "axios";
import { MDBRow, 
         MDBCol, 
         MDBContainer, 
         MDBCard,
         MDBCardBody,
         MDBCardTitle,
         MDBListGroup,
         MDBBtn,
         MDBIcon,
        MDBListGroupItem,
         MDBCardText} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import config from '../../config';

const AreaUtenteBiblioteca = () => {
    const { state: {token,email,utente} } = useAuth();
    const [datiUtente,setDatiUtente]=useState({});
    const navigate = useNavigate();

    useEffect(() => {
        async function getData(){
            const AuthStr = 'Bearer '.concat(token);
            const response =  await axios.get("http://"+config.ip+":"+config.port+'/biblioteca/'+email, { headers: { Authorization: AuthStr } });
            setDatiUtente(response.data);
        }      

        getData();

      }, []);

  return (
    <div style={{backgroundColor:"#E3F2FD"}}>
    <NavBar/>
    {utente==="Biblioteca"?<MDBContainer className='mt-3' >      
        <MDBRow>

            <MDBCol md='4'>
                <MDBCard className='mt-2 mb-3'>
                <MDBCardBody>
                    <MDBCardTitle className='text-center fw-bold fs-3'>Benvenuto {datiUtente.nomeBiblioteca}</MDBCardTitle>

                    <MDBCardText className='mt-4 text-center'>
                            <div className="text-center d-xl-flex justify-content-xl-center align-items-xl-center mb-3">
                                <picture><img class="border rounded-circle d-xl-flex justify-content-xl-center" src='..\..\user.png' /></picture>
                            </div>
                        <MDBRow className='mt-3 ms-2 me-2'>
                            <MDBBtn className=' btn-dark btn-rounded btn-lg' style={{backgroundColor:"#001633"}} type='button'>Modifica dati account</MDBBtn>
                        </MDBRow>
                            <MDBRow className='mt-3 ms-2 me-2'>
                                <MDBBtn className=' btn-dark btn-rounded btn-lg' style={{backgroundColor:"#001633"}} type='button' onClick={()=>navigate('/areaUtente/Biblioteca/richieste')}>Visualizza tickets</MDBBtn>
                            </MDBRow>
                            <MDBRow className='mt-3 ms-2 me-2'>
                                <MDBBtn className=' btn-dark btn-rounded btn-lg' style={{backgroundColor:"#001633"}} type='button' onClick={()=>navigate('/bookList/'+datiUtente.email)}>Visualizza libri posseduti</MDBBtn>
                            </MDBRow>                       
                    </MDBCardText>
                </MDBCardBody>
                </MDBCard>
            </MDBCol>

            <MDBCol md='8'>
            <MDBCard className='mt-2'>
                <MDBCardBody>
                    <MDBCardTitle className='text-start fw-bold fs-3'>Informazioni account</MDBCardTitle>
                        <MDBListGroup className='mt-5 ms-2 shadow'>
                            <MDBListGroupItem><p className='fs-5  m-2'><b>Nome:  </b>{datiUtente.nomeBiblioteca}</p></MDBListGroupItem>
                            <MDBListGroupItem><p className='fs-5  m-2'><b>E-mail:  </b>{datiUtente.email}</p></MDBListGroupItem>
                            <MDBListGroupItem><p className='fs-5  m-2'><b>Provincia:  </b>{datiUtente.provincia}</p></MDBListGroupItem>
                            <MDBListGroupItem><p className='fs-5  m-2'><b>Città:  </b>{datiUtente.citta}</p></MDBListGroupItem>
                            <MDBListGroupItem><p className='fs-5  m-2'><b>Via:  </b>{datiUtente.via}</p></MDBListGroupItem>
                            <MDBListGroupItem><p className='fs-5  m-2'><b>Recapito telefonico:  </b>{datiUtente.recapitoTelefonico}</p></MDBListGroupItem>
                        </MDBListGroup>
                    <MDBCardText>

                    </MDBCardText>
                </MDBCardBody>
                </MDBCard>
            </MDBCol>

        </MDBRow>
    </MDBContainer>:<p className='text-center fs-1 mt-5'>Effettua il Log-in per visualizzare la tua area-utente</p>}
    </div>
  )
}

export default AreaUtenteBiblioteca