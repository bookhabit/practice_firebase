import React, { useState } from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Navigation from "./Navigation";
import Profile from "routes/Profile";

const AppRouter =({isLoggedIn,userObj,refreshUser})=> {    
    return (
    <BrowserRouter>
        {isLoggedIn && <Navigation userObj={userObj}/>}
        <Routes>
            {isLoggedIn?
            <>
                <Route path="/" element={<Home userObj={userObj}/>}/>
                <Route path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser} />}/>
            </>
            :
            <Route path="/" element={<Auth/>}/>
        }
        </Routes>
    </BrowserRouter>
    )
}

export default AppRouter;