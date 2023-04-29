import React, { useState } from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from "../routes/Home";
import Auth from "../routes/Auth";

 const AppRouter =()=> {
    const [isLoggedIn,setIsLoggedIn] = useState(true);
    return (
    <BrowserRouter>
        <Routes>
            {isLoggedIn?
            <Route path="/" element={<Home/>}/>
            :
            <Route path="/" element={<Auth/>}/>
        }
        </Routes>
    </BrowserRouter>
    )
}

export default AppRouter;