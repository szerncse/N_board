'use client';
import { useCustomSession } from "@/app/sessions";
import Link from "next/link";
import React from "react";

interface userInfo {
    user: {
        name: string;
        email?: string;
        image?: string;
        level?: number;
    }
}
interface propsType {
    results: {
        id: number;
        userid: string;
        title?: string;
        content: string;
        username?: string;
        count?: number;
        date?: string;
    }
}
const deletePost = async(e:number) =>{
    try{
        const res = await fetch('/api/delete',{
            method : 'POST',
            headers : {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({id: e})
        })
        if(res.ok){
            const data = await res.json();
            alert("정상적으로 삭제 되었습니다.");
            window.location.href = "/"
        }else{
            alert("삭제 실패");
            
            return;
        }

    }catch(error){
        console.log(error)
    }
}

export default function EditDelete({ results }: propsType) {
    const { data: session } = useCustomSession();
    return(

    <React.Fragment>
         {
        session && session.user && 
            (results && results && session.user.email === results.userid 
                ) && 
                <>

                <Link href={`/`} className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600">수정</Link>
                <button onClick={()=>{deletePost(results.id)}} className="bg-sky-500 text-white px-4 py-2 rounded shadow-md hover:bg-sky-600">삭제</button>
                
                </>
        }
    </React.Fragment>

    
)


    }