import React, { useEffect, useState } from 'react';
import { addDoc,collection, getDocs, onSnapshot, query } from 'firebase/firestore';
import { dbService } from 'fBase';
import Nweet from 'components/Nweet';

const Home = ({userObj}) => {
    const [nweetInput,setNweetInput] = useState("");
    const [nweetList,setNweetList] = useState([])
    const [thumnail,setThumnail] = useState()

    useEffect(() => {
        // query를 통해서 db에 접근
        const nweetsCollectionRef = query(collection(dbService, "nweets"));
        // db에서 nweets리스트 가져오는 함수
        onSnapshot(nweetsCollectionRef,(snapshot)=>{
            const nweetArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                }));
            setNweetList(nweetArr);
        })
    }, []);

    const onSubmit = async (event)=>{
        event.preventDefault();
        try{
            // db에 추가하기
            const nweetsCollectionRef = collection(dbService,"nweets")
            const docRef = await addDoc(nweetsCollectionRef,{
                nweet:nweetInput,
                createdAt:Date.now(),
                creatorId:userObj.uid,
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
    // 파일 onChange
    const onFileChange = (event)=>{
        const imgFile = event.target.files[0]
        const reader = new FileReader();
        reader.onloadend = (finishedEvent)=>{
            setThumnail(finishedEvent.currentTarget.result)
        }
        reader.readAsDataURL(imgFile)
    }
    // 선택한 파일 삭제
    const onClearThumnail = ()=> setThumnail(null)

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type='text' placeholder="What's on your mind?" maxLength={120} value={nweetInput} onChange={onChangeNweet}/>
                <input type='file' accept='image/*' onChange={onFileChange} />
                <input type='submit' value="Nweet"/>
                {thumnail && (
                    <div>
                        <img src={thumnail} width="50px" height="50px"/>
                        <button onClick={onClearThumnail}>Clear</button>
                    </div>
                )}
            </form>
            <div>
                {nweetList && nweetList.map((nweet)=>(
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId===userObj.uid} />
                ))}
            </div>
        </div>
    );
};

export default Home;