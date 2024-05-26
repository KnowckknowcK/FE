import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import customAxios from "../../../lib/customAxios";
import styles from "./SummaryHistory.module.css"
import spinner from "../Spinner.module.css"
import BottomNavBar from "../../../components/bottomNavBar/bottomNavBar";
import Summary from "./Summary";
import MoveBackButton from "../MoveBackButton";
import NoWork from "../noWork/NoWork";

const SummaryHistoryDone = () => {
    const [summaryList, setSummaryList] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        const loadSummary = async() => {
            return await customAxios
                .get(`/summary?status=DONE`)
                .then((response) => {
                    setSummaryList(response.data.data)
                })
        }

        const fetchData = async() => {
            await loadSummary();
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const handleSummaryClick = (summary) => {
        navigate(`/summary-detail/${summary.summaryId}`,{state:{summary}});
    };

    const initContent = "작성된 요약이 없습니다! 요약 작성해서 문해력을 키워보아요!"

    return (
        <div style={{overflowY:"auto", overflowX:"hidden"}}>
            <div className={styles.container}>
                <div className={styles.divUp}>
                    <MoveBackButton style={{marginLeft:"5%"}}/>
                    <p className={styles.pageTitle}>작성한 요약문</p>
                </div>
                <div className={styles.wrapper}>
                    {isLoading &&
                        <div className={spinner.spinnerContainer}>
                            <div className={spinner.spinner}></div>
                            <div className={spinner.text}>작성한 요약문 가져오는 중</div>
                        </div>
                    }
                    {summaryList.length !== 0 && summaryList.map(summary =>(
                        <div key={summary.summaryId} style={{marginBottom:"15%"}}>
                            < Summary data={summary} onClick={() => handleSummaryClick(summary)}/>
                        </div>
                    ))}
                    {summaryList.length === 0 &&
                        <NoWork>아직 작성한 요약이 없어요!<br/>요약을 작성하고 똑똑과 함께 문해력을<br/> 증진해봐요! :)</NoWork>
                    }
                </div>
                <BottomNavBar user="1"></BottomNavBar>
            </div>
        </div>
    );
};

export default SummaryHistoryDone;