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
 import config from '../config';
 import useAuth from"../contexts/useAuth";

const CreaEventoModal = ({modalData,show,setShow,idClub}) => {
    const [evento,setEvento]=useState({nome:"",descrizione:"",data:"",ora:"",libro:""});
    const {state: { token } } = useAuth();

    useEffect(() => {
        console.log("modal data",modalData)
        if(show&&modalData!=null){
            if(modalData.libro==null){modalData.libro=""}
            setEvento({...modalData,"ora":modalData.ora.substring(0,5)})
        }      
    }, [show])

    const handleSubmit=async()=> {
        if(!modalData){
            const formData = new FormData();
            console.log("evento",evento)
            formData.append("idClub",idClub);
            formData.append("nome",evento.nome);
            formData.append("descrizione",evento.descrizione);
            formData.append("timeString",evento.ora);
            formData.append("dateString",evento.data);
            
            const AuthStr = 'Bearer '.concat(token);
    
            const response= await axios.post("http://"+config.ip+":"+config.port+"/gestione-eventi/crea",formData,{ headers:{Authorization: AuthStr}})
            console.log("risposta",response.data)
            if(response.data.statusOk){
                setEvento({nome:"",descrizione:"",data:"",ora:"",libro:""})
            }
        }else{
            const formData = new FormData();
            console.log("evento",evento)
            formData.append("idClub",idClub);
            formData.append("idEvento",idClub);
            formData.append("nome",evento.nome);
            formData.append("descrizione",evento.descrizione);
            formData.append("timeString",evento.ora);
            formData.append("dateString",evento.data);
            
            const AuthStr = 'Bearer '.concat(token);
    
            const response= await axios.post("http://"+config.ip+":"+config.port+"/gestione-eventi/modifica",formData,{ headers:{Authorization: AuthStr}})
            console.log("risposta",response.data)
            if(response.data.statusOk){
                setEvento({nome:"",descrizione:"",data:"",ora:"",libro:""})
            }

        }

    }

    const handleInputChange=(e)=>{
        const {name,value}=e.target;

        setEvento({...evento,[name]:value})
    }
    


    
  return (
    <MDBModal show={show} setShow={setShow} tabIndex='-1'>
        <MDBModalDialog size='xl'>
            <MDBModalContent>
            <MDBModalHeader>
                <MDBModalTitle> <MDBIcon fas icon="info-circle" size="lg" /><b className='ms-2'>{modalData?"Modifica i dati dell'evento":"Crea un nuovo evento"}</b></MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={()=>{setShow(false)}}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody style={{backgroundColor:"#E3F2FD"}}>
            <div className='container-fluid bd-example-row'>
                <label className='mt-2 mb-2 fs-4'><b>Inserisci i dati relativi all'evento</b></label>
                <div className='row mt-3'>
                    <div className='col-md-6'>
                        <MDBInput name="nome" style={{backgroundColor:"#FFFFFF"}} label='Nome' id='1' type='text' value={evento.nome} onChange={handleInputChange}/>
                        <MDBTextArea style={{backgroundColor:"#FFFFFF"}} name="descrizione" className='mt-3' label='Descrizione' id='2' rows={3} value={evento.descrizione} onChange={handleInputChange}/>
                    </div>
                    <div className='col-md-6 text-center'>
                        <MDBInput style={{backgroundColor:"#FFFFFF"}} name="data" label='Data' id='3' type='date' value={evento.data} onChange={handleInputChange}/>
                        <MDBInput style={{backgroundColor:"#FFFFFF"}} name="ora" label='Ora' id='4' type='time' className='mt-3' value={evento.ora} onChange={handleInputChange}/>
                        <MDBInput style={{backgroundColor:"#FFFFFF"}} name="libro" label='Libro associato' id='1' type='text' className='mt-3' value={evento.libro} onChange={handleInputChange}/>
                    </div>
                    <div className='row mt-4 mb-3 text-center'>
                        <MDBBtn className='btn-dark btn-rounded btn-lg ms-2' style={{backgroundColor:"#004AAD"}} type='button' onClick={handleSubmit}>Invia dati</MDBBtn>
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