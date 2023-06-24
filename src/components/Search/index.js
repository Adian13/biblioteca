import React, {useState} from 'react';
import { MDBInputGroup, MDBRadio, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { fillingInfo } from './fillingInfo';
import axios from "axios";



const Search = ({scope,set,URL}) => {
  const [searchFilter,setSearchFilter]=useState(fillingInfo[scope].value1);
  const [searchValue,setSearchValue]= useState("");

  const getData= async()=>{
        if(scope==="club"){
          let i={}
          searchFilter==="generi"? i["generi"]=searchValue:i["citta"]=searchValue;
          const result= await axios.get(URL,{params:i});
          set(result.data);
          //i=null;
        }else{
          const result=await axios.get(URL, {params:{"stringa": searchValue, "filtro": searchFilter}});
          set(result.data);
        }

        

  }
  return (
    <>
        <h1 className='font-monospace fw-bold'>Ricerca</h1>
        <MDBInputGroup noBorder size='lg'>
          <input className='form-control' type='text' onChange={(e)=>setSearchValue(e.target.value)}/>
          <MDBBtn rippleColor='dark' style={{backgroundColor:"#004AAD"}} onClick={getData}> 
             <MDBIcon icon='search' />
          </MDBBtn> 
        </MDBInputGroup>
          <div className='mt-3 font-monospace' >
            <MDBRadio name='inlineRadio' id='inlineRadio1' value={fillingInfo[scope].value1} label={fillingInfo[scope].label1} onClick={(e)=>{setSearchFilter(e.target.value)}} defaultChecked inline />
            <MDBRadio name='inlineRadio' id='inlineRadio2' value={fillingInfo[scope].value2} label={fillingInfo[scope].label2} onClick={(e)=>{setSearchFilter(e.target.value)}} inline /> 
            { scope==='libri' &&
              <MDBRadio name='inlineRadio' id='inlineRadio3' value='biblioteca' label='Cerca per biblioteca' onClick={(e)=>{setSearchFilter(e.target.value)}} inline />  

            }
          </div>
    </>
  )
}

export default Search