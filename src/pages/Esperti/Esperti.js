import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import Search from '../../components/Search';
import axios from "axios";
import { MDBTable, MDBTableHead, MDBTableBody, MDBContainer, MDBRow,  MDBBtn, MDBIcon, MDBCol } from 'mdb-react-ui-kit';

const Esperti = () => {
    const [esperti, setEsperti]=useState([]);
    useEffect(() => {
        async function getData(){
            const response =  await axios.get('http://localhost:8080/esperto/lista-esperti');
            console.log("generi",response.data)
            setEsperti(response.data)
        }      

        getData();

      }, []);
    
    
    return (
        <>
            <MDBContainer fluid className="p-0">
                <NavBar  />
                <MDBRow className='me-4 ms-4'>
                    <MDBRow className='mt-5'>
                        <MDBCol size='7'>
                            <Search scope='esperti' set={setEsperti} URL='http://localhost:8080/comunicazione-esperto/ricerca'/>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBTable className='mt-5' striped hover borderColor="primary">
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
                    </MDBRow>
                </MDBRow>
            </MDBContainer>
            <MDBRow className='pt-5'>
                <Footer />
            </MDBRow>
        </>
    );
}

export default Esperti