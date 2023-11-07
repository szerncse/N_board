'use client'
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
    const startPage = Math.floor((page - 1)) / (totalPageCnt) * totalPageCnt + 1;
    const endPage = Math.min(lastPage, startPage + totalPageCnt -1);



    return (
    <>

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
    {page > 5 && <button className='bg-white border px-1.5 py-1 rounded text-sm' onClick={()=>{setPage(page - 5)}}>이전</button>}
    {
        Array(endPage - startPage + 1).fill(null).map((_,i)=>
        {
            const pageNumber = i + startPage;
            return(
                <button key={pageNumber} onClick={()=>{setPage(pageNumber)}} className='bg-white border px-1.5 py-1 rounded text-sm basis-32'>{pageNumber}</button>
            )
        })
    }

    {page < lastPage && <button className='bg-white border px-1.5 py-1 rounded text-sm' onClick={()=>{setPage(page + 5)}}>다음</button>}

       </div>
    </>
    
    )
}