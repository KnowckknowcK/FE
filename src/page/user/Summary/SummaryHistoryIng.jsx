import React, {useEffect, useState} from "react";
import styles from './SummaryHistory.module.css';
import customAxios from "../../../lib/customAxios";
import BottomNavBar from "../../../components/bottomNavBar/bottomNavBar";
import {useNavigate} from "react-router-dom";

const SummaryHistoryIng = () => {
    const [summaryList, setMySummary] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        const loadMySummary = async () => {
            return await customAxios
                .get( `/summary?status=ING`)
                .then((response) => {
                    setMySummary(response.data.data)
                });
        };

        const fetchData = async () => {
            await loadMySummary();
        };

        fetchData();

    }, []);

    const handleSummaryClick = (summary) => {
        navigate(`/summary/${summary.articleId}`,{state:{data : summary.article}});
    };
    const initContent = "작성된 견해가 없습니다! 견해를 작성해서 문해력을 키워보아요!"

    return (
        <div className={styles.page}>
            <div className={styles.divUp}>
                <p className={styles.pageTitle}>작성한 요약문</p>
                <div className={styles.myList}>
                    {summaryList.length !== 0 && summaryList.map(summary =>(
                        <div key={summary.summaryId}
                             onClick={() => handleSummaryClick(summary)}>
                            <p className={styles.title}>{summary.title}</p>
                        </div>
                    ))}
                    {summaryList.length === 0 && initContent}
                </div>
            </div>
            <BottomNavBar user="1"></BottomNavBar>
        </div>
    )
}

export default SummaryHistoryIng;