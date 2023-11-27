'use client';
import { Bar } from 'react-chartjs-2';
import Chart, { registerables, BarElement, CategoryScale, LinearScale } from 'chart.js/auto';
import { useEffect } from 'react';


export default function Chartcom() {
    useEffect(() => {
        Chart.register(...registerables, BarElement, CategoryScale, LinearScale)

    }, [])

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
        animations: {
            tension: {
                duration: 1000,
                dasing: "easeOutBounce",
                from: 1,
                to: 0,
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }


    return (
        <>

            {/* <Bar width={400} heigth={200} data={data options={options}} /> */}
        </>
    )
}
