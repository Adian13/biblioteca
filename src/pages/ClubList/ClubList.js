import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import Search from '../../components/Search';
import Filter from '../../components/Filter';
import axios from "axios";
import { MDBTable, MDBTableHead, MDBTableBody, MDBContainer, MDBRow,  MDBBtn, MDBIcon, MDBCol } from 'mdb-react-ui-kit';

const ClubList = () => {
    const [clubs, setClubs] = useState([{copertina:"gianni",nome:"giannini",descrizione:"giannaio",generi:"fantagianni",esperto:"gianni",iscritti:"solo gianni"}]);
  return (
    <>
        <MDBContainer fluid className="p-0">
            <NavBar  />
            <MDBRow className='me-4 ms-4'>
                <Filter/>
                <MDBRow>
                    <MDBTable className='mt-3' striped hover borderColor="primary">
                        <MDBTableHead style={{ backgroundColor: '#38B6FF' }}>
                            <tr className="text-uppercase fs-5 fw-bold font-monospace">
                                <th scope='col'>Copertina</th>
                                <th scope='col'>Nome</th>
                                <th scope='col'>Descrizione</th>
                                <th scope='col'>Generi</th>
                                <th scope='col'>Esperto</th>
                                <th scope='col'>Iscritti</th>
                                <th scope='col'>Visualizza</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody >
                            {
                                clubs.map((club) => {
                                    return (
                                        <tr>
                                            <th scope='row'>{club.copertina}</th>
                                            <td>{club.nome}</td>
                                            <td>{club.descrizione}</td>
                                            <td>{club.generi}</td>
                                            <td>{club.esperto}</td>
                                            <td>{club.iscritti}</td>
                                            <td className='d-flex justify-content-center'>
                                            <MDBBtn floating style={{ backgroundColor: '#004AAD' }}>
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
                <MDBRow className='pt-5'>
                    <Footer />
                </MDBRow>
            </MDBRow>
        </MDBContainer>
    </>
);
}

export default ClubList