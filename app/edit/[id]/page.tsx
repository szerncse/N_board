import db from '@/db'
import { RowDataPacket } from 'mysql2/promise'
import Link from 'next/link';

interface PostList {
    id : number;
    title : string;
    content: string;
    author: string;
    date: string;
    count: number
  }
interface editProps{
    params : {
    id: string;
    }
}
export default async function Edit(props:editProps){
    console.log(props.params)
    const [results] = await db.query<RowDataPacket[]>('select * from coco.board where id = ?',[props.params.id]);
    console.log(results[0].author)

// 'update 테이블명 set 필드=변경값, 필드=변경값, 필드=변경값 where id = 변경할아이디'
// ('update parknamju.board set title= ? , content=? where id = ?',[title, content, id])

    return (
    <>
        {
        results.length > 0
        ? 
        <form method="post">
        <input type="text" name="name"  className="shadow text-gray-700 text-sm mb-2 border"/>
        <input type="text" name="title" 
       className="shadow text-gray-700 text-sm mb-2 border"/>
    
        <textarea name="content" className="shadow text-gray-700 text-sm mb-2 border"  ></textarea>

        <Link href={"/"} className="bg-sky-500 text-white px-4 py-2 rounded shadow-md hover:bg-sky-600 focus:outline-none">취소</Link>
        <button className='bg-yellow-100 text-white px-4 py-2 rounded shadow-md hover:bg-yellow-300 focus:outline-none' >등록</button>
    </form>

         : 
         '데이터 없음'
         }
        </>
    )
}

function NotData(){
    return(
    <>
    <p>데이터가 존재하지 않습니다.</p>
    <Link href="/">목록</Link>
    </>
    )
}









