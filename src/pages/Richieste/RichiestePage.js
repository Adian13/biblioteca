import React, {useEffect, useState} from 'react';
import NavBar from '../../components/NavBar';
import useAuth from"../../contexts/useAuth";
import axios from "axios";
import config from '../../config';
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBBtn,
    MDBIcon,
    MDBCard,
  MDBCardBody,
  MDBInput,
    MDBTabsPane
  } from 'mdb-react-ui-kit';

const RichiestePage = () => {

    const [ticketAperti,setTicketAperti]=useState([]);
    const [ticketAccettati,setTicketAccettati]=useState([]);
    const [ticketChiusi,setTicketChiusi]=useState([]);
    const [giorniPrestito,setGiorniPrestito]=useState({});
    const [aggiorna,setAggiorna]=useState(true);
    const { state: {token} } = useAuth();
    const [justifyActive, setJustifyActive] = useState('tab1');

    const handleJustifyClick =  (value) => {
        if (value === justifyActive) {
            return;
        }
        setJustifyActive(value);
    };

    const handleChange=(e)=>{

      setGiorniPrestito({...giorniPrestito,[e.target.id]:e.target.value})
      
    }

    useEffect(() => {
      async function getData(){
          const AuthStr = 'Bearer '.concat(token);
          
          const response =  await axios.post("http://"+config.ip+":"+config.port+"/prenotazione-libri/visualizza-richieste/",{}, { headers: { Authorization: AuthStr } });
          setTicketAperti(response.data.IN_ATTESA_DI_CONFERMA);
          setTicketAccettati(response.data.IN_ATTESA_DI_RESTITUZIONE);
          setTicketChiusi(response.data.CHIUSO);
          setGiorniPrestito({})
          for (const [key, value] of Object.entries(ticketAperti)) {
            setGiorniPrestito({...giorniPrestito,[value.idTicket]:"0"})
          }
      }

      getData();
      document.title="Ticket Biblioteca"

    },[aggiorna]);

    const AzioneTicketInAttesa= async (tipo,id)=>{
      const giorni=giorniPrestito[id]
      const AuthStr = 'Bearer '.concat(token);
      
      if(tipo==="accetta"&& giorni>=1){
          
        const formData = new FormData();  
        formData.append("id",id);
        formData.append("giorni",giorni);
        console.log("id e giorni ",id,giorni)
  
        const response =  await axios.post("http://"+config.ip+":"+config.port+"/prenotazione-libri/ticket/accetta",formData,{ headers: { Authorization: AuthStr } } );
        if(response.data.statusOk){
          setAggiorna(!aggiorna);
          alert("ticket accettato")
        }
      }else if(tipo=="rifiuta"){
        const formData = new FormData();  
        formData.append("id",id);
  
        const response =  await axios.post("http://"+config.ip+":"+config.port+"/prenotazione-libri/ticket/rifiuta",formData,{ headers: { Authorization: AuthStr } } );
        if(response.data.statusOk){
          setAggiorna(!aggiorna)
          alert("Ticket rifiutato")
        }
      }else if(tipo==="accetta"&&giorni<1){
        alert("giorni non validi")
      }else if(tipo==="chiudi"){
        const formData = new FormData();  
        formData.append("id",id);
  
        const response =  await axios.post("http://"+config.ip+":"+config.port+"/prenotazione-libri/ticket/chiudi",formData,{ headers: { Authorization: AuthStr } } );
        if(response.data.statusOk){
          setAggiorna(!aggiorna)
          alert("Ticket chiuso")
        }

      }
    }


  return (

    <>
    <NavBar/>
    <MDBCard className='mt-4 ms-4 me-4' style={{backgroundColor:"#E3F2FD"}}>
      <MDBCardBody>
    
      <MDBTabs justify className='m-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }} >
        <MDBTabsItem>
          <MDBTabsLink id="TicketApertiTab1" onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            <b className='fs-4 text-capitalize fst-italic'>Ticket aperti</b>
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink id="TicketAccettatiTab2" onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
          <b className='fs-4 text-capitalize fst-italic'>Ticket accettati</b>
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink id="TicketChiusiTab3" onClick={() => handleJustifyClick('tab3')} active={justifyActive === 'tab3'}>
          <b className='fs-4 text-capitalize fst-italic'>Ticket chiusi</b>
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent >
        <MDBTabsPane show={justifyActive === 'tab1'} className='text-center' >
          <MDBTable  striped hover borderColor="primary">
              <MDBTableHead style={{ backgroundColor: '#38B6FF' }}>
                  <tr className="text-uppercase fs-5 fw-bold font-monospace">
                      <th scope='col'>Richiesto da:</th>
                      <th scope='col'>Data richiesta</th>
                      <th scope='col'>Nome libro</th>
                      <th scope='col'>Descrizione libro</th>
                      <th scope='col'>Giorni durata prestito</th>
                      <th className="text-center"scope='col'>Accetta/rifiuta</th>
                  </tr>
              </MDBTableHead>
              <MDBTableBody >
              {ticketAperti.length===0 &&
                  <tr >
                      <td colSpan={6} className='text-center'>Nessun ticket da mostrare</td>
                  </tr>
                  }
                  {
                      ticketAperti.map((ticket,index) => {
                        var idT=ticket.idTicket;
                          return (
                              <tr>
                                  <th scope='row'>{ticket.lettore}</th>
                                  <td>{ticket.dataRichiesta}</td>
                                  <td>{ticket.libro.titolo}</td>
                                  <td>{ticket.libro.descrizione}</td>
                                  <td><MDBInput  value={giorniPrestito.idT} name='fname' onChange={handleChange} id={ticket.idTicket} required/></td>
                                  <td className=' text-center'>
                                  <MDBBtn id={"AccettaTicketBtn"+index} floating style={{ backgroundColor: '#004AAD' }} onClick={()=>{AzioneTicketInAttesa("accetta",ticket.idTicket)}}>
                                    <MDBIcon fas icon="check" />
                                  </MDBBtn>
                                  <MDBBtn id={"RifiutaTicketBtn"+index} floating style={{ backgroundColor: '#004AAD' }} className='ms-2' onClick={()=>{AzioneTicketInAttesa("rifiuta",ticket.idTicket)}}>
                                    <MDBIcon fas icon="trash" />
                                  </MDBBtn>
                                  </td>
                              </tr>
                          )
                      })
                  } 
              </MDBTableBody>
          </MDBTable>
        </MDBTabsPane>
        <MDBTabsPane show={justifyActive === 'tab2'} className='text-center'>
          <MDBTable  striped hover borderColor="primary">
          <MDBTableHead style={{ backgroundColor: '#38B6FF' }}>
              <tr className="text-uppercase fs-5 fw-bold font-monospace">
                  <th scope='col'>Richiesto da:</th>
                  <th scope='col'>Data richiesta</th>
                  <th scope='col'>Data restituzione</th>
                  <th scope='col'>Nome libro</th>
                  <th scope='col'>Descrizione libro</th>
                  <th className="text-center"scope='col'>Chiudi</th>
              </tr>
          </MDBTableHead>
          <MDBTableBody >
          {ticketAccettati.length===0 &&
              <tr >
                  <td colSpan={6} className='text-center'>Nessun ticket da mostrare</td>
              </tr>
              }
               {
                  ticketAccettati.map((ticket,index) => {
                      return (
                          <tr>
                              <th scope='row'>{ticket.lettore}</th>
                              <td>{ticket.dataRichiesta}</td>
                              <td>{ticket.dataRestituzione}</td>
                              <td>{ticket.libro.titolo}</td>
                              <td>{ticket.libro.descrizione}</td>
                              <td className=' text-center'>
                              <MDBBtn floating style={{ backgroundColor: '#004AAD' }} onClick={()=>{AzioneTicketInAttesa("chiudi",ticket.idTicket)}}>
                                <MDBIcon fas icon="times-circle" size="lg"/>
                              </MDBBtn>
                              </td>
                          </tr>
                      )
                  })
              } 
          </MDBTableBody>
          </MDBTable>
        </MDBTabsPane>
        <MDBTabsPane show={justifyActive === 'tab3'}>
        <MDBTable  striped hover borderColor="primary">
          <MDBTableHead style={{ backgroundColor: '#38B6FF' }}>
              <tr className="text-uppercase fs-5 fw-bold font-monospace">
                  <th scope='col'>Richiesto da:</th>
                  <th scope='col'>Data richiesta</th>
                  <th scope='col'>Nome libro</th>
                  <th scope='col'>Descrizione libro</th>
              </tr>
          </MDBTableHead>
          <MDBTableBody >
          {ticketChiusi.length===0 &&
              <tr >
                  <td colSpan={4} className='text-center'>Nessun ticket da mostrare</td>
              </tr>
              }
               {
                  ticketChiusi.map((ticket,index) => {
                      return (
                          <tr>
                              <th scope='row'>{ticket.lettore}</th>
                              <td>{ticket.dataRichiesta}</td>
                              <td>{ticket.libro.titolo}</td>
                              <td>{ticket.libro.descrizione}</td>
                          </tr>
                      )
                  })
              } 
          </MDBTableBody>
          </MDBTable>
        </MDBTabsPane>
      </MDBTabsContent>

      </MDBCardBody>
      </MDBCard>
    </>
  )
}

export default RichiestePage