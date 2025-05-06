import React from 'react'
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TbAntennaBars5 } from "react-icons/tb";
import { FaGlobeAsia, FaUser } from "react-icons/fa";
import { ImSpinner11 } from "react-icons/im";
import { BsFillTagsFill } from "react-icons/bs";
import { MdLocalGroceryStore } from "react-icons/md";
import { BiPlusMedical } from "react-icons/bi";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const generateTrigData = (points = 14, step = 1) => {
    const labels = [];
    const sinData = [];
    const cosData = [];
    for (let i = 0; i < points; i++) {
        const x = i * step;
        labels.push(x);
        sinData.push(Math.sin(x));
        cosData.push(Math.cos(x));
    }
    return { labels, sinData, cosData };
};

const { labels, sinData, cosData } = generateTrigData();

const chartData = {
    labels,
    datasets: [
        {
            label: 'sin(x)',
            data: sinData,
            borderColor: '#ff6384',
            backgroundColor: '#ff638466',
            tension: 0.4,
            fill: false,
            pointRadius: 4,
            pointBorderWidth: 1
        },
        {
            label: 'cos(x)',
            data: cosData,
            borderColor: '#36a2eb',
            backgroundColor: '#36a2eb66',
            tension: 0.4,
            fill: false,
            pointRadius: 4,
            pointBorderWidth: 1
        }
    ]
};

const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top'
        }
    },
    scales: {
        y: {
            min: -1.5,
            max: 1.5
        }
    }
};

const stats = [
    { label: 'Total Users', value: 2540, icon: <FaUser /> },
    { label: 'New Users', value: 120, icon: <BiPlusMedical /> },
    { label: 'Total Shop', value: 656, icon: <MdLocalGroceryStore /> },
    { label: 'Total Orders', value: 9540, icon: <BsFillTagsFill /> },
    { label: 'Pending Orders', value: 10, icon: <ImSpinner11 /> },
    { label: 'Online Orders', value: 8540, icon: <FaGlobeAsia /> }
];

const LineChart = () => {
    return (
        <div className="border-[0.5px] border-gray-300">
            <div className="flex items-center border-[1px] border-gray-300 p-2 gap-2">
                <div className="flex items-center text-[18px] text-gray-700">
                    <TbAntennaBars5 />
                </div>
                <div className="flex items-center text-[14px] font-semibold text-gray-700">
                    <h2>Site Analytics</h2>
                </div>
            </div>


            <div className="w-full flex flex-col lg:flex-row gap-4 p-8 lg:gap-6 border-[0.5px] border-gray-300 bg-white">
                <div className="w-full flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-[70%] bg-gray-50 p-4 border-[0.5px] border-gray-300">
                        <Line data={chartData} options={chartOptions} />
                    </div>
                    <div className="w-full lg:w-[30%] grid grid-cols-2 gap-6">
                        {stats.map((stat, i) => (
                            <div
                                key={i}
                                className="bg-[#b6b3b3] p-4 hover:bg-gray-800 transition-all duration-100 transform cursor-pointer flex flex-col items-center justify-center text-center"
                            >
                                <div className="text-3xl text-white mb-2">{stat.icon}</div>
                                <div className="text-lg font-bold text-white">{stat.value}</div>
                                <div className="text-xs font-medium text-white opacity-75">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LineChart;