import React, {useEffect, useState} from 'react';
import {Doughnut} from 'react-chartjs-2';
const Donut = ({value}) => {
    const [displayedValue, setDisplayedValue] = useState(0);
    console.log(value)
    useEffect(() => {
        const interval = setInterval(() => {
            setDisplayedValue((prevValue) => {
                if (prevValue < {value}) {
                    return prevValue + 1; // 데이터 값 증가
                } else {
                    clearInterval(interval);
                    return prevValue;
                }
            });
        }, 20); // 20ms 간격으로 데이터 업데이트

        return () => clearInterval(interval);
    }, [displayedValue]);

    const data = {
        labels: ['Value', 'Remainder'],
        datasets: [
            {
                data: [displayedValue, 100-displayedValue],
                backgroundColor: ['#F5F5F5', '#7CC8A4'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        customPercentage: 20,
        plugins: {
            tooltip: {
                enabled: false,
            },
            // 플러그인 추가
            afterDraw: chart => {
                const ctx = chart.ctx;
                ctx.save();
                ctx.font = "11px Arial";
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
                const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
                ctx.fillText(`${displayedValue}%`, centerX, centerY - 10);
                ctx.fillText(`Class 2`, centerX, centerY + 10);
                ctx.restore();
            },
            legend: {
                display: false,
            }
        }
    };
    return <Doughnut data={data} options={options} />;
};

export default Donut;