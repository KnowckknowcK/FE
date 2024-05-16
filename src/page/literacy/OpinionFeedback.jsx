import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./Feedback.module.css";
import BottomNavBar from '../../components/bottomNavBar/bottomNavBar';
import { useNavigate } from "react-router-dom";


const OpinionFeedback = ({state}) => {
    const location = useLocation();
    const title = location.state?.title;
    const opinion = location.state?.opinion;
    const position = location.state?.position;
    const category = location.state?.category;
    const articleId = location.state?.articleId;

  const navigate = useNavigate();

    
    return (
        <div style={{overflowY:"hidden",overflowX:"hidden", padding:"20px"}}>
            <h3 style={{marginTop:"80px"}}> AI 피드백 </h3>
            <div className={styles.divBox}>
                <h3 style={{wordBreak:"keep-all", lineHeight:"140%"}}><button className={styles.category}>{category}</button>  {title > 30 ? title.substr(0,30) + "..." : title}</h3>
                <h5>나의 입장 : {position}</h5>
                    <div className={styles.feedbackBox}>
                        <h4>견해 작성 내용</h4>
                        <p>{opinion.content}</p>
                    </div>
                <div className={styles.feedbackBox}>
                    <h4>피드백 내용</h4>
                    <p>{opinion.feedbackContent}</p>
                </div>
            </div>
            <div style={{display:"flex", justifyContent:"space-around"}}>
                <button className={styles.feedbackBtn} onClick={() => {navigate('/')}}>홈으로</button>
                <button className={styles.feedbackBtn} onClick={() => {navigate(`/debate-room/${articleId}`)}}>토론방 입장</button>
            </div>
            <BottomNavBar/>
        </div>
    )
}

export default OpinionFeedback;