import React, {useEffect, useState} from "react";
import customAxios from "../../lib/customAxios";
import styles from "./Dashboard.module.css";

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
                <div style={{marginBottom:"10%",width:"95%",justifyContent:"center"}}>
                    <img src='./dashTemp.png' alt={"임시사진"}/>
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
                            <p>도전 횟수</p>
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