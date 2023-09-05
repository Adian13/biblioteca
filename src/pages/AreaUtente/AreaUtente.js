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

const AreaUtente = () => {
    const { state: {token,email,utente} } = useAuth();
    const [datiUtente,setDatiUtente]=useState({});

    useEffect(() => {
        async function getData(){
            const AuthStr = 'Bearer '.concat(token);
            const response =  await axios.get('http://localhost:8080/biblioteca/'+email, { headers: { Authorization: AuthStr } });
            console.log("dati",response.data);
            setDatiUtente(response.data[0]);
            
            
        }      

        getData();

      }, []);

  return (
    <>
    <NavBar/>
    {utente!=null?<MDBContainer fluid className='mt-3' >      
        <MDBRow>

            <MDBCol md='4'>
                <MDBCard className='mt-2 mb-3'>
                <MDBCardBody>
                    <MDBCardTitle className='text-center fw-bold fs-3'>Benvenuto</MDBCardTitle>

                    <MDBCardText className='mt-4 text-center'>
                            <div className="text-center d-xl-flex justify-content-xl-center align-items-xl-center mb-3">
                                <picture><img class="border rounded-circle d-xl-flex justify-content-xl-center" src='..\..\user.png' /></picture>
                            </div>
                        <MDBRow className='mt-3 ms-2 me-2'>
                            <MDBBtn className=' btn-dark btn-rounded btn-lg' style={{backgroundColor:"#1A237E"}} type='button'>Modifica dati account</MDBBtn>
                        </MDBRow>
                        {utente==="Biblioteca"&&
                        <>
                            <MDBRow className='mt-3 ms-2 me-2'>
                                <MDBBtn className=' btn-dark btn-rounded btn-lg' style={{backgroundColor:"#1A237E"}} type='button'>Visualizza tickets</MDBBtn>
                            </MDBRow>
                            <MDBRow className='mt-3 ms-2 me-2'>
                                <MDBBtn className=' btn-dark btn-rounded btn-lg' style={{backgroundColor:"#1A237E"}} type='button'>Visualizza libri posseduti</MDBBtn>
                            </MDBRow>
                        </>
                        }
                        {utente==="Esperto"&&
                        <>
                            <MDBRow className='mt-3 ms-2 me-2'>
                                <MDBBtn className=' btn-dark btn-rounded btn-lg' style={{backgroundColor:"#1A237E"}} type='button'>Gestione Generi</MDBBtn>
                            </MDBRow>
                            <MDBRow className='mt-3 ms-2 me-2'>
                                <MDBBtn className=' btn-dark btn-rounded btn-lg' style={{backgroundColor:"#1A237E"}} type='button'>Visualizza Clubs</MDBBtn>
                            </MDBRow>
                        </>
                        }
                        {utente==="Lettore"&&
                        <>
                            <MDBRow className='mt-3 ms-2 me-2'>
                                <MDBBtn className=' btn-dark btn-rounded btn-lg' style={{backgroundColor:"#1A237E"}} type='button'>Visualizza tickets</MDBBtn>
                            </MDBRow>
                            <MDBRow className='mt-3 ms-2 me-2'>
                                <MDBBtn className=' btn-dark btn-rounded btn-lg' style={{backgroundColor:"#1A237E"}} type='button'>Questionario di supporto</MDBBtn>
                            </MDBRow>
                            <MDBRow className='mt-3 ms-2 me-2'>
                                <MDBBtn className=' btn-dark btn-rounded btn-lg' style={{backgroundColor:"#1A237E"}} type='button'>Gestione generi</MDBBtn>
                            </MDBRow>
                        </>
                        }
                        
                    </MDBCardText>
                </MDBCardBody>
                </MDBCard>
            </MDBCol>

            <MDBCol md='8'>
            <MDBCard className='mt-2'>
                <MDBCardBody>
                    <MDBCardTitle className='text-start fw-bold fs-3'>Informazioni account</MDBCardTitle>
                        <MDBListGroup className='mt-5 shadow'>
                            <MDBListGroupItem><p className='fs-5  m-2'><b>Nome:  </b>  Biblioteca Carrisi</p></MDBListGroupItem>
                            {utente!="Biblioteca"&&<MDBListGroupItem><p className='fs-5  m-2'><b>Cognome:  </b>  </p></MDBListGroupItem>}
                            <MDBListGroupItem><p className='fs-5  m-2'><b>Email:  </b></p></MDBListGroupItem>
                            <MDBListGroupItem><p className='fs-5  m-2'><b>Provincia:  </b></p></MDBListGroupItem>
                            <MDBListGroupItem><p className='fs-5  m-2'><b>Città:  </b></p></MDBListGroupItem>
                            <MDBListGroupItem><p className='fs-5  m-2'><b>Via:  </b></p></MDBListGroupItem>
                            <MDBListGroupItem><p className='fs-5  m-2'><b>Recapito telefonico:  </b></p></MDBListGroupItem>
                            {utente!="Biblioteca"&&<MDBListGroupItem><p className='fs-5  m-2'><b>Recapito telefonico:  </b>  </p></MDBListGroupItem>}
                            {utente=="Esperto"&&<MDBListGroupItem><p className='fs-5  m-2'><b>Lavora in:  </b>  </p></MDBListGroupItem>}
                            {utente=="Esperto"&&<MDBListGroupItem><p className='fs-5  m-2'><b>Specializzato in:  </b>  </p></MDBListGroupItem>}
                            {utente=="Lettore"&&<MDBListGroupItem><p className='fs-5  m-2'><b>Genere preferito:  </b>  </p></MDBListGroupItem>}


                        </MDBListGroup>
                    <MDBCardText>

                    </MDBCardText>
                </MDBCardBody>
                </MDBCard>
            </MDBCol>

        </MDBRow>
    </MDBContainer>:<p className='text-center fs-1 mt-5'>Effettua il Log-in per visualizzare la tua area-utente</p>}
    </>
  )
}

export default AreaUtente