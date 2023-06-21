import React, { useEffect } from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import useAuth from"../../contexts/useAuth";
import { useNavigate } from 'react-router-dom';

import {
  MDBBtn,
  MDBInput
}
from 'mdb-react-ui-kit';

// async function loginUser(credentials) {
//     return fetch('http://localhost:8080/autenticazione/login', {
//     method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(credentials)
//     })
//    }

function LoginForm({setta}){

const [email, setUserName] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();

const { login,state: {token,error} } = useAuth();

// const handleClick= ()=>{
//   const token = await loginUser({
//     email,
//     password
// });
// const json=await token.json();
// //token.json().then(resp => setToken(resp.data.token));
// setta(json.data.token);
// }

useEffect(() => {
  console.log("sono use effectcon tk ed errore", token, !error);
  if(!error & (token!=null)){
    console.log("sono nell'if")
    navigate("/");
   }
}, [token,error]);


return(
    <div>
      <MDBInput type="text" value={email} onChange={(e) => setUserName(e.target.value)} wrapperClass='mb-4' label='Email' id='form3'/>
      <MDBInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} wrapperClass='mb-4' label='Password' id='form4' />
      
      {error&&<p style={{color:"#FF0000"}}>Username o password errati</p>}
      <MDBBtn onClick= {()=>{ login(email,password)}} className='w-100 mb-4' size='md'>sign up</MDBBtn>
    </div>
);
}

export default LoginForm;