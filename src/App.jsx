import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterComponent from './components/RouterComponent';
import { useState } from 'react';
import AuthProvider from './contexts/AuthProvider';


function App() {
  //const { token, setToken } = useToken();
  //console.log("token dall'app:",token);

  // const { token, setToken } = useState('');
  
  // const setta=(input)=>
  // {
  //   console.log(input);
  //   setToken(input);
  // }

 

//  if(!token) {
//      return <Login setta={setta} />
//  }
  
  
  return (
    <AuthProvider>
      <Router>
        <RouterComponent/>
      </Router>
    </AuthProvider>

  );
  }

export default App;