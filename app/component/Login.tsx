
import Link from 'next/link';
import { authOptions } from '../api/auth/[...nextauth]/route';
import {getServerSession} from 'next-auth';
// import { useCustomSession } from '../sessions';


interface userInfo {
  user: {
    name: string;
    email: string;
    image?: string;
    level ?: number
  }
}

interface PropsData {
    session?: userInfo | null
}

export default async function Login(){
    // const {data: session, status } = useCustomSession();
    const session = await getServerSession(authOptions) as userInfo;
    


    return (
        <>

      {
       session && session.user
        ? 
          <>
      <div className="bg-green-600 border-5 text-white p-3 rounded-md">
      <p className="text-center font-bold">{session && session.user?.name}님 반갑습니다.</p>
      <Link href="/logout" className="text-yellow-300 hover:underline">
        로그아웃
      </Link>
      </div>
          </>
        :
          <>
          <Link href="/register">회원가입</Link>
          <button >로그인</button>
        </>
      }

      
  </>
    )
}