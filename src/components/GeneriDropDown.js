import React, {useEffect, useState} from 'react'
import useAuth from"../contexts/useAuth";
import {
    MDBCol,
    MDBDropdown,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardHeader,
    MDBIcon,
    MDBBtn,
    MDBRow
  } from 'mdb-react-ui-kit';
import config from '../config';
import axios from 'axios';


const GeneriDropDown = ({generiUtente,aggiorna,setAggiorna}) => {
  const [generi,setGeneri]=useState([]);
  const[scelta,setScelta]=useState();
  const [generiDefinitivi,setGeneriDefinitivi]=useState([]);
  const {state: { token } } = useAuth();

  const modificaGeneri=async()=>{
    const formData = new FormData();
    console.log("generidef",generiDefinitivi)
    formData.append("generi",generiDefinitivi);
    const AuthStr = 'Bearer '.concat(token);

    const response = await axios.post("http://"+config.ip+":"+config.port+"/preferenze-di-lettura/modifica-generi",formData,{ headers: { Authorization: AuthStr } })
    if(response.data.statusOk){
      alert("genere inserito")
    }else{
      alert("impossibile aggiungere genere")
    }

  }

  const modificaLista=(mod,val)=>{
    if (mod=="aggiungi"){
      var temp=generi;
      var filtered=temp.filter((value)=>{return value.nome!=scelta})
      setGeneri(filtered)
      setGeneriDefinitivi([...generiDefinitivi,scelta])
      const select=document.getElementById("select_generi")
      select.selectedIndex=0;
    }else{
      var temp=generiDefinitivi;
      var filtered=temp.filter((value)=>{return value!=val})
      console.log("filtrata",filtered)
      console.log("generi",generi)
      setGeneri([...generi,{nome:val,descrizione:""}])
      setGeneriDefinitivi(filtered)
    }

  }

  const handleInputChange=(e)=>{
    const {value,name}=e.target;

    setScelta(value)

}

  useEffect(() => {
      async function fetchData(){
        console.log("generiUtente ricevuti",generiUtente)
          const result = await axios.get("http://"+config.ip+":"+config.port+"/generi");
          console.log("generi",result.data)
          setGeneriDefinitivi([...generiUtente])
          var generi=result.data.filter((value)=>{
            if(generiUtente.indexOf(value.nome)==-1){
              console.log("value",generiUtente.indexOf(value),value)
              return value;
            }
          })
          setGeneri(generi)}
      fetchData();      
  }, [])

  return (
    <MDBDropdown onHide={()=>{setAggiorna(!aggiorna)}}>
      <MDBDropdownToggle className=' btn-dark btn-rounded ' size="lg" style={{backgroundColor:"#001633"}}>Gestione generi</MDBDropdownToggle>
      <MDBDropdownMenu >
        <MDBCard alignment='center'>
            <MDBCardHeader style={{"font-size":"120%"}}><b><i>Gestisci i tui generi</i></b></MDBCardHeader>
            <MDBCardBody>
                <MDBRow>
                    <label className='text-start mb-2' style={{color:"green","font-size":"100%"}}><b>Aggiungi generi</b></label>
                    <div className='text-start'>

                    <select className='p-2' style={{width:"230px"}} id="select_generi" onChange={handleInputChange}>
                      <option disabled selected>Seleziona un genere</option>
                      {generi&&generi.map((genere)=>{
                        return(
                          <option value={genere.nome}>{genere.nome}</option>
                        )
                      })}
                    </select>
                    <MDBBtn className='mx-2' tag='a' color='success' floating onClick={()=>{modificaLista("aggiungi",null)}}>
                      <MDBIcon fas icon='check' />
                    </MDBBtn>

                    </div>
                   
                </MDBRow>
                <MDBRow>
                <label className='text-start mb-2 mt-2' style={{color:"red","font-size":"100%"}}><b>Rimuovi generi</b></label>
                
                      {generiDefinitivi&&generiDefinitivi.map((genere)=>{
                        return(
                          <div className='text-start'>
                            <label name="elimina" className="p-2 " style={{cursor: "pointer", border: "1px solid black", width:"230px"}}>{genere}</label>
                            {/* inserire onclick per rimuovere generi */}
                            <MDBBtn className='mx-2' tag='a' color='danger' floating onClick={()=>{modificaLista("elimina",genere)}}>
                              <MDBIcon fas icon='times' />
                            </MDBBtn>
                          </div>
                        )
                      })}   
                </MDBRow>
                <MDBRow className='mt-3'>
                  <MDBBtn className='btn-dark btn-rounded btn-lg ' style={{backgroundColor:"#38B6FF"}} type='button' onClick={modificaGeneri}> Conferma </MDBBtn>
                </MDBRow>
            </MDBCardBody>
        </MDBCard>
      </MDBDropdownMenu>
    </MDBDropdown>
  );

  
}

export default GeneriDropDown