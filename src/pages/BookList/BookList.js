import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import Search from '../../components/Search';
import axios from "axios";
import { MDBTable, MDBTableHead, MDBTableBody, MDBContainer, MDBRow,  MDBBtn, MDBIcon, MDBCol } from 'mdb-react-ui-kit';
import LibriModal from '../../components/LibriModal';

const BookList = () => {

    const [libri,setLibri] = useState([]);
    const [modalData, setModalData] = useState(null);
    const [listaBiblioteche, setListaBiblioteche] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        async function fetchData(){
            const result = await (axios.get("http://localhost:8080/prenotazione-libri"));
            setLibri(result.data);
        }
              
        fetchData();       
    }, [])

    const showModal= async(modalData)=>{

        const result = await (axios.get("http://localhost:8080/prenotazione-libri/"+modalData.idLibro.toString()+"/visualizza-libro"));
        setListaBiblioteche(result.data)
        setModalData(modalData);
        setShow(true);
    }

    return (
        <>
             
            {modalData &&<LibriModal {...modalData} show={show} setShow={setShow} listaBiblioteche={listaBiblioteche} /> } 
            <MDBContainer fluid className="p-0">
                <NavBar/>
                
                <MDBRow className='me-4 ms-4'>
                    <MDBRow className='mt-5'>
                        <MDBCol size='7'>
                            <Search scope='libri' set={setLibri} URL="http://localhost:8080/prenotazione-libri/ricerca"/>
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
                            {libri.length===0 &&
                                <tr >
                                    <td colSpan={4} className='text-center'>Nessun libro da mostrare</td>
                                </tr>
                                }
                                {
                                    libri.map((libro) => {
                                        return (
                                            <tr>
                                                <th scope='row'><img>{libro.immagineLibro}</img></th>
                                                <td>{libro.titolo}</td>
                                                <td>
                                                    <div>
                                                        {
                                                            libro.generi.map((genere =>{
                                                                return(
                                                                    <p key={genere}>{genere}</p>
                                                                )
                                                            }))
                                                        }
                                                    </div>
                                                </td>
                                                <td className=' text-center'>
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
                </MDBRow>
            </MDBContainer>
            <MDBRow className='pt-5'>
                <Footer />
            </MDBRow>

        </>
    );
}

export default BookList