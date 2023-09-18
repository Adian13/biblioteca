import React, {useState} from 'react'
import { MDBInput, MDBRow,MDBCol,MDBBtn,MDBInputGroup, } from 'mdb-react-ui-kit';
import useAuth from"../contexts/useAuth";
import axios from "axios";
import config from "../config"


const InserimentoLibriForm = ({scope,generi}) => {

    const [libro,setLibro] = useState({titolo:'',isbn:'', autore:'',descrizione:'',casaEditrice:'',annoPubblicazione:'', generi:[], quantita: "",copertina:""})
    const {state: { token } } = useAuth();
    
    

    const handleInputChange=(e)=>{
        const {name,value,files}=e.target;

        if (name==="generi"){
            e.target[e.target.selectedIndex].disabled=true;
            setLibro({...libro,[name]:[...libro[name],e.target[e.target.selectedIndex].value]})
        }else if (name==="copertina"){
            
            const fileReader = new FileReader();
            // fileReader.readAsDataURL(files[0]);
            // console.log("immagine64: ",fileReader.result)
            setLibro({...libro,[name]:files[0]})

        }
        else{
            setLibro({...libro,[name]:value})
        }

    }

    const ResetForm=()=>{
        const select=document.getElementById("form2")
        select.selectedIndex=-1;
        for(let i=0;i<=generi.length;i++){
            if(i>0){ select[i].disabled=false}
        }
        setLibro({titolo:'',isbn:'', autore:'',descrizione:'',casaEditrice:'',annoPubblicazione:'', generi:[], quantita: ""})

    }

    const handleSubmit=async(e)=>{
        //todo: eseguire i check
        if(scope=="isbn"){

            const formData = new FormData();
            console.log("libro ricevuto",libro)
            formData.append("isbn",libro.isbn);
            formData.append("generi",libro.generi);
            formData.append("numCopie",libro.quantita);
            const AuthStr = 'Bearer '.concat(token);

            const eventi = await axios.post("http://"+config.ip+":"+config.port+"/biblioteca/inserimento-isbn/",formData,{ headers:{ Authorization: AuthStr}})
            ResetForm();
        }else if (scope=="man"){
            console.log("copertina: ",libro.copertina)
            const formData = new FormData();
            formData.append("annoPubblicazione",libro.annoPubblicazione)
            formData.append("titolo",libro.titolo)
            formData.append("autore",libro.autore)
            formData.append("descrizione",libro.descrizione)
            formData.append("casaEditrice",libro.casaEditrice)
            formData.append("isbn",libro.isbn);
            formData.append("generi",libro.generi);
            formData.append("numCopie",libro.quantita);
            formData.append("copertina",libro.copertina);

            const AuthStr = 'Bearer '.concat(token);

            const eventi = await axios.post("http://"+config.ip+":"+config.port+"/biblioteca/inserimento-manuale/",formData,{ headers:{"Content-Type":"multipart/form-data", Authorization: AuthStr}})
            ResetForm();
        }
    }

    if (scope=="isbn"){
        return (
            <>
            <div  className="square border border-primary border-2 rounded">
                <MDBRow className='m-5'>
                    <MDBCol size='4'>
                        <MDBInput label='ISBN' name="isbn" id='form1' type='text' size='lg' value={libro.isbn} onChange={handleInputChange} />
                    </MDBCol>
                    <MDBCol size='4'>
                        <select name="generi" id="form2" required size="5" onChange={handleInputChange}>
                            <option disabled>Seleziona uno o più generi</option>
                            {generi.map((genere)=>{
                                return(      
                                <option value={genere.nome}><b>{genere.nome}</b></option>)
                            })}
                        </select>
                    </MDBCol>
                    <MDBCol size='4'>
                        <MDBInput name="quantita" label='Numero di copie' id='form3' type='text' size='lg' value={libro.quantita} onChange={handleInputChange}/>
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
    }else if (scope=="man"){
        return (
            <>
            <div  className="square border border-primary border-2 rounded">
            <MDBRow className='m-3'>
                <MDBCol size='6'>
                    <MDBInput  label='Titolo' name="titolo" value={libro.titolo} id='form5' type='text' size='lg' onChange={handleInputChange}/> 
                </MDBCol>
                <MDBCol size='6'>
                    <MDBInput  name="isbn" value={libro.isbn} label='ISBN' id='form6' type='text' size='lg' onChange={handleInputChange}/> 
                </MDBCol>
            </MDBRow>
            <MDBRow className='m-3'>
                <MDBCol size='6'>
                    <MDBInput  name="autore" value={libro.autore}label='Autore' id='form7' type='text' size='lg' onChange={handleInputChange}/> 
                </MDBCol>
                <MDBCol size='6'>
                    <MDBInput name="descrizione" value={libro.descrizione} label='Descrizione' id='form8' type='text' size='lg' onChange={handleInputChange}/> 
                </MDBCol>
            </MDBRow>
            <MDBRow className='m-3'>
                <MDBCol size='6'>
                    <MDBInput  name="casaEditrice" value={libro.casaEditrice}label='Casa Editrice' id='form7' type='text' size='lg' onChange={handleInputChange}/> 
                </MDBCol>
                <MDBCol size='6'>
                    <MDBInput  name="annoPubblicazione" value={libro.annoPubblicazione}label='Anno di pubblicazione' id='form8' type='text' size='lg' onChange={handleInputChange}/> 
                </MDBCol>
            </MDBRow>
            <MDBRow className='ms-4 me-3'>
                <MDBRow className='mt-3'>
                    <MDBCol size='8'>
                        <MDBInputGroup  textTag='label' >
                            <label>Seleziona immagine di copertina: </label>
                            <input name="copertina" className='form-control ms-4' type='file' id='inputGroupFile02' accept="image/*" onChange={handleInputChange}/>
                        </MDBInputGroup>
                    </MDBCol>
                    <MDBCol size='4' className='text-center'>
                    <select name="generi" id="form2" required size="5" onChange={handleInputChange}>
                            <option disabled>Seleziona uno o più generi</option>
                            {generi.map((genere)=>{
                                return(      
                                <option value={genere.nome}><b>{genere.nome}</b></option>)
                            })}
                        </select>
                    </MDBCol>

                     
                </MDBRow>
                <MDBRow className='mt-3 mb-4'>
                    <MDBInput  name="quantita" value={libro.quantita} label='Numero copie possedute' id='form11' type='text' size='lg' onChange={handleInputChange}/>
                </MDBRow>
            </MDBRow>
            </div>
            <MDBRow className='text-center mt-3 mb-2'>
                <div >
                <MDBBtn className='btn-dark btn-rounded btn-lg ' style={{backgroundColor:"#004AAD"}} type='button' onClick={(e)=>{handleSubmit(e)}} >Conferma</MDBBtn>
                </div>
            </MDBRow>
            </>
          )

    }
  
}

export default InserimentoLibriForm