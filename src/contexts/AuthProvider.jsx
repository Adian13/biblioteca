import React, { useReducer, useCallback, useEffect } from "react";
import AuthContext from "./AuthContext";
import { reducer, actions, initialState } from "./state";
import axios from "axios";
import jwt from 'jwt-decode';

async function loginUser(email,password) {
  
  const formData = new FormData();

  formData.append("email",email);
  formData.append("password",password);
  const result =  axios.post('http://localhost:8080/autenticazione/login',formData);
  return result;
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async(email,password)=>{

    const result= await(loginUser(email,password));
    const status=result.data.statusOk

    if (status) {
      const token= result.data.payload.token;
      const utente=jwt(token).role;
      const emailUtente=jwt(token).sub;
      dispatch({
                  type: actions.init,
                  data: { token: token, utente:utente, email:emailUtente, error:false }
                });
    }else{
      dispatch({
        type: actions.init,
        data: { error:true }
      });

    }
    }
  return (
    <AuthContext.Provider value={{
      login,
      state,
      dispatch
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;