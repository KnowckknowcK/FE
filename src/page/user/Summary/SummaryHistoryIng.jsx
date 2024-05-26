import React, {useEffect, useState} from "react";
import styles from './SummaryHistory.module.css';
import spinner from "../Spinner.module.css"
import customAxios from "../../../lib/customAxios";
import BottomNavBar from "../../../components/bottomNavBar/bottomNavBar";
import {useNavigate} from "react-router-dom";
import Summary from "./Summary";
import MoveBackButton from "../MoveBackButton";

const SummaryHistoryIng = () => {
    const [summaryList, setMySummary] = useState([]);
    const [isLoading, setIsLoading] = useState(true)


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
            setIsLoading(false);

        };

        fetchData();

    }, []);

    const handleSummaryClick = async (articleId) => {
        await customAxios.get(`article/${articleId}`)
            .then((response) => {
                navigate(`/summary`,{state:{data:response.data.data}});
                console.log(response.data.data);
            });

    };

    const initContent = "작성중인 요약이 없습니다! 견해를 작성해서 문해력을 키워보아요!"

    return (
        <div style={{overflowY:"auto", overflowX:"hidden"}}>
            <div className={styles.container}>
                <div className={styles.divUp}>
                    <MoveBackButton/>
                    <p className={styles.pageTitle}>작성 중인 요약문</p>
                </div>
                <div className={styles.wrapper}>
                    {isLoading &&
                        <div className={spinner.spinnerContainer}>
                            <div className={spinner.spinner}></div>
                            <div className={spinner.text}>작성 중인 요약문 가져오는 중</div>
                        </div>
                    }
                    {summaryList.length !== 0 && summaryList.map(summary =>(
                        <div key={summary.summaryId} style={{marginBottom:"15%"}}>
                            < Summary data={summary} onClick={() => handleSummaryClick(summary.articleId)}/>
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