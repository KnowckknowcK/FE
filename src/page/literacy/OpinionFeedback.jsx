import { useLocation } from "react-router-dom";
import styles from "./Feedback.module.css";
import BottomNavBar from '../../components/bottomNavBar/bottomNavBar';
import { useNavigate } from "react-router-dom";


const OpinionFeedback = () => {
    const location = useLocation();
    const title = location.state.title;
    const opinion = location.state?.opinion;
    const position = location.state?.position;
    const category = location.state?.category;
    const articleId = location.state?.articleId;

  const navigate = useNavigate();

    
    return (
        <div className={styles.feedbackDiv}>
            <h3> AI 피드백 </h3>
            <div className={styles.divBox}>
                <h3 style={{lineHeight:"140%"}}><button className={styles.category}>{category}</button>  {title > 30 ? title.substr(0,30) + "..." : title}</h3>
                <h5 style={{marginBottom: "0px", marginTop: "0px"}}>나의 입장 : <button
                    className={styles.position}>{position == "AGREE" ? "찬성" : "반대"}</button>
                      레벨 포인트 : <button className={styles.position}>{opinion.point} 10 점 </button>
                </h5>
                <div className={styles.feedbackBox}>
                        <h4>견해 작성 내용</h4>
                        <p>{opinion.content}</p>
                    </div>
                <div className={styles.feedbackBox}>
                    <h4>피드백 내용</h4>
                    <p style={{lineHeight:"24px"}}>{opinion.feedbackContent}</p>
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