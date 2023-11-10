'use client';
import { signIn, signOut} from 'next-auth/react';
import Link from 'next/link';

interface userInfo {
    nama: string;
    email: string;
    image: string;
}
interface PropsDate {
    session?: userInfo | null
}

export default function Login({session} : PropsDate){
    return (
        <>
        {
            session && session.user.level === 10 ? 
            '관리자' 
            : 
            session && session.user !== null && '일반회원 '
        }
       {/* {console.log(session && session.user)} */}
        {session && session.user? <button  onClick={()=>
            {signOut()}}>로그아웃</button> : <><button  className='rounded-full bg-sky-300' onClick={()=>{signIn('kakao')}}>카카오로그인</button>
        <button className='rounded-full bg-sky-300' onClick={()=>{ signIn('github')}}>깃허브로그인</button>
        <button  className='rounded-full bg-sky-300' onClick={()=>{ signIn('naver')}}>네이버로그인</button>
        <button  className='rounded-full bg-sky-300' onClick={()=>{ signIn('google')}}>구글로그인</button></>}
        <button  className='rounded-full bg-sky-300' onClick={()=>{ signIn('credential', {email: "caga28@naver.com", password: '123456'})}}>메일</button>

        <Link  className='rounded-full bg-sky-300' href="/register">회원가입</Link>

        <button  className='rounded-full bg-sky-300' onClick={()=>{ signIn()}}>로그인</button>

     </>

    )
}