import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement} from 'chart.js';
import styles from './PieChart.module.css';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// 필요한 차트 요소 등록
ChartJS.register(ArcElement, ChartDataLabels);
const options = {
    plugins: {
        datalabels: {
            color: '#000', // 레이블의 색상을 검은색으로 설정
            anchor: 'end', // 레이블의 위치를 조각의 끝부분으로 설정
            align: 'start', // 레이블을 조각의 시작 부분으로 정렬
            formatter: (value) => {
                return value + '%'; // 값을 받아서 뒤에 '%'를 붙여서 반환
            }
        }
    }
};
export const PieChart = ({agreeRatio, disagreeRatio}) => {
    const data = {
        labels: ['찬성', '반대'],
        datasets: [
            {
                label: '# of Votes',
                data: [agreeRatio, disagreeRatio],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
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



