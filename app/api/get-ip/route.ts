import { promises } from "dns"
import {NextRequest, NextResponse} from "next/server"



export const GET = async(req: NextRequest) : Promise<NextResponse> =>{
    
    if(req.method === 'GET'){
        const ip = req.headers.get("x-forwarded-for")
        const userAgent = req.headers.get("user-agent");
        const platform = req.headers.get("sec-ch-platform");
        const data = {
            ip: ip,
            userAgent : userAgent,
            platformL : platform
        }
        return NextResponse.json({data: data})
    }else{
        
        return NextResponse.json({error: "에러가 발생하였습니다."})
    }
}