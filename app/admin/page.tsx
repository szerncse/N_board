import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import PostsList from '../posts/[page]/page';

interface userInfo {
    user: {
        name: string;
        email: string;
        image?: string;
        level?: number
    }
}


export default async function Admin() {

    let sessions = await getServerSession(authOptions) as userInfo;
    if( !sessions && sessions || sessions?.user.level !== 10){
        return (
            <p>관리자만 접속 가능한 페이지 입니다.</p>
        )
    }

    return (
        <>
           <p className='bg-yellow-300 border w-28 text-center'>관리자 전용</p>

        </>
    )
}