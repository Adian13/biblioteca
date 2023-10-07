import React, {useState, useEffect} from 'react'
import { MDBInput, MDBRow,MDBCol,MDBBtn,MDBInputGroup,MDBCard,MDBCardBody,MDBIcon } from 'mdb-react-ui-kit';
import useAuth from"../../contexts/useAuth";
import axios from "axios";
import config from "../../config"


const InserimentoManuale = ({listaGeneri}) => {

    const [libro,setLibro] = useState({titolo:'',isbn:'', autore:'',descrizione:'',casaEditrice:'',annoPubblicazione:'', generi:[], quantita: "",copertina:""})
    const {state: { token } } = useAuth();
    const[scelta,setScelta]=useState();
    const [generi,setGeneri]=useState()
    const [generiScelti,setGeneriScelti]=useState([]);

    useEffect(() => {
        setGeneri([...listaGeneri])    
    }, [listaGeneri])
    
    const modificaLista=(mod,val)=>{
        if (mod=="aggiungi"){
            
            var temp=generi;
            var filtered=temp.filter((value)=>{return value.nome!=scelta})
            setGeneri(filtered)
            setGeneriScelti([...generiScelti,scelta])
            const select=document.getElementById("selectManuale")
            console.log("sono dentro aggiungi",select)
            select[0].selected=true
        }else{
            var temp=generiScelti;
            var filtered=temp.filter((value)=>{return value!=val})
            setGeneri([...generi,{nome:val,descrizione:""}])
            setGeneriScelti(filtered)
        }
    }

    const handleInputChange=(e)=>{
        const {name,value,files}=e.target;

        if (name==="generi"){
            setScelta(value)
        }else if (name==="copertina"){
            setLibro({...libro,[name]:files[0]})
        }
        else{
            setLibro({...libro,[name]:value})
        }

    }

    const ResetForm=()=>{
        setGeneriScelti([])
        setGeneri(listaGeneri)
        alert("libro inserito con successo")
        setLibro({titolo:'',isbn:'', autore:'',descrizione:'',casaEditrice:'',annoPubblicazione:'', generi:[], quantita: ""})

    }

    const handleSubmit=async(e)=>{
        //todo: eseguire i check

        console.log("copertina: ",libro.copertina)
        const formData = new FormData();
        formData.append("annoPubblicazione",libro.annoPubblicazione)
        formData.append("titolo",libro.titolo)
        formData.append("autore",libro.autore)
        formData.append("descrizione",libro.descrizione)
        formData.append("casaEditrice",libro.casaEditrice)
        formData.append("isbn",libro.isbn);
        formData.append("generi",generiScelti);
        formData.append("numCopie",libro.quantita);
        formData.append("copertina",libro.copertina);

        const AuthStr = 'Bearer '.concat(token);

        const response = await axios.post("http://"+config.ip+":"+config.port+"/biblioteca/inserimento-manuale/",formData,{ headers:{"Content-Type":"multipart/form-data", Authorization: AuthStr}})
        if(response.data.statusOk){
            ResetForm();
        }

    }

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
                    <MDBCol size='6'>
                        <MDBRow>
                            <label>Seleziona immagine di copertina: </label>
                        </MDBRow>
                        <MDBRow>
                            <input name="copertina" className='form-control mt-2' type='file' id='inputGroupFile02' accept="image/*" onChange={handleInputChange}/>
                        </MDBRow>
                    </MDBCol>
                    <MDBCol size='6' className='text-center'>
                    <MDBCard>
                        <MDBCardBody>
                            <MDBRow className='text-center'>
                                <label className='text-start mb-2' style={{color:"green","font-size":"100%"}}><b>Aggiungi generi</b></label>
                                <div className='text-center'>
                                <select name="generi" className='p-2' size="0" style={{width:"270px"}} id="selectManuale" onChange={handleInputChange}>
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
                                <label className='text-start mb-2 mt-2' style={{ color: "red", "font-size": "100%" }}><b>Rimuovi generi</b></label>

                                {generiScelti&& generiScelti.map((genere) => {
                                    return (
                                        <div className='text-center'>
                                            <label name="elimina" className="p-2 text-start" style={{ cursor: "pointer", border: "1px solid black", width: "270px" }}>{genere}</label>
                                            {/* inserire onclick per rimuovere generi */}
                                            <MDBBtn className='mx-2' tag='a' color='danger' floating onClick={() => { modificaLista("elimina", genere) }}>
                                                <MDBIcon fas icon='times' />
                                            </MDBBtn>
                                        </div>
                                    )
                                })}
                            </MDBRow>
            </MDBCardBody>
                    </MDBCard>
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
  


export default InserimentoManuale