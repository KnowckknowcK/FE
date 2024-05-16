import React, { useState, useEffect } from 'react';
import RecommendedItem from './RecommendedItem';
import { useNavigate } from "react-router-dom";
import customAxios from "../../lib/customAxios";
import styles from "./Main.module.css";
import BottomNavBar from '../../components/bottomNavBar/bottomNavBar';

function Main(props) {
    const [data, setData] = useState([]);

    const navigate = useNavigate();
 
    const clickHandler = () => {
        navigate("/article-list");
    };
  	
  	useEffect(() => {
		const fetchData = async() => {
          const res = await customAxios.get('/article/recommand');
          return res.data;
        }	
        
        fetchData().then(
            res => setData(res.data)
        )
            
    }, []);


    return (
        <div className={styles.outer}>
        <img src="/img/shapeImg.png" alt="Shape" className={styles.shapeImg} />
        <div className={styles.blank}></div>
        <div className={styles.wrapper}>
            <h2 className={styles.intro}>
                똑똑과 함께 <br/> AI 피드백 받고, <br/> 문해력을 향상해보세요<br/> 
            </h2>
        </div>

        <div className={styles.explain}>오늘의 맞춤 추천 기사</div>
        <div className={styles.recommendList}>
            {data.map((item) =>(
                <RecommendedItem data = {item}/>
            ))}
        </div>

        <button className={styles.selectBtn} onClick={clickHandler}>
            <div className={styles.btnText}>
                <span>카테고리별 기사 분류가 제공돼요</span>
                <span className={styles.btnTextTitle}>기사 선택하기</span>
            </div>
            <div></div>
            <div>
                <img src="/img/buttonImg1.png" alt="Button" style={{ width: '50px', margin: '5px'}} />
            </div>
        </button>

        <BottomNavBar/>
        </div>
        
    )
}



export default Main;