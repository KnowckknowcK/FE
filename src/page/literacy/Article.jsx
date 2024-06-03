import { useNavigate } from "react-router-dom";
import formatDateTime from "../../util/FormatDateTime"
import styles from "./Article.module.css";

const Article = ({data}) => {

    const navigate = useNavigate();
    const {title, category, summaryDone, opinionDone, createdTime} = data;

    const onClickStartBtn = () => {

        if(summaryDone) navigate(`/opinion-writing`, {state: {data}});
        else navigate(`/summary`, {state: {data}});
    }

    if (opinionDone){
        return (
            <div className={styles.articleDivDone}>
                <h2 className={styles.title}>{title.length > 30 ? title.substr(0, 30) + "..." : title}</h2>
                <p className={styles.category}>{category}</p>
                <div style={{display: "flex", width: "100%", justifyContent: "space-between"}}>
                    <p className={styles.date}>{formatDateTime(createdTime)}</p>
                    <div className={styles.doneDiv}>
                        {summaryDone ? <p className={styles.summaryDone}>요약 피드백 완료</p> :
                            <p className={styles.summaryNotDone}>요약 피드백 가능</p>}
                        {opinionDone ? <p className={styles.summaryDone}>견해 피드백 완료</p> :
                            <p className={styles.summaryNotDone}>견해 피드백 가능</p>}
                    </div>
                </div>
                <div className={styles.divisionLine}></div>
                <button className={styles.startBtn} disabled="true"> 모든 피드백 완료</button>

            </div>
        )
    }

    return (
        <div className={styles.articleDiv}>
            <h2 className={styles.title}>{title.length > 30 ? title.substr(0, 30) + "..." : title}</h2>
            <p className={styles.category}>{category}</p>
            <div style={{display: "flex", width: "100%", justifyContent: "space-between"}}>
                <p className={styles.date}>{formatDateTime(createdTime)}</p>
                <div className={styles.doneDiv}>
                    {summaryDone ? <p className={styles.summaryDone}>요약 피드백 완료</p> :
                        <p className={styles.summaryNotDone}>요약 피드백 가능</p>}
                    {opinionDone ? <p className={styles.summaryDone}>견해 피드백 완료</p> :
                        <p className={styles.summaryNotDone}>견해 피드백 가능</p>}
                </div>
            </div>
            <div className={styles.divisionLine}></div>
            <button className={styles.startBtn} onClick={() => onClickStartBtn(data.id)}> 문해력 진단 시작하기</button>
        </div>
    )
}

export default Article;