import React,{ useState } from 'react';
import { addDoc,collection } from 'firebase/firestore';
import { getStorage, ref,uploadString,getDownloadURL } from "firebase/storage";
import { dbService } from 'fBase';
import {v4} from "uuid";

const NweetFactory = ({userObj}) => {
    const [nweetInput,setNweetInput] = useState("");
    const [thumnail,setThumnail] = useState('')


    const onSubmit = async (event)=>{
        event.preventDefault();
        let FileURL = "";
        if(thumnail != ""){
            const storage = getStorage();
            const fileRef = ref(storage, `${userObj.uid}/${v4()}`);
            const response = await uploadString(fileRef,thumnail,"data_url")
            //storage 참조 경로에 있는 파일의 URL을 다운로드해서 FileURL 변수에 넣어서 업데이트
            FileURL = await getDownloadURL(response.ref);        
        }

        // 게시글 생성
        try{
            // db에 추가하기
            const nweetsCollectionRef = collection(dbService,"nweets")
            const docRef = await addDoc(nweetsCollectionRef,{
                nweet:nweetInput,
                createdAt:Date.now(),
                creatorId:userObj.uid,
                image:FileURL
            })
        }catch(error){
            console.log(error)
        }
        setNweetInput("")
        setThumnail('')
        alert('트윗이 생성되었습니다')
    }
    const onChangeNweet=(event)=>{
        const {target:{value}} = event;
        setNweetInput(value)
    }
    // 파일 onChange
    const onFileChange = (event)=>{
        const imgFile = event.target.files[0]
        if(imgFile){
            const reader = new FileReader();
            reader.onloadend = (finishedEvent)=>{
                setThumnail(finishedEvent.currentTarget.result)
            }
            reader.readAsDataURL(imgFile)
        }
    }
    // 선택한 미리보기파일 삭제
    const onClearThumnail = ()=> setThumnail('')

    return (
        <form onSubmit={onSubmit}>
            <input type='text' placeholder="What's on your mind?" maxLength={120} value={nweetInput} onChange={onChangeNweet}/>
            <input type='file' accept='image/*' onChange={onFileChange} />
            <input type='submit' value="생성"/>
            {thumnail && (
                <div>
                    <img src={thumnail} width="50px" height="50px"/>
                    <button onClick={onClearThumnail}>Clear</button>
                </div>
            )}
        </form>
    );
};

export default NweetFactory;