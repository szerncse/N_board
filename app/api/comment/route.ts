import { NextRequest, NextResponse} from "next/server";

interface PostData {
    parentid : number;
    userid : string;
    username: string;
    content: string;
}

export const POST = async (
req: NextRequest
) : Promise<NextResponse> =>{
return NextResponse.json({message: "성공"})
}