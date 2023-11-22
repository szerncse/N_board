import db from '@/db'
import { RowDataPacket } from 'mysql2/promise'
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Comment from '@/app/component/comment';
import EditDelete from './editDelete';


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
async function Getip() {
  const res = await fetch('http://localhost:3000/api/get-ip');
  // const res = await fetch('https://n-board-szerncse.vercel.app/api/get-ip');
  const data = res.json();
  if (!res.ok) {
    alert("에러가 발생하였습니다.")
    return;
  }
  return data;
}


export default async function Detail({
  params
}: {
  params?: { id: number }
}) {

  const getIp = await Getip();
  const userIp = getIp.data
  const postId = params?.id !== undefined ? params.id : 1;
  const [results] = await db.query<RowDataPacket[]>('select * from coco.board where id = ?', [postId]);
  const post = results && results[0]
  let session = await getServerSession(authOptions) as userInfo;
  const [countResult] = await db.query<RowDataPacket[]>('select count (*) as cnt from coco.view_log where postid = ? and ip_address = ?', [postId, userIp]);
  const totalCnt = countResult[0].cnt;
  // console.log(totalcnt+"개")

  if (totalCnt === 0) {
    await db.query<RowDataPacket[]>('update coco.board set count = count + 1 where id = ?', [postId]);

    await db.query<RowDataPacket[]>('insert into coco.view_log(postid, ip_address, view_date) select ?, ?, NOW() where not exists (select 1 from coco.view_log where postid = ? and ip_address = ? and view_date > now() - interval 24 hour)', [postId, userIp, postId, userIp])

    /*select 1 존재 여부를 확인하기 위해 사용 > 1이라는 건 상수 값으로 실제 데이터는 중요하지 않으며, 존재 여부를 확인하기 위함

    내가 원하는 테이블에서 어떠한 조건 즉 and 까지 포함한 3가지 조건이 모두 충족하는 조건을 찾는다.

     어떠한 행도 반환하지 않을 때만 참이 된다.  즉 3가지 조건이 모두 참일때 혹은 데이터가 없을때 쿼리가 실행된다.*/
  }

  return (

    <>

      {
        results.length > 0 &&
        (
          <>
            <p>제목 : {post?.title}</p>
            <p>제목 : {post?.content}</p>
            <p>조회수 : {post?.count}</p>
            {
              session ? <Comment id={post?.id} /> : <p className="block border p-4 text-center my-5 rounded-md bg-emerald-100"> <Link href="/login">로그인 이후 댓글을 작성할 수 있습니다❕</Link> </p>
            }
            <EditDelete results={post as propsType['results']} />
          </>
        )
      }
    </>

  )
}



