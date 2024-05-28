import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import styles from "./SummaryDetail.module.css";
import MoveBackButton from "../MoveBackButton";
import customAxios from "../../../lib/customAxios";

const SummaryDetailPage = () => {
    const location = useLocation();
    const [opinion, setOpinion] = useState(null);
    const {summary} = location.state;
    const navigate = useNavigate();

    useEffect(() => {
        const getOpinion = async (articleId) => {
            const response = await customAxios.get(`/opinion/${articleId}`);
            if (response.data?.data) {
                setOpinion(response.data.data);
            }
        }

        getOpinion(summary.articleId);
    }, []);

    const imageOptions = {
        EXCELLENT: require("../../../asset/gold.png"),
        GOOD: require("../../../asset/silver.png"),
        FAIR: require("../../../asset/bronze.png")
    };

    const imagePath = imageOptions[summary.score];

    const onClick = async (articleId) => {
        console.log(opinion)
        navigate(`/opinion-detail/${articleId}`,{state:{opinion}})
    }

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
                    <div>
                        {opinion ?
                            <div className={styles.moveBtn}>
                                <img src={'/arrow.png'} alt={'이미지'}/>
                                <p className={styles.btnText} onClick={() => onClick(summary.articleId)}>내가 작성한 견해 보기</p>
                            </div>
                            :
                            <div className={styles.noOpinion}>
                                <p className={styles.btnText}>작성한 견해 없음</p>
                            </div>
                        }
                    </div>
                </div>
            ) : (
                <p>summary not found</p>
            )}
        </div>
    );
};

export default SummaryDetailPage;