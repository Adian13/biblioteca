import React, {useState} from 'react';
import useAuth from"../../contexts/useAuth";
import config from '../../config';
import axios from 'axios';
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
 import { ValidatePost } from './Validate';

const CreaPostModal = ({id,show,setShow}) => {
    const [post,setPost]=useState({titolo:"",content:""})
    const [error,setError]=useState({titoloErr:false,contentErr:false})
    const {state: { token } } = useAuth();

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setPost({...post,[name]:value})

    }

    const handleSubmit=async(e)=>{
        const{state,error}=ValidatePost(post);
        if(!state){
            const formData = new FormData();
            formData.append("titolo",post.titolo);
            formData.append("idClub",id);
            formData.append("content",post.content);
            const AuthStr = 'Bearer '.concat(token);
            console.log("post ricevuto",post.titolo, formData.titolo,formData["content"],formData.idClub,token)

            const response = await axios.post("http://"+config.ip+":"+config.port+"/post/crea",formData,{ headers:{ Authorization: AuthStr}})
            if(response.data.statusOk){

                setPost({titolo:"",content:""})
                setShow(false);
            }
        }else{
            setError(error)
        }
        
    }

    return (
        <MDBModal show={show} setShow={setShow} tabIndex='-1'>
            <MDBModalDialog size='xl'>
                <MDBModalContent>
                <MDBModalHeader>
                    <MDBModalTitle> <MDBIcon fas icon="info-circle" size="lg" /><b className='ms-2'>Crea un nuovo post</b></MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={()=>{setShow(false)}}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody style={{backgroundColor:"#E3F2FD"}}>
                <div className='container-fluid'>
                    <label className='mt-2 mb-2 fs-4'><b>Inserisci i dati relativi al post</b></label>
                    <div className='row mt-3'>
                        {error.titoloErr&&<label className='fs-10 mb-2 text-danger'>Titolo non valido</label>}
                        <div className='col-md-6'>
                            <MDBInput style={{backgroundColor:"#FFFFFF"}} label='Titolo' id='1' type='text' name="titolo" value={post.titolo} onChange={handleChange} />
                        </div>
                        {error.contentErr&&<label className='fs-10 mb-2 text-danger'>Contenuto non valido</label>}
                        <div className='col-md-6 text-center'>
                            <MDBTextArea style={{backgroundColor:"#FFFFFF"}}  label='Contenuto' id='2' rows={8} name="content" value={post.content} onChange={handleChange}/>

                        </div>
                        <div className='row mt-4 mb-3 text-center'>
                            <MDBBtn className='btn-dark btn-rounded btn-lg ms-2' style={{backgroundColor:"#004AAD"}} type='button' onClick={(e)=>{handleSubmit(e)}} id="InviaPostBtn11">Invia dati</MDBBtn>
                        </div>
                    </div>
                </div>
                </MDBModalBody>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
      )
}

export default CreaPostModal
