import React, { useState } from 'react';
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
import InserimentoLibriForm from '../../components/InserimentoLibriForm';

const InserimentoLibri = () => {
    
    const [tab, setTab] = useState('tab1');

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
                <MDBTabs className='mb-3 d-flex justify-content-center'>
                    <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={tab === 'tab1'}>
                        <MDBIcon fas icon="barcode" /> Inserisci per ISBN
                    </MDBTabsLink>
                    </MDBTabsItem>

                    <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={tab === 'tab2'}>
                        <MDBIcon far icon="folder-open" /> Inserisci dall'archivio
                    </MDBTabsLink>
                    </MDBTabsItem>

                    <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab3')} active={tab === 'tab3'}>
                        <MDBIcon far icon="edit" /> Inserisci manualmente
                    </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>
                <MDBTabsContent className='mb-3 mt-5 d-flex justify-content-center' >
                    <MDBTabsPane show={tab === 'tab1'}><InserimentoLibriForm scope="isbn"/></MDBTabsPane>
                    <MDBTabsPane show={tab === 'tab2'}><InserimentoLibriForm scope="archivio"/></MDBTabsPane>
                    <MDBTabsPane show={tab === 'tab3'}><InserimentoLibriForm scope="man"/></MDBTabsPane>
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