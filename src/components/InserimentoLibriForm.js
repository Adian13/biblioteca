import React, {useState} from 'react'
import { MDBInput, MDBRow,MDBCol,MDBBtn,MDBInputGroup, } from 'mdb-react-ui-kit';

const InserimentoLibriForm = ({scope}) => {

    const [libro,setLibro] = useState({
        isbn:'', generi:[], quantita:''
    })

    const handleChange=(e)=>{
        const {name,value}=e.target;
        if (name==="generi"){
            e.target[e.target.selectedIndex].disabled=true;
            setLibro({...libro,[name]:[...libro[name],e.target[e.target.selectedIndex].value]})
        }else{
            setLibro({...libro,[name]:value})
        }

    }

    const handleSubmit=(e)=>{
        //e.preventDefault();
        console.log(libro);
        if(libro.isbn&&libro.quantita&&libro.generi[1]){
            console.log("procedo a inviare")
        }
    }

    if (scope=="isbn"){
        return (
            <>
            <div  className="square border border-primary border-2 rounded">
                <MDBRow className='m-5'>
                    <MDBCol size='4'>
                        <MDBInput label='ISBN' name="isbn" id='form1' type='text' size='lg' value={libro.isbn} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol size='4'>
                        <select name="generi" id="form2" required size="5" onChange={handleChange}>
                            <option disabled>Seleziona uno o più generi</option>
                            <option value={"romanzo"}>Romanzo</option>
                            <option value={"giallo"}>Giallo</option>
                            <option value={"saggio"}>Saggio</option>
                            <option value={"poesie"}>Poesie</option>
                        </select>
                    </MDBCol>
                    <MDBCol size='4'>
                        <MDBInput name="quantita" label='Numero di copie' id='form3' type='text' size='lg' value={libro.quantita} onChange={handleChange}/>
                    </MDBCol>
                </MDBRow>
            </div>
            <MDBRow className='text-center mt-3 mb-2'>
                <div >
                <MDBBtn className='btn-dark btn-rounded btn-lg ' style={{backgroundColor:"#004AAD"}} type='button' onClick={(e)=>{handleSubmit(e)}}>Conferma</MDBBtn>
                </div>
            </MDBRow>
            </>
          )}else if (scope=="archivio"){
            return (
                <>
                <div  className="square border border-primary border-2 rounded mt-3">
                <MDBRow className='m-5'>
                    <MDBCol size='6'>
                        <label>Inserisci il titolo del libro</label>
                        <select name="idLibro" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" required>
                            {/* <th th:each="libro : ${listaLibri}">
                                <option th:text="${libro.titolo +', '+libro.autore}" th:value="${libro.idLibro}"></option>
                            </th> */}
                        </select>
                    </MDBCol>
                    <MDBCol size='6'>
                        <MDBInput className="mt-4" label='Numero di copie' id='form3' type='text' size='lg'/> 
                    </MDBCol>
                </MDBRow>
                </div>
                <MDBRow className='text-center mt-3 mb-2'>
                    <div >
                    <MDBBtn className='btn-dark btn-rounded btn-lg ' style={{backgroundColor:"#004AAD"}} type='button' >Conferma</MDBBtn>
                    </div>
                </MDBRow>
                </>
              )
    }else if (scope="man"){
        return (
            <>
            <div  className="square border border-primary border-2 rounded">
            <MDBRow className='m-3'>
                <MDBCol size='6'>
                    <MDBInput  label='Titolo' id='form5' type='text' size='lg'/> 
                </MDBCol>
                <MDBCol size='6'>
                    <MDBInput  label='ISBN' id='form6' type='text' size='lg'/> 
                </MDBCol>
            </MDBRow>
            <MDBRow className='m-3'>
                <MDBCol size='6'>
                    <MDBInput  label='Autore' id='form7' type='text' size='lg'/> 
                </MDBCol>
                <MDBCol size='6'>
                    <MDBInput  label='Descrizione' id='form8' type='text' size='lg'/> 
                </MDBCol>
            </MDBRow>
            <MDBRow className='m-3'>
                <MDBCol size='6'>
                    <MDBInput  label='Casa Editrice' id='form7' type='text' size='lg'/> 
                </MDBCol>
                <MDBCol size='6'>
                    <MDBInput  label='Anno di pubblicazione' id='form8' type='text' size='lg'/> 
                </MDBCol>
            </MDBRow>
            <MDBRow className='ms-4 me-3'>
                <MDBRow className='mt-3'>
                    <MDBInput  label='Casa Editrice' id='form9' type='text' size='lg'/> 
                </MDBRow>
                <MDBRow className='mt-3'>
                    <MDBInputGroup  textTag='label' >
                    <label>Seleziona immagine di copertina: </label>
                        <input className='form-control ms-4' type='file' id='inputGroupFile02' />
                    </MDBInputGroup>
                </MDBRow>
                <MDBRow className='mt-3 mb-4'>
                    <MDBInput  label='Numero copie possedute' id='form11' type='text' size='lg'/>
                </MDBRow>
            </MDBRow>
            </div>
            <MDBRow className='text-center mt-3 mb-2'>
                <div >
                <MDBBtn className='btn-dark btn-rounded btn-lg ' style={{backgroundColor:"#004AAD"}} type='button' >Conferma</MDBBtn>
                </div>
            </MDBRow>
            </>
          )

    }
  
}

export default InserimentoLibriForm