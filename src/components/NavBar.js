import React from 'react'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBBtn,
    MDBNavbarItem,
    MDBDropdown, 
    MDBDropdownMenu, 
    MDBDropdownToggle, 
    MDBDropdownItem,
    MDBIcon
  } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import useAuth from"../contexts/useAuth";

const NavBar = () => {
  const navigate = useNavigate();
  const {logout,state: { token,utente } } = useAuth();

  const esci=()=>{
    logout();
    navigate('/')
  }
  return (
    // fixed='top'
      <MDBNavbar  className='shadow-5-strong'style={{ backgroundColor: '#001633' }}> 
        <MDBContainer fluid >
        <MDBNavbarBrand className='d-flex justify-content-start align-items-center' onClick={()=>navigate('/')}>
          <img
            src='..\..\biblionet.png'
            height='50'
            alt='logo'
          />
          <img
            src='..\..\logoText.png'
            height='50'
            alt='logoText'
          />
        </MDBNavbarBrand>
          {token?
          <>
          <MDBDropdown>
          <MDBDropdownToggle  className='me-1 btn-dark btn-rounded btn-lg' style={{backgroundColor:"#38B6FF"}} id="Dropdown"><MDBIcon className='me-1' fas icon="user" /></MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem  link childTag='button' onClick={()=>navigate('/areaUtente/'+utente)} id="AreaUtente">
              Area Utente
            </MDBDropdownItem>
            <MDBDropdownItem  link childTag='button' onClick={esci} >
              Log-out
            </MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
          </>:
          <MDBNavbarItem className='d-flex justify-content-end'>
            <MDBBtn className='me-1 btn-dark btn-rounded btn-lg' style={{backgroundColor:"#38B6FF"}} type='button' onClick={()=>navigate('/login')} id="Logging">log-in</MDBBtn>
            <MDBBtn className='btn-dark btn-rounded btn-lg' style={{backgroundColor:"#38B6FF"}} type='button' onClick={()=>navigate('/registrazione')} id="Registrazione">Registrati</MDBBtn>          
          </MDBNavbarItem>
          } 
        </MDBContainer>
      </MDBNavbar> 
  )
}

export default NavBar