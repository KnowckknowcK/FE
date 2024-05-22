import React, {useEffect, useState} from "react";
import customAxios from "../../../lib/customAxios";
import {useNavigate} from 'react-router-dom';
import OpinionDetailPage from "./OpinionDetailPage";
import styles from "./OpinionHistory.module.css"
import BottomNavBar from "../../../components/bottomNavBar/bottomNavBar";
import Summary from "../Summary/Summary";
import Opinion from "./Opinion";

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


    //TODO 아무것도 안 썼을 때 디자인 개선 지금 너무 글만 달랑 있음
    const initContent = "작성된 견해가 없습니다! 견해를 작성해서 문해력을 키워보아요!"

    return (
        <div style={{overflowY:"auto", overflowX:"hidden"}}>
            <div className={styles.container}>
                <div className={styles.divUp}>
                    <p className={styles.pageTitle}>작성한 요약문</p>
                </div>
                <div className={styles.wrapper}>
                    {opinionList.length !== 0 && opinionList.map(opinion =>(
                        <div key={opinion.opinionId} style={{marginBottom:"15%"}}>
                            <Opinion data={opinion}/>
                        </div>
                    ))}
                    {opinionList.length === 0 &&
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

export default OpinionHistory;