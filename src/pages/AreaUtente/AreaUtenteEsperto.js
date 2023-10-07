import React, {useEffect,useState} from 'react';
import NavBar from '../../components/NavBar';
import useAuth from"../../contexts/useAuth";
import axios from "axios";
import GeneriDropDown from '../../components/GeneriDropDown';
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

const AreaUtenteEsperto = () => {
    const { state: {token,utente} } = useAuth();
    const [datiUtente,setDatiUtente]=useState({});
    const navigate = useNavigate();
    const[update,setUpdate]=useState(true)

    useEffect(() => {
        async function getData(){
            const AuthStr = 'Bearer '.concat(token);
            const response =  await axios.post("http://"+config.ip+":"+config.port+'/esperto/informazioni',{}, { headers: { Authorization: AuthStr } });
            console.log("esperto",response.data)
            setDatiUtente(response.data);
            console.log("generi utente inviati", datiUtente.generi)
        }      

        getData();

      }, [update]);

  return (
    <div style={{backgroundColor:"#E3F2FD"}}>
    <NavBar/>
    {utente==="Esperto"?<MDBContainer className='mt-3' >      
        <MDBRow>

            <MDBCol md='4'>
                <MDBCard className='mt-2 mb-3'>
                <MDBCardBody>
                    <MDBCardTitle className='text-center fw-bold fs-3'>Benvenuto {datiUtente.nome} </MDBCardTitle>

                    <MDBCardText className='mt-4 text-center'>
                            <div className="text-center d-xl-flex justify-content-xl-center align-items-xl-center mb-3">
                                <picture><img class="border rounded-circle d-xl-flex justify-content-xl-center" src='..\..\user.png' /></picture>
                            </div>
                        <MDBRow className='mt-3 ms-2 me-2'>
                            <MDBBtn className=' btn-dark btn-rounded btn-lg' style={{backgroundColor:"#001633"}} type='button' onClick={()=>{navigate("/areaUtente/Esperto/modifica")}}>Modifica dati account</MDBBtn>
                        </MDBRow>
                        <MDBRow className='mt-3 ms-2 me-2'>
                            <MDBBtn className=' btn-dark btn-rounded btn-lg' style={{backgroundColor:"#001633"}} type='button' onClick={()=>{navigate("/clubDelLibro/esperto")}}>Visualizza clubs</MDBBtn>
                        </MDBRow>                       
                    </MDBCardText>
                </MDBCardBody>
                </MDBCard>
            </MDBCol>

            <MDBCol md='8'>
            <MDBCard className='mt-2'>
                {datiUtente.generi &&
                <MDBCardBody>
                    <MDBRow className='pt-4'>
                        <MDBCol>
                            <MDBCardTitle className='text-start fw-bold fs-3 mt-1'>Informazioni account </MDBCardTitle>
                        </MDBCol>
                        <MDBCol>
                            <GeneriDropDown generiUtente={[...datiUtente.generi]} setAggiorna={setUpdate} aggiorna={update} />
                        </MDBCol>
                    </MDBRow>
                        <MDBListGroup className='mt-5 ms-2 shadow'>
                            <MDBListGroupItem><p className='fs-5  m-2'><b>Nome:  </b>{datiUtente.nome}</p></MDBListGroupItem>
                            <MDBListGroupItem><p className='fs-5  m-2'><b>Cognome:  </b>{datiUtente.cognome}</p></MDBListGroupItem>
                            <MDBListGroupItem><p className='fs-5  m-2'><b>E-mail:  </b>{datiUtente.email}</p></MDBListGroupItem>
                            <MDBListGroupItem><p className='fs-5  m-2'><b>Provincia:  </b>{datiUtente.provincia}</p></MDBListGroupItem>
                            <MDBListGroupItem><p className='fs-5  m-2'><b>Città:  </b>{datiUtente.citta}</p></MDBListGroupItem>
                            <MDBListGroupItem><p className='fs-5  m-2'><b>Via:  </b>{datiUtente.via}</p></MDBListGroupItem>
                            <MDBListGroupItem><p className='fs-5  m-2'><b>Recapito telefonico:  </b>{datiUtente.recapitoTelefonico}</p></MDBListGroupItem> 
                            <MDBListGroupItem><p className='fs-5  m-2'><b>Lavora in:  </b>{datiUtente.emailBiblioteca}</p></MDBListGroupItem>                        
                             {datiUtente.generi.map((genere)=>{
                                return(
                                    <MDBListGroupItem><p className='fs-5  m-2'><b>Specializzato in:  </b>{genere}</p></MDBListGroupItem>
                                )
                            })} 
                        </MDBListGroup>
                    <MDBCardText>

                    </MDBCardText>
                </MDBCardBody>}
                </MDBCard>
            </MDBCol>

        </MDBRow>
    </MDBContainer>:<p className='text-center fs-1 mt-5'>Effettua il Log-in per visualizzare la tua area-utente</p>}
    </div>
  )
}

export default AreaUtenteEsperto