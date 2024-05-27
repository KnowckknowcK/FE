import { useLocation } from "react-router-dom";
import styles from "./Feedback.module.css";
import BottomNavBar from '../../components/bottomNavBar/bottomNavBar';
import { useNavigate } from "react-router-dom";
import customAxios from "../../lib/customAxios";
import Swal from "sweetalert2";


const OpinionFeedback = () => {
    const location = useLocation();
    const title = location.state.title;
    const opinion = location.state?.opinion;
    const position = location.state?.position;
    const category = location.state?.category;
    const articleId = location.state?.articleId;

  const navigate = useNavigate();

  const onClickDebateRoom = async () => {
      const response = await customAxios.put(`/debate-room/${articleId}`);

      if (response.status === 200) {
          const roomId = articleId;
          navigate(`/debate-room/`, {state: {roomId}});
      }

      else {
          Swal.fire({
              title: "토론방 입장 실패",
              text: "토론방에 입장하는 도중에 오류가 발생했어요 :(",
              icon: "error",
              width: "350px",
              confirmButtonColor: "#B5C9C0",
          })
      }
    }

    
    return (
        <div className={styles.feedbackDiv}>
            <h3> AI 피드백 </h3>
            <div className={styles.divBox}>
                <h3 style={{lineHeight:"140%"}}><button className={styles.category}>{category}</button>  {title > 30 ? title.substr(0,30) + "..." : title}</h3>
                <h4 style={{marginBottom: "0px", marginTop: "0px"}}>나의 입장 : <button
                    className={styles.position}>{position == "AGREE" ? "찬성" : "반대"}</button>
                </h4>
                <div className={styles.feedbackBox}>
                        <h4>견해 작성 내용</h4>
                        <p>{opinion.content}</p>
                    </div>
                <div className={styles.feedbackBox}>
                    <h4>피드백 내용</h4>
                    <p className={styles.summaryContent}>{opinion.feedbackContent}</p>
                </div>
            </div>
            <div style={{display:"flex", justifyContent:"space-around"}}>
                <button className={styles.feedbackBtn} onClick={() => {navigate('/')}}>홈으로</button>
                <button className={styles.feedbackBtn} onClick={onClickDebateRoom}>토론방 입장</button>
            </div>
            <BottomNavBar/>
        </div>
    )
}

export default OpinionFeedback;