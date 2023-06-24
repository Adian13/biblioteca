import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { MDBTable,
     MDBTableHead, 
    MDBTableBody, 
    MDBContainer, 
    MDBRow,  
    MDBBtn, 
    MDBIcon, 
    MDBCol,
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardGroup,
    MDBCardImage } from 'mdb-react-ui-kit';

const Club = () => {

    const {id} =useParams();
    const [info, setInfo] = useState(null);

    useEffect(() => {
        async function fetchData(){
            const result = await (axios.get("http://localhost:8080/club-del-libro/"+id));
            console.log("risultati", result)
            setInfo(result.data);
        }      
        fetchData();       
    }, [])

    return (
        <>
        <MDBContainer fluid className="p-0">
            <NavBar  />
            <MDBRow className='me-5 ms-5 mt-5'>
                {/* <MDBCard style={{ maxWidth: '540px' }}> */}
                {info&&
                <MDBCard className='shadow' >
                    {/* <MDBRow className='g-0'> */}
                    <MDBRow>
                        <MDBCol md='4' className='d-flex justify-content-center align-items-center'>
                            <MDBCardImage height="300" width="400" src='https://mdbootstrap.com/img/new/slides/017.webp'  alt='...' />
                        </MDBCol>
                        <MDBCol md='4'>
                            <MDBCardBody className='text-center mt-4'>
                            <MDBCardTitle className='mt-5'><h2><b>{info.nome}</b></h2></MDBCardTitle>
                            <MDBCardText className='mt-5'>
                            <h4><i>{info.descrizione}</i></h4>
                            </MDBCardText>
                            </MDBCardBody>
                        </MDBCol>
                        <MDBCol md='4'>
                            <MDBCardBody className='shadow mt-2 mb-2'>
                            <MDBCardTitle><h3><b>Informazioni</b></h3></MDBCardTitle>
                            <hr></hr>
                            <MDBCardText className='mt-4'>
                                <p><h6><MDBIcon fas icon="user-tie" /> esperto:</h6> <h4><b>{info.esperto["nome"]}</b></h4></p>
                                <p><h6><MDBIcon fas icon="at" /> email di contatto:</h6> <h4><b>{info.esperto["email"]}</b></h4></p>
                            </MDBCardText>
                            <MDBCardText className='mt-5'>
                            <large className='text-muted'>I nostri generi: {info.generi.map((genere)=>{return(<b>{genere} </b>)})}</large>
                            </MDBCardText>
                            </MDBCardBody>
                        </MDBCol>
                    </MDBRow>
                </MDBCard>}
            </MDBRow>
            <MDBRow className='me-5 ms-5 mt-5'>
                <MDBCardGroup>
                    <MDBCard>
                        <MDBCardBody>
                        <MDBCardTitle ><h3><b >Iscrizioni</b> <MDBBtn className='btn-dark btn-rounded btn-lg ms-3' style={{backgroundColor:"#004AAD"}}> Iscriviti</MDBBtn></h3></MDBCardTitle>
                        <hr></hr>
                        <MDBCardText>
                            <h5>Visualizza gli <a href className="text-decoration-none">iscritti</a> al club</h5>     
                        </MDBCardText>
                        <div className='text-center'></div>               
                        </MDBCardBody>
                    </MDBCard>
                    <MDBCard>
                        <MDBCardBody>
                        <MDBCardTitle><h3><b>Eventi</b></h3></MDBCardTitle>
                        <hr></hr>
                        <MDBCardText>
                            <h5>Visualizza gli <a href className="text-decoration-none">eventi</a> del club</h5>     
                        </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCardGroup>
            </MDBRow>
        </MDBContainer>
        <MDBRow className='pt-5'>
                <Footer />
        </MDBRow>
        
        </>
    )
}

export default Club