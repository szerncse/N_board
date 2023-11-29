import { NextRequest, NextResponse } from "next/server";
import db from '@/db';
import bcrypt from "bcrypt";
import { RowDataPacket } from "mysql2";

interface formType {
    email: string;
    password: string;
    name: string;
    phone: string;
    level?: number;
    type?: string;
    id?: number;
}
export const POST = async (
    req: NextRequest
): Promise<NextResponse> => {
    if (req.method === 'POST') {
        let { email, password, name, level, type, id, phone }: formType = JSON.parse
            (await req.text());
        level = level === undefined ? 2 : level;
        if (type === 'edit') {
            const [coco] = await db.query<RowDataPacket[]>('select password from coco.member where email = ?', [email]);
            if (password === coco[0].password) {
                // console.log("같음")
                await db.query<RowDataPacket[]>('update coco.member set email = ?, name = ?, level = ? where id = ?', [email, name, level, id])
            } else {
                const hash = await bcrypt.hash(password, 10);
                await db.query<RowDataPacket[]>('update coco.member set email = ?, name = ?, level = ? where id = ?', [email, name, level, id])
            }
            return NextResponse.json({ message: "성공", data: name })
        }

        if (!email || !password || !name) {
            return NextResponse.json({ message: "데이터가 부족합니다." })
        }

        const hash = await bcrypt.hash(password, 10)

        const [checkMember] = await db.query<RowDataPacket[]>('select count(*) as cnt from coco.member where email = ?', [email]);
        const memberCnt = checkMember[0].cnt;

        if (memberCnt > 0) {
            return NextResponse.json({ message: "해당 이메일이 존재합니다." })
        } else {
            const [results] = await db.query('insert into coco.member (email, password, name, phone, level) Values(?,?,?,?,?)', [email, hash, name, phone, level]);
            const data = {
                email: email,
                password: password
            }

            return NextResponse.json({ message: "성공", data: data })
        }
    } else {
        return NextResponse.json({ error: "실패" })
    }
}