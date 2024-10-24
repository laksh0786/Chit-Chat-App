import React from 'react'
import { Line, Doughnut } from 'react-chartjs-2'
import { ArcElement, CategoryScale, Chart as ChartJS, Filler, Legend, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js'
import { getLast7Days } from '../../lib/feature';

ChartJS.register(CategoryScale, Tooltip, Filler, LinearScale, PointElement, LineElement, ArcElement, Legend);


const labels = getLast7Days();

const linearChartOptions = {

    responsive: true,
    
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false
        }
    },

    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            beginAtZero: true,
            grid: {
                display: false
            }
        }
    }
}

const LineChart = ({ value = [] }) => {

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Revenue',
                data: value,
                fill: true,
                backgroundColor: 'rgb(255, 99, 132 , 0.3)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    }

    return (
        <div>
            <Line data={data} options={linearChartOptions} />
        </div>
    )
}


const doughnutChartoption = {
    responsive: true,
    // plugins: {
    //     legend: {
    //         display: false,
    //     },
    //     title: {
    //         display: false
    //     }
    // },
    cutout:110
}

const DoughnutChart = ({value=[] , labels=[]}) => {

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Total Chats vs Group Chats',
                data: value,
                fill: true,
                backgroundColor: ['rgb(255, 99, 132 , 0.4)', 'rgb(54, 162, 235 , 0.4)'],
                borderColor: ['rgba(255, 99, 132)', 'rgba(54, 162, 235)'],
                offset:20
            },
        ],
    }

    return (
        <Doughnut data={data} options={doughnutChartoption} style={{
            zIndex: 2
        }}/>
    )
}

export { LineChart, DoughnutChart }