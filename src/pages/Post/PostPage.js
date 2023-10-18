import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody, MDBContainer, MDBRow,  MDBBtn, MDBIcon, MDBCol,MDBCard,MDBCardBody, MDBCardTitle,MDBCardSubTitle } from 'mdb-react-ui-kit';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import config from '../../config';
import axios from 'axios';
import useAuth from"../../contexts/useAuth";
import Modal from '../../components/CreaPostModal';


const PostPage = () => {
    const navigate = useNavigate();
    const {id} =useParams();
    const [post,setPost]=useState([]);
    const {state: { utente,email } } = useAuth();
    const [show, setShow] = useState(false);
    const[isAmministratore,setIsAmministratore]=useState(false);

    const showModal= ()=>{
        setShow(true);
    }

    useEffect(() => {
        async function fetchData(){
            const formData=new FormData
            formData.append("idClub",id)
            const formData2=new FormData()
            formData2.append("id",id)

            const result = await (axios.post("http://"+config.ip+":"+config.port+"/post/visualizza-post-club",formData));
            const club = await (axios.post("http://"+config.ip+":"+config.port+"/club-del-libro/info-club",formData2));
            console.log("email",club.data)

            setPost(()=>{return result.data})
            //todo: guarda punto5 dopo averlo risolto aggiusta anche qui
            console.log("email sua e mia",club.data.email,email)
            setIsAmministratore(()=>{return(club.data.emailEsperto==email)})
        }
        document.title="Post Club"      
        fetchData();

    }, [show])

  return (
    <>
        <Modal id ={id} show={show} setShow={setShow}/> 
        <MDBContainer fluid className="p-0">
            <NavBar  />
            <MDBRow className='me-4 ms-4 mt-5'>
                <MDBCol size='7'>
                    <MDBBtn id="VisualizzaInfoBtn" className='btn-dark btn-rounded btn-lg mt-2 d-inline-flex align-items-center' style={{backgroundColor:"#004AAD"}} type='button' onClick={()=>navigate("/clubDelLibro/"+id+"/info")}><MDBIcon className='me-2 shadow' size="2x" fas icon="info-circle" />Visualizza info Club</MDBBtn>
                    {isAmministratore===true&&<MDBBtn className='ms-2 btn-dark btn-rounded btn-lg mt-2 d-inline-flex align-items-center' style={{backgroundColor:"#004AAD"}} type='button' onClick={()=>{showModal()}}><MDBIcon className='me-2 shadow' size="2x" fas icon="plus-circle" />Crea un nuovo post</MDBBtn>}
                </MDBCol>
                <MDBRow >
                    <MDBTable className='mt-5' hover borderColor="primary">
                        <MDBTableHead style={{ backgroundColor: '#38B6FF' }}>
                            <tr className="text-uppercase fs-5 fw-bold font-monospace">
                                <th scope='col'>Post</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody >
                            {post.length===0 &&
                                <tr >
                                    <td colSpan={1} className='text-center'>Nessun post</td>
                                </tr>
                            }
                            {post.length>0&&
                                post.map((item) => {
                                     return (
                                         <tr>
                                             <td className=' text-center'>
                                                <MDBCard style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                                                    <MDBCardBody>
                                                        <MDBRow>
                                                            <MDBCol size="10">
                                                                <MDBCardTitle className='d-flex justify-content-start'><b className='fs-4'>{item.titolo}</b></MDBCardTitle>
                                                                <MDBCardSubTitle className='d-flex justify-content-start'>{item.content.substring(0,40)}...</MDBCardSubTitle>
                                                            </MDBCol>
                                                            <MDBCol size="2" className='text-center d-flex  justify-content-center'>
                                                                <MDBBtn floating style={{ backgroundColor: '#004AAD' }} className='mt-1' size="lg" onClick={()=>{navigate("/clubDelLibro/"+id+"/"+item.id)}}>
                                                                    <MDBIcon fas icon="comment-dots"  size="lg"/>
                                                                </MDBBtn>
                                                            </MDBCol>
                                                            

                                                        </MDBRow>

                                                        
                                                    </MDBCardBody>
                                                </MDBCard>
                                             </td>
                                         </tr>
                                     )
                                 })
                            }
                        </MDBTableBody>
                    </MDBTable>
                </MDBRow>
            </MDBRow>
        </MDBContainer>
        <MDBRow className='pt-5 me-0'>
            <Footer />
        </MDBRow>
    </>

  )
}

export default PostPage