'use client';
import { signIn, signOut} from 'next-auth/react';
import Link from 'next/link';
import { useCustomSession } from '../sessions';

interface userInfo {
    name: string;
    email: string;
    image : string;
}
interface PropsData {
    session?: userInfo | null
}

export default function Login(){
    const {data: session, status } = useCustomSession();
    const redirectTo = ()=>{
      sessionStorage.setItem('preUrl', window.location.href);
      window.location.href= "/login"
    }

    return (
        <>

{
        status !== 'loading' && session && session.user?.email 
        ? 
          <>
            <p>{session && session.user?.name}님 반갑습니다.</p>
            <button onClick={()=>{signOut()}}>로그아웃</button> 
          </>
        :
          <>
          <Link href="/register">회원가입</Link>
          <button onClick={redirectTo}>로그인</button>
        </>
      }

      
  </>
    )
}