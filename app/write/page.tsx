'use client';

import Link from "next/link";
import { title } from "process";
import { useState } from "react";

interface forType {
    name: string;
    title: string;
    content: string;
}


export default function Write(){

    const[formData, setFormData] = useState<forType>({
        name: '',
        title: '',
        content: ''
    })

    const changeEvent = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name] : e.target.value});
        // console.log(formData)
    }
    

    return (
    <>

    <form method="post">
        <input type="text" name="name" defaultValue={formData.name} onChange={changeEvent} className="shadow text-gray-700 text-sm mb-3 border"/>
        <input type="text" name="title" defaultValue={formData.title} 
        onChange={changeEvent} className="shadow text-gray-700 text-sm mb-3 border"/>
    
        <textarea name="content" className="shadow text-gray-700 text-sm mb-3 border" onChange={changeEvent} defaultValue={formData.content} ></textarea>

        <Link href={"/"} className="bg-sky-500 text-white px-4 py-2 rounded shadow-md hover:bg-sky-600 focus:outline-none">취소</Link>
        <button className='bg-orange-500 text-white px-4 py-2 rounded shadow-md hover:bg-orange-600 focus:outline-none' >등록</button>
    </form>

    </>
    )
}