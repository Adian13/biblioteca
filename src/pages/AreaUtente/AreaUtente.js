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
         MDBCardText} from 'mdb-react-ui-kit';

const AreaUtente = () => {
    const { login,state: {token,error} } = useAuth();
    const [datiUtente,setDatiUtente]=useState({});

    useEffect(() => {
        async function getData(){
            const AuthStr = 'Bearer '.concat(token);
            const response =  await axios.get('http://localhost:8080/area-utente', { headers: { Authorization: AuthStr } });
            setDatiUtente(response.data);
        }      

        getData();

      }, []);

  return (
    <>
    <NavBar/>
    <MDBContainer className='mt-3'>      
        <MDBRow>

            <MDBCol md='5'>
                <MDBCard className='mt-2'>
                <MDBCardBody>
                    <MDBCardTitle className='text-center'>Benvenuto</MDBCardTitle>

                    <MDBCardText>
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                    </MDBCardText>
                </MDBCardBody>
                </MDBCard>
            </MDBCol>

            <MDBCol md='7'>
            <MDBCard className='mt-2'>
                <MDBCardBody>
                    <MDBCardTitle className='text-start'>Informazioni account</MDBCardTitle>

                    <MDBCardText>

                    </MDBCardText>
                </MDBCardBody>
                </MDBCard>
            </MDBCol>

        </MDBRow>
    </MDBContainer>
    </>
  )
}

export default AreaUtente