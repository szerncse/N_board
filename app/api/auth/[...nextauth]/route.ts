
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import GooglerProvider from "next-auth/providers/google";

export const authOptions = {
    providers : [
        GithubProvider ({
            clientId : `${process.env.GITHUB_ID}`,
            clientSecret : `${process.env.GITHUB_PW}`
        }),
        KakaoProvider ({
            clientId : `${process.env.KAKAO_ID}`,
            clientSecret : `${process.env.KAKAO_PW}`
        }),
        NaverProvider ({
            clientId : `${process.env.NAVER_ID}`,
            clientSecret :`${process.env.NAVER_PW}`
        }),
        GooglerProvider ({
            clientId : `${process.env.GOOGLE_ID}`,
            clientSecret : `${process.env.GOOGLE_PW}`
        })
    ],
    secret: `${process.env.SECRET}`
}
const handler=NextAuth(authOptions);
export { handler as GET, handler as POST }
