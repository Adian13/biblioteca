import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import Search from '../../components/Search';
import axios from "axios";
import { MDBTable, MDBTableHead, MDBTableBody, MDBContainer, MDBRow,  MDBBtn, MDBIcon, MDBCol } from 'mdb-react-ui-kit';
import LibriModal from '../../components/LibriModal';
import useAuth from"../../contexts/useAuth";
import { useNavigate, useParams } from 'react-router-dom';
import config from '../../config';

const BookList = () => {

    const [libri,setLibri] = useState([]);
    const [modalData, setModalData] = useState(null);
    const [listaBiblioteche, setListaBiblioteche] = useState([]);
    const [show, setShow] = useState(false);
    const {state: { utente } } = useAuth();
    const navigate = useNavigate();
    const {biblioteca} =useParams();

    useEffect(() => {
        if(biblioteca){
            async function fetchData(){
                const result=await axios.get("http://"+config.ip+":"+config.port+"/prenotazione-libri/ricerca", {params:{"stringa": biblioteca, "filtro": "biblioteca"}});
                console.log("sono nel primo if", result.data)
                setLibri(result.data);
            }
            fetchData(); 
            
        }else{
            async function fetchData(){
                const result = await (axios.get("http://"+config.ip+":"+config.port+"/prenotazione-libri"));
                console.log("result",result.data)
                setLibri(result.data);
            }
            fetchData();  
        }
              
             
    }, [])

    const showModal= async(modalData)=>{
        console.log("modalData",modalData)

        const result = await (axios.get("http://"+config.ip+":"+config.port+"/prenotazione-libri/"+modalData.id+"/visualizza-libro"));
        console.log("lista biblioteche",result.data)
        setListaBiblioteche(result.data);
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
                            <Search scope='libri' set={setLibri} URL={"http://"+config.ip+":"+config.port+"/prenotazione-libri/ricerca"}/>
                        </MDBCol>
                    </MDBRow>
                    {utente==="Biblioteca"&&
                    <MDBRow className='text-center mt-4'>
                        <div >
                           <MDBBtn id="FirstInserimentoLibriBtn" className='btn-dark btn-rounded btn-lg ' style={{backgroundColor:"#004AAD"}} type='button' onClick={()=>navigate("/InserimentoLibro")}>Inserisci un nuovo libro <br/>prenotabile dalla tua biblioteca</MDBBtn>
                        </div>
                    </MDBRow>}
                    <MDBRow className='mt-4'>
                        <MDBTable  striped hover borderColor="primary">
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
                                                <th scope='row'>{libro.immagineLibro ? <img width="100" height="150" style={{objectFit:"cover"}}  src={`data:image/png;base64,${libro.immagineLibro}`}/>: 'Immagine non disponibile'}</th>
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