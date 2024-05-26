import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import styles from "./SummaryDetail.module.css";
import MoveBackButton from "../MoveBackButton";

const SummaryDetailPage = () => {
    const location = useLocation();
    const {summary} = location.state;

    const imageOptions = {
        EXCELLENT: require("../../../asset/gold.png"),
        GOOD: require("../../../asset/silver.png"),
        FAIR: require("../../../asset/bronze.png")
    };

    const imagePath = imageOptions[summary.score];
    return (
        <div>
            {summary ? (
                <div className={styles.bg}>
                    <MoveBackButton style={{marginLeft:"5%"}}/>
                    <div>
                        <p className={styles.title} >{summary.title}</p>
                        <div className={styles.content}>{summary.articleContent}</div>
                    </div>
                    <div>
                        <p className={styles.title}>내가 작성한 요약</p>
                        <div className={styles.content}>{summary.content}</div>
                    </div>
                    <div>
                        <p className={styles.title}>AI 피드백</p>
                        <div>
                            <div className={styles.content}>
                                <div className={styles.img}>
                                    {imagePath? (
                                        <img src={imagePath} alt="이미지" />
                                    ) : (
                                        <p>로당즁</p>
                                    )}
                                </div>
                                {summary.feedBackContent}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>summary not found</p>
            )}
        </div>
    );
};

export default SummaryDetailPage;