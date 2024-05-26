import React, {useEffect, useState} from "react";
import customAxios from "../../lib/customAxios";
import styles from "./Dashboard.module.css";
import Donut from "./Donut";
import BottomNavBar from "../../components/bottomNavBar/bottomNavBar";
import spinner from "../user/Spinner.module.css";

const Dashboard = () => {
    const [dashInfo, setMyDashInfo] = useState(null);
    const [level, setLevel] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const getDashInfo = async() => {
            return await customAxios
                .get('/profile/dashboard')
                .then((response) => {
                    setMyDashInfo(response.data.data)
                    console.log(response.data.data)
                    setLevel(Math.floor(response.data.data.point / 100));
                });
        }
        const fetchData = async() => {
            await getDashInfo();
            setIsLoading(false);
        };
        fetchData();
    }, []);

    if (isLoading) {
        <div className={spinner.spinnerContainer}>
            <div className={spinner.spinner}></div>
            <div className={spinner.text}>토론방 가져오는 중</div>
        </div>
    }

    return (
        <div>
            <div className={styles.page}>
                <div className={styles.box}>
                    <div style={{width:"45%",marginTop:"4%"}}>
                        <Donut value = {dashInfo.point}/>
                    </div>
                    <div className={styles.boxContent}>
                        <p style={{color:"#FFFFFF"}}>{dashInfo.strikes ? dashInfo.strikes : 0}일 연속 참여 중이에요</p>
                        <div className={styles.boxLine}>
                            <img src = './score/silver.png' alt = "메달"/>
                            <p style={{fontWeight:"bold",color:"#FFFFFF"}}>LEVEL.{level}</p>
                        </div>
                        <p style={{color:"#FFFFFF"}}>level{level + 1}까지 exp {100 * (level+1)  - dashInfo.point}</p>
                    </div>
                </div>
                <div className={styles.para}>
                    <div className={styles.container}>
                        <div className={styles.line}>
                            <img src='./small.png' alt={"아이콘"} />
                            <p>총 획득 경험치</p>
                        </div>
                        <p style={{fontWeight:"bold"}}>EXP.{dashInfo.point}</p>
                    </div>
                    <div className={styles.container}>
                        <div className={styles.line}>
                            <img src='./small.png' alt={"아이콘"}/>
                            <p>오늘 도전 횟수</p>
                        </div>
                        <p style={{fontWeight:"bold"}}>{dashInfo.todayWorks}회</p>
                    </div>
                </div>
                <div className={styles.para}>
                    <div className={styles.container}>
                        <div className={styles.line}>
                            <img src='./small.png' alt={"아이콘"}/>
                            <p>총 요약 작성 횟수</p>
                        </div>
                        <p style={{fontWeight:"bold"}}>{dashInfo.totalSummaries}회</p>
                    </div>
                    <div className={styles.container}>
                        <div className={styles.line}>
                            <img src='./small.png' alt={"아이콘"}/>
                            <p>총 견해 작성 횟수</p>
                        </div>
                        <p style={{fontWeight:"bold"}}>{dashInfo.totalOpinions}회</p>
                    </div>
                </div>
            </div>
            <BottomNavBar/>
        </div>
    )
}

export default Dashboard;