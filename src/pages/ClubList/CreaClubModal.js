import React, {useState,useEffect} from 'react';
import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalBody,
    MDBModalTitle,
    MDBIcon,
    MDBBtn,
    MDBInput,
    MDBTextArea
 } from 'mdb-react-ui-kit';
 import axios from 'axios';
 import config from '../../config';
 import useAuth from"../../contexts/useAuth";
 import {ValidateClub} from "./Validate";

const CreaClubModal = ({modalData,show,setShow}) => {

    const [club,setClub]=useState({nome:"",descrizione:"",generi:[],immagine:""});
    const [generi,setGeneri]=useState([]);
    const [idClub,setIdClub]=useState();
    const [modifica,setModifica]=useState(false)
    const {state: { token } } = useAuth();
    const [error,setError]=useState({nomeErr:false,descrizioneErr:false,immagineErr:false})

    useEffect(() => {
        async function fetchData(){
            const result = await axios.get("http://"+config.ip+":"+config.port+"/generi");
            setGeneri(result.data)
        }

        if(show){
            if(modalData!==null){
                console.log("modal ricevuti", modalData)
                setModifica(true)
                setIdClub(modalData.idClub)
                setClub({nome:modalData.nome,descrizione:modalData.descrizione,generi:[],immagine:modalData.immagineCopertina})
            }
            fetchData()
            
        }
        
    }, [show])


    const handleInputChange=(e)=>{
        const {name,value,files}=e.target;

        if (name==="generi"){
            e.target[e.target.selectedIndex].disabled=true;
            setClub({...club,[name]:[...club[name],e.target[e.target.selectedIndex].value]})
        }else if (name==="immagine"){
            console.log(files[0])
            setClub({...club,[name]:files[0]})
        }else{
            setClub({...club,[name]:value})
        }
    }

    const handleSubmitModifica=async()=>{

        const {state,error}=ValidateClub(club);
        if(!state){
            const formData = new FormData();
            formData.append("id",idClub);
            formData.append("nome",club.nome);
            formData.append("descrizione",club.descrizione);
            formData.append("generi",club.generi);
            formData.append("copertina",club.immagine);
            const AuthStr = 'Bearer '.concat(token);

            const response= await axios.post("http://"+config.ip+":"+config.port+"/club-del-libro/modifica",formData,{ headers:{"Content-Type":"multipart/form-data", Authorization: AuthStr}})
            if(response.data.statusOk){
                alert("club modificato");
                onClose()
            }else if(response.data.descrizione==="Richiesta non valida"){
                setError({...error,"immagineErr":true});
            }
        }else{
            setError(error);
        }
    }

    const handleSubmit=async()=>{

        const {state,error}=ValidateClub(club);
        if(!state){
            const formData = new FormData();
            formData.append("nome",club.nome);
            formData.append("descrizione",club.descrizione);
            formData.append("generi",club.generi);
            formData.append("immagineCopertina",club.immagine);
            const AuthStr = 'Bearer '.concat(token);

            const response= await axios.post("http://"+config.ip+":"+config.port+"/club-del-libro/crea/",formData,{ headers:{"Content-Type":"multipart/form-data", Authorization: AuthStr}})
            console.log("response",response.data)
            if(response.data.statusOk){
                alert("club creato");
                onClose()
            }else if(response.data.payload.descrizione==="Richiesta non valida"){
                setError({...error,immagineErr:true});
            }
        }else{
            setError(error);
        }
    }

    const ResetForm=()=>{
        const select=document.getElementById("selectform")
        select.selectedIndex=-1;
        for(let i=0;i<=generi.length;i++){
            if(i>0){ select[i].disabled=false}
        }
        setClub({nome:"",descrizione:"",generi:[],immagine:""})
        setModifica(false);

    }

    const onClose=()=>{
        ResetForm();
        setShow(false)
    }
    
  return (
    <MDBModal show={show} setShow={setShow} tabIndex='-1'>
        <MDBModalDialog size='xl'>
            <MDBModalContent>
            <MDBModalHeader>
                <MDBModalTitle> <MDBIcon fas icon="info-circle" size="lg" /><b className='ms-2'>{modalData?"Modifica del club "+modalData.nome:"Crea un nuovo club..."}</b></MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={onClose}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody style={{backgroundColor:"#E3F2FD"}}>
            <div className='container-fluid bd-example-row'>
                <label className='mt-2 mb-2 fs-4'><b>Inserisci i dati relativi al club</b></label>
                <div className='row mt-3'>
                    <div className='col-md-6'>
                        {error.nomeErr&&<label className='fs-10 mb-2 text-danger'>Nome non valido</label>}
                        <MDBInput style={{backgroundColor:"#FFFFFF"}} label='Nome' id='1' type='text' value={club.nome} name="nome" onChange={handleInputChange} />
                        {error.descrizionedErr&&<label className='fs-10 mb-2 text-danger'>Descrizione non valida</label>}
                        <MDBTextArea style={{backgroundColor:"#FFFFFF"}} className='mt-3' label='Descrizione' id='2' rows={3} value={club.descrizione} name="descrizione" onChange={handleInputChange}/>
                    </div>
                    <div className='col-md-6 text-center'>
                        <div className='row'>
                            <label className='mb-1'><b>Generi</b></label>
                        </div>
                        <select name="generi" id="selectform" required size="5" style={{height:"110px",width:"400px"}}onChange={handleInputChange}>
                            <option disabled>Seleziona uno o più generi</option>
                            {generi.map((genere)=>{
                                return(      
                                <option value={genere.nome}><b>{genere.nome}</b></option>)
                            })}
                        </select>
                    </div>
                    <div className='row mt-2'>
                        <label><b>Copertina</b></label>
                        {error.immagineErr&&<label className='fs-10 mb-2 text-danger'>Copertina non valida</label>}
                        <input name="immagine" className='form-control ms-4 mt-1' type='file' id='inputGroupFile02' accept="image/*" onChange={handleInputChange}/>
                    </div>
                    <div className='row mt-4 mb-3 text-center'>
                        <MDBBtn id="SubmitClubBtn" className='btn-dark btn-rounded btn-lg ms-2' style={{backgroundColor:"#004AAD"}} type='button' onClick={modifica?handleSubmitModifica:handleSubmit} >Invia dati</MDBBtn>
                    </div>
                </div>
            </div>
            </MDBModalBody>
            </MDBModalContent>
        </MDBModalDialog>
    </MDBModal>
  )
}

export default CreaClubModal