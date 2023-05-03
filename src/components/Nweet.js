import React, { useEffect, useState } from 'react';
import { updateDoc,deleteDoc,doc } from 'firebase/firestore';
import { dbService } from 'fBase';
import { getStorage, ref, deleteObject } from "firebase/storage";

const Nweet = ({nweetObj,isOwner}) => {
    const [editing,setEditing] = useState(false)
    const [newNweet,setNewNweet] = useState(nweetObj.nweet)
    // db식별키
    const NweetTextRef =doc(dbService, "nweets", `${nweetObj.id}`);
    const storage = getStorage();

    // 삭제
    const onDeleteClick = async ()=>{
        const ok = window.confirm("정말로 이 트윗을 삭제하시겠습니까?")
        if(ok){
            // 게시글 삭제하기 - deleteDoc
            try {
                // 파일이미지 삭제하기
                const desertRef = ref(storage,nweetObj.image);
                const imgRes = await deleteObject(desertRef)
                // 게시글 삭제하기
                const TweetRes = await deleteDoc(NweetTextRef);
                console.log('imgRes',imgRes , '이미지파일삭제 성공')
                console.log('TweetRes',TweetRes,'트윗게시글삭제 성공'); // res는 undefined
              } catch (e) {
                console.log(e);
            }
        }
    }
    
    const toggleEditing = ()=>setEditing((prev)=>!prev)

    // 수정
    const EditSubmit = async (event)=>{
        event.preventDefault();
        // 수정하기 - updateDoc
        try {
            const res = await updateDoc(NweetTextRef,{nweet:newNweet});
            setEditing(false)
          } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            {editing?
                <>
                <form onSubmit={EditSubmit}>
                    <input type='text' placeholder='수정할 내용' value={newNweet} onChange={(event)=>setNewNweet(event.target.value)} required/>
                    <input type='submit' value="수정하기"/>
                </form>
                <button onClick={toggleEditing}>Cancel</button>
                </>    
                :
                <>
                <h4>트윗 : {nweetObj.nweet}</h4>
                {nweetObj.image && <img src={nweetObj.image}width='50px' height='50px'  alt='이미지'/>}
                {isOwner&& 
                <>
                    <button onClick={onDeleteClick}>트윗 삭제</button>
                    <button onClick={toggleEditing}>트윗 편집</button>
                </>
                }
                </>
            }
        </div>
    );
};

export default Nweet;