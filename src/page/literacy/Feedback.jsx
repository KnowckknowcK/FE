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
        <div className={styles.feedbackDiv}>
            <h3> AI 피드백 </h3>
            <div className={styles.divBox}>
                <h3 style={{lineHeight:"140%"}}><button className={styles.category}>{category}</button>  {title > 30 ? title.substr(0,30) + "..." : title}</h3>
                <div style={{display:"flex", justifyContent:"space-between", height:"150px", gap:"10px"}}>
                    <div className={styles.contentBox}>
                        <h4>피드백 점수</h4>
                        <p>{summary.score}</p>
                    </div>
                    <div style={{display:"flex", flexDirection:"column", width:"100%", gap:"10px"}}>
                    <div className={styles.contentColBox}>
                        <h4 style={{margin:"0px"}}>소요 시간</h4>
                        <p style={{margin:"0px"}}>{`0${Math.floor((takenTime / 60000) % 60)}`.slice(-2)} 분 {`0${Math.floor((takenTime / 1000) % 60)}`.slice(-2)} 초</p>
                    </div>
                    <div className={styles.contentColBox}>
                        <h4 style={{margin:"0px"}}>레벨 포인트</h4>
                        <p style={{margin:"0px"}}>{summary.point} 점</p>
                    </div>
                    </div>
                </div>
                <div className={styles.feedbackBox}>
                    <p style={{fontWeight:"700"}}>피드백 내용</p>
                    <p className={styles.summaryContent}>{summary.content}</p>
                </div>
            </div>
            <div style={{display:"flex", justifyContent:"space-around"}}>
                <button className={styles.feedbackBtn} onClick={() => {navigate('/')}}>홈으로</button>
                <button className={styles.feedbackBtn} onClick={() => {navigate('/opinion-writing', {state: {data: data}})}}>견해 작성하기</button>
            </div>
            <BottomNavBar/>
        </div>
    )
}

export default Feedback;