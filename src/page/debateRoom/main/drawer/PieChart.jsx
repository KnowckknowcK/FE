import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Legend} from 'chart.js';
import styles from './PieChart.module.css';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// 필요한 차트 요소 등록
ChartJS.register(ArcElement, ChartDataLabels, Legend);

const options = {
    
    plugins: {
        legend: {
            display: true,
            position: 'right',
            labels: {
                useLineStyle: true,
                usePointStyle: true
            }
        },
        
        datalabels: {
            color: '#FFFFFF', 
            formatter: (value) => {
                return Math.round(value * 10) / 10 + '%'; // 값을 받아서 뒤에 '%'를 붙여서 반환
            }
        }
    }
};

export const PieChart = ({agreeRatio, disagreeRatio}) => {
    const data = {
        labels: ['찬성', '반대'],
        datasets: [
            {
                data: [agreeRatio, disagreeRatio],
                
                backgroundColor: [
                    '#569CA2',
                    '#CD6E6E',
                ],
                
                borderColor: [
                    'white'
                ],
                borderWidth: 1,
            },
        ],
        
    }
    return(
        <div className={styles.pieChart}>
            <Pie data={data} options={options}/>
        </div>
    );
}



