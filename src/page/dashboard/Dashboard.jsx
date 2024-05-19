import React, {useEffect, useState} from "react";
import customAxios from "../../lib/customAxios";
import styles from "./Dashboard.module.css";
import Donut from "./Donut";

const Dashboard = () => {
    const [dashInfo, setMyDashInfo] = useState(null);

    useEffect(() => {
        const getDashInfo = async() => {
            return await customAxios
                .get('/profile/dashboard')
                .then((response) => {
                    setMyDashInfo(response.data.data)
                    console.log(response.data.data)
                });
        }
        const fetchData = async() => {
            await getDashInfo();
        };
        fetchData();
    }, []);

    if (dashInfo === null) {
        return <p>로딩 중...</p>;
    }

    return (
        <div>
            <div className={styles.page}>
                <div className={styles.box}>
                    <div style={{width:"45%",marginTop:"4%"}}>
                        <Donut value = "80"/>
                    </div>
                    <div className={styles.boxContent}>
                        <p style={{color:"#FFFFFF"}}>{dashInfo.strikes ? dashInfo.strikes : 0}일 연속 참여 중이에요</p>
                        <div className={styles.boxLine}>
                            <img src = './score/silver.png' alt = "메달"/>
                            <p style={{fontWeight:"bold",color:"#FFFFFF"}}>EXP.80</p>
                        </div>
                        <p style={{color:"#FFFFFF"}}>level3까지 -exp57</p>
                    </div>
                </div>
                <div className={styles.para}>
                    <div className={styles.container}>
                        <div className={styles.line}>
                            <img src='./small.png' alt={"아이콘"} />
                            <p>획득한 경험치</p>
                        </div>
                        <p style={{fontWeight:"bold"}}>EXP</p>
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


        </div>
    )
}

export default Dashboard;