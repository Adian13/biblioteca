import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import Search from '../../components/Search';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody, MDBContainer, MDBRow,  MDBBtn, MDBIcon, MDBCol } from 'mdb-react-ui-kit';

const ClubList = () => {
    const [clubs, setClubs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData(){

            const result = await (axios.get("http://localhost:8080/club-del-libro"));
            setClubs(result.data);
        }      
        fetchData();       
    }, [])

  return (
    <>
        <MDBContainer fluid className="p-0">
            <NavBar  />
            <MDBRow className='me-4 ms-4 mt-5'>
            <MDBCol size='7'>
                <Search scope='club' set={setClubs} URL="http://localhost:8080/club-del-libro"/>
            </ MDBCol>
                <MDBRow>
                    <MDBTable className='mt-3' striped hover borderColor="primary">
                        <MDBTableHead style={{ backgroundColor: '#38B6FF' }}>
                            <tr className="text-uppercase fs-5 fw-bold font-monospace">
                                <th scope='col'>Copertina</th>
                                <th scope='col'>Nome</th>
                                <th scope='col'>Descrizione</th>
                                <th scope='col'>Generi</th>
                                <th scope='col'>Esperto</th>
                                <th className='text-center' scope='col'>Iscritti</th>
                                <th scope='col'>Visualizza</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody >
                            {clubs.length===0 &&
                                <tr >
                                    <td colSpan={7} className='text-center'>Nessun club da mostrare</td>
                                </tr>
                            }
                            {
                                clubs.map((club) => {
                                    return (
                                        <tr>
                                            <th scope='row'>{club.immagineCopertina}</th>
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