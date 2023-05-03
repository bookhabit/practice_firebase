import React, { useEffect, useState } from 'react';
import { addDoc,collection, getDocs, onSnapshot, query } from 'firebase/firestore';
import { dbService } from 'fBase';
import Nweet from 'components/Nweet';
import NweetFactory from 'components/NweetFactory';

const Home = ({userObj}) => {    
    const [nweetList,setNweetList] = useState([])

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

    return (
        <div>
            <NweetFactory userObj={userObj} />
            {nweetList && nweetList.map((nweet)=>(
                <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId===userObj.uid} />
            ))}
        </div>
    );
};

export default Home;