import { Pie } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react'
import {Chart as ChartJS, ArcElement, Tooltip, Legend, Title} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);
export default function PieChart() {


    const dataPie = {
        labels: ['red', 'blue', 'yellow', 'green', 'purple'],
        datasets:[{
            label: "# of products",
            data: [12, 19, 4, 2, 55,],
            backgroundColor: [
                '#f44443',
                '#a2c8fe',
                '#f5ff8c',
                '#9cffaa',
                '#fe94f5',
            ],
            borderColor: 'transparent',
            borderWidth: 1,
        }]
    };


    const optionPie = {
        reponsive: true,
        plugins: {
            title: {
                fontSize: 20,
                text: 'sth Chart',
                display: false
            },
            legend: {
                labels: {
                    font: {size:10},
                    position: 'bottom'
                },
            }
        }
    }
    
return (
    <div className=" w-auto h-auto ">
        <Pie data ={dataPie} options={optionPie}></Pie>
    </div>
  )
}
