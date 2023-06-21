import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import Search from '../../components/Search';
import axios from "axios";
import Modal from '../../components/LibiModal';
import { MDBTable, MDBTableHead, MDBTableBody, MDBContainer, MDBRow,  MDBBtn, MDBIcon, MDBCol } from 'mdb-react-ui-kit';

const BookList = () => {

    const [libri,setLibri] = useState([]);
    const [modalData, setModalData] = useState({});
    const [show, setShow] = useState(false);

    useEffect(() => {
        async function fetchData(){

            const result = await (axios.get("http://localhost:8080/prenotazione-libri"));
            console.log("libri",result.data)
            setLibri(result.data);
        }      
        fetchData();       
    }, [])

    const showModal=(modalData)=>{
        console.log("modal:",modalData.casaEditrice)
        setModalData({"idLibro":modalData.idLibro,"titolo":modalData.titolo,"descrizione":modalData.descrizione,"isbn":modalData.isbn,"autore":modalData.autore});
        setShow(true);

    }

    return (
        <>
             <Modal {...modalData} show={show} setShow={setShow} />   
            <MDBContainer fluid className="p-0">
                <NavBar  />
                
                <MDBRow className='me-4 ms-4'>
                    <MDBRow className='mt-5'>
                        <MDBCol size='7'>
                            <Search scope='libri'/>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBTable className='mt-5' striped hover borderColor="primary">
                            <MDBTableHead style={{ backgroundColor: '#38B6FF' }}>
                                <tr className="text-uppercase fs-5 fw-bold font-monospace">
                                    <th scope='col'>Copertina</th>
                                    <th scope='col'>Titolo</th>
                                    <th scope='col'>Generi</th>
                                    <th className="text-center"scope='col'>Visualizza o prenota</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody >
                                {
                                    libri.map((libro) => {
                                        return (
                                            <tr>
                                                <th scope='row'><img>{libro.immagineLibro}</img></th>
                                                <td>{libro.titolo}</td>
                                                <td>{libro.generi}</td>
                                                <td className='d-flex justify-content-center'>
                                                <MDBBtn floating style={{ backgroundColor: '#004AAD' }} onClick={()=>{showModal(libro)}}>
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

export default BookList