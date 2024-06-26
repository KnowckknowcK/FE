import React, {useEffect, useState} from "react";
import customAxios from "../../lib/customAxios";
import styles from "./MyDebateRoomList.module.css"
import spinner from "./Spinner.module.css"
import MyDebateRoom from "./MyDebateRoom";
import BottomNavBar from "../../components/bottomNavBar/bottomNavBar";
import MoveBackButton from "./MoveBackButton";
import NoWork from "./noWork/NoWork";
const MyDebateRoomList = () => {
    const [myDebateRoom, setMyDebateRoom] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadMyDebateRoom = async () => {
            return await customAxios
                .get('/debate-room/ing')
                .then((res) => {
                    setMyDebateRoom(res.data.data);
                });
        }
        const fetchData = async () => {
            await loadMyDebateRoom();
            setIsLoading(false);
        };
        fetchData();
    }, []);

    return (
        <div style={{overflowY:"auto", overflowX:"hidden"}}>
            <div className={styles.container}>
                <div className= {styles.divUp}>
                    <MoveBackButton style={{marginLeft:"5%"}}/>
                    <p className={styles.pageTitle}>참여 중인 토론방</p>
                </div>
                <div className={styles.wrapper}>
                    {myDebateRoom.length !== 0 && myDebateRoom.map(room => (
                        <div key={room.id} style={{marginBottom:"15%"}}>
                            <MyDebateRoom data = {room}/>
                        </div>
                    ))}
                    {isLoading &&
                        <div className={spinner.spinnerContainer}>
                            <div className={spinner.spinner}></div>
                            <div className={spinner.text}>토론방 가져오는 중</div>
                        </div>
                    }
                    {myDebateRoom.length === 0 &&
                        <NoWork>아직 참여 중인 토론방이 없어요!<br/>견해를 작성하면 토론방에 들어갈 수 있어요 <br/> 토론방에 참여하여 문해력을<br/> 증진해봐요! :)</NoWork>                    }
                </div>
                <BottomNavBar/>
            </div>
        </div>
    )
}

export default MyDebateRoomList;