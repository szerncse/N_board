'use client'

import { useEffect } from "react"


// async function getData() {


//     return data;
// }

export default function Visit() {

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res1 = await fetch('/api/get-ip');
                const data = await res1.json();
console.log( data)
                await fetch('/api/visit', {
                    cache: 'no-cache',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ip: data.data.ip,
                        platform: data.data.platform,
                        agent: data.data.userAgent
                    })
                })

            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    }, [])

    return (
        <p>방문자</p>
    )
}
