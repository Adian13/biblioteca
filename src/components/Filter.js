import React from 'react'
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem,MDBRow,MDBCol,MDBContainer } from 'mdb-react-ui-kit';

const Filter = () => {
  return (
    <MDBContainer className='mt-4'>
        <MDBRow>
            <h1 className='font-monospace fw-bold ps-0'>Filtra per..</h1>
        </MDBRow>
        <MDBRow>
            <MDBCol size='1' className='ps-0'>
                <MDBDropdown >
                    <MDBDropdownToggle  className='me-1 btn-dark btn-rounded btn-lg' style={{backgroundColor:"#004AAD"}}>Generi</MDBDropdownToggle>
                    <MDBDropdownMenu>
                        <MDBDropdownItem link>Action</MDBDropdownItem>
                        <MDBDropdownItem link>Another action</MDBDropdownItem>
                        <MDBDropdownItem link>Something else here</MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
            </MDBCol>
            <MDBCol>
                <MDBDropdown>
                    <MDBDropdownToggle className='me-1 btn-dark btn-rounded btn-lg ms-3' style={{backgroundColor:"#004AAD"}}>Città</MDBDropdownToggle>
                    <MDBDropdownMenu>
                        <MDBDropdownItem link>Action</MDBDropdownItem>
                        <MDBDropdownItem link>Another action</MDBDropdownItem>
                        <MDBDropdownItem link>Something else here</MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
  )
}

export default Filter