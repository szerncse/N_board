// not found.tsx
import {headers} from 'next/headers'

export default async function NotFound(){
    const headerList = headers();
    const domain = headerList.get('referer');
    // const data = await getSiteData(domain)

    return(
        <p className='text-sky-500  text-center p-40'>입력하신 {domain}은 없는 페이지 입니다.</p>
    )
}