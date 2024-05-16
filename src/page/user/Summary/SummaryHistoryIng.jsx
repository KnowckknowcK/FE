import React, {useEffect, useState} from "react";
import styles from './SummaryHistory.module.css';
import customAxios from "../../../lib/customAxios";

const SummaryHistoryIng = () => {
    const [mySummary, setMySummary] = useState([]);
    const [status, setStatus] = useState(null)


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

    const onSelect = (status) => {
        setStatus(status)
    }

    const initContent = "작성된 견해가 없습니다! 견해를 작성해서 문해력을 키워보아요!"

    return (
        <div></div>
        // <div className={}>
        //     <div className={styles.divUp}>
        //         <p className={styles.pageTitle}>작성한 요약문</p>
        //     </div>
        //     <div className={styles.myList}>
        //         {mySummary.length !== 0 && mySummary.map((summary) => {
        //             <MySummary data = {summary}/>
        //         })}
        //     </div>
        // </div>
    )
}

export default SummaryHistoryIng;