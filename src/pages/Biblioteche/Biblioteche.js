import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import Search from '../../components/Search';
import BibliotecheModal from '../../components/BibliotecheModal';
import axios from "axios";
import config from '../../config';

import { MDBTable, MDBTableHead, MDBTableBody, MDBContainer, MDBRow,  MDBBtn, MDBIcon, MDBCol } from 'mdb-react-ui-kit';



const Biblioteche = () => {

    const [biblioteche, setBiblioteche] = useState([]);
    const [modalData, setModalData] = useState(null);
    const [show, setShow] = useState(false);


    useEffect(() => {
        async function fetchData(){

            const result = await (axios.get("http://"+config.ip+":"+config.port+"/biblioteca/visualizza-biblioteche"));
            console.log("biblioteche",result.data)
            setBiblioteche(result.data);
        }      
        fetchData();       
    }, [])

    const showModal= async(modalData)=>{

        const esperti = await axios.get("http://"+config.ip+":"+config.port+"/club-del-libro/visualizza-esperti-biblioteca",{params:{"emailBiblioteca":modalData.email}})
        const club = await axios.get("http://"+config.ip+":"+config.port+"/club-del-libro/visualizza-clubs-biblioteca",{params:{"emailBiblioteca":modalData.email}})

        modalData["listaEsperti"]=esperti.data;
        modalData["listaClub"]=club.data;
        console.log("modalData dopo elaborazione",modalData)
        setModalData(modalData);
        setShow(true);

    }

    return (
        <>
            <MDBContainer fluid className="p-0">
                <NavBar  />
                {modalData && <BibliotecheModal {...modalData} show={show} setShow={setShow} />}
                <MDBRow className='me-4 ms-4'>
                    <MDBRow className='mt-5'>
                        <MDBCol size='7'>
                            <Search scope='biblioteche' set={setBiblioteche} URL={"http://"+config.ip+":"+config.port+"/biblioteca/ricerca"}/>
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
            <MDBRow className='pt-5'>
                <Footer />
            </MDBRow>

        </>
    );
}

export default Biblioteche;