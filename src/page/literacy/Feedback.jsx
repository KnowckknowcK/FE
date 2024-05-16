import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./Feedback.module.css";
import BottomNavBar from '../../components/bottomNavBar/bottomNavBar';
import { useNavigate } from "react-router-dom";


const Feedback = ({state}) => {
    const location = useLocation();
    const title = location.state?.title;
    const summary = location.state?.summary;
    const takenTime = location.state?.takenTime;
    const category = location.state?.category;
    const data = location.state?.data;

  const navigate = useNavigate();

    
    return (
        <div style={{overflowY:"hidden", overflowX:"hidden"}}>
            <h3 style={{marginLeft:"10px", marginTop:"100px"}}> AI 피드백 </h3>
            <div className={styles.divBox}>
                <h3><button className={styles.category}>{category}</button>  {title}</h3>
                
                <div style={{display:"flex"}}>
                    <div className={styles.contentBox}>
                        <p>피드백 점수</p>
                        <h4>{summary.score}</h4>
                    </div>
                    <div  className={styles.contentBox}>
                        <p>소요 시간</p>
                        <p>{`0${Math.floor((takenTime / 60000) % 60)}`.slice(-2)} 분 {`0${Math.floor((takenTime / 1000) % 60)}`.slice(-2)} 초</p>
                    </div>
                </div>
                <div className={styles.feedbackBox}>
                    <p>피드백 내용</p>
                    <p>{summary.content}</p>
                </div>
            </div>
            <div style={{ display:"flex", margin: "5px", justifyContent:"center"}}>
                <button className={styles.feedbackBtn} onClick={() => {navigate('/opinion-writing', {state: {data: data}})}}>견해 작성하기</button> <button className={styles.feedbackBtn} onClick={() => {navigate('/')}}>홈으로</button>
            </div>
            <BottomNavBar/>
        </div>
    )
}

export default Feedback;