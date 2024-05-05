import React from "react";
import { useNavigate } from "react-router-dom";
import formatDateTime from "../../util/FormatDateTime"
import styles from "./Article.module.css";

const Article = ({data}) => {

    const navigate = useNavigate();

    const onClickStartBtn = (articleNum) => {
        navigate(`/summary/${articleNum}`, {state: {data}});
    }

    return (
        <div className={styles.articleDiv}>
            <h2 className={styles.title}>{data.title}</h2>
            <p className={styles.category}>{data.category}</p>
            <div style={{display:"flex", width:"300px", justifyContent:"space-between"}}>
            <p className={styles.content}>{formatDateTime(data.createdTime)}</p>
            {data.summaryDone ? <p className={styles.summaryDone}>요약 작성 완료</p> : <p className={styles.summaryNotDone}>요약 작성 전</p>}
            </div>
            <div className={styles.divisionLine}></div>
            <button className = {styles.startBtn} onClick={() => onClickStartBtn(data.id)}> 문해력 진단 시작하기</button>
        </div>
    )
}

export default Article;