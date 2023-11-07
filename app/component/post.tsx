'use client'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {useEffect, useState } from 'react'

export default function Post(){
    const [posts, setPosts] = useState([]);
    const [totalCnt, setTotalCnt] = useState(0);
    const [page, setPage] = useState(1);


    useEffect(()=>{
        const fatcData = async ()=>{
            if(!page) return;
            const res = await fetch(`/api/post?page=${page}`);
            const data = await res.json();
            setPosts(data.results);
            setTotalCnt(data.totalCnt);
            console.log(data.results)
        }
        fatcData()
    }, [page])


    const lastPage = Math.ceil(totalCnt / 15);
    const totalPageCnt = 5;
    const startPage = Math.floor((page - 1) / totalPageCnt) * totalPageCnt + 1;
    const endPage = Math.min(lastPage, startPage + totalPageCnt -1);

    const nextPage = () =>{
        const nextStart = Math.ceil((page + 1) / 5) * 5 + 1;
        setPage(nextStart)
    }
    const Prevpage = () =>{
        const prevStart = Math.floor((page - 1) / 5) * 5 - 4 ;
        setPage(prevStart)
    }

    return (
    <>
   
    <div className="mx-auto max-w-7xl p-6">
        <div className="flex justify-between items-center mb-6">
            <h1 className='text-2xl font-semibold'>게시판</h1>
             <Link href="/write" className='bg-orange-500 text-white px-4 py-2 rounded shadow-md hover:bg-orange-600' >글쓰기</Link>
        </div>
    </div>

     {
         posts && posts.map((e,i)=>{
             return(
                 <React.Fragment key={i}>
                <p>현재페이지: {page}</p>
                <p>가격: {e.amout}</p>
                <p>결제일자: {e.payment_date}</p>
                </React.Fragment>
            )
        })
    }


    <div className='flex justify-center gap-x-5 mb-5 '>
    {page > 5 && <button className='bg-white border px-1.5 py-1 rounded text-sm' onClick={()=>{Prevpage()}}>이전</button>}
    {
        Array(endPage - startPage + 1).fill(null).map((_,i)=>
        {
            const pageNumber = i + startPage;
            return(
                <button key={pageNumber} onClick={()=>{setPage(pageNumber)}} className={`${page === pageNumber ? 'bg-amber-200' : 'bg-white'} border px-1.5 py-1 rounded text-sm basis-32`}>{pageNumber}</button>
            )
        })
    }

    {page < lastPage && <button className='bg-white border px-1.5 py-1 rounded text-sm' onClick={()=>nextPage()}>다음</button>}

       </div>
    </>
    
    )
}