'use client'

interface deleteType {
    name: string;
    id: number
}

export default function MemberDelete({ name, id }: deleteType) {
    const DeleteMember = async () => {
        const msgchk = confirm(name + "님을 삭제 하시겠습니까?\n삭제 이후 어떠한 경우도 복구 할 수 없습니다.");
        if (msgchk) {
            try {
                const res = await fetch('/api/delete', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        pathUrl: 'member',
                        id: id
                    })
                })
                if (res.ok) {
                    const data = await res.json();
                    if (data.message) {
                        alert(data.message);
                        window.location.href = "/admin/member"
                    }
                }

            } catch (error) {

            }
        } else {

        }
    }
    return (
        <button onClick={DeleteMember}>삭제</button>
    )
}