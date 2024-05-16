import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import styles from "./MySummary.module.css";

const SummaryPage = () => {
    const location = useLocation();
    // const [imagePath, setImagePath] = useState(null);
    const {summary} = location.state;

    const imageOptions = {
        EXCELLENT: require('./score/gold.png'),
        GOOD: require('./score/silver.png'),
        FAIR: require('./score/bronze.png')
    };
    // function selectImg(option) {
    //     const path = imageOptions[option];
    //     if (path !== imagePath) {
    //         setImagePath(path);
    //     }
    // }
    // selectImg(summary.score)
    const imagePath = imageOptions[summary.score];
    return (
        <div>
            {summary ? (
                <div className={styles.bg}>
                    <div>
                        <p className={styles.title} >{summary.title}</p>
                        <p className={styles.content}>{summary.article.content}</p>
                    </div>
                    <div>
                        <p className={styles.title}>내가 작성한 요약</p>
                        <p className={styles.content}>{summary.content}</p>
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

export default SummaryPage;