import { promises } from "dns";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
    req: NextRequest,
    res: NextResponse
) : Promise<NextResponse> =>{

    return NextResponse.json({message: "성공"});
    
}