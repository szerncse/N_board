import db from '@/db';
import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2/promise";


interface PostType {
    pathUrl?: string;
    id?: number;
}

interface MainType {
    totalcnt: number,
    todayCnt: number,
    writeCnt: number,
    commenCnt: number,
    VisitCnt: number,
    VisitTotalCnt: number,
}

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    const { pathUrl, id }: PostType = JSON.parse(await req.text());
    if (req.method === 'POST') {

        switch (pathUrl) {
            case 'member':
                const [memberResult] = await db.query<RowDataPacket[]>('select * from coco.member order by date DESC');
                return NextResponse.json({ message: "성공", data: memberResult })
            case 'edit':
                const [editResult] = await db.query<RowDataPacket[]>('select * from coco.member where id=?', [id]);
                return NextResponse.json({ message: "성공", data: editResult })
            case 'mainCnt':
                const [totalcnt] = await db.query<RowDataPacket[]>('select count(*) as cnt from coco.member');
                const [todayCnt] = await db.query<RowDataPacket[]>('select count(*) as cnt from coco.member where date >= now() - interval 1 day');
                const [writeCnt] = await db.query<RowDataPacket[]>('select count(*) as cnt from coco.board where date >= now() - interval 1 day');
                const [commenCnt] = await db.query<RowDataPacket[]>('select count(*) as cnt from coco.comment where date >= now() - interval 1 day');
                const [VisitCnt] = await db.query<RowDataPacket[]>('select count(*) as cnt from coco.visits where visit_time >= now() - interval 1 day');
                const [VisitTotalCnt] = await db.query<RowDataPacket[]>('select count(*) as cnt from coco.visits');

                const totalData: MainType = {
                    totalcnt: totalcnt[0].cnt ?? 0,
                    todayCnt: todayCnt[0].cnt ?? 0,
                    writeCnt: writeCnt[0].cnt ?? 0,
                    commenCnt: commenCnt[0].cnt ?? 0,
                    VisitCnt: VisitCnt[0].cnt ?? 0,
                    VisitTotalCnt: VisitTotalCnt[0].cnt ?? 0,
                }

                return NextResponse.json({ message: "성공", data: totalData })

            case 'mainNewMember':
                const [todayMember] = await db.query<RowDataPacket[]>('select * from coco.member where date >= now() - interval 1 day');
                return NextResponse.json({ message: "성공", data: todayMember })
            case 'mainPost':
                const [newpost] = await db.query<RowDataPacket[]>('select * from coco.member where date >= now() - interval 1 day');
                const [newComment] = await db.query<RowDataPacket[]>('select * from coco.member where date >= now() - interval 1 day');
                const postData = {
                    newpost: newpost,
                    newComment: newComment
                }
                return NextResponse.json({ message: "성공", data: postData })


            default:
                return NextResponse.json({ error: "알 수 없는 에러가 발생 하였습니다." })
        }

    } else {
        return NextResponse.json({ message: "알 수 없는 에러가 발생 하였습니다." })
    }
}