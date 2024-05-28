import { useNavigate } from "react-router-dom";
import formatDateTime from "../../util/FormatDateTime"
import styles from "./Article.module.css";

const Article = ({data}) => {

    const navigate = useNavigate();

    const onClickStartBtn = (articleNum) => {

        if(data.summaryDone) navigate(`/opinion-writing`, {state: {data}});
        else navigate(`/summary`, {state: {data}});
    }

    return (
        <div className={styles.articleDiv}>
            <h2 className={styles.title}>{data.title.length > 30 ? data.title.substr(0,30) + "..." : data.title}</h2>
            <p className={styles.category}>{data.category}</p>
            <div style={{display:"flex", width:"100%", justifyContent: "space-between"}}>
                <p className={styles.date}>{formatDateTime(data.createdTime)}</p>
                <div className={styles.doneDiv}>
                    {data.summaryDone ? <p className={styles.summaryDone}>요약 피드백 완료</p> : <p className={styles.summaryNotDone}>요약 피드백 가능</p>}
                    {data.opinionDone ? <p className={styles.summaryDone}>견해 피드백 완료</p> : <p className={styles.summaryNotDone}>견해 피드백 가능</p>}
                </div>
            </div>
            <div className={styles.divisionLine}></div>
            {data.summaryDone && data.opinionDone ? <button className = {styles.startBtn} disabled= "true"> 모든 피드백 완료</button>
            : <button className = {styles.startBtn} onClick={() => onClickStartBtn(data.id)}> 문해력 진단 시작하기</button>}
        </div>
    )
}

export default Article;