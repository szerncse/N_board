import Link from "next/link";


export default function AdminNav() {
    const adminMenu = ["메인", "회원관리", "방문 통계"];
    const adminLink = ["/", "/member", "/visit"];
    return (
        <div className="bg-white hidden md:block fixed top-0 left-0 w-48 h-full border-r">
            <ul className="pt-24 text-center">
                {
                    adminMenu.map((e, i) => {
                        return (
                            <li key={i} className="mb-5">
                                <Link href={`/admin/${adminLink[i]}`}>{e}</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div >
    )
}