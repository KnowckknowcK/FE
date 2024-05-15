import React, {useEffect, useState} from "react";
import customAxios from "../../../lib/customAxios";
import {Link, useNavigate} from 'react-router-dom';
import OpinionPage from "./OpinionPage";
import {OPINIONS} from "../data"
import styles from "./OpinionHistory.module.css"
import opinionStyles from "./MyOpinion.module.css"

const OpinionHistory = () => {
    const [opinionList, setOpinionList] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const loadOpinions = async() => {
            return await customAxios
                .get(`/opinion`)
                .then((response) => {
                    setOpinionList(response.data.data)
                    console.log(response.data.data)
                });
        }

        const fetchData = async () => {
            await loadOpinions();
        };

        fetchData();
    },[]);
    const handleOpinionClick = (opinion) => {
        console.log(opinion,opinion.opinionId)
        navigate(`/opinion/${opinion.opinionId}`, { state: { opinion } });
    };

    const initContent = "작성된 견해가 없습니다! 견해를 작성해서 문해력을 키워보아요!"

    return (
        <div className={styles.page}>
            <div className={styles.divUp}>
                <p className={styles.pageTitle}>작성한 견해문</p>
            </div>
            <div className={styles.page}>
                <div className={styles.list}>
                    {opinionList.length !== 0 && opinionList.map(opinion =>(
                        <div key={opinion.opinionId}
                            onClick={() => handleOpinionClick(opinion)}>
                            <p className={styles.title}>{opinion.article.title}</p>
                        </div>
                    ))}
                    {opinionList.length === 0 && initContent}
                </div>
            </div>
        </div>
    )
}

export default OpinionHistory;