import React from 'react';
import { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBRadio,
  MDBBtnGroup,
  MDBInput
}
from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';


function App() {
  const [utente, setUtente] = useState("utente");
  const navigate = useNavigate();


  return (
    // style={{height:'100vh'}}
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'  >
      <MDBRow >
        <div onClick={()=>{navigate("/")}} className='d-flex align-items-center justify-content-center mt-3'>
          <img 
                src='biblionet.png'
                height='100'
                width='100'
                alt='logo'
              />
              <img
            src='logoText.png'
            height='50'
            alt='logoText'
          />
        </div>
      </MDBRow>
      <MDBRow className='mt-3'> 
        <MDBCardGroup >
        {/* <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
        <div id="radius-shape-2" className="position-absolute shadow-5-strong" ></div> */}
          <MDBCard className='my-3 bg-glass'>
            <MDBCardBody className='p-5 '>
              <div className='text-start '>
                <p className="fw-bold font-monospace">REGISTRATI COME:</p>
              </div>
              <div>
                <MDBBtn onClick={()=>{setUtente("utente")}}>Utente</MDBBtn>
                <MDBBtn className="ms-2" onClick={()=>{setUtente("bibliotecaio")}}>Bibliotecaio</MDBBtn>
                <MDBBtn className="ms-2" onClick={()=>{setUtente("esperto")}}>Esperto</MDBBtn>
              </div>
              {/* <div className='ms-5' onChange={(e) => setUtente(e.target.value)}>
                <MDBRadio btn id='btn-radio' name='options' wrapperTag='span' label='Utente' value='utente' />
                <MDBRadio btn id='btn-radio2' name='options' wrapperTag='span' label='Bibliotecaio' value='bibliotecaio'/>
                <MDBRadio btn id='btn-radio3' name='options' wrapperTag='span' label='Esperto' value='esperto' />
              </div> */}
              <hr/>
              <MDBInput type="text" wrapperClass='mb-4' label='Indirizzo email' disabled={!utente}/>
              <MDBInput type="text" wrapperClass='mb-4' label={utente==='bibliotecaio'?'Nome biblioteca':'Username'} disabled={!utente}/>
              <MDBInput type="text" wrapperClass='mb-4' label='Password' disabled={!utente}/>
              <MDBInput type="text" wrapperClass='mb-4' label='Conferma password' disabled={!utente}/>
            </MDBCardBody>
          </MDBCard>
          <MDBCard className='my-3 bg-glass'>
            <MDBCardBody className='p-5'>
              <div className='text-start '>
                <p className="fw-bold font-monospace">DATI ANAGRAFICI:</p>
              </div>
              <hr/>
              {
                utente!='bibliotecaio'&&
                <>
                  <MDBInput type="text" wrapperClass='mb-4' label='Nome' disabled={!utente}/>
                  <MDBInput type="text" wrapperClass='mb-4' label='Cognome' disabled={!utente}/>
                </>
              }
              <MDBInput type="text" wrapperClass='mb-4' label='Provincia' disabled={!utente}/>
              <MDBInput type="text" wrapperClass='mb-4' label='Città' disabled={!utente}/>
              <MDBInput type="text" wrapperClass='mb-4' label='Via' disabled={!utente}/>
              <MDBInput type="text" wrapperClass='mb-4' label='Recapito telefonico' disabled={!utente}/>
              {utente==='esperto'&&<MDBInput type="text" wrapperClass='mb-4' label='Lavora in'/>}

            </MDBCardBody>
          </MDBCard>
        </MDBCardGroup>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;