import React, { useState,useEffect } from 'react';
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBIcon,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardBody,
    MDBCol,
  } from 'mdb-react-ui-kit';
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import InserimentoArchivio from './InserimentoArchivio.js';
import InserimentoIsbn from './InserimentoIsbn.js';
import InserimentoManuale from"./InserimentoManuale.js";
import axios from "axios";
import config from '../../config';

const InserimentoLibri = () => {
    
    const [tab, setTab] = useState('tab1');
    const [generi,setGeneri]=useState([]);

    useEffect(() => {
        async function fetchData(){
            const result = await axios.get("http://"+config.ip+":"+config.port+"/generi");
            console.log("generi",result.data)
            setGeneri(result.data)}
        fetchData();
        document.title="Inserimento Libri";     
    }, [])

    const handleBasicClick = (value) => {
        if (value === tab) {
          return;
        }
        setTab(value);
      };
  
    return (
    <>
    <NavBar/>
    <MDBContainer fluid className='pb-5' style={{backgroundColor:"#E3F2FD"}}>
        
        <MDBRow className=' d-flex justify-content-center'>
        <MDBCol size='10'>
        <MDBCard className='ms-5 me-5 mt-5'>

            <MDBCardBody className='mt-2 p-0'>
                <MDBTabs id="TabsLibri" className='mb-3 d-flex justify-content-center'>
                    <MDBTabsItem>
                    <MDBTabsLink id="TabLinkIsbnLibri" onClick={() => handleBasicClick('tab1')} active={tab === 'tab1'}>
                        <MDBIcon fas icon="barcode" /> Inserisci per ISBN
                    </MDBTabsLink>
                    </MDBTabsItem>

                    <MDBTabsItem>
                    <MDBTabsLink id="TabLinkArchivioLibri" onClick={() => handleBasicClick('tab2')} active={tab === 'tab2'}>
                        <MDBIcon far icon="folder-open" /> Inserisci dall'archivio
                    </MDBTabsLink>
                    </MDBTabsItem>

                    <MDBTabsItem>
                    <MDBTabsLink id="TabLinkManualeLibri" onClick={() => handleBasicClick('tab3')} active={tab === 'tab3'}>
                        <MDBIcon far icon="edit" /> Inserisci manualmente
                    </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>
                <MDBTabsContent className='mb-3 mt-5 d-flex justify-content-center' >
                    <MDBTabsPane show={tab === 'tab1'}><InserimentoIsbn listaGeneri={generi}/></MDBTabsPane>
                    <MDBTabsPane show={tab === 'tab2'}><InserimentoArchivio /></MDBTabsPane> 
                    <MDBTabsPane show={tab === 'tab3'}><InserimentoManuale listaGeneri={generi}/></MDBTabsPane> 
                </MDBTabsContent>
            </MDBCardBody>
        </MDBCard>
        </MDBCol>
        </MDBRow>
    </MDBContainer>
    <Footer />   
    </>
  
    )
}

export default InserimentoLibri