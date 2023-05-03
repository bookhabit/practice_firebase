import React, { useEffect, useState } from 'react';
import { updateDoc,deleteDoc,doc } from 'firebase/firestore';
import { dbService } from 'fBase';

const Nweet = ({nweetObj,isOwner}) => {
    const [editing,setEditing] = useState(false)
    const [newNweet,setNewNweet] = useState(nweetObj.nweet)
    // db식별키
    const NweetTextRef =doc(dbService, "nweets", `${nweetObj.id}`);
    
    // 삭제
    const onDeleteClick = async ()=>{
        const ok = window.confirm("정말로 이 트윗을 삭제하시겠습니까?")
        if(ok){
            // 삭제하기 - deleteDoc
            try {
                const res = await deleteDoc(NweetTextRef);
                console.log(res); // res는 undefined
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