import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';

import { useState } from 'react';
import Welcome from "./Welcome"

// async function loginUser(credentials) {
//   // const params = new URLSearchParams();
//   // params.append('email','prova@gmail.it');
//   // params.append('password','prova');
//   // console.log("parametri:",params);
//   //const data = { 'email': "prova@gmail.it" , 'password':"password"};
//    fetch('http://localhost:8080/autenticazione/login', {
//     headers: {
//       //"Content-Type": "application/json",
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     mode: 'no-cors',  
//     method: 'POST',
//     body: data
//   })
   
//  }

async function loginUser(credentials) {
  return fetch('http://localhost:8080/autenticazione/login', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials)
  })
 }


function Login({setToken}){

const [email, setUserName] = useState('');
const [password, setPassword] = useState('');

const handleClick=async ()=>{
  debugger
  const token = await loginUser({
    email,
    password
});
// if (token){
//   const response=await token.json();
//   console.log(response);
// }
token.json().then(resp => console.log(resp));
  
  setToken(token);

} 

return (
  <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden box' style={{height:"100vh"}}>

    <MDBRow>

      <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
        <Welcome />
      </MDBCol>

      <MDBCol md='6' className='position-relative'>

        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

        <MDBCard className='my-5 bg-glass'>
          <MDBCardBody className='p-5'>

            <MDBInput type="text" value={email} onChange={(e) => setUserName(e.target.value)} wrapperClass='mb-4' label='Email' id='form3' />
            <MDBInput type="text" value={password} onChange={(e) => setPassword(e.target.value)} wrapperClass='mb-4' label='Password' id='form4' />

            <MDBBtn onClick= {handleClick} className='w-100 mb-4' size='md'>sign up</MDBBtn>

            <div className="text-center">

              <p>or sign up with:</p>

              <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='facebook-f' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='twitter' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='google' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='github' size="sm"/>
              </MDBBtn>

            </div>

          </MDBCardBody>
        </MDBCard>

      </MDBCol>

    </MDBRow>

  </MDBContainer>
);
}

export default Login;