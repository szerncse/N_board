import { promises } from "dns";
import { NextRequest, NextResponse } from "next/server";
import db from '@/db'

interface PosNumber {
    id: number;
}

export const POST = async (
    req: NextRequest,
) : Promise<NextResponse> =>{
    
if(req.method === 'POST'){
    try{

        const {id}: PosNumber =JSON.parse(await req.text());
        
        if(!id){
            return NextResponse.json({message: "데이터가 부족합니다."});
        }else{
            // select - 선택
            // insert - 입력
            // delete - 삭제
            // update - 수정
            const [results] = await db.query(
                'delete from borad where id = ?',[id]
                );
                return NextResponse.json({message: "성공"});
        }

    }catch(error){
        return NextResponse.json({error: "에러"});
    }
}else{
    return NextResponse.json({error: "정상적인 데이터가 아닙니다."});
}
    return NextResponse.json({message: "성공"});

}
