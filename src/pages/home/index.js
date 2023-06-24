import React from 'react'
import NavBar from '../../components/NavBar';
import Card from '../../components/ImageCard/ImageCard';
import Footer from '../../components/Footer';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';


const HomePage = () => {
  return (
    <>
    <NavBar />
    <MDBContainer fluid className='d-flex justify-content-center mt-4' >

        <MDBRow className=' gx-2 ms-2'>
          <MDBCol md='3'>
            <Card area="biblioteche"/>
          </MDBCol>
          <MDBCol md='3'>
            <Card area="clubs"/>
          </MDBCol>
          <MDBCol md='3'>
            <Card area="esperti"/>
          </MDBCol>
          <MDBCol md='3'>
            <Card area="prenotazioni"/>
          </MDBCol>
        </MDBRow>
    </MDBContainer>
    <MDBRow className='pt-4'>
        <Footer />
    </MDBRow>

    </>



  )
}

export default HomePage