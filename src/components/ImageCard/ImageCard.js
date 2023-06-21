import React from 'react'
import { MDBRipple } from 'mdb-react-ui-kit';

import { fillingInfo } from './fillingInfo';
import { useNavigate } from 'react-router-dom';

const ImageCard = ({area}) => {
  const navigate = useNavigate();
  return (
    <MDBRipple rippleTag='div' className='bg-image hover-overlay hover-zoom hover-shadow' onClick={()=>navigate(fillingInfo[area].link)}>
      <img src={fillingInfo[area].source} />
        <div className='mask' style={{ backgroundColor: 'rgb(0,22,51,0.7)' }}>
            <div className='d-flex justify-content-center align-items-center h-100 text-center'>
            <p className='fst-italic text-white mb-0'>{fillingInfo[area].text}</p>
            </div>
        </div>
    </MDBRipple>
  )
}

export default ImageCard