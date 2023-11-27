// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import { Bar } from 'react-chartjs-2';
// import { Chart } from 'chart.js'; 클라이언트에서만 동작한다 컴포넌트에서 동작안함


// interface userInfo {
//     user: {
//         name: string;
//         email: string;
//         image?: string;
//         level?: number
//     }
// }


export default async function Admin() {
    const data = {
        labels: ['orange', 'green', 'blue'],
        datasets: [
            {
                label: 'My First Dataset',
                data: [10, 50, 5],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            }
        ]
    }
    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }

    // let sessions = await getServerSession(authOptions) as userInfo;
    // if (!sessions && sessions || sessions?.user.level !== 10) {
    //     return (
    //         <p>관리자만 접속 가능한 페이지 입니다.</p>
    //     )
    // }

    return (
        <>
            <p className='bg-yellow-300 border w-28 text-center'>관리자 전용</p>
            {/* <bar data={data options={options}}></bar> */}

        </>
    )
}