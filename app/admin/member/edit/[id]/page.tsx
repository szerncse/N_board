'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

interface userType {
    email: string;
    password?: string;
    name: string;
    level: number;
    phone: string;
    type: string;
    id: number;
}

export default function MemberEdit({ params }: { params: { id: number } }) {
    const [userData, setUserData] = useState<userType>();

    useEffect(() => {
        const fetcData = async () => {
            try {
                const res = await fetch('/api/admin', {
                    cache: 'no-cache',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        pathUrl: 'edit',
                        id: params.id
                    })
                })
                if (res.ok) {
                    const result = await res.json();
                    const data = result.data;
                    if (data.length < 1) {
                        alert("데이터가 없습니다.");
                        window.location.href = "/admin/member"
                    }
                    setUserData(data[0]);
                }
            } catch (error) {
                alert(error);
            }
        }
        fetcData()
    }, [params.id])


    const [fromData, setFromData] = useState<userType>({
        email: userData ? userData.email : '',
        password: userData ? userData.password : '',
        name: userData ? userData.name : '',
        level: userData ? userData.level : 2,
        phone: userData ? userData.phone : '',
        type: 'edit',
        id: params.id,

    })

    useEffect(() => {
        setFromData({
            email: userData ? userData.email : '',
            password: userData ? userData.password : '',
            name: userData ? userData.name : '',
            level: userData ? userData.level : 2,
            phone: userData ? userData.phone : '',
            type: 'edit',
            id: params.id
        })
    }, [userData, params.id])

    const changeElement = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFromData({
            ...fromData, [e.target.name]: e.target.value
        })
    }
    const submitEvent = async () => {
        try {
            const res = await fetch('/api/auth/signup',
                {
                    cache: 'no-cache',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(fromData)
                })
            if (res.ok) {
                const result = await res.json();
                const data = result.data;
                if (result.message === '성공') {
                    alert(data + "님의 정보를 수정 하였습니다.");
                    window.location.href = "/admin/member"
                }
            }

        } catch (error) {
            alert(error)
        }
    }


    return (
        <>
            <div className="widget w-full overflow-hidden mb-5 p-4">
                <h3>회원 수정</h3>
            </div>
            <div className="widget w-full overflow-hidden mb-5 p-4">
                <div className="flex mb-4 items-center">
                    <label htmlFor="email" className="basis-3/12 text-xs sm:text-sm">이메일 : </label>
                    <input onChange={changeElement} defaultValue={userData && userData.email} type="text" name="email" className="border text-sm p-2 rounded-md" />
                </div>
                <div className="flex mb-4 items-center">
                    <label htmlFor="email" className="basis-3/12 text-xs sm:text-sm">패스워드 : </label>
                    <input onChange={changeElement} defaultValue={userData && userData.password} type="password" name="password" className="border text-sm p-2 rounded-md" />
                </div>
                <div className="flex mb-4 items-center">
                    <label htmlFor="email" className="basis-3/12 text-xs sm:text-sm">이름 : </label>
                    <input onChange={changeElement} defaultValue={userData && userData.name} type="text" name="name" className="border text-sm p-2 rounded-md" />
                    
                    <div className="flex mb-4 items-center">
                        <label htmlFor="phone" className="basis-3/12 text-xs sm:text-sm">폰 : </label>
                        <input onChange={changeElement} defaultValue={userData && userData.phone} type="text" name="phone" className="border text-sm p-2 rounded-md" />
                    </div>
                    {/* <div className="flex mb-4 items-center">
                    <label htmlFor="email" className="basis-3/12 text-xs sm:text-sm">닉네임 : </label>
                    <input defaultValue={userData && userData.nickname} type="text" name="nickname" className="border text-sm p-2 rounded-md" />
                </div> */}

                    <div className="flex mb-4 items-center">
                        <label htmlFor="email" className="basis-3/12 text-xs sm:text-sm">레벨 : </label>
                        <select onChange={changeElement}
                            value={`${userData && userData.level}`}
                            name="level" className="border text-sm px-5 py-2 rounded-md">
                            {/* {
                            Array(8)
                        } */}
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                        </select>
                    </div>

                </div>
                <div className="flex justify-end gap-x-5">
                    <Link href="/admin/member" className="bg-red-500 text-white px-4 py-2 rounded shadow-md">취소</Link>
                    <button onClick={submitEvent}
                        className="bg-orange-500 text-white px-4 py-2 rounded shadow-md hover:bg-orange-600">수정</button>
                </div>
            </div>
        </>
        // <p>{params.id}</p>
    )
}