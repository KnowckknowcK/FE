import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Article.module.css";

const Article = ({data}) => {

    const navigate = useNavigate();

    const onClickStartBtn = (articleNum) => {
        navigate(`/summary/${articleNum}`, {state: {data}});
    }

    return (
        <div className={styles.articleDiv}>
            <h2 className={styles.title}>{data.title}</h2>
            <h4 className={styles.category}>{data.category}</h4>
            <p className={styles.content}>2024.04.02 오후 10:13</p>
            <div className={styles.divisionLine}e></div>
            <button className = {styles.startBtn} onClick={() => onClickStartBtn(data.id)}> 문해력 진단 시작하기</button>
        </div>
    )
}

export default Article;