/*
const {data: session } = useCustomSession();
const data = {
  id: 5,
  name: "홍길동",
  email : "abcd@naver.com"
}
변수 내에 중괄호 {} 가 들어가면 구조 분해 할당(destructuring assignment) > 해당 객체에서 그 속성을 추출해서 새로운 변수로 할당할 때 사용

예를 들어....data .id 이걸 변수로 저장을 따로 하고 싶다면
const {id} = data > const id = 5 값이 저장된다.
data.id 로 사용 가능...

 */


'use client';
import { useState } from "react";
import { useCustomSession } from "../sessions";

interface CommentProps {
    id: number
}
  

export default function Comment(props: CommentProps){
    const {id} = props;
    const [comment, setComment] = useState<string>('');
    const commentValue = (e: React.ChangeEvent<HTMLInputElement>) =>{
      setComment(e.target.value);
    }
    const {data: session } = useCustomSession();
    const cmtSubmit = async ()=>{
        
        try{

            const res = await fetch ('/api/comment', {
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              body: JSON.stringify(comment)
            })
      
          }catch(error){
            console.log(error);
          }
        }


    return( 
        <>
        {
          session && session.user && <>
            <p>댓글 목록</p>
            <input type="text" onChange={commentValue} className="border p-2 border-orange-500 rounded " />
            {comment}
            <button>댓글 전송</button>
          </>
        }
      </>
    )
}