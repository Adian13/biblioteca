import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Search from '../../components/Search';
import axios from "axios";
import useAuth from"../../contexts/useAuth";
import Modal from '../../components/CreaClubModal';
import { useNavigate } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody, MDBContainer, MDBRow,  MDBBtn, MDBIcon, MDBCol } from 'mdb-react-ui-kit';

const ClubList = () => {

    const [clubs, setClubs] = useState([]);
    const navigate = useNavigate();
    const {state: { utente,email } } = useAuth();
    const [modalData, setModalData] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        async function fetchData(){

            const result = await (axios.get("http://localhost:8080/club-del-libro"));
            setClubs(result.data);
        }      
        fetchData();

    }, [])

    const showModal= async(modalData)=>{

        setModalData(modalData);
        setShow(true);
    }

  return (
    <>
        <Modal modalData={modalData} show={show} setShow={setShow}  /> 
        <MDBContainer fluid className="p-0">
            <NavBar  />
            <MDBRow className='me-4 ms-4 mt-5'>
            <MDBCol size='7'>
                <Search scope='club' set={setClubs} URL="http://localhost:8080/club-del-libro"/>
            </ MDBCol>
            {utente==="Esperto"&&
                <MDBCol className='d-flex align-items-center justify-content-center' size='5'>
                    <MDBBtn className='btn-dark btn-rounded btn-lg mt-2 d-flex align-items-center' style={{backgroundColor:"#004AAD"}} type='button' onClick={()=>{showModal(null)}}> <MDBIcon className='me-2 shadow' size="2x" fas icon="plus-circle" />Crea un nuovo club del libro</MDBBtn>

                </MDBCol>
            }
                <MDBRow>
                    <MDBTable className='mt-5' striped hover borderColor="primary">
                        <MDBTableHead style={{ backgroundColor: '#38B6FF' }}>
                            <tr className="text-uppercase fs-5 fw-bold font-monospace">
                                <th scope='col'>Copertina</th>
                                <th scope='col'>Nome</th>
                                <th scope='col'>Descrizione</th>
                                <th scope='col'>Generi</th>
                                <th scope='col'>Esperto</th>
                                <th className='text-center' scope='col'>Iscritti</th>
                                <th className='text-center' scope='col'>Visualizza</th>
                                {utente==="Esperto"&&<th className='text-center' scope='col'>Modifica</th>}
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody >
                            {clubs===null &&
                                <tr >
                                    <td colSpan={7} className='text-center'>Nessun club da mostrare</td>
                                </tr>
                            }
                            {
                                clubs.map((club) => {
                                    return (
                                        <tr>
                                            <th scope='row'>{}</th>
                                            <td>{club.nome}</td>
                                            <td>{club.descrizione}</td>
                                            <td>
                                                <div>
                                                    {
                                                        club.generi.map((genere =>{
                                                            return(
                                                                <p key={genere}>{genere}</p>
                                                            )
                                                        }))
                                                    }
                                                </div>
                                            </td>
                                            <td>{club.nomeEsperto}</td>
                                            <td className='text-center'>{club.iscritti}</td>
                                            <td className=' text-center'>
                                            <MDBBtn floating style={{ backgroundColor: '#004AAD' }} onClick={()=>navigate("/clubDelLibro/"+club.idClub)}>
                                                <MDBIcon fas icon="search" size="lg" />
                                            </MDBBtn>
                                            </td>
                                            {utente==="Esperto"&&
                                                <td className=' text-center'>
                                                     {email===club.email&& 
                                                        <MDBBtn floating style={{ backgroundColor: '#004AAD' }} onClick={()=>{showModal(club)}}>
                                                            <MDBIcon fas icon="search" size="lg" />
                                                        </MDBBtn>
                                                     }
                                                </td>
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </MDBTableBody>
                    </MDBTable>
                </MDBRow>
            </MDBRow>
        </MDBContainer>
        <MDBRow className='pt-5'>
            <Footer />
        </MDBRow>
    </>
);
}

export default ClubList