import React, { useState } from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Navigation from "./Navigation";
import Profile from "routes/Profile";

const AppRouter =({isLoggedIn})=> {    
    return (
    <BrowserRouter>
        {isLoggedIn && <Navigation/>}
        <Routes>
            {isLoggedIn?
            <>
                <Route path="/" element={<Home/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </>
            :
            <Route path="/" element={<Auth/>}/>
        }
        </Routes>
    </BrowserRouter>
    )
}

export default AppRouter;