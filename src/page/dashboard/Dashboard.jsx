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
                    setLevel(Math.floor(response.data.data.totalPoint / 100) + 1)
                });
        }
        const fetchData = async() => {
            await getDashInfo();
            setIsLoading(false);
        };

        fetchData();
    }, []);

    return (
        <div>
            {isLoading &&
                <div className={spinner.spinnerContainer}>
                    <div className={spinner.spinner}></div>
                    <div className={spinner.text}>내 정보 가져오는 중</div>
                </div>
            }
            {!isLoading &&
                <div className={styles.page}>
                    <div className={styles.box}>
                        <div style={{width:"42%",margin:"3%"}}>
                            <Donut value = {dashInfo.totalPoint}/>
                        </div>
                        <div className={styles.boxContent}>
                            <div className={styles.boxLine}>
                                {/*<img src = './score/silver.png' alt = "메달"/>*/}
                                <p style={{fontWeight:"bold",color:"#FFFFFF",fontSize:"25px"}}>EXP.{dashInfo.totalPoint}</p>
                            </div>
                            <p style={{color:"#FFFFFF"}}>level{level + 1}까지 exp {100 * level - dashInfo.totalPoint}</p>
                        </div>
                    </div>
                    <div className={styles.strikeline}>
                        <img src='./fire.png' alt={"연속 아이콘"}/>
                        <p style={{color:"#000000", fontWeight : "bolder", fontSize: "19px"}} >{dashInfo.strikes ? dashInfo.strikes : 0}일 연속 참여 중이에요</p>
                    </div>

                    <div className={styles.para}>
                        <div className={styles.container}>
                            <div className={styles.line}>
                                <img src='./small.png' alt={"아이콘"} />
                                <p>오늘 획득 경험치</p>
                            </div>
                            <p style={{fontWeight:"bold"}}>EXP.{dashInfo.todayPoint}</p>
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
            }
            <BottomNavBar/>
        </div>
    )
}

export default Dashboard;