'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface userType {
    id: number;
    email: string;
    name: string;
    nickname: string;
    level: number;
    date: string;
}

export default function Newmember() {
    const [userData, setUserData] = useState<userType>()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/admin', {
                    cache: 'no-cache',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        pathUrl: 'mainNewMember'
                    })
                })
                const data = await res.json();
                setUserData(data.data);
                if (!res.ok) {
                    console.log('에러가 발생하였습니다.')
                    return
                }
            } catch (error) {
                alert(error)
            }
        }
        fetchData();
    }, [])

    return (
        <>
            <div className="widget basis-full md:basis-[49.3%]">
                <div className="font-bold p-5 py-3 flex justify-between items-center">
                    <h3>신규 가입회원</h3>
                    <Link href="/admin/member" className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm p-5 py-2.5'>회원전체</Link>
                </div>
                <div className="w-full">
                    <ul className='flex py-4 text-sm justify-between border-b.bg=[#f6f9fc]'>
                        <li className='basis-[23%] text=[#6f809a] font-bold text-center text-xs sm:text-sm '>아이디</li>
                        <li className='basis-[23%] text=[#6f809a] font-bold text-center text-xs sm:text-sm '>이름</li>
                        <li className='basis-[23%] text=[#6f809a] font-bold text-center text-xs sm:text-sm '>닉네임</li>
                        <li className='basis-[23%] text=[#6f809a] font-bold text-center text-xs sm:text-sm '>가입일</li>
                    </ul>
                </div>
            </div>
        </>
    )
}