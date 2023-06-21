import React, { useReducer, useCallback, useEffect } from "react";
import AuthContext from "./AuthContext";
import { reducer, actions, initialState } from "./state";
import axios from "axios";

async function loginUser(email,password) {
  
  const formData = new FormData();
  formData.append("email",email);
  formData.append("password",password);
  
  const result =  axios.post('http://localhost:8080/autenticazione/login',formData);
  //const result2 =  axios.post('http://localhost:8080/autenticazione/login',{"email":email,"password":password"});
    
  
  
  
  
  
  
  // return fetch('http://localhost:8080/autenticazione/login', {
    // method: 'POST',
    //   headers: {
    //      'Content-Type': 'application/json',
    //   },
    //    body: JSON.stringify(email,password)
    //  })
    // }
    return result;}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async(email,password)=>{
    const result= await(loginUser(email,password));
    console.log(result);
    const status=result.data.statusOk
    if (status) {
      dispatch({
                  type: actions.init,
                  data: { token: result.data.payload.token, error:false }
                });
    }else{
      dispatch({
        type: actions.init,
        data: { error:true }
      });

    }


    }

  

  // const init = useCallback(
  //   async artifact => {
  //     if (artifact) {
  //       const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  //       const accounts = await web3.eth.requestAccounts();
  //       const networkID = await web3.eth.net.getId();
  //       const { abi } = artifact;
  //       let address, contract;
  //       try {
  //         address = artifact.networks[networkID].address;
  //         contract = new web3.eth.Contract(abi, address);
  //       } catch (err) {
  //         console.error(err);
  //       }
  //       dispatch({
  //         type: actions.init,
  //         data: { artifact, web3, accounts, networkID, contract }
  //       });
  //     }
  //   }, []);

  // useEffect(() => {
  //   const tryInit = async () => {
  //     try {
  //       const artifact = require("../../contracts/SimpleStorage.json");
  //       init(artifact);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   tryInit();
  // }, [init]);

  // useEffect(() => {
  //   const events = ["chainChanged", "accountsChanged"];
  //   const handleChange = () => {
  //     init(state.artifact);
  //   };

  //   events.forEach(e => window.ethereum.on(e, handleChange));
  //   return () => {
  //     events.forEach(e => window.ethereum.removeListener(e, handleChange));
  //   };
  // }, [init, state.artifact]);

  return (
    <AuthContext.Provider value={{
      login,
      state,
      dispatch
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;