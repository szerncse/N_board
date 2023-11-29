'use client';
import Link from "next/link";
import { useEffect, useState } from 'react';

interface postType {
    id: number;
    barentid?: number;
    title?: string;
    content: string;
    userid: string;
    username: string;
    count?: number;
    date: string;
}

export default function Newpost() {
    const [postData, setPostData] = useState<postType[]>()
    const [commentData, setCommentData] = useState<postType[]>()

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
                        pathUrl: 'mainPost'
                    })

                })
                const data = await res.json();
                setPostData(data.data.newPost);
                setCommentData(data.data.newComment);

                if (!res.ok) {
                    console.log('에러가 발생하였습니다.')
                    return
                }

                return data;


            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    const listItems = ["아이디", "이름", "가입일"]
    return (
        <>
            <div className="mt-5 md:mt-0 basis-full md:basis-[49.3%]">
                <div className="widget mb-5">

                    <div className="font-bold p-5 py-3 flex justify-between items-center">
                        <h3>신규 게시글</h3>
                        <Link href="/admin/member" className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm p-5 py-2.5'>회원전체</Link>
                    </div>
                    <div className="w-full">
                        <ul className='flex py-4 text-sm justify-between border-b.bg=[#f6f9fc]'>
                            <li className='basis-[33%] text=[#6f809a] font-bold text-center text-xs sm:text-sm '>닉네임</li>
                            <li className='basis-2/5 text=[#6f809a] font-bold text-center text-xs sm:text-sm '>제목</li>
                            <li className='basis-1/5 text=[#6f809a] font-bold text-center text-xs sm:text-sm '>작성일</li>
                        </ul>
                    </div>
                </div>
                <div className="widget md:mb-5">

                    <div className="font-bold p-5 py-3 flex justify-between items-center">
                        <h3>신규 댓글</h3>
                        <Link href="/admin/member" className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm p-5 py-2.5'>댓글 전체</Link>
                    </div>
                    <div className="w-full">
                        <ul className='flex py-4 text-sm justify-between border-b.bg=[#f6f9fc]'>
                            <li className='basis-[33%] text=[#6f809a] font-bold text-center text-xs sm:text-sm '>닉네임</li>
                            <li className='basis-2/5 text=[#6f809a] font-bold text-center text-xs sm:text-sm '>제목</li>
                            <li className='basis-1/5 text=[#6f809a] font-bold text-center text-xs sm:text-sm '>작성일</li>
                        </ul>
                        {
                            postData && postData.map((e, i) => {
                                const date = new Date(e.date);
                                const year = date.getFullYear();
                                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                const day = date.getDate().toString().padStart(2, '0')
                                const formatDate = `${year}-${month}-${day}`
                                return (
                                    <ul key={i} className="flex justify-between border-b last:border-0 items-center py-2.5">
                                        {
                                            listItems.map((e, i) => {
                                                return (

                                                    <li className={` text-white font-bold text-center text-xs sm:text-sm`} key={i}>{e}</li>
                                                )
                                            })
                                        }
                                        <li>{formatDate}</li>
                                    </ul>
                                )

                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}