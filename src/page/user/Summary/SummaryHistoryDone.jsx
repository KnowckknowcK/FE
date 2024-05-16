import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import customAxios from "../../../lib/customAxios";
import styles from "./SummaryHistory.module.css"
import BottomNavBar from "../../../components/bottomNavBar/bottomNavBar";

const SummaryHistoryDone = () => {
    const [summaryList, setSummaryList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadSummary = async() => {
            return await customAxios
                .get(`/summary?status=DONE`)
                .then((response) => {
                    setSummaryList(response.data.data)
                    console.log(response.data.data)
                })
        }

        const fetchData = async() => {
            await loadSummary();
        };

        fetchData();
    }, []);

    const handleSummaryClick = (summary) => {
        navigate(`/summary-detail/${summary.summaryId}`,{state:{summary}});
    };

    const initContent = "작성된 요약이 없습니다! 요약 작성해서 문해력을 키워보아요!"

    return (
        <div className={styles.page}>
            <div className={styles.divUp}>
                <p className={styles.pageTitle}>작성한 요약문</p>
            </div>
            <div className={styles.page}>
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
    );
};

export default SummaryHistoryDone;