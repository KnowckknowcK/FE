import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./SummaryWriting.module.css";
import customAxios from "../../lib/customAxios";
import formatDateTime from "../../util/FormatDateTime"

const OpinionWriting = () => {
  const location = useLocation().state.data;
  const navigate = useNavigate();
  const [opinion, setOpinion] = useState([]);
  const [isWaitingOpinion, setIsWaitingOpinion] = useState(false);
  const [position, setPosition] = useState("AGREE");

  const submitOpinion = async () => {

    if (opinion.length === 0) {
      alert("내용을 입력해주세요.");
      return;
    }

    setIsWaitingOpinion(true); 

    return await customAxios.post(`/opinion/submit`, {
      content: opinion,
      articleId: location.id,
      status: "DONE",
      position: position

    }).then((response) => {
      if(response.data.code === 200) {
        alert("제출되었습니다.");
        navigate("/opinion-feedback", {state: {opinion: response.data.data, title : location.title, category: location.category, position: position}});

      } else {
        console.log(response.data);
        alert("제출에 실패했습니다.");
      }
    })
  }

    const onChangeTextArea = (e) => {
        setOpinion(e.target.value);
    }   


    if (isWaitingOpinion) return <p>피드백을 기다리는 중입니다.</p>

    return (
        <div style={{overflow:"hidden"}}>
            <div className={styles.articleDiv}>
                <h2 className={styles.title}>{location.title}</h2>
                <h4>{formatDateTime(location.createdTime)}</h4>
                <p className={styles.content}>{location.content}</p>
            </div>

            <div style={{display:"flex", justifyContent:"space-between"}}>
            <p className={styles.summaryNotice}>견해 작성</p>
            </div>

            <textarea className={styles.textarea} onChange={onChangeTextArea} value={opinion}></textarea>
            <div className={styles.btnDiv}>
                <button className={styles.summaryBtn} onClick={submitOpinion}>견해 제출</button>
            </div>
        </div>
    )
}

export default OpinionWriting;