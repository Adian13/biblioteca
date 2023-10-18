import React, {useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { MDBContainer,
MDBRow,
MDBIcon,
MDBBtn,
MDBCard,
MDBCardBody,
MDBCardFooter,
MDBCardImage,
MDBTextArea,
MDBCol } from 'mdb-react-ui-kit';
import config from '../../config';
import axios from 'axios';
import useAuth from"../../contexts/useAuth";


const CommentiPage = () => {
    const {id,idPost} =useParams();
    const [post,setPost]=useState({});
    const [comment,setComment]=useState([]);
    const [username,setUsername]=useState();
    const[newComment,setNewComment]=useState("");
    const[error,setError]=useState(false);
    const {state: { utente,token,email } } = useAuth();

    useEffect(() => {
        async function fetchData(){
            const AuthStr = 'Bearer '.concat(token);
            const formData=new FormData
            formData.append("idClub",id)
            formData.append("idPost",idPost)
            const formData2=new FormData
            formData2.append("idPost",idPost)

            const result = await (axios.post("http://"+config.ip+":"+config.port+"/post/visualizza-post",formData));
            const response= await (axios.post("http://"+config.ip+":"+config.port+"/post/visualizza-commenti",formData2));
            console.log("utente",utente)
            if ((utente==="Lettore")||(utente==="Esperto")){
                console.log("Utente not null")
                const info= await axios.post("http://"+config.ip+":"+config.port+'/'+utente.toLowerCase()+'/informazioni',{}, { headers: { Authorization: AuthStr } });
                console.log("info.data",info.data)
                setUsername(info.data.username)
            }
            console.log("Result.data",result.data)
            setPost(result.data)
            setComment([...response.data])
        }     

        fetchData();
        document.title="Post"

    }, [] )

    useEffect(()=>{
        async function fetchData(){
        const formData2=new FormData
        formData2.append("idPost",idPost)
        const response= await (axios.post("http://"+config.ip+":"+config.port+"/post/visualizza-commenti",formData2));
        console.log("comment",response.data)
        setComment([...response.data])}

        fetchData();

    },[newComment])

    const handleChange=(e)=>{
        setNewComment(e.target.value);
    }

    const handleSubmit= async()=>{

        if(newComment.length>1){
            const formData=new FormData
            formData.append("content",newComment)
            formData.append("idPost",idPost)
            const AuthStr = 'Bearer '.concat(token);

            const result = await axios.post("http://"+config.ip+":"+config.port+"/post/aggiungi-commento/",formData, { headers: { Authorization: AuthStr } });
            if(result.data.statusOk){
                setNewComment("")
                setError(false)
            }
        }else{
            setError(true);
        }
    }

  return (
    <>
    <NavBar/>
    
    {post &&
    <MDBContainer fluid className=' py-5 '>
        <MDBRow className='m-0 d-flex justify-content-center'  >
            <MDBCol size="11">
                <MDBRow style={{backgroundColor:"#85D2FF"}} className="shadow py-2">
                    <h3 className="mb-3 mt-1" style={{"font-family":"Cambria",color:"#001633","font-size":"300%"}}><MDBIcon sixe="3x" fas icon="newspaper" /><b className='ms-2'>{post.titolo}</b></h3>
                    <div className='mb-2'>
                        <div className="d-inline-flex rounded-circle align-items-center justify-content-center" style={{height:"30px",width:"30px", backgroundColor:"#805300", color:"white"}} ><b>{post.username&&post.username.substring(0,1).toUpperCase()}</b></div>
                        <span className="d-inline ms-2" style={{"font-family":"Cambria",color:"#001633","font-size":"120%"}} >Published <u>{post.date}</u> by {post.username}</span>
                    </div>
                    <hr/>
                </MDBRow>

                <MDBRow style={{backgroundColor:"#EBF8FF"}} className='py-5 shadow'>
                    <p style={{"font-family":"Cambria",color:"#263238","font-size":"120%"}} className='ps-5 text-break pe-5'> {post.content}</p>              
                </MDBRow>
                <MDBRow>
                <section className="mt-4 py-5" style={{ backgroundColor: "#eee" }}>
                    <MDBRow className="justify-content-center">
                        <MDBCol md="12" lg="10" xl="11">
                                <MDBCard>
                                <MDBCardBody>
                                {comment.map((commento)=>{
                                    return(
                                    <>
                                    <div className="d-flex flex-start align-items-center">
                                        {commento.boolEsperto?
                                        <div className="d-inline-flex rounded-circle align-items-center justify-content-center" style={{height:"50px",width:"50px",backgroundColor:"#805300", color:"white"}} ><b>{commento.username.substring(0,1).toUpperCase()}</b></div>:
                                        <div className="d-inline-flex rounded-circle align-items-center justify-content-center" style={{height:"50px",width:"50px",backgroundColor:"#F0E841", color:"white"}} ><b>{commento.username.substring(0,1).toUpperCase()}</b></div>
                                        }
                                        <div>
                                            <h6 className="fw-bold text-primary mb-1 ms-3">{commento.username}</h6>
                                            <p className="text-muted small mb-0 ms-3">
                                                Shared publicly - {commento.date.substring(0,10)+" "+commento.date.substring(11,16)}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="mt-3">{commento.content}</p>
                                    <hr/>
                                    </>
                                    )})}
                                    </MDBCardBody>
                                    <MDBCardFooter style={{ backgroundColor: "#f8f9fa" }}>
                                    {error&&<label className='fs-10 mb-2 text-danger'>Scrivi qualcosa per commentare</label>}
                                    <div className="d-flex flex-start w-100">
                                        {utente===null&&<div className="d-inline-flex rounded-circle align-items-center justify-content-center me-2" style={{height:"40px",width:"40px",backgroundColor:"#805300", color:"white"}} ><b>G</b></div>}
                                        {utente!=null&&utente!="Biblioteca"&&username&&<div className="d-inline-flex rounded-circle align-items-center justify-content-center me-2" style={{height:"40px",width:"40px",backgroundColor:"#805300", color:"white"}} ><b>{username.substring(0,1).toUpperCase()}</b></div>}
                                        
                                        <MDBTextArea disabled={(!token||utente==="Biblioteca")} label={token?'commento':"esegui il log-in per scrivere commenti"} id='textAreaExample' rows={4} style={{backgroundColor: '#fff'}} wrapperClass="w-100" value={newComment} onChange={handleChange}/>
                                    </div>
                                    <div className="float-end mt-2 pt-1">
                                        <MDBBtn disabled={(!token||utente==="Biblioteca")} size="sm" className="me-1  btn-dark btn-rounded btn-lg" style={{backgroundColor:"#001633"}} onClick={handleSubmit}>Commenta</MDBBtn>
                                    </div>
                                    </MDBCardFooter>
                                </MDBCard>
                            
                        </MDBCol>
                    </MDBRow>
                </section>
                </MDBRow>
            
            </MDBCol>
        </MDBRow> 
        
        



    </MDBContainer>}
    <Footer/>


    </>
  )
}

export default CommentiPage