import React, {useEffect, useState} from "react";
import customAxios from "../../../lib/customAxios";
import {useNavigate} from 'react-router-dom';
import OpinionPage from "./OpinionPage";
import styles from "./OpinionHistory.module.css"
import BottomNavBar from "../../../components/bottomNavBar/bottomNavBar";

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

    //TODO 아무것도 안 썼을 때 디자인 개선 지금 너무 글만 달랑 있음
    const initContent = "작성된 견해가 없습니다! 견해를 작성해서 문해력을 키워보아요!"

    return (
        <div className={styles.page}>
            <div className={styles.divUp}>
                <p className={styles.pageTitle}>작성한 견해문</p>
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

            <BottomNavBar user="1"></BottomNavBar>
        </div>
    )
}

export default OpinionHistory;