import React, {useState,useEffect} from 'react'
import { MDBInput, MDBRow,MDBCol,MDBBtn,MDBInputGroup,MDBCard,MDBCardHeader,MDBCardBody,MDBIcon } from 'mdb-react-ui-kit';
import useAuth from"../../contexts/useAuth";
import axios from "axios";
import config from "../../config"


const InserimentoIsbn = ({listaGeneri}) => {

    const [libro,setLibro] = useState({isbn:'', quantita: ""})
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
            const select=document.getElementById("select_generi")
            select.selectedIndex=0;
        }else{
            var temp=generiScelti;
            var filtered=temp.filter((value)=>{return value!=val})
            console.log("filtrata",filtered)
            console.log("generi",generi)
            setGeneri([...generi,{nome:val,descrizione:""}])
            setGeneriScelti(filtered)
        }
      }
    
    

    const handleInputChange=(e)=>{
        const {name,value,files}=e.target;

        if (name==="generi"){
            console.log("value",value)
            setScelta(value)
        }else{
            setLibro({...libro,[name]:value})
        }

    }

    const ResetForm=()=>{
        setLibro({isbn:'', quantita: ""})
        setGeneriScelti([])
        setGeneri(listaGeneri)
        alert("libro inserito con successo")

    }

    

    const handleSubmit=async(e)=>{
        //todo: eseguire i check
        const formData = new FormData();
        console.log("libro ricevuto",libro,generiScelti)
        formData.append("isbn",libro.isbn);
        formData.append("generi",generiScelti);
        formData.append("numCopie",libro.quantita);
        const AuthStr = 'Bearer '.concat(token);

        const response = await axios.post("http://"+config.ip+":"+config.port+"/biblioteca/inserimento-isbn/",formData,{ headers:{ Authorization: AuthStr}})
        console.log("response",response)
        if(response.data.statusOk){
            ResetForm();
        }
    }

    return (
        <>
        <div  className="square border border-primary border-2 rounded">
            <MDBRow className='m-5'>
                <MDBCol size='5'>
                    <MDBRow>
                        <MDBInput label='ISBN' name="isbn" id='form1' type='text' size='lg' value={libro.isbn} onChange={handleInputChange} />
                    </MDBRow>
                    <MDBRow className="mt-3">
                        <MDBInput  name="quantita" label='Numero di copie' id='form3' type='text' size='lg' value={libro.quantita} onChange={handleInputChange}/>
                    </MDBRow>
                </MDBCol>
                <MDBCol size='7' >
                    <MDBCard>
                        <MDBCardBody>
                            <MDBRow className='text-center'>
                                <label className='text-start mb-2' style={{color:"green","font-size":"100%"}}><b>Aggiungi generi</b></label>
                                <div className='text-center'>
                                <select name="generi" className='p-2' size="0" style={{width:"270px"}} id="select_generi" onChange={handleInputChange}>
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
        </div>
        <MDBRow className='text-center mt-3 mb-2'>
            <div >
            <MDBBtn className='btn-dark btn-rounded btn-lg ' style={{backgroundColor:"#004AAD"}} type='button' onClick={(e)=>{handleSubmit(e)}}>Conferma</MDBBtn>
            </div>
        </MDBRow>
        </>
        )
  
}

export default InserimentoIsbn