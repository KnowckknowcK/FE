import React from 'react';
import styles from "./MyDebateRoom.module.css";
import {useNavigate} from "react-router-dom";
import customAxios from "../../lib/customAxios";


const MyDebateRoom = ({data}) => {
    const navigate = useNavigate();
    const getDebateRoomInfo = async (roomId) => {
        await customAxios.put(`/debate-room/${roomId}`, null);
        navigate(`/debate-room/${roomId}`);
    }
    const imageOptions = {
        AGREE: require('./Position/agree.png'),
        DISAGREE: require('./Position/disagree.png')
    };
    const imagePath = imageOptions[data.position];
    return (
        <div className={styles.block}
            onClick={() => getDebateRoomInfo(data.id)}>
            <p style={{fontWeight : "bold",maxWidth:"95%",height:"auto"}}>{data.title}</p>
            <p className={styles.vector}></p>
            <div className={styles.line}>
                <img src={imagePath} alt="이미지" style={{weight:"40%", height:"40%"}} />
                {data.position=== "AGREE" ? <p className={styles.position}>찬성</p> : <p className={styles.position}>반대</p>}
            </div>
        </div>
    );
};

export default MyDebateRoom;