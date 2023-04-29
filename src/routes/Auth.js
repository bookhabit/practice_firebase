import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";

const Auth = ()=>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [newAccount,setNewAccount] = useState(true)
    const auth = getAuth();

    const onChange = (event)=>{
        const {target:{name,value}} = event;
        if(name=="email"){
            setEmail(value)
        }else if(name=="password"){
            setPassword(value)
        }
    }
    const onSubmit = async (event)=>{
        event.preventDefault();
        try{
            let data;
            if(newAccount){
                // create Account
                data = await createUserWithEmailAndPassword(auth,email,password)
            }else{
                // log in
                data = await signInWithEmailAndPassword(auth,email,password)
            }
            console.log('data',data)
        }catch(error){
            console.log(error)
        }
    }
    return(
        <>
            <form onSubmit={onSubmit}>
                <input type="text" name="email" placeholder="Email" required value={email} onChange={onChange}/>
                <input type="password" name="password" placeholder="password" required value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" :"Log in"}/>
            </form>
            <div>
                <button>Continue with Google</button>
            </div>
        </>
    )
}

export default Auth;