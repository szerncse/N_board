'use client';
export default function Login() {
  const redirectTo = () => {
    sessionStorage.setItem('preUrl', window.location.href);
    window.location.href = "/login";
  }
  return (
    <button onClick={redirectTo} 
    className="basis-[48%] px-6 py-2.5 bg-purple-400 text-white font-medium text-base mt-2 leading-tight uppercase rounded shadow-md hover:bg-purple-500 hover:shadow-lg focus:bg-purple-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-500 active:shadow-lg transition duration-150 ease-in-out">로그인</button>
  )
}