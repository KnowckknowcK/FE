import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./SummaryWriting.module.css";
import Stopwatch from "../../utils/StopWatch";

const SummaryWriting = () => {
  const location = useLocation().state.data;

    return (
        <div>
            <div className={styles.articleDiv}>
                <h2 className={styles.title}>{location.title}</h2>
                <h4>{location.createdTime}</h4>
                <p className={styles.content}>{location.content}</p>
            </div>
            <Stopwatch />
            <p className={styles.summaryNotice}>요약 작성</p>
            <textarea className={styles.textarea}></textarea>
        </div>
    )
}

export default SummaryWriting;