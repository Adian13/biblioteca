import React,{useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import Footer from '../../components/Footer';

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon
}
from 'mdb-react-ui-kit';

import LoginForm from './LoginForm';
import Welcome from "./Welcome"

function Login(){

  useEffect(()=>{
    document.title="LogIn"
  },[])

return (
  <>
    <MDBContainer fluid className='p-5 background-radial-gradient overflow-hidden box ' >
      <MDBRow>
        <MDBCol md='6' className='pt-5  text-start d-flex flex-column justify-content-center'>
          <Welcome />
        </MDBCol>
        <MDBCol md='6' className='position-relative'>
          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
          <MDBCard className='my-5 pt-5 pb-5 bg-glass'>
            <MDBCardBody className='p-5'>
              <LoginForm/>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    <Footer/>
  </>
);
}

export default Login;