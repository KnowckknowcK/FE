import React, {useEffect, useState} from "react";
import styles from './SummaryHistory.module.css';
import customAxios from "../../../lib/customAxios";
import BottomNavBar from "../../../components/bottomNavBar/bottomNavBar";
import {useNavigate} from "react-router-dom";
import Summary from "./Summary";

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
    const initContent = "작성중인 요약이 없습니다! 견해를 작성해서 문해력을 키워보아요!"

    return (
        <div style={{overflowY:"auto", overflowX:"hidden"}}>
            <div className={styles.container}>
                <div className={styles.divUp}>
                    <p className={styles.pageTitle}>작성 중인 요약문</p>
                </div>
                <div className={styles.wrapper}>
                    {summaryList.length !== 0 && summaryList.map(summary =>(
                        <div key={summary.summaryId} style={{marginBottom:"15%"}}>
                            < Summary data={summary} onClick={() => handleSummaryClick(summary)}/>
                        </div>
                    ))}
                    {summaryList.length === 0 &&
                        <div>
                            <p>{initContent}</p>
                        </div>
                    }
                </div>
                <BottomNavBar user="1"></BottomNavBar>
            </div>
        </div>
    )
}

export default SummaryHistoryIng;