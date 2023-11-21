
import Link from 'next/link';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import Logout from './Logout';
import Login from './Login';
// import { useCustomSession } from '../sessions';


interface userInfo {
    user: {
        name: string;
        email: string;
        image?: string;
        level?: number
    }
}



export default async function Nav() {
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
                            <Logout />
                        </div>
                    </>
                    :
                    <>
                        <Link href="/register" 
                        className="basis-[48%] px-6 py-2.5 bg-green-400 text-white font-medium text-base mt-2 leading-tight uppercase rounded shadow-md hover:bg-green-500 hover:shadow-lg focus:bg-green-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-500 active:shadow-lg transition duration-150 ease-in-out">회원가입</Link>
                        <Login />

                    </>
            }


        </>
    )
}