import React, { useEffect } from 'react';
import AppRouter from './Router';
import { useState } from 'react';
import {authService} from '../fBase';
import { getAuth, onAuthStateChanged, updateCurrentUser } from 'firebase/auth';
import { updateProfile } from 'firebase/auth';


const App = () => {
  const [init,setInit] = useState(false)
  const [isLoggedIn,setIsLoggedIn] = useState(authService.currentUser);
  const [userObj,setUserObj] = useState(null)

  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setIsLoggedIn(true)
        setUserObj({
          displayName:user.displayName,
          uid:user.uid,
          updateProfile:(args)=> user.updateProfile(args)
        })
      }else{
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true)
    })
  },[])

  // 유저정보 업데이트
  const refreshUser = async () => {
    await updateCurrentUser(authService, authService.currentUser);
    setUserObj(authService.currentUser);
  };

  return (
    <>
      {init?<AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj}/>:"Initialzing..." }
      <footer>&copy;Nwitter {new Date().getFullYear()}</footer>
    </>
  );
};

export default App;