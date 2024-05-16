import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RecommendedItem.module.css";


const RecommendedItem = ({data, show}) => {

    const navigate = useNavigate();

    const clickHandler = (articleNum) => {
        navigate(`/summary/${articleNum}`, {state: {data}});
    }

    return (
        
        <div>
            <div className={styles.wrapper}>
                <div className={styles.category}>{`${data.category}`}</div>
                <div className={styles.title}>{`${data.title}`}</div>
                <button disabled={show} className={styles.startBtn} onClick={() => clickHandler(data.id)}>문해력 진단 시작하기</button>
            </div>
        </div>

    )
}



export default RecommendedItem;