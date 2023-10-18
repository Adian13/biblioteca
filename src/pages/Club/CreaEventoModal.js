import React, {useEffect,useState} from 'react';
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
 import { ValidateEvent } from './Validate';

const CreaEventoModal = ({modalData,show,setShow,idClub}) => {
    const [evento,setEvento]=useState({nome:"",descrizione:"",data:"",ora:"",idLibro:"",idEvento:0});
    const {state: { token } } = useAuth();
    const[error,setError]=useState({nomeErr:false,descrizioneErr:false,dataErr:false,libroErr:false});
    const[listaLibri,setListaLibri]=useState([])

    useEffect(() => {
        async function fetchData(){
            const result = await (axios.get("http://"+config.ip+":"+config.port+"/prenotazione-libri"));
            console.log("result",result.data)
            setListaLibri(result.data);
        }

        if(show&&modalData!=null){
            if(modalData.libro==null){modalData.libro=""}
            console.log("modalData",modalData)
            setEvento({...modalData,"ora":modalData.ora.substring(0,5)})
        }
        if (show){
            if(!modalData){
                setEvento({nome:"",descrizione:"",data:"",ora:"",idLibro:""})
            }
            setError({nomeErr:false,descrizioneErr:false,dataErr:false,libroErr:false})
            document.title="Crea-Modifica Evento"
            fetchData(); 
        }      
    }, [show])

    const handleSubmit=async()=> {

        const{state,error}=ValidateEvent(evento);
        if(!state){

            const formData = new FormData();
            console.log("evento",evento)
            formData.append("idClub",Number(idClub));
            formData.append("nome",evento.nome);
            formData.append("descrizione",evento.descrizione);
            formData.append("timeString",evento.ora);
            formData.append("dateString",evento.data);
            if(evento.idLibro!=""){
                formData.append("idLibro",Number(evento.idLibro));
            }
            const AuthStr = 'Bearer '.concat(token);
    
            const response= await axios.post("http://"+config.ip+":"+config.port+"/gestione-eventi/crea/",formData,{ headers:{Authorization: AuthStr}})
            console.log("risposta",response.data)
            if(response.data.statusOk){
                setEvento({nome:"",descrizione:"",data:"",ora:"",libro:""})
                onClose();
            }else if(response.data.payload.descrizione==="Data non valida"){
                setError({...error,dataErr:true})

            }else if(response.data.payload.descrizione==="Libro inserito non valido"){
                setError({...error,libroErr:true})
            }
        }else{
            setError(error);
        }
        

    }

    const handleSubmitModifica=async()=> {
        const{state,error}=ValidateEvent(evento);
        
        if(!state){
            const formData = new FormData();
            console.log("evento",evento)
            formData.append("idClub",Number(idClub));
            formData.append("idEvento",Number(evento.idEvento));
            formData.append("nome",evento.nome);
            formData.append("descrizione",evento.descrizione);
            formData.append("timeString",evento.ora);
            formData.append("dateString",evento.data);
            if(evento.libro!=""){
                formData.append("idLibro",Number(evento.libro));
            }
            
            const AuthStr = 'Bearer '.concat(token);
    
            const response= await axios.post("http://"+config.ip+":"+config.port+"/gestione-eventi/modifica/",formData,{ headers:{Authorization: AuthStr}})
            console.log("risposta",response.data)
            if(response.data.statusOk){
                setEvento({nome:"",descrizione:"",data:"",ora:"",libro:""})
                onClose() 
            }else if(response.data.payload.descrizione==="Data non valida"){
                setError({...error,dataErr:true})

            }else if(response.data.payload.descrizione==="Libro inserito non valido"){
                setError({...error,libroErr:true})
            }
        }else{
            setError(error);
        }

    }

    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        if (name==="idLibro"){
            setEvento({...evento,"idLibro":e.target[e.target.selectedIndex].value})
            console.log("evento",evento)
        }else{
            setEvento({...evento,[name]:value})
        }

    }

    const onClose=()=>{
        document.title="Informazioni Club"
        setShow(false)
    }
       
  return (
    <MDBModal show={show} setShow={setShow} tabIndex='-1'>
        <MDBModalDialog size='xl'>
            <MDBModalContent>
            <MDBModalHeader>
                <MDBModalTitle> <MDBIcon fas icon="info-circle" size="lg" /><b className='ms-2'>{modalData?"Modifica i dati dell'evento":"Crea un nuovo evento"}</b></MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={()=>{onClose()}}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody style={{backgroundColor:"#E3F2FD"}}>
            <div className='container-fluid bd-example-row'>
                <label className='mt-2 mb-2 fs-4'><b>Inserisci i dati relativi all'evento</b></label>
                <div className='row mt-3'>
                    <div className='col-md-6'>
                        {error.nomeErr&&<label className='fs-10 mb-2 text-danger'>Nome non valido</label>}
                        <MDBInput name="nome" style={{backgroundColor:"#FFFFFF"}} label='Nome' id='1' type='text' value={evento.nome} onChange={handleInputChange}/>
                        {error.descrizioneErr&&<label className='fs-10 mb-2 text-danger'>Descrizione non valida</label>}
                        <MDBTextArea style={{backgroundColor:"#FFFFFF"}} name="descrizione" className='mt-3' label='Descrizione' id='2' rows={3} value={evento.descrizione} onChange={handleInputChange}/>
                    </div>
                    <div className='col-md-6 text-center'>
                        {error.dataErr&&<label className='fs-10 mb-2 text-danger text-strt'>Data non valida</label>}
                        <MDBInput style={{backgroundColor:"#FFFFFF"}} name="data" label='Data' id='3' type='date' value={evento.data} onChange={handleInputChange}/>
                        <MDBInput style={{backgroundColor:"#FFFFFF"}} name="ora" label='Ora' id='4' type='time' className='mt-3' value={evento.ora} onChange={handleInputChange}/>
                        {error.libroErr&&<label className='fs-10 mb-2 text-danger'>Libro non valido</label>}
                        <select id="selectLibri" name="idLibro" className="form-select form-select-lg mt-3" aria-label=".form-select-lg example" required onChange={handleInputChange}>
                            <option disabled selected>Seleziona un libro</option>
                            {listaLibri&&listaLibri.map((libro)=>{
                                return(
                                <option value={libro.id}>{libro.titolo}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='row mt-4 mb-3 text-center'>
                        <MDBBtn id="sendDataBtnE"className='btn-dark btn-rounded btn-lg ms-2' style={{backgroundColor:"#004AAD"}} type='button' onClick={modalData?handleSubmitModifica:handleSubmit}>Invia dati</MDBBtn>
                    </div>
                </div>
            </div>
            </MDBModalBody>
            </MDBModalContent>
        </MDBModalDialog>
    </MDBModal>
  )
}


export default CreaEventoModal;