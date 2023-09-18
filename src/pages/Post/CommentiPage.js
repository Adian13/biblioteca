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
    const [post,setPost]=useState([]);
    const [comment,setComment]=useState([]);
    const [username,setUsername]=useState();
    const[newComment,setNewComment]=useState();
    const {state: { utente,token,email } } = useAuth();

    useEffect(() => {
        async function fetchData(){
            const AuthStr = 'Bearer '.concat(token);
            const formData=new FormData
            formData.append("idClub",id)
            const formData2=new FormData
            formData2.append("idPost",idPost)

            const result = await (axios.post("http://"+config.ip+":"+config.port+"/post/visualizza-post",formData));
            const response= await (axios.post("http://"+config.ip+":"+config.port+"/post/visualizza-commenti",formData2));
            if (utente!=null){
                const info= await axios.post("http://"+config.ip+":"+config.port+'/'+utente.toLowerCase()+'/informazioni',{}, { headers: { Authorization: AuthStr } });
                setUsername(info.data.username)
            }
            
            setPost([...result.data])
            setComment([...response.data])
        }     

        fetchData();

    }, [newComment])

    const handleChange=(e)=>{
        setNewComment(e.target.value);
    }

    const handleSubmit= async()=>{

        const formData=new FormData
        formData.append("content",newComment)
        formData.append("idPost",idPost)
        const AuthStr = 'Bearer '.concat(token);

        const result = await axios.post("http://"+config.ip+":"+config.port+"/post/aggiungi-commento/",formData, { headers: { Authorization: AuthStr } });
        if(result.data.statusOk){
            setNewComment("")
        }
    }

  return (
    <>
    <NavBar/>
    
    {post.length>0 &&
    <MDBContainer fluid className=' py-5 '>
        <MDBRow className='m-0 d-flex justify-content-center'  >
            <MDBCol size="11">
                <MDBRow style={{backgroundColor:"#85D2FF"}} className="shadow py-2">
                    <h3 className="mb-3 mt-1" style={{"font-family":"Cambria",color:"#001633","font-size":"300%"}}><MDBIcon sixe="3x" fas icon="newspaper" /><b className='ms-2'>{post[0].titolo}</b></h3>
                    <div className='mb-2'>
                        <div className="d-inline-flex rounded-circle align-items-center justify-content-center" style={{height:"30px",width:"30px", backgroundColor:"#805300", color:"white"}} ><b>{post[0].username.substring(0,1).toUpperCase()}</b></div>
                        <span className="d-inline ms-2" style={{"font-family":"Cambria",color:"#001633","font-size":"120%"}} >Published <u>{post[0].date}</u> by {post[0].username}</span>
                    </div>
                    <hr/>
                </MDBRow>

                <MDBRow style={{backgroundColor:"#EBF8FF"}} className='py-5 shadow'>
                    <p style={{"font-family":"Cambria",color:"#263238","font-size":"120%"}} className='ps-5 text-break pe-5'> {post[0].content}</p>              
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
                                                Shared publicly - {commento.date}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="mt-3">{commento.content}</p>
                                    <hr/>
                                    </>
                                    )})}
                                    </MDBCardBody>
                                    <MDBCardFooter style={{ backgroundColor: "#f8f9fa" }}>
                                    <div className="d-flex flex-start w-100">
                                        <div className="d-inline-flex rounded-circle align-items-center justify-content-center me-2" style={{height:"40px",width:"40px",backgroundColor:"#805300", color:"white"}} ><b>{utente?username.substring(0,1).toUpperCase():"G"}</b></div>
                                        <MDBTextArea disabled={!token} label={token?'commento':"esegui il log-in per scrivere commenti"} id='textAreaExample' rows={4} style={{backgroundColor: '#fff'}} wrapperClass="w-100" value={newComment} onChange={handleChange}/>
                                    </div>
                                    <div className="float-end mt-2 pt-1">
                                        <MDBBtn disabled={!token} size="sm" className="me-1  btn-dark btn-rounded btn-lg" style={{backgroundColor:"#001633"}} onClick={handleSubmit}>Commenta</MDBBtn>
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