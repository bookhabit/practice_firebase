import React, { useEffect } from 'react';
import AppRouter from './Router';
import { useState } from 'react';
import {authService} from '../fBase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const App = () => {
  const [init,setInit] = useState(false)
  const [isLoggedIn,setIsLoggedIn] = useState(authService.currentUser);
  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setIsLoggedIn(true)
        const uid = user.uid;
      }else{
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  },[])
  return (
    <>
      {init?<AppRouter isLoggedIn={isLoggedIn}/>:"Initialzing..." }
      <footer>&copy;Nwitter {new Date().getFullYear()}</footer>
    </>
  );
};

export default App;