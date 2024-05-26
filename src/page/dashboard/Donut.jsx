import React, {useEffect, useState} from 'react';
import {Doughnut} from 'react-chartjs-2';
import {Chart} from "chart.js";
const Donut = ({value}) => {
    // console.(value)

    const data = {
        label: ['Value', 'Remainder'],
        datasets: [
            {
                data: [value, 100-value],
                backgroundColor: ['#F5F5F5', '#7CC8A4'],
                borderWidth: 0,
                borderRadius:10,
                cutout: 55,
            },
        ],
    };

    const textPlugin = {
        id: 'text',
        afterDraw: (chart) => {
            const ctx = chart.ctx;
            ctx.save();

            //level 표시
            ctx.font = "bold 17px 'Noto Sans'";
            ctx.textAlign = 'center';
            ctx.fillStyle = 'white'
            ctx.textBaseline = 'middle';
            const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
            const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
            ctx.fillText(`LEVEL${Math.floor(value / 100) + 1}`, centerX, centerY - 10);

            //퍼센트 표시
            ctx.font = "bold 24px 'Noto Sans'";
            ctx.fillText(`${value}%`, centerX, centerY + 15);
            ctx.restore();
        }
    }
    Chart.register(textPlugin);
    const options = {
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                enabled: false,
            },
            legend: {
                display: false,
            },
            datalabels: {
                display: false
            }
        }
    };

    return <Doughnut data={data} options={options} />;
};

export default Donut;