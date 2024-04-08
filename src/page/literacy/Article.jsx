import React from "react";
import styles from "./Article.module.css";

const Article = ({data}) => {
    return (
        <div className={styles.articleDiv}>
            <h2>{data.title}</h2>
            <h4>{data.category}</h4>
            <p>2024.04.02 오후 10:13</p>
            <div className={styles.divisionLine}e></div>
            <btn>문해력 진단 시작하기</btn>
        </div>
    )
}

export default Article;