import React from 'react';
import {useLocation} from "react-router-dom";
import styles from "./MyOpinion.module.css"
import MoveBackButton from "../MoveBackButton";
const OpinionDetailPage = () => {
    const location = useLocation();
    const { opinion } = location.state;
    return (
        <div>
            {opinion ? (
                <div className={styles.bg}>
                    <MoveBackButton style={{marginLeft:"5%"}}/>
                    <div>
                        <p className={styles.title} >{opinion.article.title}</p>
                        <p className={styles.content}>{opinion.article.content}</p>
                    </div>
                    <div>
                        <p className={styles.title}>내가 작성한 견해</p>
                        <p className={styles.content}>{opinion.content}</p>
                    </div>
                    <div>
                        <p className={styles.title}>AI 피드백</p>
                        <p className={styles.content}>{opinion.feedBackContent}</p>
                    </div>
                </div>
            ) : (
                <p>Opinion not found</p>
            )}
        </div>
    );
};

export default OpinionDetailPage;