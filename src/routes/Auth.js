import React, { useState } from "react";

const Auth = ()=>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const onChange = (event)=>{
        const {target:{name,value}} = event;
        if(name=="email"){
            setEmail(value)
        }else if(name=="password"){
            setPassword(value)
        }
    }
    console.log(email,password)
    const onSubmit = (event)=>{
        event.preventDefault();
    }
    return(
        <>
            <form onSubmit={onSubmit}>
                <input type="text" name="email" placeholder="Email" required value={email} onChange={onChange}/>
                <input type="password" name="password" placeholder="password" required value={password} onChange={onChange} />
                <input type="submit" value="Log in"/>
            </form>
            <div>
                <button>Continue with Google</button>
            </div>
        </>
    )
}

export default Auth;