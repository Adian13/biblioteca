import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import Search from '../../components/Search';
import Modal from '../../components/BibliotecheModal';
import axios from "axios";
import { MDBTable, MDBTableHead, MDBTableBody, MDBContainer, MDBRow,  MDBBtn, MDBIcon, MDBCol } from 'mdb-react-ui-kit';



const Biblioteche = () => {

    const [biblioteche, setBiblioteche] = useState([]);
    const [modalData, setModalData] = useState({});
    const [show, setShow] = useState(false);


    useEffect(() => {
        async function fetchData(){

            const result = await (axios.get("http://localhost:8080/biblioteca/visualizza-biblioteche"));
            console.log("biblioteche",result)
            setBiblioteche(result.data);
        }      
        fetchData();       
    }, [])

    const showModal=(modalData)=>{

        setModalData(modalData);
        setShow(true);

    }

    return (
        <>
            <MDBContainer fluid className="p-0">
                <NavBar  />
                <Modal {...modalData} show={show} setShow={setShow} />
                <MDBRow className='me-4 ms-4'>
                    <MDBRow className='mt-5'>
                        <MDBCol size='7'>
                            <Search scope='biblioteche' set={setBiblioteche} URL="http://localhost:8080/biblioteca/ricerca"/>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBTable className='mt-5' striped hover borderColor="primary">
                            <MDBTableHead style={{ backgroundColor: '#38B6FF' }}>
                                <tr className="text-uppercase fs-5 fw-bold font-monospace">
                                    <th scope='col'>Nome</th>
                                    <th scope='col'>E-mail</th>
                                    <th scope='col'>Città</th>
                                    <th scope='col'>Indirizzo</th>
                                    <th scope='col' className='text-center'>Dettagli</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody >
                                {biblioteche.length===0 &&
                                <tr >
                                    <td colSpan={5} className='text-center'>Nessuna biblioteca da mostrare</td>
                                </tr>
                                }
                                {
                                    biblioteche.map((biblioteca) => {
                                        return (
                                            <tr>
                                                <th scope='row'>{biblioteca.nomeBiblioteca}</th>
                                                <td>{biblioteca.email}</td>
                                                <td>{biblioteca.citta}</td>
                                                <td>{biblioteca.via}</td>
                                                <td className='text-center'>
                                                <MDBBtn floating style={{ backgroundColor: '#004AAD' }} onClick={()=>{showModal(biblioteca)}}>
                                                    <MDBIcon fas icon="info-circle" size="lg" />
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
            <Footer/>

        </>
    );
}

export default Biblioteche;