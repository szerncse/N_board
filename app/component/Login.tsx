'use client';
import {signIn, signOut } from 'next-auth/react';

interface userInfo {
    nama: string;
    email: string;
    image: string;
}
interface PropsDate {
    session?: userInfo | null
}


{/* <button onClick={()=>{ signIn()}}>로그인</button> */}

export default function Login({session} : PropsDate){
    return (
        <>
        {session && session.user?.email ? <button onClick={()=>
            {signOut()}}>로그아웃</button> : <><button onClick={()=>{
            signIn('kakao')}}>카카오로그인</button>
        <button onClick={()=>{ signIn('github')}}>깃허브로그인</button>
        <button onClick={()=>{ signIn('naver')}}>네이버로그인</button>
        <button onClick={()=>{ signIn('google')}}>구글로그인</button></>}

     </>

    )
}