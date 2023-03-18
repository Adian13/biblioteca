import React from 'react';
import Login from "./components/Login/Login"
import Prova from "./components/prova"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useToken from './useToken';


function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }
  
  return (
    <div className="wrapper">
    <BrowserRouter>
      <Routes>
        <Route path="/prova">
          <Prova />
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
);
}

export default App;