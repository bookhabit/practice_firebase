import React, { useEffect, useState } from 'react';
import { addDoc,collection, getDocs, query } from 'firebase/firestore';
import { dbService } from 'fBase';

const Home = () => {
    const [nweetInput,setNweetInput] = useState("");
    const [nweetList,setNweetList] = useState([])

    // db에서 nweets리스트 가져오는 함수
    const getNweetList = async () => {
        const nweetsCollectionRef = query(collection(dbService, "nweets"));
        const querySnapshot = await getDocs(nweetsCollectionRef);
        querySnapshot.forEach((document) => {
            const nweetObj = {
                ...document.data(),
                id: document.id,}
                setNweetList(prev => [nweetObj, ...prev]);
        });
    };

    useEffect(() => {
        getNweetList();
    }, []);

    const onSubmit = async (event)=>{
        event.preventDefault();
        try{
            // db에 추가하기
            const nweetsCollectionRef = collection(dbService,"nweets")
            const docRef = await addDoc(nweetsCollectionRef,{
                nweet:nweetInput,
                createdAt:Date.now()
            })
        }catch(error){
            console.log(error)
        }
        setNweetInput("")
    }
    const onChangeNweet=(event)=>{
        const {target:{value}} = event;
        setNweetInput(value)
    }
    console.log(nweetList)
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type='text' placeholder="What's on your mind?" maxLength={120} value={nweetInput} onChange={onChangeNweet}/>
                <input type='submit' value="Nweet"/>
            </form>
            <div>
                {nweetList && nweetList.map((nweet)=>(
                <div key={nweet.id}>
                    <h4>{nweet.nweet}</h4>
                </div>
                ))}
            </div>
        </div>
    );
};

export default Home;