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

function LoginForm({setta}){

const [email, setUserName] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();

const { login,state: {token,error} } = useAuth();


useEffect(() => {
  if(!error & (token!=null)){
    navigate("/");
   }
}, [token,error]);


return(
    <div>
      <MDBInput type="text" value={email} onChange={(e) => setUserName(e.target.value)} wrapperClass='mb-4' label='Email' id='form3'/>
      <MDBInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} wrapperClass='mb-4' label='Password' id='form4' />
      
      {error&&<p style={{color:"#FF0000"}}>Username o password errati</p>}
      <MDBBtn onClick= {()=>{ login(email,password)}} className='w-100 mb-4' size='md' id="LogInBtn">sign up</MDBBtn>
    </div>
);
}

export default LoginForm;