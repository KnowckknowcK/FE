import React, {useEffect, useState} from "react";
import customAxios from "../../lib/customAxios";
import styles from "./MyDebateRoomList.module.css"
import MyDebateRoom from "./MyDebateRoom";
import BottomNavBar from "../../components/bottomNavBar/bottomNavBar";
const MyDebateRoomList = () => {
    const [myDebateRoom, setMyDebateRoom] = useState([]);

    useEffect(() => {
        const loadMyDebateRoom = async () => {
            return await customAxios
                .get('/debate-room/ing')
                .then((res) => {
                    setMyDebateRoom(res.data.data);
                    console.log(res.data.data)
                });
        }
        const fetchData = async () => {
            await loadMyDebateRoom();
        };
        fetchData();
    }, []);

    return (
        <div>
            <div className={styles.container}>
                <div className= {styles.divUp}>
                    <p className={styles.pageTitle}>참여 중인 토론방</p>
                </div>
                <div>
                    {myDebateRoom.length !== 0 && myDebateRoom.map(room => (
                        <div key={room.id} className={styles.wrapper}>
                            <MyDebateRoom data = {room}/>
                        </div>
                    ))}
                    {myDebateRoom.length === 0 &&
                        <div>
                            <p>아직 참여 중인 토론방이 없어요!</p>
                        </div>
                    }
                </div>
            </div>
            <BottomNavBar/>
        </div>
    )
}

export default MyDebateRoomList;