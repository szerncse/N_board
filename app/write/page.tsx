'use client';

interface formType {
  userid: string;
  username: string;
  title: string;
  content: string;
}

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCustomSession } from "../sessions";


export default function Write() {
  const { data: session } = useCustomSession();
  console.log(session)
  const [formData, setFormData] = useState<formType>({
    userid: session?.user.email ?? '',
    username: session?.user.name ?? '',
    title: '',
    content: ''
  })
  useEffect(() => {
    setFormData({
      userid: session?.user.email ?? '',
      username: session?.user.name ?? '',
      title: '',
      content: ''
      
    })
  }, [session?.user.name, session?.user.email])
// console.log(formData)
  const changeEvent = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)
  }
  const submitEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/write', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        const data = await res.json();
        console.log(data.message);

        alert('정상적으로 등록 하였습니다.');
        window.location.href = '/';
        // 글쓰기후 홈으로
      } else {
        const errorData = await res.json();
        console.log(errorData.error);
      }

    } catch (error) {
      console.log(error);
    }
  }
  if (!session) {
    return <p>로그인안함</p>
  }
  console.log(session)

  return (
    <>
      <div className="max-w-lg mx-auto mt-16">
        <form method="post" onSubmit={submitEvent} className="space-y-6">
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-sky-100 sm:p-6">
              <div className="grid grid-cols-6 gap-6">

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700r">이름</label>
                  <input type="text" id="name" name="name"
                    defaultValue={session.user.name} onChange={changeEvent}
                    className="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div className="col-span-6">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    제목
                  </label>
                  <input type="text" id="title" name="title" onChange={changeEvent}
                    defaultValue={formData.title}
                    className="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>


                <div className="col-span-6">
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700">내용</label>
                  <textarea id="content" name="content" onChange={changeEvent}
                    defaultValue={formData.content}
                    className="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
                    {/* <input type="text" name="email" onChange={changeEvent}/> */}
                </div>
              </div>
            </div>
          </div>
          
{/* 세션의 유저의 이메일이 없으면 인풋이 나오면된다. */}
          {!session?.user.email && (
  <div className="col-span-6">
    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
      이메일
    </label>

    <input
      type="text"
      id="email"
      name="userid"
      onChange={changeEvent}
      className="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
    />
  </div>
)}


          <div className="flex justify-end space-x-4">
            <Link href={"/"} className="bg-sky-500 text-white px-4 py-2 rounded shadow-md hover:bg-sky-600 focus:outline-none">취소</Link>
            <button className="bg-red-300 text-white px-4 py-2 rounded shadow-md hover:bg-yellow-400 focus:outline-none">등록</button>
          </div>
        </form>
      </div>

    </>
  )
}