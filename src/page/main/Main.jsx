import React, { useState, useEffect } from 'react';
import RecommendedItem from './RecommendedItem';
import { useNavigate } from "react-router-dom";
import customAxios from "../../lib/customAxios";
import styles from "./Main.module.css";
import BottomNavBar from '../../components/bottomNavBar/bottomNavBar';
import Modal from "../../components/modal/Modal";
import Background from "../../asset/background.png";
import { FiChevronRight } from "react-icons/fi";

const Main = () => {
    const [data, setData] = useState([]);
    const [modal, setModal] = useState(false);

    const navigate = useNavigate();
 
    const clickHandler = () => {
        navigate("/article-list");
    };

    const tutorial = () => {
        navigate("/tutorial");
    }
  	
  	useEffect(() => {
		const fetchData = async() => {
          const res = await customAxios.get('/article/recommended');
          return res.data;
        }	
        fetchData().then(
            res => setData(res.data),
            localStorage.getItem("accessToken")===null ? setModal(true) : setModal(false)
        )    
    }, []);



    return (
        <>
        <div style={{position:'sticky', top: '0px', zIndex: 100}}>
        <div className={styles.topWwrapper}>
            <img src={Background} alt="back" className={styles.backgoundImg} />
            <h2 className={styles.intro}>
                <div className={styles.rowWrapper}><div style={{color: 'var(--color-green)'}}>똑똑</div>과 함께</div>
                AI 피드백 받고, <br/> 문해력을 향상해보세요<br/> 
            </h2>
        </div>
        </div>
        <div className={styles.wrapper}>
            <button className={styles.tutorialBtn} onClick={tutorial}>
                <div className={styles.columnWrapper}>
                <div className={styles.btnText}>똑똑이 처음이신가요?</div>
                <div className={styles.btnTitle}>튜토리얼 보기</div>
                </div>
                <FiChevronRight style={{color:'var(--color-green)',width:"36px", height:"36px"}}/>
            </button>

            <button className={styles.selectBtn} onClick={clickHandler}>
                <div className={styles.columnWrapper}>
                <div className={styles.btnText}>카테고리별 기사가 제공되요</div>
                <div className={styles.btnTitle}>기사 선택하기</div>
                </div>
                <FiChevronRight style={{color:"white",width:"36px", height:"36px"}}/>
            </button>
        </div>

        <div className={styles.secondWrapper}>
            <div className={styles.text}>오늘의 추천 기사</div>
            <div className={styles.subText}>
                무슨 기사를 읽어야할지 모르겠다면 <br/>
                카테고리별로 추천 받아보세요
            </div>
            <div className={styles.recommendList}>
                <div />
                {data.map((item,index) =>(
                    <RecommendedItem index={index} data = {item}/>
                ))}
                <div />
            </div>
        </div>


        {/* 로그인 확인 모달창 구현 */}
        { modal === true 
            ? <div className={styles.modalBackground}>
             <div className={styles.modalBackdrop} data-backdrop='static' data-keyboard='false' > <Modal></Modal> </div> 
            </div>
            : null }



        <BottomNavBar/>
        
        </>
    )
}



export default Main;