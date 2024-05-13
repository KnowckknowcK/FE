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

  const navigate = useNavigate();

    
    return (
        <div style={{overflowY:"hidden", overflowX:"hidden"}}>
            <h3 style={{marginLeft:"10px", marginTop:"100px"}}> AI 피드백 </h3>
            <div className={styles.divBox}>
                <h3><button className={styles.category}>{category}</button>  {title}</h3>
                
                <div style={{display:"flex"}}>
                    <div className={styles.positionDiv}>
                        <p >입장</p>
                        <p style={{fontWeight:"600"}}>{position}</p>
                    </div>
            
                </div>
                <div className={styles.feedbackBox}>
                    <p>피드백 내용</p>
                    <p>{opinion.feedbackContent}</p>
                </div>
            </div>
            <div style={{ display:"flex", margin: "5px", justifyContent:"center"}}>
                <button className={styles.feedbackBtn} onClick={() => {navigate('/')}}>홈으로</button>
            </div>
            <BottomNavBar user="1"></BottomNavBar>
        </div>
    )
}

export default OpinionFeedback;