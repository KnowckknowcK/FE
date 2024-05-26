import React, {useEffect, useState} from "react";
import customAxios from "../../../lib/customAxios";
import {useNavigate} from 'react-router-dom';
import styles from "./OpinionHistory.module.css"
import spinner from "../Spinner.module.css"
import BottomNavBar from "../../../components/bottomNavBar/bottomNavBar";
import Opinion from "./Opinion";
import MoveBackButton from "../MoveBackButton";

const OpinionHistory = () => {
    const [opinionList, setOpinionList] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate();


    useEffect(() => {
        const loadOpinions = async() => {
            return await customAxios
                .get(`/opinion`)
                .then((response) => {
                    setOpinionList(response.data.data)
                });
        }

        const fetchData = async () => {
            await loadOpinions();
            setIsLoading(false)
        };

        fetchData();
    },[]);


    //TODO 아무것도 안 썼을 때 디자인 개선 지금 너무 글만 달랑 있음
    const initContent = "작성된 견해가 없습니다! 견해를 작성해서 문해력을 키워보아요!"

    return (
        <div style={{overflowY:"auto", overflowX:"hidden"}}>
            <div className={styles.container}>
                <div className={styles.divUp}>
                    <MoveBackButton style={{marginLeft:"5%"}}/>
                    <p className={styles.pageTitle}>작성한 견해문</p>
                </div>
                <div className={styles.wrapper}>
                    {isLoading &&
                        <div className={spinner.spinnerContainer}>
                            <div className={spinner.spinner}></div>
                            <div className={spinner.text}>작성한 요약문 가져오는 중</div>
                        </div>
                    }
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