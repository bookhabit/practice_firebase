import { authService } from "fBase";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";

const Auth = ()=>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [newAccount,setNewAccount] = useState(true)
    const [error,setError] = useState("");
    const auth = getAuth();

    const onChange = (event)=>{
        const {target:{name,value}} = event;
        if(name==="email"){
            setEmail(value)
        }else if(name==="password"){
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
            if(error.message==="Firebase: Error (auth/email-already-in-use)."){
                setError("이미 존재하는 이메일입니다.")
            }else if(error.message==="Firebase: Error (auth/operation-not-allowed)."){
                setError("허용되지 않은 이메일입니다.")
            }else if(error.message==="Firebase: Error (auth/invalid-email)."){
                setError("유효하지 않은 이메일입니다.")
            }else if(error.message==="Firebase: Error (auth/weak-password)."){
                setError("비밀번호가 너무 위험합니다.")
            }
        }
    }
    const toggleAccount = ()=> {
        setNewAccount(prev=> !prev);
        setError("")
    }
    const onSocialClick = async (event)=>{
        const {target:{name}} = event;
        let provider;
        if(name==="google"){
            provider = new GoogleAuthProvider();
            const result = await signInWithPopup(authService,provider)
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            console.log('token',token)
        }
    }
    return(
        <>
            <form onSubmit={onSubmit}>
                <input type="text" name="email" placeholder="Email" required value={email} onChange={onChange}/>
                <input type="password" name="password" placeholder="password" required value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" :"Log in"}/>
                {error}
            </form>
            <button onClick={toggleAccount}>{newAccount?"Log in":"Sign in"}</button>
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
            </div>
        </>
    )
}

export default Auth;