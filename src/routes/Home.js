import React, { useState } from 'react';
import { addDoc,collection } from 'firebase/firestore';
import { dbService } from 'fBase';

const Home = () => {
    const [nweet,setNweet] = useState("");
    const onSubmit = async (event)=>{
        event.preventDefault();
        try{
            const docRef = await addDoc(collection(dbService,"nweets"),{
                nweet,
                createdAt:Date.now()
            })
            console.log('docRef',docRef)
            console.log('docRef.id',docRef.id)
        }catch(error){
            console.log(error)
        }
        setNweet("")
    }
    const onChangeNweet=(event)=>{
        const {target:{value}} = event;
        setNweet(value)
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type='text' placeholder="What's on your mind?" maxLength={120} value={nweet} onChange={onChangeNweet}/>
                <input type='submit' value="Nweet"/>
            </form>
        </div>
    );
};

export default Home;