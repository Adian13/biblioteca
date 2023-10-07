import React, {useState,useEffect} from 'react'
import { MDBInput, MDBRow,MDBCol,MDBBtn,MDBInputGroup, } from 'mdb-react-ui-kit';
import useAuth from"../../contexts/useAuth";
import axios from "axios";
import config from "../../config"


const InserimentoArchivio = ({generi}) => {

    const [libro,setLibro] = useState({titolo:'',quantita: ""})
    const[listaLibri,setListaLibri]=useState([])
    const {state: { token } } = useAuth();

    useEffect(() => {
        async function fetchData(){
            const result = await (axios.get("http://"+config.ip+":"+config.port+"/prenotazione-libri"));
            console.log("result",result.data)
            setListaLibri(result.data);
        }
        fetchData();   
    }, [])
    
    const handleInputChange=(e)=>{
        const {name,value}=e.target;

        if (name==="idLibro"){
            setLibro({...libro,"titolo":e.target[e.target.selectedIndex].value})
        }
        else{
            setLibro({...libro,[name]:value})
        }

    }

    const ResetForm=()=>{
        const select=document.getElementById("selectLibri")
        select.selectedIndex=0;
        setLibro({titolo:'',quantita: ""})
        alert("Libro inserito con successo")

    }

    const handleSubmit=async(e)=>{
        //todo: eseguire i check

            const formData = new FormData();
            console.log("libro ricevuto",libro)
            formData.append("idLibro",libro.titolo);
            formData.append("numCopie",libro.quantita);
            const AuthStr = 'Bearer '.concat(token);

            const response = await axios.post("http://"+config.ip+":"+config.port+"/biblioteca/inserimento-archivio/",formData,{ headers:{ Authorization: AuthStr}})
            console.log(response.data)
            if(response.data.statusOk){ResetForm()}
    }
    return (
        <>
        <div  className="square border border-primary border-2 rounded mt-3">
        <MDBRow className='m-5'>
            <MDBCol size='6'>
                <label>Inserisci il titolo del libro</label>
                <select id="selectLibri" name="idLibro" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" required onChange={handleInputChange}>
                    <option disabled selected>Seleziona un libro</option>
                    {listaLibri&&listaLibri.map((libro)=>{
                        return(
                        <option value={libro.id}>{libro.titolo}</option>
                    )
                    })}
                </select>
            </MDBCol>
            <MDBCol size='6'>
                <MDBInput name="quantita" value={libro.quantita} className="mt-4" label='Numero di copie' id='form3' type='text' size='lg' onChange={handleInputChange}/> 
            </MDBCol>
        </MDBRow>
        </div>
        <MDBRow className='text-center mt-3 mb-2'>
            <div >
            <MDBBtn className='btn-dark btn-rounded btn-lg ' style={{backgroundColor:"#004AAD"}} type='button' onClick={handleSubmit}>Conferma</MDBBtn>
            </div>
        </MDBRow>
        </>
        )
      
}

export default InserimentoArchivio