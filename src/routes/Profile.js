import { authService, dbService } from 'fBase';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getAuth, updateProfile } from "firebase/auth";

const Profile = ({userObj,refreshUser}) => {
    const navigate = useNavigate();
    const [newUserName,setNewUserName]=useState(userObj.displayName)
    
    // 로그아웃
    const onLogOutClick = ()=>{
        authService.signOut();
        navigate("/")
    }
    // 자신의 게시글 불러오기
    const getMyNweets = async () => {
        const q = query(
        collection(dbService, "nweets"),
        where("creatorId", "==", userObj.uid),
        orderBy("createdAt")
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        });
    };
    useEffect(()=>{
        getMyNweets()
    },[])
    const onChange = (event)=>{
        setNewUserName(event.target.value)
    }
    const onSubmit = (event)=>{
        event.preventDefault();
        if(userObj.displayName !== newUserName){
            const auth = getAuth();
            updateProfile(auth.currentUser, {
            displayName: newUserName,
            }).then(() => {
                console.log('프로필수정성공')
                refreshUser();
            }).catch((error) => {
                console.log(error)
            });
        }
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <input type='text' placeholder='Display name' value={newUserName} onChange={onChange}/>
                <input type='submit' value='Update your name'/>
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;